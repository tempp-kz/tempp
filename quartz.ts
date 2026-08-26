import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"
import PublicCatalogCounts from "./quartz/components/PublicCatalogCounts"

componentRegistry.register(
  "public-catalog-counts",
  PublicCatalogCounts,
  "local",
)


componentRegistry.setOptionOverrides("@quartz-community/explorer", {
  order: ["filter", "sort", "map"],

  sortFn: (a, b) => {
    if (a.isFolder !== b.isFolder) {
      return a.isFolder ? -1 : 1
    }

    const parent = a.slugSegments?.slice(0, -1).join("/") ?? ""

    const orderByParent: Record<string, string[]> = {
      "": [
        "01_world",
        "03_characters",
        "02_locations",
        "05_places",
        "06_organizations",
      ],

      "01_world": [
        "神津世界",
        "pem",
        "ユフ",
      ],

      "03_characters": [
        "現代：神津区",
        "現代：辻切区",
        "現代：港湾区",
        "明治",
        "大正",
        "pem",
      ],

      "02_locations": [
        "神白県",
        "神津市",
        "神津区",
        "港湾区",
        "新谷坂町",
        "辻切区",
        "逆城町",
        "高天町",
        "三神工業",
        "石燕市",
        "三春夜市",
        "四風市",
      ],

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

      "06_organizations": [
        "神白県",
        "神津市",
        "神津区",
        "港湾区",
        "辻切区",
        "三神工業",
        "石燕市",
      ],
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

  mapFn: (node) => {
    const path = (node.slugSegments ?? []).join("/")

    // Explorer上だけで使う表示名
    const displayNames: Record<string, string> = {
      "01_world": "World",
      "03_characters": "Characters",
      "02_locations": "Location",
      "05_places": "Places",
      "06_organizations": "Organizations",
      "01_world/pem": "Physicis et magicae",
      "01_world/ユフ": "ユフの箱舟",
    }

    // 全角スペースによる見かけ上の階層
    const indentLevels: Record<string, number> = {
      // Location
      "02_locations/神津市": 1,
      "02_locations/石燕市": 1,
      "02_locations/三春夜市": 1,
      "02_locations/四風市": 1,

      "02_locations/神津区": 2,
      "02_locations/港湾区": 2,
      "02_locations/新谷坂町": 2,
      "02_locations/辻切区": 2,
      "02_locations/逆城町": 2,
      "02_locations/高天町": 2,
      "02_locations/三神工業": 2,

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

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()