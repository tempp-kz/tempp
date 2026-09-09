// AUTO-GENERATED. Edit PICKUPカード管理.xlsx, not this file.

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
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "円城環",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/現代：辻切区/円城環",
        "era":  "現代",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "結界系の魔法使い。サブカル系生真面目ひねくれ黒髪美人。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "魔女と亥の子餅",
                            "linkType":  "work",
                            "target":  "魔女と亥の子餅"
                        },
                        {
                            "label":  "クウェス・コンクラーヴェ",
                            "linkType":  "internal",
                            "target":  "05_Places/辻切区/クウェス・コンクラーヴェ"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-enjo-tamaki.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "円城環"
    },
    {
        "enabled":  true,
        "type":  "work",
        "pickupLabel":  "お話",
        "name":  "あけぬ夜はなし",
        "nameLinkType":  "work",
        "nameTarget":  "あけぬ夜はなし",
        "era":  "明治",
        "region":  "神津区",
        "regionTarget":  "02_Locations/神津区",
        "description":  "化物楼・幽凪屋に暮らす美しい女郎夕霧と帽子屋白河の悲恋、という説明をあまり信じない方が。",
        "relatedLabel":  "関連地域・人物",
        "related":  [
                        {
                            "label":  "神津新地",
                            "linkType":  "internal",
                            "target":  "05_Places/神津区/神津新地"
                        },
                        {
                            "label":  "幽凪晴夜",
                            "linkType":  "internal",
                            "target":  "03_Characters/明治/幽凪晴夜"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-akenu-yo-wa-nashi.webp",
        "imagePosition":  "50% 50%",
        "imageAlt":  "あけぬ夜はなし"
    },
    {
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "公理智樹",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/現代：辻切区/公理智樹",
        "era":  "現代",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "煉瓦坂で美容院を営む中途半端に人がいい天然イケメン。幽霊がみえて酒乱。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "雨、落ちる。",
                            "linkType":  "work",
                            "target":  "雨、落ちる。"
                        },
                        {
                            "label":  "ミスティオーラ",
                            "linkType":  "internal",
                            "target":  "05_places/辻切区/ミスティオーラ"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-kouri-tomoki.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "公理智樹"
    },
    {
        "enabled":  true,
        "type":  "place",
        "pickupLabel":  "場所",
        "name":  "高天リゾート",
        "nameLinkType":  "internal",
        "nameTarget":  "05_Places/神津市/高天リゾート",
        "era":  "現代",
        "region":  "高天町",
        "regionTarget":  "05_Places/高天町",
        "description":  "神津市と石燕市にまたがるスキー場に高天スノーリゾートが併設。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "犯人がこの中にいるかどうかはどうでもいい",
                            "linkType":  "work",
                            "target":  "犯人がこの中にいるかどうかはどうでもいい"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-takaten-machi.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "高天リゾート"
    },
    {
        "enabled":  true,
        "type":  "place",
        "pickupLabel":  "場所",
        "name":  "GALLERIA神津",
        "nameLinkType":  "internal",
        "nameTarget":  "05_places/神津区/ガレリア神津",
        "era":  "現代",
        "region":  "神津区",
        "regionTarget":  "02_Locations/神津区",
        "description":  "郊外型大型ショッピングセンター。表示テスト。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "雨、落ちる。（仮）",
                            "linkType":  "work",
                            "target":  "雨、落ちる。"
                        },
                        {
                            "label":  "ラズ・ソラー",
                            "linkType":  "internal",
                            "target":  "05_Places/神津区/ラズ・ソラー"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-galleria-kozu.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "GALLERIA神津"
    },
    {
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "土御門鷹一郎",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/明治/土御門鷹一郎",
        "era":  "明治",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "明治時代の陰陽師。言霊使いなので（因果略）性格が変。人当たりは良し。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "土御門神社",
                            "linkType":  "internal",
                            "target":  "05_places/辻切区/土御門神社"
                        },
                        {
                            "label":  "鎮華春分",
                            "linkType":  "work",
                            "target":  "鎮華春分"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-tsuchimikado-takaichiro.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "土御門鷹一郎"
    },
    {
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "越前梅雨",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/現代：辻切区/越前梅雨",
        "era":  "現代",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "本人ストイックに真面目な人なんだけど、ピアスだらけで誤解されがちな自宅警備員。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "Noapte",
                            "linkType":  "internal",
                            "target":  "05_places/辻切区/Noapte"
                        },
                        {
                            "label":  "あの日見た窓の外側",
                            "linkType":  "work",
                            "target":  "あの日見た窓の外側"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-echizen-tsuyu.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "越前梅雨"
    },
    {
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "ミケ",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/明治/ミケ",
        "era":  "明治",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "とてもおおきなジャコウネコ。ご飯をくれる人はいい人です。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "土御門神社",
                            "linkType":  "internal",
                            "target":  "05_places/辻切区/土御門神社"
                        },
                        {
                            "label":  "猫と狸と狐",
                            "linkType":  "work",
                            "target":  "猫と狸と狐"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-mike.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "ミケ"
    },
    {
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "山菱哲佐",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/明治/山菱哲佐",
        "era":  "明治",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "宵越しの金は全部博打で溶かす人情派。日雇い時々生贄。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "常城門神社",
                            "linkType":  "internal",
                            "target":  "05_places/辻切区/常城門神社"
                        },
                        {
                            "label":  "長屋鳴鬼",
                            "linkType":  "work",
                            "target":  "長屋鳴鬼"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-yamabishi-tessa.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "山菱哲佐"
    },
    {
        "enabled":  true,
        "type":  "place",
        "pickupLabel":  "場所",
        "name":  "煉瓦坂",
        "nameLinkType":  "internal",
        "nameTarget":  "05_Places/辻切区/煉瓦坂",
        "era":  "現代",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "駅に向かう煉瓦舗装の坂の両側には魅力的なお店がいっぱい★",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "辻切区のどこか奇妙なXmas",
                            "linkType":  "work",
                            "target":  "辻切区のどこか奇妙なXmas"
                        },
                        {
                            "label":  "公理智樹",
                            "linkType":  "internal",
                            "target":  "03_Characters/現代：辻切区/公理智樹"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-rengazaka.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "煉瓦坂"
    },
    {
        "enabled":  true,
        "type":  "place",
        "pickupLabel":  "場所",
        "name":  "辻切銀座商店街",
        "nameLinkType":  "internal",
        "nameTarget":  "05_Places/辻切区/辻切銀座商店街",
        "era":  "現代",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "古くからある商店街。毎日のお買い物にどうぞ。お祭りもやってます。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "おかしな事故物件",
                            "linkType":  "work",
                            "target":  "おかしな事故物件"
                        },
                        {
                            "label":  "有限会社倉科不動産",
                            "linkType":  "internal",
                            "target":  "06_organizations/辻切区/有限会社倉科不動産"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-tsujikiri-ginza.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "辻切銀座商店街"
    },
    {
        "enabled":  true,
        "type":  "place",
        "pickupLabel":  "場所",
        "name":  "土御門神社",
        "nameLinkType":  "internal",
        "nameTarget":  "05_Places/辻切区/土御門神社",
        "era":  "現代",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "古くからある地域の神社。人通りは少ないが、神主は騒がしい。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "除霊始めました",
                            "linkType":  "work",
                            "target":  "除霊始めました"
                        },
                        {
                            "label":  "土御門太郎",
                            "linkType":  "internal",
                            "target":  "03_Characters/現代：辻切区/土御門太郎"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-tsuchimikado-jinja.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "土御門神社"
    },
    {
        "enabled":  true,
        "type":  "work",
        "pickupLabel":  "お話",
        "name":  "長屋鳴鬼",
        "nameLinkType":  "work",
        "nameTarget":  "長屋鳴鬼",
        "era":  "明治",
        "region":  "東京",
        "regionTarget":  "05_Places/明治/東京",
        "description":  "なんだか長屋に化物が出るんですって。お駄賃を上げますから見に行ってくれませんか。",
        "relatedLabel":  "関連地域・人物",
        "related":  [
                        {
                            "label":  "土御門鷹一郎",
                            "linkType":  "internal",
                            "target":  "03_Characters/明治/土御門鷹一郎"
                        },
                        {
                            "label":  "アディソン・フラウリー",
                            "linkType":  "internal",
                            "target":  "03_Characters/明治/アディソン・フラウリー"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-nagaya-naki.webp",
        "imagePosition":  "50% 50%",
        "imageAlt":  "長屋鳴鬼"
    },
    {
        "enabled":  true,
        "type":  "work",
        "pickupLabel":  "お話",
        "name":  "落蝉",
        "nameLinkType":  "work",
        "nameTarget":  "落蝉",
        "era":  "大正",
        "region":  "神津区",
        "regionTarget":  "02_Locations/神津区",
        "description":  "橋で死にかけた男を拾った。死ぬところを見たかった。ただそれだけだ。",
        "relatedLabel":  "関連地域・人物",
        "related":  [
                        {
                            "label":  "神津新地",
                            "linkType":  "internal",
                            "target":  "05_Places/神津区/神津新地"
                        },
                        {
                            "label":  "小瀧川緑地歩道",
                            "linkType":  "internal",
                            "target":  "05_Places/神津区/小瀧川緑地歩道"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-ochizemi.webp",
        "imagePosition":  "50% 50%",
        "imageAlt":  "落蝉"
    },
    {
        "enabled":  true,
        "type":  "work",
        "pickupLabel":  "お話",
        "name":  "おかしな事故物件",
        "nameLinkType":  "work",
        "nameTarget":  "おかしな事故物件",
        "era":  "明治",
        "region":  "辻切区",
        "regionTarget":  "02_Locations/辻切区",
        "description":  "最近多いんですよ、事故物件。そろそろ業態を変えないとかなぁ。",
        "relatedLabel":  "関連地域・人物",
        "related":  [
                        {
                            "label":  "辻切銀座商店街",
                            "linkType":  "internal",
                            "target":  "05_Places/辻切区/辻切銀座商店街"
                        },
                        {
                            "label":  "倉科計悟",
                            "linkType":  "internal",
                            "target":  "03_Characters/現代：辻切区/倉科計悟"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-okashina-jikobukken.webp",
        "imagePosition":  "50% 50%",
        "imageAlt":  "おかしな事故物件"
    },
    {
        "enabled":  true,
        "type":  "work",
        "pickupLabel":  "お話",
        "name":  "春崎夜道の『夜散歩』：神津スカイタワー",
        "nameLinkType":  "work",
        "nameTarget":  "春崎夜道の『夜散歩』：神津スカイタワー",
        "era":  "明治",
        "region":  "神津区",
        "regionTarget":  "02_Locations/神津区",
        "description":  "FM神津火曜24時30分からは『春崎夜道の夜散歩』。怖い町の噂まってるよ！",
        "relatedLabel":  "関連地域・人物",
        "related":  [
                        {
                            "label":  "古屋敷夜道",
                            "linkType":  "internal",
                            "target":  "03_Characters/現代：神津区/古屋敷夜道"
                        },
                        {
                            "label":  "FM神津",
                            "linkType":  "internal",
                            "target":  "06_Organization/神津区/FM神津"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-yoru-sanpo.webp",
        "imagePosition":  "50% 50%",
        "imageAlt":  "春崎夜道の『夜散歩』：神津スカイタワー"
    },
    {
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "リューラン・マオ",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/大正/リューラン・マオ",
        "era":  "明治",
        "region":  "神津区",
        "regionTarget":  "02_Locations/神津区",
        "description":  "あたしにあるのは情報だけ。なのに面倒なことに巻き込まれちゃったわ。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "呪法八天閣",
                            "linkType":  "internal",
                            "target":  "06_Organization/神津区/呪法八天閣"
                        },
                        {
                            "label":  "阿文",
                            "linkType":  "internal",
                            "target":  "03_Characters/大正/阿文"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-ryuran-mao.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "リューラン・マオ"
    },
    {
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "アンニカ・コルホネン",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/大正/アンニカ・コルホネン",
        "era":  "明治",
        "region":  "神津区",
        "regionTarget":  "02_Locations/神津区",
        "description":  "神様がみんなを天国に連れて行ってくれる。そうじゃなければ私は……。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "端照島",
                            "linkType":  "internal",
                            "target":  "05_Places/港湾区/端照島"
                        },
                        {
                            "label":  "オーサ・フラウリー",
                            "linkType":  "internal",
                            "target":  "03_Characters/大正/オーサ・フラウリー"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-annika-korhonen.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "アンニカ・コルホネン"
    },
    {
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "常世暁路",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/大正/常世暁路",
        "era":  "明治",
        "region":  "神津区",
        "regionTarget":  "02_Locations/神津区",
        "description":  "全ては儘ならない、自らの事ですら。",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "幽凪晴夜",
                            "linkType":  "internal",
                            "target":  "03_Characters/明治/幽凪晴夜"
                        },
                        {
                            "label":  "常世座",
                            "linkType":  "internal",
                            "target":  "06_Organization/神津区/常世座"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-tokoyo-akeji.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "常世暁路"
    },
    {
        "enabled":  true,
        "type":  "character",
        "pickupLabel":  "登場人物",
        "name":  "常世宵路",
        "nameLinkType":  "internal",
        "nameTarget":  "03_Characters/大正/常世宵路",
        "era":  "明治",
        "region":  "神津区",
        "regionTarget":  "02_Locations/神津区",
        "description":  "「御通行中の皆さまァ、御用と御急ぎのない方は是非ッ、化け物どもをご覧にお立ち寄りになりましてェ」",
        "relatedLabel":  "登場小説・場所",
        "related":  [
                        {
                            "label":  "石影朔太郎",
                            "linkType":  "internal",
                            "target":  "03_Characters/大正/石影朔太郎"
                        },
                        {
                            "label":  "義郷東司",
                            "linkType":  "internal",
                            "target":  "03_Characters/明治/義郷東司"
                        }
                    ],
        "relatedSuffix":  "他",
        "image":  "media/pickup/preview-tokoyo-yoiji.webp",
        "imagePosition":  "50% 40%",
        "imageAlt":  "常世宵路"
    }
]
export const pickupBackgrounds = Array.from(
  { length: 10 },
  (_, index) => `pickup-bg-${String(index + 1).padStart(2, "0")}.webp`,
)