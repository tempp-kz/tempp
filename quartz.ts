import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"

componentRegistry.setOptionOverrides("@quartz-community/explorer", {
  sortFn: (a, b) => {
    // フォルダをファイルより先に表示
    if (a.isFolder !== b.isFolder) {
      return a.isFolder ? -1 : 1
    }

    // Location内の表示順
    const locationOrder = [
      "神白県",
      "神津市",
      "石燕市",
      "三春夜市",
      "四風市",
      "神津区",
      "港湾区",
      "新谷坂町",
      "辻切区",
      "逆城町",
      "高天町",
      "三神工業",
    ]

    const parent = a.slugSegments?.slice(0, -1).join("/") ?? ""

    if (parent === "02_locations") {
      const aIndex = locationOrder.indexOf(a.displayName ?? "")
      const bIndex = locationOrder.indexOf(b.displayName ?? "")

      if (aIndex !== -1 || bIndex !== -1) {
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      }
    }

    // 上位フォルダは01_、02_等の実フォルダ名で並べる
    // その他のファイルは従来どおり文字順
    const aName = a.isFolder
      ? (a.slugSegment ?? a.displayName ?? "")
      : (a.displayName ?? "")
    const bName = b.isFolder
      ? (b.slugSegment ?? b.displayName ?? "")
      : (b.displayName ?? "")

    return aName.localeCompare(bName, "ja", {
      numeric: true,
      sensitivity: "base",
    })
  },
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()