import type { QuartzComponent, QuartzComponentConstructor } from "./types"

const PublicCatalogCounts: QuartzComponentConstructor = () => {
  const Component: QuartzComponent = () => null

  Component.afterDOMLoaded = `
  async function updatePublicCatalogCounts() {
    const counters = document.querySelectorAll(
      ".catalog-count[data-catalog-prefix]"
    )
    if (counters.length === 0) return

    try {
      const rawData = await fetchData
      const contentData = rawData.content || rawData
      const pages = Object.values(contentData)
      let total = 0

      for (const counter of counters) {
        const prefixes = String(counter.dataset.catalogPrefix || "")
          .split(",")
          .map((prefix) => prefix.trim().toLowerCase())
          .filter(Boolean)
          .map((prefix) => prefix + "/")

        const count = pages.filter((page) => {
          const filePath = String(page.filePath || "")
            .replaceAll("\\\\", "/")
            .toLowerCase()

          return (
            prefixes.some((prefix) => filePath.startsWith(prefix)) &&
            filePath.endsWith(".md") &&
            !filePath.endsWith("/index.md")
          )
        }).length

        counter.textContent = count + "件"
        total += count
      }

      const totalCounter = document.querySelector(
        ".catalog-count[data-catalog-total]"
      )

      if (totalCounter) {
        totalCounter.textContent = total + "件"
      }
    } catch (error) {
      console.error("公開資料目録を集計できませんでした", error)
    }
  }

  document.addEventListener("nav", updatePublicCatalogCounts)
  document.addEventListener("render", updatePublicCatalogCounts)
  `

  return Component
}

export default PublicCatalogCounts
