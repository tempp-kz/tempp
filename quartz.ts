import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import type { ExplorerOptions } from "@quartz-community/explorer"
import { componentRegistry } from "./quartz/components/registry"
import PublicCatalogCounts from "./quartz/components/PublicCatalogCounts"
import ExternalWorkLinks from "./quartz/components/ExternalWorkLinks"
import WikiPageEnhancements from "./quartz/components/WikiPageEnhancements"
import PickupCards from "./quartz/components/PickupCards"
import { simplifySlug } from "@quartz-community/utils"

componentRegistry.register("public-catalog-counts", PublicCatalogCounts, "local")

componentRegistry.register("external-work-links", ExternalWorkLinks, "local")

const WikiPageEnhancementsWithOpac = () => {
  const Component = WikiPageEnhancements()

  Component.afterDOMLoaded = `${Component.afterDOMLoaded ?? ""}
  const kouzuExplorerOpacClass = "explorer-opac-link"
  const kouzuExplorerOpacObservers = new WeakMap()

  function kouzuEnsureExplorerOpacLink(list) {
    let item = list.querySelector(":scope > ." + kouzuExplorerOpacClass)

    if (!item) {
      item = document.createElement("li")
      item.className = kouzuExplorerOpacClass

      const link = document.createElement("a")
      link.href = "https://tempp-kz.github.io/pucopac/"
      link.className = "nav-file-title tree-item-self"
      link.textContent = "■ ぷ庫OPAC"
      item.appendChild(link)
    }

    const rootItems = Array.from(list.children)
    const profileItem = rootItems.find((candidate) =>
      (candidate.querySelector(":scope > a")?.textContent || "").trim() === "■ Profile",
    )
    const worksItem = rootItems.find((candidate) =>
      (candidate.querySelector(":scope > a")?.textContent || "").trim() === "■ 反映小説一覧",
    )

    if (profileItem && item.nextElementSibling !== profileItem) {
      list.insertBefore(item, profileItem)
    } else if (!profileItem && worksItem && worksItem.nextElementSibling !== item) {
      worksItem.insertAdjacentElement("afterend", item)
    }
  }

  function kouzuSetupExplorerOpacLinks() {
    for (const list of document.querySelectorAll(".explorer-ul")) {
      kouzuEnsureExplorerOpacLink(list)

      if (kouzuExplorerOpacObservers.has(list)) continue

      const observer = new MutationObserver(() => {
        kouzuEnsureExplorerOpacLink(list)
      })

      observer.observe(list, { childList: true })
      kouzuExplorerOpacObservers.set(list, observer)

      if (window.addCleanup) {
        window.addCleanup(() => observer.disconnect())
      }
    }
  }

  document.addEventListener("nav", kouzuSetupExplorerOpacLinks)
  document.addEventListener("render", kouzuSetupExplorerOpacLinks)
  kouzuSetupExplorerOpacLinks()
  `

  return Component
}

componentRegistry.register("wiki-page-enhancements", WikiPageEnhancementsWithOpac, "local")

componentRegistry.register("pickup-cards", PickupCards, "local")

type ExplorerNode = Parameters<NonNullable<ExplorerOptions["mapFn"]>>[0]

