import type { QuartzComponent, QuartzComponentConstructor } from "./types"

const WikiPageEnhancements: QuartzComponentConstructor = () => {
  const Component: QuartzComponent = () => null

  Component.afterDOMLoaded = `
  const kouzuExplorerHomeClass = "explorer-home-link"
  const kouzuExplorerObservers = new WeakMap()

  function kouzuSiteHomePath() {
    const basePath = (document.body.dataset.basepath || "").replace(/\\/$/, "")
    return (basePath || "") + "/"
  }

  function kouzuIsHomePage() {
    const currentPath = window.location.pathname.replace(/\\/$/, "")
    const homePath = kouzuSiteHomePath().replace(/\\/$/, "")
    return currentPath === homePath
  }

  function kouzuEnsureExplorerHomeLink(list) {
    let item = list.querySelector(":scope > ." + kouzuExplorerHomeClass)

    if (!item) {
      item = document.createElement("li")
      item.className = kouzuExplorerHomeClass

      const link = document.createElement("a")
      link.href = kouzuSiteHomePath()
      link.className = "nav-file-title tree-item-self"
      link.textContent = "■ HOME"
      item.appendChild(link)
      list.prepend(item)
    }

    const link = item.querySelector("a")
    if (link) {
      link.classList.toggle("active", kouzuIsHomePage())
      link.classList.toggle("is-active", kouzuIsHomePage())
    }
  }

  function kouzuSetupExplorerHomeLinks() {
    for (const list of document.querySelectorAll(".explorer-ul")) {
      kouzuEnsureExplorerHomeLink(list)

      if (kouzuExplorerObservers.has(list)) continue

      const observer = new MutationObserver(() => {
        kouzuEnsureExplorerHomeLink(list)
      })

      observer.observe(list, { childList: true })
      kouzuExplorerObservers.set(list, observer)

      if (window.addCleanup) {
        window.addCleanup(() => observer.disconnect())
      }
    }
  }

  function kouzuUpdateAuthoredIndexLayout() {
    const slug = String(document.body.dataset.slug || "").toLowerCase()
    const isAuthoredIndex =
      slug.endsWith("/index") &&
      document.querySelector(".page-header .note-properties") !== null

    document.body.classList.toggle("authored-folder-index", isAuthoredIndex)
    if (!isAuthoredIndex) return

    const meta = document.querySelector(".page-header .content-meta")
    const banner = document.querySelector(
      'article object[data*="kouzuwiki-index-"], article img[src*="kouzuwiki-index-"]',
    )

    if (!meta || !banner) return

    const bannerBlock = banner.closest("p") || banner.closest("a") || banner
    bannerBlock.insertAdjacentElement("afterend", meta)
  }

  function kouzuRewriteLocationBreadcrumb() {
    const slug = String(document.body.dataset.slug || "").toLowerCase()
    if (!slug.startsWith("02_locations/") || slug.endsWith("/index")) return

    const basePath = (document.body.dataset.basepath || "").replace(/\\/$/, "")

    for (const link of document.querySelectorAll(
      ".breadcrumb-container .breadcrumb-element a",
    )) {
      if ((link.textContent || "").trim() !== "Location") continue

      link.textContent = "Places"
      link.href = (basePath || "") + "/05_places/"
    }
  }

  function kouzuUpdateWikiPageEnhancements() {
    kouzuSetupExplorerHomeLinks()
    kouzuUpdateAuthoredIndexLayout()
    kouzuRewriteLocationBreadcrumb()
  }

  document.addEventListener("nav", kouzuUpdateWikiPageEnhancements)
  document.addEventListener("render", kouzuUpdateWikiPageEnhancements)
  kouzuUpdateWikiPageEnhancements()
  `

  return Component
}

export default WikiPageEnhancements
