export type PickupLinkType = "internal" | "work" | "none"

export interface PickupRelatedItem {
  label: string
  linkType: PickupLinkType
  target?: string
}

export interface PickupCardData {
  enabled: boolean
  type: "character" | "place" | "work"
  pickupLabel: string
  pickupTarget?: string
  name: string
  nameLinkType: PickupLinkType
  nameTarget?: string
  era: string
  region: string
  regionTarget: string
  description: string
  relatedLabel: string
  related: PickupRelatedItem[]
  relatedSuffix?: string
  image: string
  imagePosition: string
  imageAlt: string
}

export const pickupCards: PickupCardData[] = [
  {
    enabled: true,
    type: "character",
    pickupLabel: "登場人物",
    name: "円城環",
    nameLinkType: "internal",
    nameTarget: "03_Characters/現代：辻切区/円城環",
    era: "現代",
    region: "辻切区",
    regionTarget: "02_Locations/辻切区",
    description: "結界系の魔法使い。サブカル系生真面目ひねくれ黒髪美人。",
    relatedLabel: "登場小説・場所",
    related: [
      { label: "魔女と亥の子餅", linkType: "work", target: "魔女と亥の子餅" },
      {
        label: "クウェス・コンクラーヴェ",
        linkType: "internal",
        target: "05_Places/辻切区/クウェス・コンクラーヴェ",
      },
    ],
    relatedSuffix: "ほか",
    image: "media/pickup/preview-enjo-tamaki.webp",
    imagePosition: "50% 40%",
    imageAlt: "円城環",
  },
  {
    enabled: true,
    type: "work",
    pickupLabel: "お話",
    name: "あけぬ夜はなし",
    nameLinkType: "work",
    nameTarget: "あけぬ夜はなし",
    era: "明治",
    region: "神津区",
    regionTarget: "02_Locations/神津区",
    description: "化物楼・幽凪屋に暮らす美しい女郎夕霧と帽子屋白河の悲恋。",
    relatedLabel: "関連地域・人物",
    related: [
      { label: "神津新地", linkType: "internal", target: "05_Places/神津区/神津新地" },
      { label: "幽凪晴夜", linkType: "internal", target: "03_Characters/明治/幽凪晴夜" },
    ],
    relatedSuffix: "他",
    image: "media/pickup/preview-akenu-yo-wa-nashi.webp",
    imagePosition: "50% 50%",
    imageAlt: "あけぬ夜はなし",
  },
  {
    enabled: true,
    type: "character",
    pickupLabel: "登場人物",
    name: "公理智樹",
    nameLinkType: "internal",
    nameTarget: "03_Characters/現代：辻切区/公理智樹",
    era: "現代",
    region: "辻切区",
    regionTarget: "02_Locations/辻切区",
    description: "煉瓦坂で美容院を営む中途半端に人がいい天然イケメン。幽霊がみえて酒乱。",
    relatedLabel: "登場小説・場所",
    related: [
      { label: "雨、落ちる。", linkType: "work", target: "雨、落ちる。" },
      {
        label: "ミスティオーラ",
        linkType: "internal",
        target: "05_Places/辻切区/ミスティオーラ",
      },
    ],
    relatedSuffix: "他",
    image: "media/pickup/preview-kouri-tomoki.webp",
    imagePosition: "50% 40%",
    imageAlt: "公理智樹",
  },
  {
    enabled: true,
    type: "place",
    pickupLabel: "場所",
    name: "高天町",
    nameLinkType: "internal",
    nameTarget: "02_Locations/高天町",
    era: "現代",
    region: "高天町",
    regionTarget: "02_Locations/高天町",
    description: "神津市と石燕市にまたがるスキー場に高天スノーリゾートが併設。表示テスト。",
    relatedLabel: "登場小説・場所",
    related: [
      { label: "雨、落ちる。（仮）", linkType: "work", target: "雨、落ちる。" },
      {
        label: "ミスティオーラ（仮）",
        linkType: "internal",
        target: "05_Places/辻切区/ミスティオーラ",
      },
    ],
    relatedSuffix: "他",
    image: "media/pickup/preview-takaten-machi.webp",
    imagePosition: "50% 40%",
    imageAlt: "高天町",
  },
  {
    enabled: true,
    type: "place",
    pickupLabel: "場所",
    name: "GALLERIA神津",
    nameLinkType: "internal",
    nameTarget: "05_Places/神津区/ガレリア神津",
    era: "現代",
    region: "神津区",
    regionTarget: "05_Places/神津区/ガレリア神津",
    description: "郊外型大型ショッピングセンター。表示テスト。",
    relatedLabel: "登場小説・場所",
    related: [
      { label: "雨、落ちる。（仮）", linkType: "work", target: "雨、落ちる。" },
      {
        label: "ミスティオーラ（仮）",
        linkType: "internal",
        target: "05_Places/辻切区/ミスティオーラ",
      },
    ],
    relatedSuffix: "他",
    image: "media/pickup/preview-galleria-kozu.webp",
    imagePosition: "50% 40%",
    imageAlt: "GALLERIA神津",
  },
  {
    enabled: true,
    type: "character",
    pickupLabel: "登場人物",
    name: "土御門鷹一郎",
    nameLinkType: "internal",
    nameTarget: "03_Characters/明治/土御門鷹一郎",
    era: "明治",
    region: "辻切区",
    regionTarget: "02_Locations/辻切区",
    description: "明治時代の陰陽師。性格が変。表示テスト。",
    relatedLabel: "登場小説・場所",
    related: [
      {
        label: "土御門神社",
        linkType: "internal",
        target: "05_Places/辻切区/土御門神社",
      },
      { label: "神津新地", linkType: "internal", target: "05_Places/神津区/神津新地" },
    ],
    relatedSuffix: "他",
    image: "media/pickup/preview-tsuchimikado-takaichiro.webp",
    imagePosition: "50% 40%",
    imageAlt: "土御門鷹一郎",
  },
]

export const pickupBackgrounds = Array.from(
  { length: 10 },
  (_, index) => `pickup-bg-${String(index + 1).padStart(2, "0")}.webp`,
)
