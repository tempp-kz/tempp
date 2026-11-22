import type { Root, RootContent } from "hast"
import type { QuartzPluginData } from "../plugins/vfile"
import type { QuartzComponent, QuartzComponentConstructor } from "./types"

function nodeText(node: RootContent): string {
  if (node.type === "text") return node.value
  if (node.type !== "element") return ""
  if (node.tagName === "br") return "\n"
  if (["script", "style", "svg"].includes(node.tagName)) return ""
  const text = node.children.map(nodeText).join("")
  return ["p", "li", "div", "blockquote"].includes(node.tagName) ? text + "\n" : text
}

export function extractOverview(tree: Root | undefined): string {
  if (!tree) return ""
  const start = tree.children.findIndex(
    (node) => node.type === "element" && node.tagName === "h2" && nodeText(node).trim() === "概要",
  )
  if (start < 0) return ""
  const section: RootContent[] = []
  for (const node of tree.children.slice(start + 1)) {
    if (node.type === "element" && /^h[12]$/.test(node.tagName)) break
    section.push(node)
  }
  return section.map(nodeText).join("").replace(/\s+/g, " ").trim()
}

export function selectRecentUpdates(files: QuartzPluginData[]) {
  return files
    .filter((file) => {
      const path = String(file.relativePath ?? "").replaceAll("\\", "/")
      return (
        path.endsWith(".md") &&
        !/(^|\/)index\.md$/i.test(path) &&
        file.unlisted !== true &&
        file.encrypted !== true &&
        file.frontmatter?.draft !== true &&
        file.frontmatter?.publish !== false
      )
    })
    .map((file) => ({
      name: String(file.relativePath).replaceAll("\\", "/").split("/").at(-1)!.slice(0, -3),
      slug: String(file.slug),
      overview: extractOverview(file.htmlAst),
      modified: file.dates?.modified?.getTime() ?? 0,
    }))
    .filter((entry) => entry.overview.length > 0 && Number.isFinite(entry.modified))
    .sort(
      (a, b) =>
        b.modified - a.modified ||
        a.name.localeCompare(b.name, "ja") ||
        a.slug.localeCompare(b.slug, "ja"),
    )
    .slice(0, 5)
}

const RecentUpdates: QuartzComponentConstructor = () => {
  const Component: QuartzComponent = ({ fileData, allFiles }) => {
    if (fileData.slug !== "index") return null
    return (
      <div
        id="kouzu-recent-updates-data"
        hidden
        data-updates={JSON.stringify(selectRecentUpdates(allFiles))}
      />
    )
  }

  Component.afterDOMLoaded = `
  function kouzuRenderRecentUpdates() {
    const host = document.getElementById("kouzu-recent-updates")
    const source = document.getElementById("kouzu-recent-updates-data")
    if (!host || !source) return
    const entries = JSON.parse(source.dataset.updates || "[]")
    const basePath = String(document.body.dataset.basepath || "").replace(/\\/$/, "")
    const rows = entries.map((entry) => {
      const row = document.createElement("p")
      row.className = "kouzu-recent-update"
      const link = document.createElement("a")
      link.className = "internal"
      link.href = basePath + "/" + entry.slug.split("/").map(encodeURIComponent).join("/")
      link.dataset.slug = entry.slug
      link.textContent = entry.name
      row.append(link, "：", entry.overview)
      return row
    })
    host.replaceChildren(...rows)
  }

  document.addEventListener("nav", kouzuRenderRecentUpdates)
  document.addEventListener("render", kouzuRenderRecentUpdates)
  kouzuRenderRecentUpdates()
  `

  Component.css = `
  #kouzu-recent-updates { margin: 0.65rem 0 2.5rem; }
  #kouzu-recent-updates .kouzu-recent-update {
    margin: 0.5rem 0;
    overflow-wrap: anywhere;
    white-space: pre-line;
  }
  `

  return Component
}

export default RecentUpdates
