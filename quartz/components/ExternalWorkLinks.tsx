import type { QuartzComponent, QuartzComponentConstructor } from "./types"

const ExternalWorkLinks: QuartzComponentConstructor = () => {
  const Component: QuartzComponent = () => null

  Component.afterDOMLoaded = `
  const workCatalogUrl = "/tempp/反映小説一覧/"
  let workLinkMapPromise

  function normalizeWorkTitle(value) {
    return value.replace(/\\s+/g, " ").trim()
  }

  function readExternalUrl(cell) {
    const linkedUrl = cell.querySelector(
      'a[href^="https://"], a[href^="http://"]',
    )
    if (linkedUrl) return linkedUrl.href

    const match = cell.textContent.match(/https?:\\/\\/[^\\s<]+/)
    return match ? match[0] : undefined
  }

  function isWorkCatalogPage() {
    const catalogPath = new URL(workCatalogUrl, window.location.origin).pathname
      .replace(/\\/$/, "")
    const currentPath = window.location.pathname.replace(/\\/$/, "")
    return currentPath === catalogPath
  }

  function removeCatalogTitleLinks() {
    if (!isWorkCatalogPage()) return

    for (const link of document.querySelectorAll(
      "table tbody td:first-child a.internal",
    )) {
      link.replaceWith(document.createTextNode(link.textContent || ""))
    }
  }

  async function loadWorkLinkMap() {
    if (workLinkMapPromise) return workLinkMapPromise

    workLinkMapPromise = fetch(workCatalogUrl, { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "反映小説一覧を取得できませんでした: " + response.status,
          )
        }
        return response.text()
      })
      .then((html) => {
        const parsed = new DOMParser().parseFromString(html, "text/html")
        const links = new Map()

        for (const row of parsed.querySelectorAll("table tbody tr")) {
          const cells = row.querySelectorAll("td")
          if (cells.length < 2) continue

          const title = normalizeWorkTitle(cells[0].textContent || "")
          const externalUrl = readExternalUrl(cells[1])
          if (!title || !externalUrl) continue

          try {
            const url = new URL(externalUrl)
            if (url.protocol !== "https:" && url.protocol !== "http:") {
              continue
            }
            links.set(title, url.href)
          } catch {
            // URLとして解釈できないセルは未登録として扱う
          }
        }

        return links
      })
      .catch((error) => {
        console.warn("[ExternalWorkLinks]", error)
        return new Map()
      })

    return workLinkMapPromise
  }

  async function updateExternalWorkLinks() {
    removeCatalogTitleLinks()

    const links = await loadWorkLinkMap()
    if (links.size === 0) return

    for (const link of document.querySelectorAll("a.internal")) {
      const title = normalizeWorkTitle(link.textContent || "")
      const externalUrl = links.get(title)
      if (!externalUrl) continue

      link.href = externalUrl
      link.classList.remove("internal")
      link.classList.add("external")
      link.removeAttribute("data-slug")
      link.setAttribute("data-no-popover", "true")
      link.setAttribute("rel", "noopener noreferrer")
    }
  }

  document.addEventListener("nav", updateExternalWorkLinks)
  document.addEventListener("render", updateExternalWorkLinks)
  updateExternalWorkLinks()
  `

  return Component
}

export default ExternalWorkLinks