componentRegistry.setOptionOverrides("@quartz-community/explorer", {
  order: ["filter", "sort", "map"],

  // Locationは管理用フォルダとして残し、公開Explorerからだけ除外する。
  filterFn: (node: ExplorerNode) => {
    const path = (node.slugSegments ?? []).join("/")
    return node.slugSegment !== "tags" && !path.startsWith("02_locations")
  },

  sortFn: (a: ExplorerNode, b: ExplorerNode) => {
    if (a.isFolder !== b.isFolder) {
      return a.isFolder ? -1 : 1
    }

    const parent = a.slugSegments?.slice(0, -1).join("/") ?? ""

    const orderByParent: Record<string, string[]> = {
      "": ["01_world", "03_characters", "05_places", "06_organizations", "反映小説一覧", "profile"],

      "01_world": ["神津世界", "pem", "ユフ"],

      "03_characters": ["現代：神津区", "現代：辻切区", "現代：港湾区", "明治", "大正", "pem"],

      "05_places": [
        "神白県",
        "神津市",
        "神津区",
        "逆城町",
        "新谷坂町",
        "港湾区",
        "辻切区",
        "三神工業",
      ],

      "06_organizations": ["神白県", "神津市", "神津区", "港湾区", "辻切区", "三神工業", "石燕市"],
    }

    const preferredOrder = orderByParent[parent]

    if (preferredOrder !== undefined) {
      const aIndex = preferredOrder.indexOf(a.slugSegment ?? "")
      const bIndex = preferredOrder.indexOf(b.slugSegment ?? "")

      if (aIndex !== -1 || bIndex !== -1) {
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      }
    }

    const aName = a.slugSegment ?? a.displayName ?? ""
    const bName = b.slugSegment ?? b.displayName ?? ""

    return aName.localeCompare(bName, "ja", {
      numeric: true,
      sensitivity: "base",
    })
  },

  mapFn: (node: ExplorerNode) => {
    const path = (node.slugSegments ?? []).join("/")

    // Explorer上だけで使う表示名
    const displayNames: Record<string, string> = {
      "01_world": "Worlds 天",
      "03_characters": "Characters 人",
      "05_places": "Places 地",
      "06_organizations": "Organizations 集",
      反映小説一覧: "■ 反映小説一覧",
      profile: "■ Profile",
      "01_world/pem": "Physicis et magicae",
      "01_world/ユフ": "ユフの箱舟",
    }

    // 全角スペースによる見かけ上の階層
    const indentLevels: Record<string, number> = {
      // Places
      "05_places/神津市": 1,

      "05_places/神津区": 2,
      "05_places/逆城町": 2,
      "05_places/新谷坂町": 2,
      "05_places/港湾区": 2,
      "05_places/辻切区": 2,
      "05_places/三神工業": 2,

      // Organizations
      "06_organizations/神津市": 1,
      "06_organizations/石燕市": 1,

      "06_organizations/神津区": 2,
      "06_organizations/港湾区": 2,
      "06_organizations/辻切区": 2,
      "06_organizations/三神工業": 2,
    }

    const name = displayNames[path] ?? node.displayName ?? ""
    const indent = indentLevels[path] ?? 0

    node.displayName = "　".repeat(indent) + name
    return node
  },
})

// FolderPageが画面上で自動生成する一覧も、ローカルグラフのリンクとして扱う。
// ContentIndexがJSONを作る直前に、各indexへ直下のページとサブフォルダを登録する。
const config = await loadQuartzConfig()
const contentIndexEmitter = config.plugins.emitters.find((emitter) => emitter.name === "ContentIndex")

if (contentIndexEmitter) {
  const addFolderIndexLinks = (
    ctx: Parameters<typeof contentIndexEmitter.emit>[0],
    content: Parameters<typeof contentIndexEmitter.emit>[1],
  ) => {
    for (const [, file] of content) {
      const data = file.data as Record<string, unknown>
      const slug = data.slug
      if (typeof slug !== "string" || !slug.endsWith("/index")) continue

      const prefix = slug.slice(0, -"index".length)
      const links = new Set<string>(
        Array.isArray(data.links) ? data.links.filter((link): link is string => typeof link === "string") : [],
      )

      for (const candidate of ctx.allSlugs) {
        if (candidate === slug || !candidate.startsWith(prefix)) continue

        const relative = candidate.slice(prefix.length)
        const isDirectPage = relative.length > 0 && !relative.includes("/")
        const isDirectSubfolder = /^[^/]+\/index$/.test(relative)

        if (isDirectPage || isDirectSubfolder) {
          links.add(simplifySlug(candidate))
        }
      }

      data.links = [...links]
    }
  }

  const originalEmit = contentIndexEmitter.emit.bind(contentIndexEmitter)
  contentIndexEmitter.emit = (ctx, content, resources) => {
    addFolderIndexLinks(ctx, content)
    return originalEmit(ctx, content, resources)
  }

  if (contentIndexEmitter.partialEmit) {
    const originalPartialEmit = contentIndexEmitter.partialEmit.bind(contentIndexEmitter)
    contentIndexEmitter.partialEmit = (ctx, content, resources, changeEvents) => {
      addFolderIndexLinks(ctx, content)
      return originalPartialEmit(ctx, content, resources, changeEvents)
    }
  }
}

export default config
export const layout = await loadQuartzLayout()
