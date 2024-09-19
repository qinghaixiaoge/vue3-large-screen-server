const express = require("express")
const cors = require("cors")
const { expressjwt } = require("express-jwt")
const jwt = require("jsonwebtoken")
const app = express()
const router = express.Router()

// 存放注销用户的token
const set = new Set()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(expressjwt({
    secret: "qinghaixiaoyu-Doy",
    algorithms: ["HS256"],
    getToken: (req) => {
        if (req.headers.token) {
            return req.headers.token;
        }
        return null; // 如果没有 token，返回 null
    },
}).unless(
    {
        path: [
            { url: "/login", method: ["POST"] },
            { url: "/whomai", method: ["GET"] },
            { url: "/logout", method: ["GET"] }
        ]
    }
))

app.use((req, res, next) => {
    if (req.method === "options") {
        next()
        return
    }
    const token = req.headers.token
    if (token && set.has(token)) {
        next(new Error("token已注销"))
        return
    }
    next()
})

router.post("/login", (req, res, next) => {
    const { loginId, loginPwd } = req.body
    if (loginId === "admin" && loginPwd === "123456") {
        // 一天有效期
        const token = jwt.sign({ loginId }, "qinghaixiaoyu-Doy", { expiresIn: 60 * 60 * 24 })
        res.send({
            code: true, msg: null, data: {
                loginId,
                token
            }
        })
        return
    }
    next(new Error("账号或密码错误"))
})

router.get("/whomai", (req, res, next) => {
    const token = req.headers.token
    jwt.verify(token, "qinghaixiaoyu-Doy", (err, decode) => {
        if (err) {
            next(err)
        } else {
            res.send({ code: true, msg: null, data: decode })
        }
    })

})
// 过期的验证返回值【抛出异常】  错误token的验证返回值【抛出异常】
router.get("/logout", (req, res, next) => {
    const token = req.headers.token
    if (token && jwt.verify(token, "qinghaixiaoyu-Doy")) {
        set.add(token)
    }
    res.send({ code: true, msg: null, data: "token注销成功" })
})

// 获取hot图信息
router.get("/getHot", (req, res, next) => {
    res.send({ code: true, msg: null, data: [
        {
            "children": [
                {
                    "children": [
                        {
                            "name": "短裙",
                            "value": "100"
                        },
                        {
                            "name": "丝袜短裙",
                            "value": "150"
                        },
                        {
                            "name": "黑丝短裙",
                            "value": "50"
                        }
                    ],
                    "name": "裙装",
                    "value": "300"
                },
                {
                    "children": [
                        {
                            "name": "汗衫",
                            "value": "20"
                        },
                        {
                            "name": "棉毛衫",
                            "value": "150"
                        },
                        {
                            "name": "T恤衫",
                            "value": "130"
                        }
                    ],
                    "name": "女士上衣",
                    "value": "300"
                },
                {
                    "children": [
                        {
                            "name": "短丝袜",
                            "value": "200"
                        },
                        {
                            "name": "中筒丝袜",
                            "value": "150"
                        },
                        {
                            "name": "长筒丝袜",
                            "value": "100"
                        }
                    ],
                    "name": "丝袜",
                    "value": "450"
                },
                {
                    "children": [
                        {
                            "name": "肚兜",
                            "value": "40"
                        },
                        {
                            "name": "抹胸",
                            "value": "250"
                        },
                        {
                            "name": "胸罩",
                            "value": "200"
                        }
                    ],
                    "name": "内衣",
                    "value": "490"
                },
                {
                    "children": [
                        {
                            "name": "提臀薄绒瑜伽裤",
                            "value": "400"
                        },
                        {
                            "name": "紧身裤轻薄瑜伽空气裤",
                            "value": "500"
                        },
                        {
                            "name": "高腰液提拉提臀细腿高弹瑜伽裤",
                            "value": "200"
                        }
                    ],
                    "name": "瑜伽裤",
                    "value": "1100"
                },
                {
                    "children": [
                        {
                            "name": "提拉紧身裤",
                            "value": "400"
                        },
                        {
                            "name": "牛仔紧身裤",
                            "value": "100"
                        },
                        {
                            "name": "超短紧身裤",
                            "value": "200"
                        }
                    ],
                    "name": "紧身裤",
                    "value": "700"
                }
            ],
            "name": "女装"
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "name": "手机1",
                            "value": "100"
                        },
                        {
                            "name": "手机2",
                            "value": "150"
                        },
                        {
                            "name": "手机3",
                            "value": "500"
                        }
                    ],
                    "name": "手机",
                    "value": "750"
                },
                {
                    "children": [
                        {
                            "name": "手机配件1",
                            "value": "200"
                        },
                        {
                            "name": "手机配件2",
                            "value": "150"
                        },
                        {
                            "name": "手机配件3",
                            "value": "130"
                        }
                    ],
                    "name": "手机配件",
                    "value": "480"
                },
                {
                    "children": [
                        {
                            "name": "摄影摄像1",
                            "value": "400"
                        },
                        {
                            "name": "摄影摄像2",
                            "value": "150"
                        },
                        {
                            "name": "摄影摄像3",
                            "value": "100"
                        }
                    ],
                    "name": "摄影摄像",
                    "value": "650"
                },
                {
                    "children": [
                        {
                            "name": "影像娱乐1",
                            "value": "400"
                        },
                        {
                            "name": "影像娱乐2",
                            "value": "250"
                        },
                        {
                            "name": "影像娱乐3",
                            "value": "200"
                        }
                    ],
                    "name": "影像娱乐",
                    "value": "850"
                },
                {
                    "children": [
                        {
                            "name": "数码配件1",
                            "value": "400"
                        },
                        {
                            "name": "数码配件2",
                            "value": "500"
                        },
                        {
                            "name": "数码配件3",
                            "value": "200"
                        }
                    ],
                    "name": "瑜伽裤",
                    "value": "1100"
                },
                {
                    "children": [
                        {
                            "name": "智能设备1",
                            "value": "400"
                        },
                        {
                            "name": "智能设备2",
                            "value": "100"
                        },
                        {
                            "name": "智能设备3",
                            "value": "200"
                        }
                    ],
                    "name": "智能设备",
                    "value": "700"
                },
                {
                    "children": [
                        {
                            "name": "运营商",
                            "value": "400"
                        },
                        {
                            "name": "电子教育",
                            "value": "100"
                        }
                    ],
                    "name": "其他",
                    "value": "500"
                }
            ],
            "name": "手机数码"
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "name": "面部护肤1",
                            "value": "100"
                        },
                        {
                            "name": "面部护肤2",
                            "value": "150"
                        },
                        {
                            "name": "面部护肤3",
                            "value": "400"
                        }
                    ],
                    "name": "面部护肤",
                    "value": "650"
                },
                {
                    "children": [
                        {
                            "name": "彩妆1",
                            "value": "200"
                        },
                        {
                            "name": "彩妆2",
                            "value": "150"
                        },
                        {
                            "name": "彩妆3",
                            "value": "230"
                        }
                    ],
                    "name": "彩妆",
                    "value": "580"
                },
                {
                    "children": [
                        {
                            "name": "男士护肤1",
                            "value": "400"
                        },
                        {
                            "name": "男士护肤2",
                            "value": "150"
                        },
                        {
                            "name": "男士护肤3",
                            "value": "200"
                        }
                    ],
                    "name": "男士护肤",
                    "value": "750"
                },
                {
                    "children": [
                        {
                            "name": "美妆工具1",
                            "value": "400"
                        },
                        {
                            "name": "美妆工具2",
                            "value": "250"
                        },
                        {
                            "name": "美妆工具3",
                            "value": "1000"
                        }
                    ],
                    "name": "美妆工具",
                    "value": "1650"
                },
                {
                    "children": [
                        {
                            "name": "香水",
                            "value": "300"
                        },
                        {
                            "name": "当季主推",
                            "value": "200"
                        }
                    ],
                    "name": "瑜伽裤",
                    "value": "500"
                }
            ],
            "name": "美妆护肤"
        }
    ] })
})

router.get("/getRank", (req, res,next) => {
    res.send({code:true,msg:null,data:[
        {
            "name": "广东",
            "value": 230
        },
        {
            "name": "福建",
            "value": 214
        },
        {
            "name": "浙江",
            "value": 203
        },
        {
            "name": "上海",
            "value": 310
        },
        {
            "name": "北京",
            "value": 289
        },
        {
            "name": "江苏",
            "value": 207
        },
        {
            "name": "四川",
            "value": 189
        },
        {
            "name": "重庆",
            "value": 195
        },
        {
            "name": "陕西",
            "value": 160
        },
        {
            "name": "湖南",
            "value": 140
        },
        {
            "name": "河北",
            "value": 170
        },
        {
            "name": "辽宁",
            "value": 106
        },
        {
            "name": "湖北",
            "value": 120
        },
        {
            "name": "江西",
            "value": 99
        },
        {
            "name": "天津",
            "value": 107
        },
        {
            "name": "吉林",
            "value": 143
        },
        {
            "name": "青海",
            "value": 65
        },
        {
            "name": "山东",
            "value": 166
        },
        {
            "name": "山西",
            "value": 134
        },
        {
            "name": "云南",
            "value": 87
        },
        {
            "name": "安徽",
            "value": 79
        }
    ]})
})

router.get("/getMap",(req,res,next)=>{
    res.send({code:true,msg:null,data:[
        {
            "name": "黄金用户",
            "children": [
                {
                    "name": "武汉",
                    "value": [114.31, 30.52]
                }, {
                    "name": "丹东",
                    "value": [124.37, 40.13]
                }, {
                    "name": "张家口",
                    "value": [114.87, 40.82]
                }, {
                    "name": "深圳",
                    "value": [114.07, 22.62]
                }
            ]
        },
        {
            "name": "白金用户",
            "children": [
                {
                    "name": "金华",
                    "value": [119.64, 29.12]
                }, {
                    "name": "西安",
                    "value": [108.95, 34.27]
                }
            ]
        },
        {
            "name": "砖石用户",
            "children": [
                {
                    "name": "成都",
                    "value": [104.06, 30.67]
                }
            ]
        }
    ]})
})

router.get("/getChina",(req,res,next)=>{
    res.send({code:true,msg:null,data:{
        "type": "FeatureCollection",
        "features": [
            {
                "id": "710000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@°Ü¯Û"
                        ],
                        [
                            "@@ƛĴÕƊÉɼģºðʀ\\ƎsÆNŌÔĚänÜƤɊĂǀĆĴĤǊŨxĚĮǂƺòƌâÔ®ĮXŦţƸZûÐƕƑGđ¨ĭMó·ęcëƝɉlÝƯֹÅŃ^Ó·śŃǋƏďíåɛGɉ¿@ăƑ¥ĘWǬÏĶŁâ"
                        ],
                        [
                            "@@\\p|WoYG¿¥Ij@¢"
                        ],
                        [
                            "@@¡@V^RqBbAnTXeRz¤L«³I"
                        ],
                        [
                            "@@ÆEEkWqë @"
                        ],
                        [
                            "@@fced"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                122886,
                                24033
                            ]
                        ],
                        [
                            [
                                123335,
                                22980
                            ]
                        ],
                        [
                            [
                                122375,
                                24193
                            ]
                        ],
                        [
                            [
                                122518,
                                24117
                            ]
                        ],
                        [
                            [
                                124427,
                                22618
                            ]
                        ],
                        [
                            [
                                124862,
                                26043
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        121.509062,
                        25.044332
                    ],
                    "name": "台湾",
                    "childNum": 6
                }
            },
            {
                "id": "130000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@o~Z]ªrºc_ħ²G¼s`jÎŸnüsÂłNX_M`Ç½ÓnUKĜēs¤­©yrý§uģcJe"
                        ],
                        [
                            "@@U`Ts¿mÂ"
                        ],
                        [
                            "@@oºƋÄdeVDJj£J|ÅdzÂFt~KŨ¸IÆv|¢r}èonb}`RÎÄn°ÒdÞ²^®lnÐèĄlðÓ×]ªÆ}LiĂ±Ö`^°Ç¶p®đDcŋ`ZÔ¶êqvFÆN®ĆTH®¦O¾IbÐã´BĐɢŴÆíȦpĐÞXR·nndO¤OÀĈƒ­QgµFo|gȒęSWb©osx|hYhgŃfmÖĩnºTÌSp¢dYĤ¶UĈjlǐpäìë|³kÛfw²Xjz~ÂqbTÑěŨ@|oMzv¢ZrÃVw¬ŧĖ¸f°ÐTªqs{S¯r æÝlNd®²Ğ ǆiGĘJ¼lr}~K¨ŸƐÌWöÆzR¤lêmĞLÎ@¡|q]SvKÑcwpÏÏĿćènĪWlĄkT}J¤~ÈTdpddʾĬBVtEÀ¢ôPĎƗè@~kü\\rÊĔÖæW_§¼F´©òDòjYÈrbĞāøŀG{ƀ|¦ðrb|ÀH`pʞkvGpuARhÞÆǶgĘTǼƹS£¨¡ù³ŘÍ]¿ÂyôEP xX¶¹ÜO¡gÚ¡IwÃé¦ÅBÏ|Ç°N«úmH¯âDùyŜŲIÄuĐ¨D¸dɂFOhđ©OiÃ`ww^ÌkÑH«ƇǤŗĺtFu{Z}Ö@U´ʚLg®¯Oı°Ãw ^VbÉsmAê]]w§RRl£ȭµu¯b{ÍDěïÿȧuT£ġěŗƃĝQ¨fVƋƅn­a@³@ďyÃ½IĹÊKŭfċŰóxV@tƯJ]eR¾fe|rHA|h~Ėƍl§ÏlTíb ØoÅbbx³^zÃĶ¶Sj®AyÂhðk`«PËµEFÛ¬Y¨Ļrõqi¼Wi°§Ð±´°^[À|ĠO@ÆxO\\ta\\tĕtû{ġȧXýĪÓjùÎRb^ÎfK[ÝděYfíÙTyuUSyŌŏů@Oi½éŅ­aVcř§ax¹XŻácWU£ôãºQ¨÷Ñws¥qEHÙ|šYQoŕÇyáĂ£MÃ°oťÊP¡mWO¡v{ôvîēÜISpÌhp¨ jdeŔQÖjX³àĈ[n`Yp@UcM`RKhEbpŞlNut®EtqnsÁgAiúoHqCXhfgu~ÏWP½¢G^}¯ÅīGCÑ^ãziMáļMTÃƘrMc|O_¯Ŏ´|morDkO\\mĆJfl@cĢ¬¢aĦtRıÒ¾ùƀ^juųœK­UFyƝīÛ÷ąV×qƥV¿aȉd³BqPBmaËđŻģmÅ®V¹d^KKonYg¯XhqaLdu¥Ípǅ¡KąÅkĝęěhq}HyÃ]¹ǧ£Í÷¿qáµ§g¤o^á¾ZE¤i`ĳ{nOl»WÝĔįhgF[¿¡ßkOüš_ūiǱàUtėGyl}ÓM}jpEC~¡FtoQiHkk{Ãmï"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                119712,
                                40641
                            ]
                        ],
                        [
                            [
                                121616,
                                39981
                            ]
                        ],
                        [
                            [
                                116462,
                                37237
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        114.502461,
                        38.045474
                    ],
                    "name": "河北",
                    "childNum": 3
                }
            },
            {
                "id": "140000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@ÞĩÒSra}ÁyWix±Üe´lèßÓǏokćiµVZģ¡coTSË¹ĪmnÕńehZg{gtwªpXaĚThȑp{¶Eh®RćƑP¿£Pmc¸mQÝWďȥoÅîɡųAďä³aÏJ½¥PG­ąSM­EÅruµéYÓŌ_dĒCo­Èµ]¯_²ÕjāK~©ÅØ^ÔkïçămÏk]­±cÝ¯ÑÃmQÍ~_apm~ç¡qu{JÅŧ·Ls}EyÁÆcI{¤IiCfUcƌÃp§]ě«vD@¡SÀµMÅwuYY¡DbÑc¡h×]nkoQdaMç~eDÛtT©±@¥ù@É¡ZcW|WqOJmĩl«ħşvOÓ«IqăV¥D[mI~Ó¢cehiÍ]Ɠ~ĥqX·eƷn±}v[ěďŕ]_œ`¹§ÕōIo©b­s^}Ét±ū«³p£ÿ·Wµ|¡¥ăFÏs×¥ŅxÊdÒ{ºvĴÎêÌɊ²¶ü¨|ÞƸµȲLLúÉƎ¤ϊęĔV`_bªS^|dzY|dz¥pZbÆ£¶ÒK}tĦÔņƠPYznÍvX¶Ěn ĠÔzý¦ª÷ÑĸÙUȌ¸dòÜJð´ìúNM¬XZ´¤ŊǸ_tldI{¦ƀðĠȤ¥NehXnYGR° ƬDj¬¸|CĞKqºfƐiĺ©ª~ĆOQª ¤@ìǦɌ²æBÊTŸʂōĖĴŞȀÆÿȄlŤĒötÎ½î¼ĨXh|ªM¤Ðz"
                    ],
                    "encodeOffsets": [
                        [
                            116874,
                            41716
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        112.549248,
                        37.857014
                    ],
                    "name": "山西",
                    "childNum": 1
                }
            },
            {
                "id": "150000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@Č^â£ĂhĖMÈÄw\\fŦ°W ¢¾luŸDw\\̀ʉÌÛMĀ[bÓEn}¶Vcês¯PqFB|S³C|kñHdiÄ¥sŉÅPóÑÑE^ÅPpy_YtShQ·aHwsOnŉÃs©iqjUSiº]ïW«gW¡ARëśĳĘů`çõh]y»ǃǛҤxÒm~zf}pf|ÜroÈzrKÈĵSƧż؜Ġu¦ö"
                        ],
                        [
                            "@@sKCGS|úþXgp{ÁX¿ć{ƱȏñZáĔyoÁhA}ŅĆfdŉ_¹Y°ėǩÑ¡H¯¶oMQqð¡Ë|Ñ`ƭŁX½·óÛxğįÅcQs«tȋǅFù^it«Č¯[hAi©á¥ÇĚ×l|¹y¯YȵƓñǙµïċĻ|Düȭ¶¡oŽäÕG\\ÄT¿Òõr¯LguÏYęRƩɷŌO\\İÐ¢æ^Ŋ ĲȶȆbÜGĝ¬¿ĚVĎgª^íu½jÿĕęjık@Ľ]ėl¥ËĭûÁėéV©±ćn©­ȇÍq¯½YÃÔŉÉNÑÅÝy¹NqáʅDǡËñ­ƁYÅy̱os§ȋµʽǘǏƬɱàưN¢ƔÊuľýľώȪƺɂļxZĈ}ÌŉŪĺœĭFЛĽ̅ȣͽÒŵìƩÇϋÿȮǡŏçƑůĕ~Ç¼ȳÐUfdIxÿ\\G zâɏÙOº·pqy£@qþ@Ǟ˽IBäƣzsÂZÁàĻdñ°ŕzéØűzșCìDȐĴĺf®Àľưø@ɜÖÞKĊŇƄ§͑těï͡VAġÑÑ»d³öǍÝXĉĕÖ{þĉu¸ËʅğU̎éhɹƆ̗̮ȘǊ֥ड़ࡰţાíϲäʮW¬®ҌeרūȠkɬɻ̼ãüfƠSצɩςåȈHϚÎKǳͲOðÏȆƘ¼CϚǚ࢚˼ФÔ¤ƌĞ̪Qʤ´¼mȠJˀƲÀɠmǐnǔĎȆÞǠN~ʢĜ¶ƌĆĘźʆȬ˪ĚĒ¸ĞGȖƴƀj`ĢçĶāàŃºēĢĖćYÀŎüôQÐÂŎŞǆŞêƖoˆDĤÕºÑǘÛˤ³̀gńƘĔÀ^ªƂ`ªt¾äƚêĦĀ¼ÐĔǎ¨Ȕ»͠^ˮÊȦƤøxRrŜH¤¸ÂxDÄ|ø˂˜ƮÐ¬ɚwɲFjĔ²Äw°ǆdÀÉ_ĸdîàŎjÊêTĞªŌŜWÈ|tqĢUB~´°ÎFCU¼pĀēƄN¦¾O¶łKĊOjĚj´ĜYp{¦SĚÍ\\T×ªV÷Ší¨ÅDK°ßtŇĔK¨ǵÂcḷ̌ĚǣȄĽFlġUĵŇȣFʉɁMğįʏƶɷØŭOǽ«ƽū¹Ʊő̝Ȩ§ȞʘĖiɜɶʦ}¨֪ࠜ̀ƇǬ¹ǨE˦ĥªÔêFxúQEr´Wrh¤Ɛ \\talĈDJÜ|[Pll̚¸ƎGú´P¬W¦^¦H]prRn|or¾wLVnÇIujkmon£cX^Bh`¥V¦U¤¸}xRj[^xN[~ªxQ[`ªHÆÂExx^wN¶Ê|¨ìMrdYpoRzNyÀDs~bcfÌ`L¾n|¾T°c¨È¢ar¤`[|òDŞĔöxElÖdHÀI`Ď\\Àì~ÆR¼tf¦^¢ķ¶eÐÚMptgjɡČÅyġLûŇV®ÄÈƀĎ°P|ªVVªj¬ĚÒêp¬E|ŬÂc|ÀtƐK f{ĘFĒƌXƲąo½Ę\\¥o}Ûu£ç­kX{uĩ«āíÓUŅßŢqŤ¥lyň[oi{¦LńðFȪȖĒL¿Ìf£K£ʺoqNwğc`uetOj×°KJ±qÆġmĚŗos¬qehqsuH{¸kH¡ÊRǪÇƌbȆ¢´äÜ¢NìÉʖ¦â©Ż؛Ç@Vu»Aylßí¹ĵêÝlISò³C¹Ìâ²i¶Ìoú^H²CǜңǄ z¼g^èöŰ_Ĳĕê}gÁnUI«m]jvV¼euhwqAaW_µj»çjioQR¹ēÃßt@r³[ÛlćË^ÍÉáGOUÛOB±XkÅ¹£k|e]olkVÍ¼ÕqtaÏõjgÁ£§U^RLËnX°ÇBz^~wfvypV ¯ƫĉ˭ȫƗŷɿÿĿƑ˃ĝÿÃǃßËőó©ǐȍŒĖM×ÍEyxþp]ÉvïèvƀnÂĴÖ@V~Ĉ³MEĸÅĖtējyÄDXÄxGQuv_i¦aBçw˛wD©{tāmQ{EJ§KPśƘƿ¥@sCTÉ}ɃwƇy±gÑ}T[÷kÐç¦«SÒ¥¸ëBX½HáÅµÀğtSÝÂa[ƣ°¯¦Pï¡]£ġÒk®G²èQ°óMq}EóƐÇ\\@áügQÍu¥FTÕ¿Jû]|mvāÎYua^WoÀa·­ząÒot×¶CLƗi¯¤mƎHǊ¤îìɾŊìTdåwsRÖgĒųúÍġäÕ}Q¶¿A[¡{d×uQAMxVvMOmăl«ct[wº_ÇÊjbÂ£ĦS_éQZ_lwgOiýe`YYLq§IÁǳ£ÙË[ÕªuƏ³ÍTs·bÁĽäė[b[ŗfãcn¥îC¿÷µ[ŏÀQ­ōĉm¿Á^£mJVmL[{Ï_£F¥Ö{ŹA}×Wu©ÅaųĳƳhB{·TQqÙIķËZđ©Yc|M¡LeVUóK_QWk_ĥ¿ãZ»X\\ĴuUèlG®ěłTĠğDŃOrÍdÆÍz]±ŭ©Å]ÅÐ}UË¥©TċïxgckfWgi\\ÏĒ¥HkµEë{»ÏetcG±ahUiñiWsɁ·cCÕk]wȑ|ća}wVaĚá G°ùnM¬¯{ÈÐÆA¥ÄêJxÙ¢hP¢ÛºµwWOóFÁz^ÀŗÎú´§¢T¤ǻƺSėǵhÝÅQgvBHouʝl_o¿Ga{ïq{¥|ſĿHĂ÷aĝÇqZñiñC³ª»E`¨åXēÕqÉû[l}ç@čƘóO¿¡FUsAʽīccocÇS}£IS~ălkĩXçmĈŀÐoÐdxÒuL^T{r@¢ÍĝKén£kQyÅõËXŷƏL§~}kq»IHėǅjĝ»ÑÞoå°qTt|r©ÏS¯·eŨĕx«È[eM¿yupN~¹ÏyN£{©għWí»Í¾səšǅ_ÃĀɗ±ąĳĉʍŌŷSÉA±åǥɋ@ë£R©ąP©}ĹªƏj¹erLDĝ·{i«ƫC£µ"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                127444,
                                52594
                            ]
                        ],
                        [
                            [
                                113793,
                                40312
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        111.670801,
                        40.818311
                    ],
                    "name": "内蒙古",
                    "childNum": 2
                }
            },
            {
                "id": "210000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@L@@sa"
                        ],
                        [
                            "@@MnNm"
                        ],
                        [
                            "@@dc"
                        ],
                        [
                            "@@eÀC@b"
                        ],
                        [
                            "@@fXwkbrÄ`qg"
                        ],
                        [
                            "@@^jtWQ"
                        ],
                        [
                            "@@~ Y]c"
                        ],
                        [
                            "@@G`ĔN^_¿ZÃM"
                        ],
                        [
                            "@@iX¶BY"
                        ],
                        [
                            "@@YZ"
                        ],
                        [
                            "@@L_{Epf"
                        ],
                        [
                            "@@^WqCT\\"
                        ],
                        [
                            "@@\\[§t|¤_"
                        ],
                        [
                            "@@m`n_"
                        ],
                        [
                            "@@Ïxǌ{q_×^Giip"
                        ],
                        [
                            "@@@é^BntaÊU]x ¯ÄPĲ­°hʙK³VÕ@Y~|EvĹsÇ¦­L^pÃ²ŸÒG Ël]xxÄ_fT¤Ď¤cPC¨¸TVjbgH²sdÎdHt`B²¬GJję¶[ÐhjeXdlwhðSČ¦ªVÊÏÆZÆŶ®²^ÎyÅÎcPqńĚDMħĜŁH­kçvV[ĳ¼WYÀäĦ`XlR`ôLUVfK¢{NZdĒªYĸÌÚJRr¸SA|ƴgŴĴÆbvªØX~źB|¦ÕE¤Ð`\\|KUnnI]¤ÀÂĊnŎR®Ő¿¶\\ÀøíDm¦ÎbŨabaĘ\\ľãÂ¸atÎSƐ´©v\\ÖÚÌǴ¤Â¨JKrZ_ZfjþhPkx`YRIjJcVf~sCN¤ EhæmsHy¨SðÑÌ\\\\ĐRZk°IS§fqŒßýáĞÙÉÖ[^¯ǤŲê´\\¦¬ĆPM¯£»uïpùzExanµyoluqe¦W^£ÊL}ñrkqWňûPUP¡ôJoo·U}£[·¨@XĸDXm­ÛÝºGUCÁª½{íĂ^cjk¶Ã[q¤LÉö³cux«zZf²BWÇ®Yß½ve±ÃCý£W{Ú^q^sÑ·¨ÍOt¹·C¥GDrí@wÕKţÃ«V·i}xËÍ÷i©ĝɝǡ]{c±OW³Ya±_ç©HĕoƫŇqr³Lys[ñ³¯OSďOMisZ±ÅFC¥Pq{Ã[Pg}\\¿ghćOk^ģÁFıĉĥM­oEqqZûěŉ³F¦oĵhÕP{¯~TÍlªNßYÐ{Ps{ÃVUeĎwk±ŉVÓ½ŽJãÇÇ»Jm°dhcÀffdF~ĀeĖd`sx² ®EżĀdQÂd^~ăÔH¦\\LKpĄVez¤NP ǹÓRÆąJSh­a[¦´ÂghwmBÐ¨źhI|VV|p] Â¼èNä¶ÜBÖ¼L`¼bØæKVpoúNZÞÒKxpw|ÊEMnzEQIZZNBčÚFÜçmĩWĪñtÞĵÇñZ«uD±|Əlĳ¥ãn·±PmÍada CLǑkùó¡³Ï«QaċÏOÃ¥ÕđQȥċƭy³ÃA"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                123686,
                                41445
                            ]
                        ],
                        [
                            [
                                126019,
                                40435
                            ]
                        ],
                        [
                            [
                                124393,
                                40128
                            ]
                        ],
                        [
                            [
                                126117,
                                39963
                            ]
                        ],
                        [
                            [
                                125322,
                                40140
                            ]
                        ],
                        [
                            [
                                126686,
                                40700
                            ]
                        ],
                        [
                            [
                                126041,
                                40374
                            ]
                        ],
                        [
                            [
                                125584,
                                40168
                            ]
                        ],
                        [
                            [
                                125453,
                                40165
                            ]
                        ],
                        [
                            [
                                125362,
                                40214
                            ]
                        ],
                        [
                            [
                                125280,
                                40291
                            ]
                        ],
                        [
                            [
                                125774,
                                39997
                            ]
                        ],
                        [
                            [
                                125976,
                                40496
                            ]
                        ],
                        [
                            [
                                125822,
                                39993
                            ]
                        ],
                        [
                            [
                                125509,
                                40217
                            ]
                        ],
                        [
                            [
                                122731,
                                40949
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        123.429096,
                        41.796767
                    ],
                    "name": "辽宁",
                    "childNum": 16
                }
            },
            {
                "id": "220000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@pä³PClFbbÍzwBGĭZÅi»lY­ċ²SgkÇ£^Sqd¯R©é£¯S\\cZ¹iűƏCuƍÓXoR}M^o£R}oªU­FuuXHlEÅÏ©¤ÛmTþ¤D²ÄufàÀ­XXÈ±AeyYw¬dvõ´KÊ£\\rµÄlidā]|î©¾DÂVH¹Þ®ÜWnCķ W§@\\¸~¤Vp¸póIO¢VOŇürXql~òÉK]¤¥Xrfkvzpm¶bwyFoúvð¼¤ N°ąO¥«³[éǡű_°Õ\\ÚÊĝþâőàerR¨­JYlďQ[ ÏYëÐ§TGztnß¡gFkMāGÁ¤ia ÉÈ¹`\\xs¬dĆkNnuNUuP@vRY¾\\¢GªóĄ~RãÖÎĢùđŴÕhQxtcæëSɽŉíëǉ£ƍG£nj°KƘµDsØÑpyĆ¸®¿bXp]vbÍZuĂ{n^IüÀSÖ¦EvRÎûh@â[ƏÈô~FNr¯ôçR±­HÑlĢ^¤¢OðævxsŒ]ÞÁTĠs¶¿âÆGW¾ìA¦·TÑ¬è¥ÏÐJ¨¼ÒÖ¼ƦɄxÊ~StD@Ă¼Ŵ¡jlºWvÐzƦZÐ²CH AxiukdGgetqmcÛ£Ozy¥cE}|¾cZk¿uŐã[oxGikfeäT@SUwpiÚFM©£è^Ú`@v¶eňf heP¶täOlÃUgÞzŸU`l}ÔÆUvØ_Ō¬Öi^ĉi§²ÃB~¡ĈÚEgc|DC_Ȧm²rBx¼MÔ¦ŮdĨÃâYxƘDVÇĺĿg¿cwÅ\\¹¥Yĭl¤OvLjM_a W`zļMž·\\swqÝSAqŚĳ¯°kRē°wx^ĐkǂÒ\\]nrĂ}²ĊŲÒøãh·M{yMzysěnĒġV·°G³¼XÀ¤¹i´o¤ŃÈ`ÌǲÄUĞd\\iÖmÈBĤÜɲDEh LG¾ƀÄ¾{WaYÍÈĢĘÔRîĐj}ÇccjoUb½{h§Ǿ{KƖµÎ÷GĀÖŠåưÎs­lyiē«`å§H¥Ae^§GK}iã\\c]v©ģZmÃ|[M}ģTɟĵÂÂ`ÀçmFK¥ÚíÁbX³ÌQÒHof{]ept·GŋĜYünĎųVY^ydõkÅZW«WUa~U·SbwGçǑiW^qFuNĝ·EwUtW·Ýďæ©PuqEzwAVXRãQ`­©GMehccďÏd©ÑW_ÏYƅ»é\\ɹ~ǙG³mØ©BšuT§Ĥ½¢Ã_Ã½L¡ýqT^rme\\PpZZbyuybQefµ]UhĿDCmûvaÙNSkCwncćfv~YÇG"
                    ],
                    "encodeOffsets": [
                        [
                            130196,
                            42528
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        125.3245,
                        43.886841
                    ],
                    "name": "吉林",
                    "childNum": 1
                }
            },
            {
                "id": "230000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@ƨĶTLÇyqpÇÛqe{~oyen}s`qiXGù]Ëp½©lÉÁp]Þñ´FĂ^fäîºkàz¼BUvÈ@"
                        ],
                        [
                            "@@UµNÿ¥īèçHÍøƕ¶Lǽ|g¨|a¾pVidd~ÈiíďÓQġėÇZÎXb½|ſÃH½KFgɱCģÛÇAnjÕc[VĝǱÃËÇ_ £ń³pj£º¿»WH´¯U¸đĢmtĜyzzNN|g¸÷äűÑ±ĉā~mq^[ǁÑďlw]¯xQĔ¯l°řĴrBÞTxr[tŽ¸ĻN_yX`biNKuP£kZĮ¦[ºxÆÀdhĹŀUÈƗCwáZħÄŭcÓ¥»NAw±qȥnD`{ChdÙFć}¢A±Äj¨]ĊÕjŋ«×`VuÓÅ~_kŷVÝyhVkÄãPsOµfgeŇµf@u_Ù ÙcªNªÙEojVxT@ãSefjlwH\\pŏäÀvlY½d{F~¦dyz¤PÜndsrhfHcvlwjF£G±DÏƥYyÏu¹XikĿ¦ÏqƗǀOŜ¨LI|FRĂn sª|C˜zxAè¥bfudTrFWÁ¹Am|ĔĕsķÆF´N}ćUÕ@Áĳſmuçuð^ÊýowFzØÎĕNőǏȎôªÌŒǄàĀÄ˄ĞŀƒʀĀƘŸˮȬƬĊ°Uzouxe]}AyÈW¯ÌmKQ]Īºif¸ÄX|sZt|½ÚUÎ lk^p{f¤lºlÆW A²PVÜPHÊâ]ÎĈÌÜk´\\@qàsĔÄQºpRij¼èi`¶bXrBgxfv»uUi^v~J¬mVp´£´VWrnP½ì¢BX¬hðX¹^TjVriªjtŊÄmtPGx¸bgRsT`ZozÆO]ÒFôÒOÆŊvÅpcGêsx´DR{AEOr°x|íb³Wm~DVjºéNNËÜ˛ɶ­GxŷCSt}]ûōSmtuÇÃĕNāg»íT«u}ç½BĵÞʣ¥ëÊ¡MÛ³ãȅ¡ƋaǩÈÉQG¢·lG|tvgrrf«ptęŘnÅĢrI²¯LiØsPf_vĠdxM prʹL¤¤eËÀđKïÙVY§]Ióáĥ]ķK¥j|pŇ\\kzţ¦šnņäÔVĂîĪ¬|vW®l¤èØrxm¶ă~lÄƯĄ̈́öȄEÔ¤ØQĄĄ»ƢjȦOǺ¨ìSŖÆƬyQv`cwZSÌ®ü±Ǆ]ŀç¬B¬©ńzƺŷɄeeOĨSfm ĊƀP̎ēz©ĊÄÕÊmgÇsJ¥ƔŊśæÎÑqv¿íUOµªÂnĦÁ_½ä@êí£P}Ġ[@gġ}gɊ×ûÏWXá¢užƻÌsNÍ½ƎÁ§čŐAēeL³àydl¦ĘVçŁpśǆĽĺſÊQíÜçÛġÔsĕ¬Ǹ¯YßċġHµ ¡eå`ļrĉŘóƢFìĎWøxÊkƈdƬv|I|·©NqńRŀ¤éeŊŀàŀU²ŕƀBQ£Ď}L¹Îk@©ĈuǰųǨÚ§ƈnTËÇéƟÊcfčŤ^XmHĊĕË«W·ċëx³ǔķÐċJāwİ_ĸȀ^ôWr­°oú¬ĦŨK~ȰCĐ´Ƕ£fNÎèâw¢XnŮeÂÆĶ¾¾xäLĴĘlļO¤ÒĨA¢Êɚ¨®ØCÔ ŬGƠƦYĜĘÜƬDJg_ͥœ@čŅĻA¶¯@wÎqC½Ĉ»NăëKďÍQÙƫ[«ÃígßÔÇOÝáWñuZ¯ĥŕā¡ÑķJu¤E å¯°WKÉ±_d_}}vyõu¬ï¹ÓU±½@gÏ¿rÃ½DgCdµ°MFYxw¿CG£Rƛ½Õ{]L§{qqą¿BÇƻğëܭǊË|c²}Fµ}ÙRsÓpg±QNqǫŋRwŕnéÑÉK«SeYRŋ@{¤SJ}D Ûǖ֍]gr¡µŷjqWÛham³~S«Þ]"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                127123,
                                51780
                            ]
                        ],
                        [
                            [
                                134456,
                                44547
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        126.642464,
                        45.756967
                    ],
                    "name": "黑龙江",
                    "childNum": 2
                }
            },
            {
                "id": "320000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@cþÅPi`ZRu¥É\\]~°Y`µÓ^phÁbnÀşúòaĬºTÖŒbe¦¦{¸ZâćNp©Hr|^mjhSEb\\afv`sz^lkljÄtg¤D­¾X¿À|ĐiZȀåB·î}GL¢õcßjayBFµÏC^ĭcÙt¿sğH]j{s©HM¢QnDÀ©DaÜÞ·jgàiDbPufjDk`dPOîhw¡ĥ¥GP²ĐobºrYî¶aHŢ´ ]´rılw³r_{£DB_Ûdåuk|Ũ¯F Cºyr{XFye³Þċ¿ÂkĭB¿MvÛpm`rÚã@Ę¹hågËÖƿxnlč¶Åì½Ot¾dJlVJĂǀŞqvnO^JZż·Q}êÍÅmµÒ]ƍ¦Dq}¬R^èĂ´ŀĻĊIÔtĲyQŐĠMNtR®òLhĚs©»}OÓGZz¶A\\jĨFäOĤHYJvÞHNiÜaĎÉnFQlNM¤B´ĄNöɂtpŬdfåqm¿QûùŞÚb¤uŃJŴu»¹ĄlȖħŴw̌ŵ²ǹǠ͛hĭłƕrçü±Yxcitğ®jű¢KOķCoy`å®VTa­_Ā]ŐÝɞï²ʯÊ^]afYǸÃĆēĪȣJđ͍ôƋÄÄÍīçÛɈǥ£­ÛmY`ó£Z«§°Ó³QafusNıǅ_k}¢m[ÝóDµ¡RLčiXyÅNïă¡¸iĔÏNÌŕoēdōîåŤûHcs}~Ûwbù¹£¦ÓCtOPrE^ÒogĉIµÛÅʹK¤½phMü`oæŀ"
                    ],
                    "encodeOffsets": [
                        [
                            121740,
                            32276
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        118.767413,
                        32.041544
                    ],
                    "name": "江苏",
                    "childNum": 1
                }
            },
            {
                "id": "330000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@E^dQ]K"
                        ],
                        [
                            "@@jX^j"
                        ],
                        [
                            "@@sfbU"
                        ],
                        [
                            "@@qP\\xz[ck"
                        ],
                        [
                            "@@R¢FX}°[s_"
                        ],
                        [
                            "@@Cb\\}"
                        ],
                        [
                            "@@e|v\\la{u"
                        ],
                        [
                            "@@v~u}"
                        ],
                        [
                            "@@QxÂF¯}"
                        ],
                        [
                            "@@¹nvÞs¯o"
                        ],
                        [
                            "@@rSkUEj"
                        ],
                        [
                            "@@bi­ZP"
                        ],
                        [
                            "@@p[}INf"
                        ],
                        [
                            "@@À¿"
                        ],
                        [
                            "@@¹dnb"
                        ],
                        [
                            "@@rSBnR"
                        ],
                        [
                            "@@g~h}"
                        ],
                        [
                            "@@FlEk"
                        ],
                        [
                            "@@OdPc"
                        ],
                        [
                            "@@v[u\\"
                        ],
                        [
                            "@@FjâL~wyoo~sµL\\"
                        ],
                        [
                            "@@¬e¹aN"
                        ],
                        [
                            "@@\\nÔ¡q]L³ë\\ÿ®QÖ"
                        ],
                        [
                            "@@ÊA­©[¬"
                        ],
                        [
                            "@@Kxv­"
                        ],
                        [
                            "@@@hlIk]"
                        ],
                        [
                            "@@pW{o||j"
                        ],
                        [
                            "@@Md|_mC"
                        ],
                        [
                            "@@¢X£ÏylD¼XtH"
                        ],
                        [
                            "@@hlÜ[LykAvyfw^E¤"
                        ],
                        [
                            "@@fp¤MusR"
                        ],
                        [
                            "@@®_ma~LÁ¬Z"
                        ],
                        [
                            "@@iMxZ"
                        ],
                        [
                            "@@ZcYd"
                        ],
                        [
                            "@@Z~dOSo|A¿qZv"
                        ],
                        [
                            "@@@`EN¡v"
                        ],
                        [
                            "@@|TY{"
                        ],
                        [
                            "@@@n@m"
                        ],
                        [
                            "@@XWkCT\\"
                        ],
                        [
                            "@@ºwZRkĕWO¢"
                        ],
                        [
                            "@@X®±GrÆª\\ÔáXq{"
                        ],
                        [
                            "@@ůTG°ĄLHm°UC"
                        ],
                        [
                            "@@¤aÜx~}dtüGæţŎíĔcŖpMËÐjē¢·ðĄÆMzjWKĎ¢Q¶À_ê_Bıi«pZgf¤Nrq]§ĂN®«H±yƳí¾×ŸīàLłčŴǝĂíÀBŖÕªÁŖHŗŉåqûõi¨hÜ·ñt»¹ýv_[«¸mYL¯QªmĉÅdMgÇjcº«ę¬­K­´B«Âącoċ\\xKd¡gěŧ«®á[~ıxu·ÅKsËÉc¢Ù\\ĭƛëbf¹­ģSĜkáƉÔ­ĈZB{aMµfzŉfåÂŧįƋǝÊĕġć£g³ne­ą»@­¦S®\\ßðChiqªĭiAuA­µ_W¥ƣO\\lċĢttC¨£t`PZäuXßBsĻyekOđġĵHuXBµ]×­­\\°®¬F¢¾pµ¼kŘó¬Wät¸|@L¨¸µrºù³Ù~§WIZW®±Ð¨ÒÉx`²pĜrOògtÁZ}þÙ]¡FKwsPlU[}¦Rvn`hq¬\\nQ´ĘRWb_ rtČFIÖkĦPJ¶ÖÀÖJĈĄTĚòC ²@PúØz©Pî¢£CÈÚĒ±hŖl¬â~nm¨f©iļ«mntuÖZÜÄjL®EÌFª²iÊxØ¨IÈhhst"
                        ],
                        [
                            "@@o\\VzRZ}y"
                        ],
                        [
                            "@@@°¡mÛGĕ¨§Ianá[ýƤjfæØLäGr"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                125592,
                                31553
                            ]
                        ],
                        [
                            [
                                125785,
                                31436
                            ]
                        ],
                        [
                            [
                                125729,
                                31431
                            ]
                        ],
                        [
                            [
                                125513,
                                31380
                            ]
                        ],
                        [
                            [
                                125223,
                                30438
                            ]
                        ],
                        [
                            [
                                125115,
                                30114
                            ]
                        ],
                        [
                            [
                                124815,
                                29155
                            ]
                        ],
                        [
                            [
                                124419,
                                28746
                            ]
                        ],
                        [
                            [
                                124095,
                                28635
                            ]
                        ],
                        [
                            [
                                124005,
                                28609
                            ]
                        ],
                        [
                            [
                                125000,
                                30713
                            ]
                        ],
                        [
                            [
                                125111,
                                30698
                            ]
                        ],
                        [
                            [
                                125078,
                                30682
                            ]
                        ],
                        [
                            [
                                125150,
                                30684
                            ]
                        ],
                        [
                            [
                                124014,
                                28103
                            ]
                        ],
                        [
                            [
                                125008,
                                31331
                            ]
                        ],
                        [
                            [
                                125411,
                                31468
                            ]
                        ],
                        [
                            [
                                125329,
                                31479
                            ]
                        ],
                        [
                            [
                                125626,
                                30916
                            ]
                        ],
                        [
                            [
                                125417,
                                30956
                            ]
                        ],
                        [
                            [
                                125254,
                                30976
                            ]
                        ],
                        [
                            [
                                125199,
                                30997
                            ]
                        ],
                        [
                            [
                                125095,
                                31058
                            ]
                        ],
                        [
                            [
                                125083,
                                30915
                            ]
                        ],
                        [
                            [
                                124885,
                                31015
                            ]
                        ],
                        [
                            [
                                125218,
                                30798
                            ]
                        ],
                        [
                            [
                                124867,
                                30838
                            ]
                        ],
                        [
                            [
                                124755,
                                30788
                            ]
                        ],
                        [
                            [
                                124802,
                                30809
                            ]
                        ],
                        [
                            [
                                125267,
                                30657
                            ]
                        ],
                        [
                            [
                                125218,
                                30578
                            ]
                        ],
                        [
                            [
                                125200,
                                30562
                            ]
                        ],
                        [
                            [
                                124968,
                                30474
                            ]
                        ],
                        [
                            [
                                125167,
                                30396
                            ]
                        ],
                        [
                            [
                                124955,
                                29879
                            ]
                        ],
                        [
                            [
                                124714,
                                29781
                            ]
                        ],
                        [
                            [
                                124762,
                                29462
                            ]
                        ],
                        [
                            [
                                124325,
                                28754
                            ]
                        ],
                        [
                            [
                                123990,
                                28459
                            ]
                        ],
                        [
                            [
                                125366,
                                31477
                            ]
                        ],
                        [
                            [
                                125115,
                                30363
                            ]
                        ],
                        [
                            [
                                125369,
                                31139
                            ]
                        ],
                        [
                            [
                                122495,
                                31878
                            ]
                        ],
                        [
                            [
                                125329,
                                30690
                            ]
                        ],
                        [
                            [
                                125192,
                                30787
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        120.153576,
                        30.287459
                    ],
                    "name": "浙江",
                    "childNum": 45
                }
            },
            {
                "id": "340000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@^iuLX^"
                        ],
                        [
                            "@@e©Ehl"
                        ],
                        [
                            "@@°ZÆëĎµmkǀwÌÕæhºgBĝâqÙĊzÖgņtÀÁĂÆáhEz|WzqD¹°Eŧl{ævÜcA`¤C`|´qxĲkq^³³GšµbíZ¹qpa±ď OH¦Ħx¢gPícOl_iCveaOjChß¸iÝbÛªCC¿mRV§¢A|t^iĠGÀtÚsd]ĮÐDE¶zAb àiödK¡~H¸íæAǿYj{ď¿À½W®£ChÃsikkly]_teu[bFaTign{]GqªoĈMYá|·¥f¥őaSÕėNµñĞ«Im_m¿Âa]uĜp Z_§{Cäg¤°r[_YjÆOdý[I[á·¥Q_nùgL¾mvˊBÜÆ¶ĊJhpc¹O]iŠ]¥ jtsggJÇ§w×jÉ©±EFË­KiÛÃÕYvsm¬njĻª§emná}k«ŕgđ²ÙDÇ¤í¡ªOy×Où±@DñSęćăÕIÕ¿IµĥOjNÕËT¡¿tNæŇàåyķrĕq§ÄĩsWÆßF¶X®¿mwRIÞfßoG³¾©uyHį{Ɓħ¯AFnuPÍÔzVdàôº^Ðæd´oG¤{S¬ćxã}ŧ×Kǥĩ«ÕOEÐ·ÖdÖsƘÑ¨[Û^Xr¢¼§xvÄÆµ`K§ tÒ´Cvlo¸fzŨð¾NY´ı~ÉĔēßúLÃÃ_ÈÏ|]ÂÏFlg`ben¾¢pUh~ƴĖ¶_r sĄ~cƈ]|r c~`¼{À{ȒiJjz`îÀT¥Û³]u}fïQl{skloNdjäËzDvčoQďHI¦rbtHĔ~BmlRV_ħTLnñH±DL¼Lªl§Ťa¸ĚlK²\\RòvDcÎJbt[¤D@®hh~kt°ǾzÖ@¾ªdbYhüóZ ň¶vHrľ\\ÊJuxAT|dmÀO[ÃÔG·ĚąĐlŪÚpSJ¨ĸLvÞcPæķŨ®mÐálwKhïgA¢ųÆ©Þ¤OÈm°K´"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                121722,
                                32278
                            ]
                        ],
                        [
                            [
                                119475,
                                30423
                            ]
                        ],
                        [
                            [
                                119168,
                                35472
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        117.283042,
                        31.86119
                    ],
                    "name": "安徽",
                    "childNum": 3
                }
            },
            {
                "id": "350000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@zht´]"
                        ],
                        [
                            "@@aj^~ĆG©O"
                        ],
                        [
                            "@@ed¨C}}i"
                        ],
                        [
                            "@@@vPGsQ"
                        ],
                        [
                            "@@sBzddW]Q"
                        ],
                        [
                            "@@S¨Q{"
                        ],
                        [
                            "@@NVucW"
                        ],
                        [
                            "@@qptBAq"
                        ],
                        [
                            "@@¸[mu"
                        ],
                        [
                            "@@Q\\pD]_"
                        ],
                        [
                            "@@jSwUadpF"
                        ],
                        [
                            "@@eXª~"
                        ],
                        [
                            "@@AjvFso"
                        ],
                        [
                            "@@fT_Çí\\v|ba¦jZÆy°"
                        ],
                        [
                            "@@IjJi"
                        ],
                        [
                            "@@wJIx«¼AoNe{M­"
                        ],
                        [
                            "@@K±¡ÓČäeZ"
                        ],
                        [
                            "@@k¡¹Eh~c®wBkUplÀ¡I~Māe£bN¨gZý¡a±Öcp©PhI¢QqÇGj|¥U g[Ky¬ŏv@OptÉEF\\@ åA¬V{XģĐBycpě¼³Ăp·¤¥ohqqÚ¡ŅLs^Ã¡§qlÀhH¨MCe»åÇGD¥zPO£čÙkJA¼ßėuĕeûÒiÁŧSW¥Qûŗ½ùěcÝ§SùĩąSWó«íęACµeRåǃRCÒÇZÍ¢ź±^dlstjD¸ZpuÔâÃH¾oLUêÃÔjjēò´ĄWƛ^Ñ¥Ħ@ÇòmOw¡õyJyD}¢ďÑÈġfZda©º²z£NjD°Ötj¶¬ZSÎ~¾c°¶ÐmxO¸¢Pl´SL|¥AȪĖMņĲg®áIJČĒü` QF¬h|ĂJ@zµ |ê³È ¸UÖŬŬÀEttĸr]ðM¤ĶĲHtÏ AĬkvsq^aÎbvdfÊòSD´Z^xPsĂrvƞŀjJd×ŘÉ ®AÎ¦ĤdxĆqAZRÀMźnĊ»İÐZ YXæJyĊ²·¶q§·K@·{sXãô«lŗ¶»o½E¡­«¢±¨Y®Ø¶^AvWĶGĒĢPlzfļtàAvWYãO_¤sD§ssČġ[kƤPX¦`¶®BBvĪjv©jx[L¥àï[F¼ÍË»ğV`«Ip}ccÅĥZEãoP´B@D¸m±z«Ƴ¿å³BRØ¶Wlâþäą`]Z£Tc ĹGµ¶Hm@_©k¾xĨôȉðX«½đCIbćqK³ÁÄš¬OAwã»aLŉËĥW[ÂGIÂNxĳ¤D¢îĎÎB§°_JGs¥E@¤ućPåcuMuw¢BI¿]zG¹guĮck\\_"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                123250,
                                27563
                            ]
                        ],
                        [
                            [
                                122541,
                                27268
                            ]
                        ],
                        [
                            [
                                123020,
                                27189
                            ]
                        ],
                        [
                            [
                                122916,
                                27125
                            ]
                        ],
                        [
                            [
                                122887,
                                26845
                            ]
                        ],
                        [
                            [
                                122808,
                                26762
                            ]
                        ],
                        [
                            [
                                122568,
                                25912
                            ]
                        ],
                        [
                            [
                                122778,
                                26197
                            ]
                        ],
                        [
                            [
                                122515,
                                26757
                            ]
                        ],
                        [
                            [
                                122816,
                                26587
                            ]
                        ],
                        [
                            [
                                123388,
                                27005
                            ]
                        ],
                        [
                            [
                                122450,
                                26243
                            ]
                        ],
                        [
                            [
                                122578,
                                25962
                            ]
                        ],
                        [
                            [
                                121255,
                                25103
                            ]
                        ],
                        [
                            [
                                120987,
                                24903
                            ]
                        ],
                        [
                            [
                                122339,
                                25802
                            ]
                        ],
                        [
                            [
                                121042,
                                25093
                            ]
                        ],
                        [
                            [
                                122439,
                                26024
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        119.306239,
                        26.075302
                    ],
                    "name": "福建",
                    "childNum": 18
                }
            },
            {
                "id": "360000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@ĢĨƐgļ¼ÂMD~ņªe^\\^§ý©j×cZØ¨zdÒa¶lÒJìõ`oz÷@¤uŞ¸´ôęöY¼HČƶajlÞƩ¥éZ[|h}^U  ¥pĄžƦO lt¸Æ Q\\aÆ|CnÂOjt­ĚĤdÈF`¶@Ðë ¦ōÒ¨SêvHĢûXD®QgÄWiØPÞìºr¤ǆNĠ¢lĄtZoCƞÔºCxrpĠV®Ê{f_Y`_eq®Aot`@oDXfkp¨|s¬\\DÄSfè©Hn¬^DhÆyøJhØxĢĀLÊƠPżċĄwȠĚ¦G®ǒĤäTŠÆ~Ħw«|TF¡nc³Ïå¹]ĉđxe{ÎÓvOEm°BƂĨİ|Gvz½ª´HàpeJÝQxnÀW­EµàXÅĪt¨ÃĖrÄwÀFÎ|ňÓMå¼ibµ¯»åDT±m[r«_gmQu~¥V\\OkxtL E¢Ú^~ýêPóqoě±_Êw§ÑªåƗā¼mĉŹ¿NQYBąrwģcÍ¥B­ŗÊcØiIƝĿuqtāwO]³YCñTeÉcaubÍ]trluīBÐGsĵıN£ï^ķqss¿FūūVÕ·´Ç{éĈýÿOER_đûIċâJh­ŅıNȩĕB¦K{Tk³¡OP·wnµÏd¯}½TÍ«YiµÕsC¯iM¤­¦¯P|ÿUHvhe¥oFTuõ\\OSsMòđƇiaºćXĊĵà·çhƃ÷Ç{ígu^đgm[×zkKN¶Õ»lčÓ{XSÆv©_ÈëJbVkĔVÀ¤P¾ºÈMÖxlò~ªÚàGĂ¢B±ÌKyáV¼Ã~­`gsÙfIƋlę¹e|~udjuTlXµf`¿Jd[\\L²"
                    ],
                    "encodeOffsets": [
                        [
                            116689,
                            26234
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        115.892151,
                        28.676493
                    ],
                    "name": "江西",
                    "childNum": 1
                }
            },
            {
                "id": "370000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@Xjd]{K"
                        ],
                        [
                            "@@itbFHy"
                        ],
                        [
                            "@@HlGk"
                        ],
                        [
                            "@@TGy"
                        ],
                        [
                            "@@K¬U"
                        ],
                        [
                            "@@WdXc"
                        ],
                        [
                            "@@PtOs"
                        ],
                        [
                            "@@LnXhc"
                        ],
                        [
                            "@@ppVu]Or"
                        ],
                        [
                            "@@cdzAUa"
                        ],
                        [
                            "@@udRhnCI"
                        ],
                        [
                            "@@oIpR"
                        ],
                        [
                            "@@Ľč{fzƤîKÎMĮ]ZF½Y]â£ph¶¨râøÀÎǨ¤^ºÄGz~grĚĜlĞÆLĆǆ¢Îo¦cvKbgr°WhmZp L]LºcUÆ­nżĤÌĒbAnrOA´ȊcÀbƦUØrĆUÜøĬƞEzVL®öØBkŖÝĐĖ¹ŧ̄±ÀbÎÉnb²ĦhņBĖįĦåXćì@L¯´ywƕCéÃµė ƿ¸lµ¾Z|ZWyFY¨Mf~C¿`à_RÇzwƌfQnny´INoƬèôº|sTJULîVjǎ¾ĒØDz²XPn±ŴPè¸ŔLƔÜƺ_TüÃĤBBċÈöA´faM¨{«M`¶d¡ôÖ°mȰBÔjj´PM|c^d¤u¤Û´ä«ƢfPk¶Môl]Lb}su^ke{lCMrDÇ­]NÑFsmoõľHyGă{{çrnÓEƕZGª¹Fj¢ïWuøCǷë¡ąuhÛ¡^KxC`C\\bÅxì²ĝÝ¿_NīCȽĿåB¥¢·IŖÕy\\¹kxÃ£Č×GDyÃ¤ÁçFQ¡KtŵƋ]CgÏAùSedcÚźuYfyMmhUWpSyGwMPqŀÁ¼zK¶G­Y§Ë@´śÇµƕBm@IogZ¯uTMx}CVKï{éƵP_K«pÛÙqċtkkù]gTğwoɁsMõ³ăAN£MRkmEÊčÛbMjÝGuIZGPģãħE[iµBEuDPÔ~ª¼ęt]ûG§¡QMsğNPŏįzs£Ug{đJĿļā³]ç«Qr~¥CƎÑ^n¶ÆéÎR~Ż¸YI] PumŝrƿIā[xeÇ³L¯v¯s¬ÁY~}ťuŁgƋpÝĄ_ņī¶ÏSR´ÁP~¿Cyċßdwk´SsX|t`Ä ÈðAªìÎT°¦Dda^lĎDĶÚY°`ĪŴǒàŠv\\ebZHŖR¬ŢƱùęOÑM­³FÛWp["
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                123806,
                                39303
                            ]
                        ],
                        [
                            [
                                123821,
                                39266
                            ]
                        ],
                        [
                            [
                                123742,
                                39256
                            ]
                        ],
                        [
                            [
                                123702,
                                39203
                            ]
                        ],
                        [
                            [
                                123649,
                                39066
                            ]
                        ],
                        [
                            [
                                123847,
                                38933
                            ]
                        ],
                        [
                            [
                                123580,
                                38839
                            ]
                        ],
                        [
                            [
                                123894,
                                37288
                            ]
                        ],
                        [
                            [
                                123043,
                                36624
                            ]
                        ],
                        [
                            [
                                123344,
                                38676
                            ]
                        ],
                        [
                            [
                                123522,
                                38857
                            ]
                        ],
                        [
                            [
                                123628,
                                38858
                            ]
                        ],
                        [
                            [
                                118260,
                                36742
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        117.000923,
                        36.675807
                    ],
                    "name": "山东",
                    "childNum": 13
                }
            },
            {
                "id": "410000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@ýLùµP³swIÓxcŢĞð´E®ÚPtĴXØxÂ¶@«ŕŕQGYfa[şußǩđš_X³ĳÕčC]kbc¥CS¯ëÍB©÷³­Si_}mYTt³xlàcČzÀD}ÂOQ³ÐTĨ¯ƗòËŖ[hłŦv~}ÂZ«¤lPÇ£ªÝŴÅR§ØnhctâknÏ­ľŹUÓÝdKuķI§oTũÙďkęĆH¸Ó\\Ä¿PcnS{wBIvÉĽ[GqµuŇôYgûZca©@½Õǽys¯}lgg@­C\\£asIdÍuCQñ[L±ęk·ţb¨©kK»KC²òGKmĨS`UQnk}AGēsqaJ¥ĐGRĎpCuÌy ã iMcplk|tRkðev~^´¦ÜSí¿_iyjI|ȑ|¿_»d}q^{Ƈdă}tqµ`Ƴĕg}V¡om½faÇo³TTj¥tĠRyK{ùÓjuµ{t}uËRivGçJFjµÍyqÎàQÂFewixGw½Yŷpµú³XU½ġyłåkÚwZX·l¢Á¢KzOÎÎjc¼htoDHr|­J½}JZ_¯iPq{tę½ĕ¦Zpĵø«kQĹ¤]MÛfaQpě±ǽ¾]u­Fu÷nčÄ¯ADp}AjmcEÇaª³o³ÆÍSƇĈÙDIzËčľ^KLiÞñ[aA²zzÌ÷D|[íÄ³gfÕÞd®|`Ć~oĠƑô³ŊD×°¯CsøÀ«ìUMhTº¨¸ǡîSÔDruÂÇZÖEvPZW~ØÐtĄE¢¦Ðy¸bô´oŬ¬²Ês~]®tªapŎJ¨Öº_Ŕ`Ŗ^Đ\\Ĝu~m²Ƹ¸fWĦrƔ}Î^gjdfÔ¡J}\\n C¦þWxªJRÔŠu¬ĨĨmFdM{\\d\\YÊ¢ú@@¦ª²SÜsC}fNècbpRmlØ^gd¢aÒ¢CZZxvÆ¶N¿¢T@uC¬^ĊðÄn|lGlRjsp¢ED}Fio~ÔN~zkĘHVsǲßjŬŢ`Pûàl¢\\ÀEhİgÞē X¼Pk|m"
                    ],
                    "encodeOffsets": [
                        [
                            118256,
                            37017
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        113.665412,
                        34.757975
                    ],
                    "name": "河南",
                    "childNum": 1
                }
            },
            {
                "id": "420000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@AB"
                        ],
                        [
                            "@@lskt"
                        ],
                        [
                            "@@¾«}{ra®pîÃ\\{øCËyyB±b\\òÝjKL ]ĎĽÌJyÚCƈćÎT´Å´pb©ÈdFin~BCo°BĎÃømv®E^vǾ½Ĝ²RobÜeN^ĺ£R¬lĶ÷YoĖ¥Ě¾|sOr°jY`~I¾®I{GqpCgyl{£ÍÍyPLÂ¡¡¸kWxYlÙæŁĢz¾V´W¶ùŸo¾ZHxjwfxGNÁ³Xéæl¶EièIH ujÌQ~v|sv¶Ôi|ú¢FhQsğ¦SiŠBgÐE^ÁÐ{čnOÂÈUÎóĔÊēĲ}Z³½Mŧïeyp·uk³DsÑ¨L¶_ÅuÃ¨w»¡WqÜ]\\Ò§tƗcÕ¸ÕFÏǝĉăxŻČƟOKÉġÿ×wg÷IÅzCg]m«ªGeçÃTC«[t§{loWeC@ps_Bp­rf_``Z|ei¡oċMqow¹DƝÓDYpûsYkıǃ}s¥ç³[§cY§HK«Qy]¢wwö¸ïx¼ņ¾Xv®ÇÀµRĠÐHM±cÏdƒǍũȅȷ±DSyúĝ£ŤĀàtÖÿï[îb\\}pĭÉI±Ñy¿³x¯No|¹HÏÛmjúË~TuęjCöAwě¬Rđl¯ Ñb­ŇTĿ_[IčĄʿnM¦ğ\\É[T·k¹©oĕ@A¾wya¥Y\\¥Âaz¯ãÁ¡k¥ne£ÛwE©Êō¶˓uoj_U¡cF¹­[WvP©whuÕyBF`RqJUw\\i¡{jEPïÿ½fćQÑÀQ{°fLÔ~wXgītêÝ¾ĺHd³fJd]HJ²EoU¥HhwQsƐ»Xmg±çve]DmÍPoCc¾_hhøYrŊU¶eD°Č_N~øĹĚ·`z]Äþp¼äÌQv\\rCé¾TnkžŐÚÜa¼ÝƆĢ¶ÛodĔňÐ¢JqPb ¾|J¾fXƐîĨ_Z¯À}úƲN_ĒÄ^ĈaŐyp»CÇÄKñL³ġM²wrIÒŭxjb[n«øæà ^²­h¯ÚŐªÞ¸Y²ĒVø}Ā^İ´LÚm¥ÀJÞ{JVųÞŃx×sxxƈē ģMřÚðòIfĊŒ\\Ʈ±ŒdÊ§ĘDvČ_Àæ~Dċ´A®µ¨ØLV¦êHÒ¤"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                113712,
                                34000
                            ]
                        ],
                        [
                            [
                                115612,
                                30507
                            ]
                        ],
                        [
                            [
                                113649,
                                34054
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        114.298572,
                        30.584355
                    ],
                    "name": "湖北",
                    "childNum": 3
                }
            },
            {
                "id": "430000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@nFTs"
                        ],
                        [
                            "@@ßÅÆá½ÔXrCOËRïÿĩ­TooQyÓ[ŅBE¬ÎÓXaį§Ã¸G °ITxpúxÚĳ¥ÏĢ¾edÄ©ĸGàGhM¤Â_U}Ċ}¢pczfþg¤ÇòAVM"
                        ],
                        [
                            "@@©KA·³CQ±Á«³BUƑ¹AtćOwD]JiØSm¯b£ylXHËÑ±H«C^õľAÅ§¤É¥ïyuǙuA¢^{ÌC´­¦ŷJ£^[ª¿ĕ~ƇN skóā¹¿ï]ă~÷O§­@Vm¡Qđ¦¢Ĥ{ºjÔª¥nf´~Õo×ÛąMąıuZmZcÒ ĲĪ²SÊǄŶ¨ƚCÖŎªQØ¼rŭ­«}NÏürÊ¬mjr@ĘrTW ­SsdHzƓ^ÇÂyUi¯DÅYlŹu{hT}mĉ¹¥ěDÿë©ıÓ[Oº£¥ótł¹MÕƪ`PDiÛU¾ÅâìUñBÈ£ýhedy¡oċ`pfmjP~kZaZsÐd°wj§@Ĵ®w~^kÀÅKvNmX\\¨aŃqvíó¿F¤¡@ũÑVw}S@j}¾«pĂrªg àÀ²NJ¶¶DôK|^ª°LX¾ŴäPĪ±£EXd^¶ĲÞÜ~u¸ǔMRhsRe`ÄofIÔ\\Ø  ićymnú¨cj ¢»GČìƊÿÐ¨XeĈĀ¾Oð Fi ¢|[jVxrIQ_EzAN¦zLU`cªxOTu RLÄ¢dVi`p˔vŎµªÉF~Ød¢ºgİàw¸Áb[¦Zb¦z½xBĖ@ªpºlS¸Ö\\Ĕ[N¥ˀmĎăJ\\ŀ`ňSÚĖÁĐiOĜ«BxDõĚivSÌ}iùÜnÐºG{p°M´wÀÒzJ²ò¨ oTçüöoÛÿñőĞ¤ùTz²CȆȸǎŪƑÐc°dPÎğË¶[È½u¯½WM¡­ÉB·rínZÒ `¨GA¾\\pēXhÃRC­üWGġuTé§ŎÑ©ò³I±³}_EÃħg®ęisÁPDmÅ{b[RÅs·kPŽƥóRoOV~]{g\\êYƪ¦kÝbiċƵGZ»Ěõó·³vŝ£ø@pyö_ëIkÑµbcÑ§y×dYØªiþ¨[]f]Ņ©C}ÁN»hĻħƏĩ"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                115640,
                                30489
                            ]
                        ],
                        [
                            [
                                112543,
                                27312
                            ]
                        ],
                        [
                            [
                                116690,
                                26230
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        112.982279,
                        28.19409
                    ],
                    "name": "湖南",
                    "childNum": 3
                }
            },
            {
                "id": "440000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@QdAua"
                        ],
                        [
                            "@@lxDLo"
                        ],
                        [
                            "@@sbhNLo"
                        ],
                        [
                            "@@Ă ā"
                        ],
                        [
                            "@@WltO[["
                        ],
                        [
                            "@@Kr]S"
                        ],
                        [
                            "@@eI]y"
                        ],
                        [
                            "@@I|Mym"
                        ],
                        [
                            "@@Û³LS¼Y"
                        ],
                        [
                            "@@nvºBëui©`¾"
                        ],
                        [
                            "@@zdÛJw®"
                        ],
                        [
                            "@@°¯"
                        ],
                        [
                            "@@a yAª¸ËJIxØ@ĀHAmÃV¡ofuo"
                        ],
                        [
                            "@@sŗÃÔėAƁZÄ ~°ČPäh"
                        ],
                        [
                            "@@¶ÝÌvmĞh­ıQ"
                        ],
                        [
                            "@@HdSjĒ¢D}waru«ZqadYM"
                        ],
                        [
                            "@@el\\LqqU"
                        ],
                        [
                            "@@~rMo\\"
                        ],
                        [
                            "@@f^C"
                        ],
                        [
                            "@@øPªoj÷ÍÝħXČx°Q¨ıXNv"
                        ],
                        [
                            "@@gÇƳo[~tly"
                        ],
                        [
                            "@@EÆC¿"
                        ],
                        [
                            "@@OP"
                        ],
                        [
                            "@@wđógĝ[³¡VÙæÅöMÌ³¹pÁaËýý©D©ÜJŹƕģGą¤{ÙūÇO²«BƱéAÒĥ¡«BhlmtÃPµyU¯ucd·w_bŝcīímGO|KPȏŹãŝIŕŭŕ@Óoo¿ē±ß}ŭĲWÈCőâUâǙIğŉ©IĳE×Á³AówXJþ±ÌÜÓĨ£L]ĈÙƺZǾĆĖMĸĤfÎĵlŨnÈĐtFFĤêk¶^k°f¶g}®Faf`vXŲxl¦ÔÁ²¬Ð¦pqÊÌ²iXØRDÎ}Ä@ZĠsx®AR~®ETtĄZƈfŠŠHâÒÐAµ\\S¸^wĖkRzalŜ|E¨ÈNĀňZTpBh£\\ĎƀuXĖtKL¶G|»ĺEļĞ~ÜĢÛĊrOÙîvd]n¬VÊĜ°RÖpMƂªFbwEÀ©\\¤]ŸI®¥D³|Ë]CöAŤ¦æ´¥¸Lv¼¢ĽBaôF~®²GÌÒEYzk¤°ahlVÕI^CxĈPsBƒºV¸@¾ªR²ĨN]´_eavSivc}p}Đ¼ƌkJÚe th_¸ ºx±ò_xNË²@ă¡ßH©Ùñ}wkNÕ¹ÇO½¿£ĕ]ly_WìIÇª`uTÅxYĒÖ¼kÖµMjJÚwn\\hĒv]îh|ÈƄøèg¸Ķß ĉĈWb¹ƀdéĘNTtP[öSvrCZaGubo´ŖÒÇĐ~¡zCIözx¢PnÈñ @ĥÒ¦]ƞV}³ăĔñiiÄÓVépKG½ÄÓávYoC·sitiaÀyŧÎ¡ÈYDÑům}ý|m[węõĉZÅxUO}÷N¹³ĉo_qtăqwµŁYÙǝŕ¹tïÛUÃ¯mRCºĭ|µÕÊK½Rē ó]GªęAx»HO£|ām¡diď×YïYWªŉOeÚtĐ«zđ¹TāúEá²\\ķÍ}jYàÙÆſ¿Çdğ·ùTßÇţʄ¡XgWÀǇğ·¿ÃOj YÇ÷Qěi"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                117381,
                                22988
                            ]
                        ],
                        [
                            [
                                116552,
                                22934
                            ]
                        ],
                        [
                            [
                                116790,
                                22617
                            ]
                        ],
                        [
                            [
                                116973,
                                22545
                            ]
                        ],
                        [
                            [
                                116444,
                                22536
                            ]
                        ],
                        [
                            [
                                116931,
                                22515
                            ]
                        ],
                        [
                            [
                                116496,
                                22490
                            ]
                        ],
                        [
                            [
                                116453,
                                22449
                            ]
                        ],
                        [
                            [
                                113301,
                                21439
                            ]
                        ],
                        [
                            [
                                118726,
                                21604
                            ]
                        ],
                        [
                            [
                                118709,
                                21486
                            ]
                        ],
                        [
                            [
                                113210,
                                20816
                            ]
                        ],
                        [
                            [
                                115482,
                                22082
                            ]
                        ],
                        [
                            [
                                113171,
                                21585
                            ]
                        ],
                        [
                            [
                                113199,
                                21590
                            ]
                        ],
                        [
                            [
                                115232,
                                22102
                            ]
                        ],
                        [
                            [
                                115739,
                                22373
                            ]
                        ],
                        [
                            [
                                115134,
                                22184
                            ]
                        ],
                        [
                            [
                                113056,
                                21175
                            ]
                        ],
                        [
                            [
                                119573,
                                21271
                            ]
                        ],
                        [
                            [
                                119957,
                                24020
                            ]
                        ],
                        [
                            [
                                115859,
                                22356
                            ]
                        ],
                        [
                            [
                                116561,
                                22649
                            ]
                        ],
                        [
                            [
                                116285,
                                22746
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        113.280637,
                        23.125178
                    ],
                    "name": "广东",
                    "childNum": 24
                }
            },
            {
                "id": "450000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@H TQ§A"
                        ],
                        [
                            "@@ĨÊªLƊDÎĹĐCǦė¸zÚGn£¾rªŀÜt¬@ÖÚSx~øOŒŶÐÂæȠ\\ÈÜObĖw^oÞLf¬°bI lTØBÌF£Ć¹gñĤaYt¿¤VSñK¸¤nM¼JE±½¸ñoÜCƆæĪ^ĚQÖ¦^f´QüÜÊz¯lzUĺš@ìp¶n]sxtx¶@~ÒĂJb©gk{°~c°`Ô¬rV\\la¼¤ôá`¯¹LCÆbxEræOv[H­[~|aB£ÖsºdAĐzNÂðsÞÆĤªbab`ho¡³F«èVlo¤ÔRzpp®SĪº¨ÖºNĳd`a¦¤F³ºDÎńĀìCĜº¦Ċ~nS|gźvZkCÆj°zVÈÁƔ]LÊFZgčP­kini«qÇczÍY®¬Ů»qR×ō©DÕ§ƙǃŵTÉĩ±ıdÑnYYĲvNĆĆØÜ Öp}e³¦m©iÓ|¹ħņ|ª¦QF¢Â¬ʖovg¿em^ucà÷gÕuíÙćĝ}FĻ¼Ĺ{µHKsLSđƃrč¤[AgoSŇYMÿ§Ç{FśbkylQxĕ]T·¶[BÑÏGáşşƇeăYSs­FQ}­BwtYğÃ@~CÍQ ×WjË±rÉ¥oÏ ±«ÓÂ¥kwWűmcih³K~µh¯e]lµélEģEďsmÇŧē`ãògK_ÛsUʝćğ¶höO¤Ǜn³c`¡y¦CezYwa[ďĵűMę§]XÎ_íÛ]éÛUćİÕBƣ±dy¹T^dûÅÑŦ·PĻþÙ`K¦¢ÍeĥR¿³£[~äu¼dltW¸oRM¢ď\\z}Æzdvň{ÎXF¶°Â_ÒÂÏL©ÖTmu¼ãlīkiqéfA·Êµ\\őDc¥ÝFyÔćcűH_hLÜêĺĐ¨c}rn`½Ì@¸¶ªVLhŒ\\Ţĺk~Ġið°|gtTĭĸ^xvKVGréAébUuMJVÃO¡qĂXËSģãlýà_juYÛÒBG^éÖ¶§EGÅzěƯ¤EkN[kdåucé¬dnYpAyČ{`]þ¯TbÜÈk¡ĠvàhÂƄ¢Jî¶²"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                111707,
                                21520
                            ]
                        ],
                        [
                            [
                                107619,
                                25527
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        108.320004,
                        22.82402
                    ],
                    "name": "广西",
                    "childNum": 2
                }
            },
            {
                "id": "460000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@¦Ŝil¢XƦƞòïè§ŞCêɕrŧůÇąĻõ·ĉ³œ̅kÇm@ċȧŧĥĽʉ­ƅſȓÒË¦ŝE}ºƑ[ÍĜȋ gÎfǐÏĤ¨êƺ\\Ɔ¸ĠĎvʄȀÐ¾jNðĀÒRZǆzÐŘÎ°H¨Ƣb²_Ġ "
                    ],
                    "encodeOffsets": [
                        [
                            112750,
                            20508
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        110.33119,
                        20.031971
                    ],
                    "name": "海南",
                    "childNum": 1
                }
            },
            {
                "id": "510000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@LqKr"
                        ],
                        [
                            "@@[ĻéV£_ţġñpG réÏ·~ąSfy×Í·ºſƽiÍıƣıĻmHH}siaX@iÇ°ÁÃ×t«­T¤JJJyJÈ`Ohß¦¡uËhIyCjmÿwZGTiSsOB²fNmsPa{M{õE^Hj}gYpaeu¯oáwHjÁ½M¡pMuåmni{fk\\oÎqCwEZ¼KĝAy{m÷LwO×SimRI¯rKõBS«sFe]fµ¢óY_ÆPRcue°Cbo×bd£ŌIHgtrnyPt¦foaXďxlBowz_{ÊéWiêEGhÜ¸ºuFĈIxf®Y½ĀǙ]¤EyF²ċw¸¿@g¢§RGv»áW`ÃĵJwi]t¥wO­½a[×]`Ãi­üL¦LabbTÀåc}ÍhÆh®BHî|îºÉk­¤Sy£ia©taį·Ɖ`ō¥UhOĝLk}©Fos´JmµlŁuønÑJWÎªYÀïAetTŅÓGË«bo{ıwodƟ½OġÜÂµxàNÖ¾P²§HKv¾]|BÆåoZ`¡Ø`ÀmºĠ~ÌÐ§nÇ¿¤]wğ@srğu~Io[é±¹ ¿ſđÓ@qg¹zƱřaí°KtÇ¤V»Ã[ĩǭƑ^ÇÓ@áťsZÏÅĭƋěpwDóÖáŻneQËq·GCœýS]x·ýq³OÕ¶Qzßti{řáÍÇWŝŭñzÇWpç¿JXĩè½cFÂLiVjx}\\NŇĖ¥GeJA¼ÄHfÈu~¸Æ«dE³ÉMA|bÒćhG¬CMõƤąAvüVéŀ_VÌ³ĐwQj´·ZeÈÁ¨X´Æ¡Qu·»ÕZ³ġqDoy`L¬gdp°şp¦ėìÅĮZ°Iähzĵf²å ĚÑKpIN|Ñz]ń·FU×é»R³MÉ»GM«kiér}Ã`¹ăÞmÈnÁîRǀ³ĜoİzŔwǶVÚ£À]ɜ»ĆlƂ²ĠþTº·àUȞÏʦ¶I«dĽĢdĬ¿»Ĕ×h\\c¬ä²GêëĤł¥ÀǿżÃÆMº}BÕĢyFVvwxBèĻĒ©ĈtCĢɽŠȣ¦āæ·HĽîôNÔ~^¤Ɗu^s¼{TA¼ø°¢İªDè¾Ň¶ÝJ®Z´ğ~Sn|ªWÚ©òzPOȸbð¢|øĞŒQìÛÐ@ĞǎRS¤Á§di´ezÝúØã]HqkIþËQÇ¦ÃsÇ¤[E¬ÉŪÍxXƒ·ÖƁİlƞ¹ª¹|XÊwnÆƄmÀêErĒtD®ċæcQE®³^ĭ¥©l}äQtoŖÜqÆkµªÔĻĴ¡@Ċ°B²Èw^^RsºTĀ£ŚæQPJvÄz^Đ¹Æ¯fLà´GC²dt­ĀRt¼¤ĦOðğfÔðDŨŁĞƘïPÈ®âbMüÀXZ ¸£@Å»»QÉ­]dsÖ×_Í_ÌêŮPrĔĐÕGĂeZÜîĘqBhtO ¤tE[h|YÔZśÎs´xº±Uñt|OĩĠºNbgþJy^dÂY Į]Řz¦gC³R`Āz¢Aj¸CL¤RÆ»@­Ŏk\\Ç´£YW}z@Z}Ã¶oû¶]´^NÒ}èNªPÍy¹`S°´ATeVamdUĐwʄvĮÕ\\uÆŗ¨Yp¹àZÂmWh{á}WØǍÉüwga§áCNęÎ[ĀÕĪgÖÉªXøx¬½Ů¦¦[NÎLÜUÖ´òrÙŠxR^JkĳnDX{U~ET{ļº¦PZcjF²Ė@pg¨B{u¨ŦyhoÚD®¯¢ WòàFÎ¤¨GDäz¦kŮPġqË¥À]eâÚ´ªKxīPÖ|æ[xÃ¤JÞĥsNÖ½I¬nĨY´®ÐƐmDŝuäđđEbee_v¡}ìęǊē}qÉåT¯µRs¡M@}ůaa­¯wvƉåZw\\Z{åû^"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                108815,
                                30935
                            ]
                        ],
                        [
                            [
                                110617,
                                31811
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        104.065735,
                        30.659462
                    ],
                    "name": "四川",
                    "childNum": 2
                }
            },
            {
                "id": "520000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@G\\lY£in"
                        ],
                        [
                            "@@q|mc¯tÏVSÎ"
                        ],
                        [
                            "@@hÑ£IsNgßHHªķÃh_¹¡ĝÄ§ń¦uÙùgS¯JH|sÝÅtÁïyMDč»eÕtA¤{b\\}G®u\\åPFqwÅaDK°ºâ_£ùbµmÁÛĹM[q|hlaªāI}Ñµ@swtwm^oµDéĽŠyVky°ÉûÛR³e¥]RÕěħ[ƅåÛDpJiVÂF²I»mN·£LbÒYbWsÀbpkiTZĄă¶Hq`ĥ_J¯ae«KpÝx]aĕÛPÇȟ[ÁåŵÏő÷Pw}TÙ@Õs«ĿÛq©½m¤ÙH·yǥĘĉBµĨÕnđ]K©œáGçş§ÕßgǗĦTèƤƺ{¶ÉHÎd¾ŚÊ·OÐjXWrãLyzÉAL¾ę¢bĶėy_qMĔąro¼hĊw¶øV¤w²Ĉ]ÊKx|`ź¦ÂÈdrcÈbe¸`I¼čTF´¼Óýȃr¹ÍJ©k_șl³´_pĐ`oÒh¶pa^ÓĔ}D»^Xy`d[KvJPhèhCrĂĚÂ^Êƌ wZL­Ġ£ÁbrzOIlMMĪŐžËr×ÎeŦtw|¢mKjSǘňĂStÎŦEtqFT¾Eì¬¬ôxÌO¢ K³ŀºäYPVgŎ¦ŊmŞ¼VZwVlz¤£Tl®ctĽÚó{G­AÇge~Îd¿æaSba¥KKûj®_Ä^\\Ø¾bP®¦x^sxjĶI_Ä Xâ¼Hu¨Qh¡À@Ëô}±GNìĎlT¸`V~R°tbÕĊ`¸úÛtÏFDu[MfqGH·¥yAztMFe|R_GkChZeÚ°tov`xbDnÐ{E}ZèxNEÞREn[Pv@{~rĆAB§EO¿|UZ~ìUf¨J²ĂÝÆsªB`s¶fvö¦Õ~dÔq¨¸º»uù[[§´sb¤¢zþF¢ÆÀhÂW\\ıËIÝo±ĭŠ£þÊs}¡R]ěDg´VG¢j±®èºÃmpU[Áëº°rÜbNu¸}º¼`niºÔXĄ¤¼ÔdaµÁ_ÃftQQgR·Ǔv}Ý×ĵ]µWc¤F²OĩųãW½¯K©]{LóµCIµ±Mß¿h©āq¬o½~@i~TUxŪÒ¢@£ÀEîôruńb[§nWuMÆLl¿]x}ĳ­½"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                112158,
                                27383
                            ]
                        ],
                        [
                            [
                                112105,
                                27474
                            ]
                        ],
                        [
                            [
                                112095,
                                27476
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        106.713478,
                        26.578343
                    ],
                    "name": "贵州",
                    "childNum": 3
                }
            },
            {
                "id": "530000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@[ùx½}ÑRHYīĺûsÍniEoã½Ya²ė{c¬ĝgĂsAØÅwďõzFjw}«Dx¿}Uũlê@HÅ­F¨ÇoJ´Ónũuą¡Ã¢pÒÅØ TF²xa²ËXcÊlHîAßËŁkŻƑŷÉ©hW­æßUËs¡¦}teèÆ¶StÇÇ}Fd£jĈZĆÆ¤Tč\\D}O÷£U§~ŃGåŃDĝ¸Tsd¶¶Bª¤u¢ŌĎo~t¾ÍŶÒtD¦ÚiôözØX²ghįh½Û±¯ÿm·zR¦Ɵ`ªŊÃh¢rOÔ´£Ym¼èêf¯ŪĽncÚbw\\zlvWªâ ¦gmĿBĹ£¢ƹřbĥkǫßeeZkÙIKueT»sVesbaĕ  ¶®dNĄÄpªy¼³BE®lGŭCǶwêżĔÂepÍÀQƞpC¼ŲÈ­AÎô¶RäQ^Øu¬°_Èôc´¹ò¨PÎ¢hlĎ¦´ĦÆ´sâÇŲPnÊD^¯°Upv}®BPÌªjǬxSöwlfòªvqĸ|`H­viļndĜ­Ćhňem·FyÞqóSį¯³X_ĞçêtryvL¤§z¦c¦¥jnŞklD¤øz½ĜàĂŧMÅ|áƆàÊcðÂFÜáŢ¥\\\\ºİøÒÐJĴîD¦zK²ǏÎEh~CD­hMn^ÌöÄ©ČZÀaüfɭyœpį´ěFűk]Ôě¢qlÅĆÙa¶~ÄqêljN¬¼HÊNQ´ê¼VØ¸E^ŃÒyM{JLoÒęæe±Ķygã¯JYÆĭĘëo¥Šo¯hcK«z_prC´ĢÖY¼ v¸¢RÅW³Â§fÇ¸Yi³xR´ďUË`êĿUûuĆBƣöNDH«ĈgÑaB{ÊNF´¬c·Åv}eÇÃGB»If¦HňĕM~[iwjUÁKE¾dĪçWIèÀoÈXòyŞŮÈXâÎŚj|àsRyµÖPr´þ ¸^wþTDŔHr¸RÌmfżÕâCôoxĜƌÆĮÐYtâŦÔ@]ÈǮƒ\\Ī¼Ä£UsÈ¯LbîƲŚºyhr@ĒÔƀÀ²º\\êpJ}ĠvqtĠ@^xÀ£È¨mËÏğ}n¹_¿¢×Y_æpÅA^{½Lu¨GO±Õ½ßM¶wÁĢÛPƢ¼pcĲx|apÌ¬HÐŊSfsðBZ¿©XÏÒKk÷Eû¿SrEFsÕūkóVǥŉiTL¡n{uxţÏhôŝ¬ğōNNJkyPaqÂğ¤K®YxÉƋÁ]āęDqçgOgILu\\_gz]W¼~CÔē]bµogpÑ_oď`´³Țkl`IªºÎȄqÔþ»E³ĎSJ»_f·adÇqÇc¥Á_Źw{L^É±ćxU£µ÷xgĉp»ĆqNē`rĘzaĵĚ¡K½ÊBzyäKXqiWPÏÉ¸½řÍcÊG|µƕƣGË÷k°_^ý|_zċBZocmø¯hhcæ\\lMFlư£ĜÆyHF¨µêÕ]HAàÓ^it `þßäkĤÎT~Wlÿ¨ÔPzUCNVv [jâôDôď[}z¿msSh¯{jïğl}šĹ[őgK©U·µË@¾m_~q¡f¹ÅË^»f³ø}Q¡ÖË³gÍ±^Ç\\ëÃA_¿bWÏ[¶ƛé£F{īZgm@|kHǭƁć¦UĔť×ë}ǝeďºȡȘÏíBÉ£āĘPªĳ¶ŉÿy©nď£G¹¡I±LÉĺÑdĉÜW¥}gÁ{aqÃ¥aıęÏZï`"
                    ],
                    "encodeOffsets": [
                        [
                            104636,
                            22969
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        102.712251,
                        25.040609
                    ],
                    "name": "云南",
                    "childNum": 1
                }
            },
            {
                "id": "540000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@ÂhľxŖxÒVºÅâAĪÝȆµę¯Ňa±r_w~uSÕňqOj]ɄQ£ZUDûoY»©M[L¼qãË{VÍçWVi]ë©Ä÷àyƛhÚU°adcQ~Mx¥cc¡ÙaSyFÖk­uRýq¿ÔµQĽ³aG{¿FµëªéĜÿª@¬·K·àariĕĀ«V»ŶĴūgèLǴŇƶaftèBŚ£^âǐÝ®M¦ÁǞÿ¬LhJ¾óƾÆºcxwf]Y´¦|QLn°adĊ\\¨oǀÍŎ´ĩĀd`tÊQŞŕ|¨C^©Ĉ¦¦ÎJĊ{ëĎjª²rÐl`¼Ą[t|¦Stè¾PÜK¸dƄı]s¤î_v¹ÎVòŦj£Əsc¬_Ğ´|Ł¦Av¦w`ăaÝaa­¢e¤ı²©ªSªÈMĄwÉØŔì@T¤Ę\\õª@þo´­xA sÂtŎKzó´ÇĊµ¢r^nĊ­Æ¬×üG¢³ {âĊ]G~bÀgVjzlhǶfOfdªB]pjTOtĊn¤}®¦Č¥d¢¼»ddY¼t¢eȤJ¤}Ǿ¡°§¤AÐlc@ĝsªćļđAçwxUuzEÖġ~AN¹ÄÅȀŻ¦¿ģŁéì±Hãd«g[Ø¼ēÀcīľġ¬cJµÐʥVȝ¸ßS¹ý±ğkƁ¼ą^ɛ¤Ûÿb[}¬ōõÃ]ËNm®g@Bg}ÍF±ǐyL¥íCIĳÏ÷Ñį[¹¦[âšEÛïÁÉdƅß{âNÆāŨß¾ě÷yC£k­´ÓH@Â¹TZ¥¢į·ÌAÐ§®Zcv½Z­¹|ÅWZqgW|ieZÅYVÓqdqbc²R@c¥Rã»GeeƃīQ}J[ÒK¬Ə|oėjġĠÑN¡ð¯EBčnwôɍėª²CλŹġǝʅįĭạ̃ūȹ]ΓͧgšsgȽóϧµǛęgſ¶ҍć`ĘąŌJÞä¤rÅň¥ÖÁUětęuůÞiĊÄÀ\\Æs¦ÓRb|Â^řÌkÄŷ¶½÷f±iMÝ@ĥ°G¬ÃM¥n£Øąğ¯ß§aëbéüÑOčk£{\\eµª×MÉfm«Ƒ{Å×Gŏǩãy³©WÑăû··Qòı}¯ãIéÕÂZ¨īès¶ZÈsæĔTŘvgÌsN@îá¾ó@ÙwU±ÉTå»£TđWxq¹Zobs[×¯cĩvėŧ³BM|¹kªħ¥TzNYnÝßpęrñĠĉRS~½ěVVµõ«M££µBĉ¥áºae~³AuĐh`Ü³ç@BÛïĿa©|z²Ý¼D£àč²ŸIûI āóK¥}rÝ_Á´éMaň¨~ªSĈ½½KÙóĿeƃÆB·¬ën×W|Uº}LJrƳlŒµ`bÔ`QÐÓ@s¬ñIÍ@ûws¡åQÑßÁ`ŋĴ{ĪTÚÅTSÄ³Yo|Ç[Ç¾µMW¢ĭiÕØ¿@MhpÕ]jéò¿OƇĆƇpêĉâlØwěsǩĵ¸cbU¹ř¨WavquSMzeo_^gsÏ·¥Ó@~¯¿RiīB\\qTGªÇĜçPoÿfñòą¦óQīÈáPābß{ZŗĸIæÅhnszÁCËìñÏ·ąĚÝUm®ó­L·ăUÈíoù´Êj°ŁŤ_uµ^°ìÇ@tĶĒ¡ÆM³Ģ«İĨÅ®ğRāðggheÆ¢zÊ©Ô\\°ÝĎz~ź¤PnMĪÖB£kné§żćĆKĒ°¼L¶èâz¨u¦¥LDĘz¬ýÎmĘd¾ßFzhg²Fy¦ĝ¤ċņbÎ@yĄæm°NĮZRÖíJ²öLĸÒ¨Y®ƌÐVàtt_ÚÂyĠz]ŢhzĎ{ÂĢXc|ÐqfO¢¤ögÌHNPKŖUú´xx[xvĐCûĀìÖT¬¸^}Ìsòd´_KgžLĴÀBon|H@Êx¦BpŰŌ¿fµƌA¾zǈRx¶FkĄźRzŀ~¶[´HnªVƞuĒ­È¨ƎcƽÌm¸ÁÈM¦x͊ëÀxǆBú^´W£dkɾĬpw˂ØɦļĬIŚÊnŔa¸~J°îlɌxĤÊÈðhÌ®gT´øàCÀ^ªerrƘd¢İP|Ė ŸWªĦ^¶´ÂLaT±üWƜǀRÂŶUńĖ[QhlLüAÜ\\qRĄ©"
                    ],
                    "encodeOffsets": [
                        [
                            90849,
                            37210
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        91.132212,
                        29.660361
                    ],
                    "name": "西藏",
                    "childNum": 1
                }
            },
            {
                "id": "610000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@p¢ȮµûGĦ}Ħðǚ¶òƄjɂz°{ºØkÈęâ¦jªBg\\ċ°s¬]jú EȌǆ¬stRÆdĠİwÜ¸ôW¾ƮłÒ_{Ìû¼jº¹¢GǪÒ¯ĘZ`ºŊecņą~BÂgzpâēòYǠȰÌTÎ¨ÂW|fcă§uF@N¢XLRMº[ğȣſï|¥Jkc`sŉǷY¹W@µ÷Kãï³ÛIcñ·VȋÚÒķø©þ¥yÓğęmWµÎumZyOŅƟĥÓ~sÑL¤µaÅY¦ocyZ{y c]{Ta©`U_Ěē£ωÊƍKùK¶ȱÝƷ§{û»ÅÁȹÍéuĳ|¹cÑdìUYOuFÕÈYvÁCqÓTǢí§·S¹NgV¬ë÷Át°DØ¯C´ŉƒópģ}ċcEËFéGU¥×K§­¶³BČ}C¿åċ`wġB·¤őcƭ²ő[Å^axwQOÿEËßŚĤNĔwƇÄńwĪ­o[_KÓª³ÙnKÇěÿ]ďă_d©·©Ýŏ°Ù®g]±ßå¬÷m\\iaǑkěX{¢|ZKlçhLtŇîŵœè[É@ƉĄEtƇÏ³­ħZ«mJ×¾MtÝĦ£IwÄå\\Õ{OwĬ©LÙ³ÙgBƕŀrÌĢŭO¥lãyC§HÍ£ßEñX¡­°ÙCgpťzb`wIvA|§hoĕ@E±iYd¥OĻ¹S|}F@¾oAO²{tfÜ¢FǂÒW²°BĤh^Wx{@¬­F¸¡ķn£P|ªĴ@^ĠĈæbÔc¶lYi^MicĎ°Â[ävï¶gv@ÀĬ·lJ¸sn|¼u~a]ÆÈtŌºJpþ£KKf~¦UbyäIĺãnÔ¿^­ŵMThĠÜ¤ko¼Ŏìąǜh`[tRd²Ĳ_XPrɲlXiL§à¹H°Ȧqº®QCbAŌJ¸ĕÚ³ĺ§ `d¨YjiZvRĺ±öVKkjGȊÄePĞZmļKÀ[`ösìhïÎoĬdtKÞ{¬èÒÒBÔpĲÇĬJŊ¦±J«Y§@·pHµàåVKepWftsAÅqC·¬ko«pHÆuK@oHĆÛķhxenS³àǍrqƶRbzy¸ËÐl¼EºpĤ¼x¼½~Ğà@ÚüdK^mÌSj"
                    ],
                    "encodeOffsets": [
                        [
                            110234,
                            38774
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        108.948024,
                        34.263161
                    ],
                    "name": "陕西",
                    "childNum": 1
                }
            },
            {
                "id": "620000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@VuUv"
                        ],
                        [
                            "@@ũEĠtt~nkh`Q¦ÅÄÜdwAb×ĠąJ¤DüègĺqBqj°lI¡ĨÒ¤úSHbjÎB°aZ¢KJO[|A£Dx}NĂ¬HUnrk kp¼Y kMJn[aGáÚÏ[½rc}aQxOgsPMnUsncZsKúvAtÞġ£®ĀYKdnFw¢JE°Latf`¼h¬we|Æbj}GA·~W`¢MC¤tL©Ĳ°qdfObÞĬ¹ttu`^ZúE`[@Æsîz®¡CƳƜG²R¢RmfwĸgÜą G@pzJM½mhVy¸uÈÔO±¨{LfæU¶ßGĂq\\ª¬²I¥IŉÈīoıÓÑAçÑ|«LÝcspīðÍgtë_õ\\ĉñLYnĝgRǡÁiHLlõUĹ²uQjYi§Z_c¨´ĹĖÙ·ŋIaBD­R¹ȥr¯GºßK¨jWkɱOqWĳ\\a­Q\\sg_ĆǛōëp»£lğÛgSŶN®À]ÓämĹãJaz¥V}Le¤Lýo¹IsŋÅÇ^bz³tmEÁ´a¹cčecÇNĊãÁ\\č¯dNj]jZµkÓdaćå]ğĳ@ ©O{¤ĸm¢E·®«|@Xwg]Aģ±¯XǁÑǳªcwQÚŝñsÕ³ÛV_ý¥\\ů¥©¾÷w©WÕÊĩhÿÖÁRo¸V¬âDb¨hûxÊ×ǌ~Zâg|XÁnßYoº§ZÅŘv[ĭÖʃuďxcVbnUSfB¯³_TzºÎO©çMÑ~M³]µ^püµÄY~y@X~¤Z³[Èōl@®Å¼£QK·Di¡ByÿQ_´D¥hŗy^ĭÁZ]cIzýah¹MĪğPs{ò²Vw¹t³ŜË[Ñ}X\\gsF£sPAgěp×ëfYHāďÖqēŭOÏëdLü\\it^c®RÊº¶¢H°mrY£B¹čIoľu¶uI]vģSQ{UŻÅ}QÂ|Ì°ƅ¤ĩŪU ęĄÌZÒ\\v²PĔ»ƢNHĂyAmƂwVm`]ÈbH`Ì¢²ILvĜH®¤Dlt_¢JJÄämèÔDëþgºƫaʎÌrêYi~ Îİ¤NpÀA¾Ĕ¼bð÷®üszMzÖĖQdȨýv§Tè|ªHÃ¾a¸|Ð ƒwKĢx¦ivr^ÿ ¸l öæfƟĴ·PJv}n\\h¹¶v·À|\\ƁĚN´ĜçèÁz]ġ¤²¨QÒŨTIlªťØ}¼˗ƦvÄùØEÂ«FïËIqōTvāÜŏíÛßÛVj³âwGăÂíNOPìyV³ŉĖýZso§HÑiYw[ß\\X¦¥c]ÔƩÜ·«jÐqvÁ¦m^ċ±R¦΋ƈťĚgÀ»IïĨʗƮ°ƝĻþÍAƉſ±tÍEÕÞāNUÍ¡\\ſčåÒʻĘm ƭÌŹöʥëQ¤µ­ÇcƕªoIýIÉ_mkl³ăƓ¦j¡YzŇi}Msßõīʋ }ÁVm_[n}eı­Uĥ¼ªI{Î§DÓƻėojqYhĹT©oūĶ£]ďxĩǑMĝq`B´ƃ˺Чç~²ņj@¥@đ´ί}ĥtPńÇ¾V¬ufÓÉCtÓ̻¹£G³]ƖƾŎĪŪĘ̖¨ʈĢƂlɘ۪üºňUðǜȢƢż̌ȦǼĤŊɲĖÂ­Kq´ï¦ºĒǲņɾªǀÞĈĂD½ĄĎÌŗĞrôñnN¼â¾ʄľԆ|Ǆ֦ज़ȗǉ̘̭ɺƅêgV̍ʆĠ·ÌĊv|ýĖÕWĊǎÞ´õ¼cÒÒBĢ͢UĜð͒s¨ňƃLĉÕÝ@ɛƯ÷¿Ľ­ĹeȏĳëCȚDŲyê×Ŗyò¯ļcÂßYtÁƤyAã˾J@ǝrý@¤rz¸oP¹ɐÚyáHĀ[JwcVeȴÏ»ÈĖ}ƒŰŐèȭǢόĀƪÈŶë;Ñ̆ȤМľĮEŔĹŊũ~ËUă{ĻƹɁύȩþĽvĽƓÉ@ēĽɲßǐƫʾǗĒpäWÐxnsÀ^ƆwW©¦cÅ¡Ji§vúF¶¨c~c¼īeXǚ\\đ¾JwÀďksãAfÕ¦L}waoZD½Ml«]eÒÅaÉ²áo½FõÛ]ĻÒ¡wYR£¢rvÓ®y®LFLzĈôe]gx}|KK}xklL]c¦£fRtív¦PĤoH{tK"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                108619,
                                36299
                            ]
                        ],
                        [
                            [
                                108589,
                                36341
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        103.823557,
                        36.058039
                    ],
                    "name": "甘肃",
                    "childNum": 2
                }
            },
            {
                "id": "630000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@InJm"
                        ],
                        [
                            "@@CÆ½OŃĦsΰ~Ē³¦@@Ņi±è}ШƄ˹A³r_ĞǒNĪĐw¤^ŬĵªpĺSZgrpiƼĘÔ¨C|ÍJ©Ħ»®VĲ~f\\m `UnÂ~ʌĬàöNt~ňjy¢ZiƔ¥Ąk´nl`JÊJþ©pdƖ®È£¶ìRʦźõƮËnʼėæÑƀĎ[¢VÎĂMÖÝÎF²sƊƀÎBļýƞ¯ʘƭðħ¼Jh¿ŦęΌƇ¥²Q]Č¥nuÂÏri¸¬ƪÛ^Ó¦d¥[Wàx\\ZjÒ¨GtpþYŊĕ´zUOëPîMĄÁxH´áiÜUàîÜŐĂÛSuŎrJðÌ¬EFÁú×uÃÎkrĒ{V}İ«O_ÌËĬ©ÓŧSRÑ±§Ģ£^ÂyèçěM³Ƃę{[¸¿uºµ[gt£¸OƤĿéYõ·kĀq]juw¥DĩƍõÇPéÄ½G©ã¤GuȧþRcÕĕNyyût­øï»a½ē¿BMoį£Íj}éZËqbʍƬh¹ìÿÓAçãnIÃ¡I`ks£CG­ěUy×Cy@¶ʡÊBnāzGơMē¼±O÷õJËĚăVĪũƆ£¯{ËL½ÌzżVR|ĠTbuvJvµhĻĖHAëáa­OÇðñęNwœľ·LmI±íĠĩPÉ×®ÿscB³±JKßĊ«`ađ»·QAmOVţéÿ¤¹SQt]]Çx±¯A@ĉĳ¢Óļ©l¶ÅÛrŕspãRk~¦ª]Į­´FRåd­ČsCqđéFn¿ÅƃmÉx{W©ºƝºįkÕƂƑ¸wWūÐ©ÈF£\\tÈ¥ÄRÈýÌJ lGr^×äùyÞ³fjc¨£ÂZ|ǓMĝÏ@ëÜőRĝ÷¡{aïȷPu°ËXÙ{©TmĠ}Y³­ÞIňµç½©C¡į÷¯B»|St»]vųs»}MÓ ÿʪƟǭA¡fs»PY¼c¡»¦cċ­¥£~msĉPSi^o©AecPeǵkgyUi¿h}aHĉ^|á´¡HØûÅ«ĉ®]m¡qĉ¶³ÈyôōLÁstB®wn±ă¥HSòė£Së@×œÊăxÇN©©T±ª£Ĳ¡fb®Þbb_Ą¥xu¥B{łĝ³«`dƐt¤ťiñÍUuºí`£^tƃĲc·ÛLO½sç¥Ts{ă\\_»kÏ±q©čiìĉ|ÍI¥ć¥]ª§D{ŝŖÉR_sÿc³ĪōƿÎ§p[ĉc¯bKmR¥{³Ze^wx¹dƽÅ½ôIg §Mĕ ƹĴ¿ǣÜÍ]Ý]snåA{eƭ`ǻŊĿ\\ĳŬűYÂÿ¬jĖqßb¸L«¸©@ěĀ©ê¶ìÀEH|´bRľÓ¶rÀQþvl®ÕETzÜdb hw¤{LRdcb¯ÙVgƜßzÃôì®^jUèXÎ|UäÌ»rK\\ªN¼pZCüVY¤ɃRi^rPŇTÖ}|br°qňbĚ°ªiƶGQ¾²x¦PmlŜ[Ĥ¡ΞsĦÔÏâ\\ªÚŒU\\f¢N²§x|¤§xĔsZPòʛ²SÐqF`ªVÞŜĶƨVZÌL`¢dŐIqr\\oäõFÎ·¤»Ŷ×h¹]ClÙ\\¦ďÌį¬řtTӺƙgQÇÓHţĒ´ÃbEÄlbʔC|CŮkƮ[ʼ¬ň´KŮÈΰÌĪ¶ƶlðļATUvdTGº̼ÔsÊDÔveOg"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                105308,
                                37219
                            ]
                        ],
                        [
                            [
                                95370,
                                40081
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        101.778916,
                        36.623178
                    ],
                    "name": "青海",
                    "childNum": 2
                }
            },
            {
                "id": "640000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@KëÀęĞ«Oęȿȕı]ŉ¡åįÕÔ«ǴõƪĚQÐZhv K°öqÀÑS[ÃÖHƖčËnL]ûcÙß@ĝ¾}w»»oģF¹»kÌÏ·{zP§B­¢íyÅt@@á]Yv_ssģ¼ißĻL¾ġsKD£¡N_X¸}B~HaiÅf{«x»ge_bsKF¯¡IxmELcÿZ¤­ĢÝsuBLùtYdmVtNmtOPhRw~bd¾qÐ\\âÙH\\bImlNZ»loqlVmGā§~QCw¤{A\\PKNY¯bFkC¥sks_Ã\\ă«¢ħkJi¯rrAhĹûç£CUĕĊ_ÔBixÅÙĄnªÑaM~ħpOu¥sîeQ¥¤^dkKwlL~{L~hw^ófćKyE­K­zuÔ¡qQ¤xZÑ¢^ļöÜ¾Ep±âbÊÑÆ^fk¬NC¾YpxbK~¥eÖäBlt¿Đx½I[ĒǙWf»Ĭ}d§dµùEuj¨IÆ¢¥dXªƅx¿]mtÏwßRĶX¢͎vÆzƂZò®ǢÌʆCrâºMÞzÆMÒÊÓŊZÄ¾r°Î®Ȉmª²ĈUªĚîøºĮ¦ÌĘk^FłĬhĚiĀĖ¾iİbjÕ"
                        ],
                        [
                            "@@mfwěwMrŢªv@G"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                109366,
                                40242
                            ]
                        ],
                        [
                            [
                                108600,
                                36303
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        106.278179,
                        38.46637
                    ],
                    "name": "宁夏",
                    "childNum": 2
                }
            },
            {
                "id": "650000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@QØĔ²X¨~ǘBºjʐßØvKƔX¨vĊOÃ·¢i@~cĝe_«E}QxgɪëÏÃ@sÅyXoŖ{ô«ŸuXêÎf`C¹ÂÿÐGĮÕĞXŪōŸMźÈƺQèĽôe|¿ƸJR¤ĘEjcUóº¯Ĩ_ŘÁMª÷Ð¥OéÈ¿ÖğǤǷÂFÒzÉx[]­Ĥĝœ¦EP}ûƥé¿İƷTėƫœŕƅƱB»Đ±ēO¦E}`cȺrĦáŖuÒª«ĲπdƺÏØZƴwʄ¤ĖGĐǂZĶèH¶}ÚZצʥĪï|ÇĦMŔ»İĝǈì¥Βba­¯¥ǕǚkĆŵĦɑĺƯxūД̵nơʃĽá½M»òmqóŘĝčË¾ăCćāƿÝɽ©ǱŅ¹đ¥³ðLrÁ®ɱĕģŉǻ̋ȥơŻǛȡVï¹Ň۩ûkɗġƁ§ʇė̕ĩũƽō^ƕUv£ƁQïƵkŏ½ΉÃŭÇ³LŇʻ«ƭ\\lŭD{ʓDkaFÃÄa³ŤđÔGRÈƚhSӹŚsİ«ĐË[¥ÚDkº^Øg¼ŵ¸£EÍöůŉT¡c_ËKYƧUśĵÝU_©rETÏʜ±OñtYwē¨{£¨uM³x½şL©Ùá[ÓÐĥ Νtģ¢\\śnkOw¥±T»ƷFɯàĩÞáB¹ÆÑUwŕĽw[mG½Èå~Æ÷QyěCFmĭZīŵVÁƿQƛûXS²b½KÏ½ĉS©ŷXĕ{ĕK·¥Ɨcqq©f¿]ßDõU³h­gËÇïģÉɋwk¯í}I·œbmÉřīJɥĻˁ×xoɹīlc¤³Xù]ǅA¿w͉ì¥wÇN·ÂËnƾƍdÇ§đ®ƝvUm©³G\\}µĿQyŹlăµEwǇQ½yƋBe¶ŋÀůo¥AÉw@{Gpm¿AĳŽKLh³`ñcËtW±»ÕSëüÿďDu\\wwwù³VLŕOMËGh£õP¡erÏd{ġWÁč|yšg^ğyÁzÙs`s|ÉåªÇ}m¢Ń¨`x¥ù^}Ì¥H«YªƅAÐ¹n~ź¯f¤áÀzgÇDIÔ´AňĀÒ¶ûEYospõD[{ù°]uJqU|Soċxţ[õÔĥkŋÞŭZËºóYËüċrw ÞkrťË¿XGÉbřaDü·Ē÷AÃª[ÄäIÂ®BÕĐÞ_¢āĠpÛÄȉĖġDKwbmÄNôfƫVÉviǳHQµâFù­Âœ³¦{YGd¢ĚÜO {Ö¦ÞÍÀP^bƾl[vt×ĈÍEË¨¡Đ~´î¸ùÎhuè`¸HÕŔVºwĠââWò@{ÙNÝ´ə²ȕn{¿¥{l÷eé^eďXj©î\\ªÑòÜìc\\üqÕ[Č¡xoÂċªbØ­ø|¶ȴZdÆÂońéG\\¼C°ÌÆn´nxÊOĨŪƴĸ¢¸òTxÊǪMīĞÖŲÃɎOvʦƢ~FRěò¿ġ~åŊúN¸qĘ[Ĕ¶ÂćnÒPĒÜvúĀÊbÖ{Äî¸~Ŕünp¤ÂH¾ĄYÒ©ÊfºmÔĘcDoĬMŬS¤s²ʘÚžȂVŦ èW°ªB|ĲXŔþÈJĦÆæFĚêYĂªĂ]øªŖNÞüAfɨJ¯ÎrDDĤ`mz\\§~D¬{vJÂ«lµĂb¤pŌŰNĄ¨ĊXW|ų ¿¾ɄĦƐMTòP÷fØĶK¢ȝ˔Sô¹òEð­`Ɩ½ǒÂň×äı§ĤƝ§C~¡hlåǺŦŞkâ~}FøàĲaĞfƠ¥Ŕd®U¸źXv¢aƆúŪtŠųƠjdƺƺÅìnrh\\ĺ¯äɝĦ]èpĄ¦´LƞĬ´ƤǬ˼Ēɸ¤rºǼ²¨zÌPðŀbþ¹ļD¢¹\\ĜÑŚ¶ZƄ³àjĨoâȴLÊȮĐ­ĚăÀêZǚŐ¤qȂ\\L¢ŌİfÆs|zºeªÙæ§΢{Ā´ƐÚ¬¨Ĵà²łhʺKÞºÖTiƢ¾ªì°`öøu®Ê¾ãØ"
                    ],
                    "encodeOffsets": [
                        [
                            88824,
                            50096
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        87.617733,
                        43.792818
                    ],
                    "name": "新疆",
                    "childNum": 1
                }
            },
            {
                "id": "110000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@ĽOÁûtŷmiÍt_H»Ĩ±d`¹­{bwYr³S]§§o¹qGtm_SŧoaFLgQN_dV@Zom_ć\\ßcÂ±x¯oœRcfe£o§ËgToÛJíĔóu|wP¤XnO¢ÉŦ¯rNÄā¤zâŖÈRpŢZÚ{GrFt¦Òx§ø¹RóäV¤XdżâºWbwŚ¨Ud®bêņ¾jnŎGŃŶnzÚSeîĜZczî¾i]ÍQaúÍÔiþĩȨWĢü|Ėu[qb[swP@ÅğP¿{\\¥A¨ÏÑ¨j¯X\\¯MKpA³[Hīu}}"
                    ],
                    "encodeOffsets": [
                        [
                            120023,
                            41045
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        116.405285,
                        39.904989
                    ],
                    "name": "北京",
                    "childNum": 1
                }
            },
            {
                "id": "120000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@ŬgX§Ü«E¶FÌ¬O_ïlÁgz±AXeµÄĵ{¶]gitgIj·¥îakS¨ÐƎk}ĕ{gBqGf{¿aU^fIư³õ{YıëNĿk©ïËZŏR§òoY×Ógcĥs¡bġ«@dekąI[nlPqCnp{ō³°`{PNdƗqSÄĻNNâyj]äÒD ĬH°Æ]~¡HO¾X}ÐxgpgWrDGpù^LrzWxZ^¨´T\\|~@IzbĤjeĊªz£®ĔvěLmV¾Ô_ÈNW~zbĬvG²ZmDM~~"
                    ],
                    "encodeOffsets": [
                        [
                            120237,
                            41215
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        117.190182,
                        39.125596
                    ],
                    "name": "天津",
                    "childNum": 1
                }
            },
            {
                "id": "310000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@ɧư¬EpƸÁxc"
                        ],
                        [
                            "@@©ª"
                        ],
                        [
                            "@@MA"
                        ],
                        [
                            "@@QpİE§ÉC¾"
                        ],
                        [
                            "@@bŝÕÕEȣÚƥêImɇǦèÜĠÚÃƌÃ͎ó"
                        ],
                        [
                            "@@ǜûȬɋŭ×^sYɍDŋŽąñCG²«ªč@h_p¯A{oloY¬j@Ĳ`gQÚhr|ǀ^MĲvtbe´R¯Ô¬¨Yô¤r]ìƬį"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                124702,
                                32062
                            ]
                        ],
                        [
                            [
                                124547,
                                32200
                            ]
                        ],
                        [
                            [
                                124808,
                                31991
                            ]
                        ],
                        [
                            [
                                124726,
                                32110
                            ]
                        ],
                        [
                            [
                                124903,
                                32376
                            ]
                        ],
                        [
                            [
                                124438,
                                32149
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        121.472644,
                        31.231706
                    ],
                    "name": "上海",
                    "childNum": 6
                }
            },
            {
                "id": "500000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@vjG~nGŘŬĶȂƀƾ¹¸ØÎezĆT¸}êÐqHðqĖä¥^CÆIj²p\\_ æüY|[YxƊæu°xb®Űb@~¢NQt°¶Sæ Ê~rǉĔëĚ¢~uf`faĔJåĊnÖ]jƎćÊ@£¾a®£Ű{ŶĕFègLk{Y|¡ĜWƔtƬJÑxq±ĢN´òKLÈÃ¼D|s`ŋć]Ã`đMûƱ½~Y°ħ`ƏíW½eI½{aOIrÏ¡ĕŇapµÜƅġ^ÖÛbÙŽŏml½SêqDu[RãË»ÿw`»y¸_ĺę}÷`M¯ċfCVµqŉ÷Zgg`d½pDOÎCn^uf²ènh¼WtƏxRGg¦pVFI±G^Ic´ecGĹÞ½sëĬhxW}KÓe­XsbkF¦LØgTkïƵNï¶}Gyw\\oñ¡nmĈzj@Óc£»Wă¹Ój_m»¹·~MvÛaq»­ê\\ÂoVnÓØÍ²«bq¿efE Ĝ^Q~ Évýş¤²ĮpEİ}zcĺL½¿gÅ¡ýE¡ya£³t\\¨\\vú»¼§·Ñr_oÒý¥u_n»_At©ÞÅ±ā§IVeëY}{VPÀFA¨ąB}q@|Ou\\FmQFÝMwå}]|FmÏCawu_p¯sfÙgYDHl`{QEfNysB¦zG¸rHeN\\CvEsÐùÜ_·ÖĉsaQ¯}_UxÃđqNH¬Äd^ÝŰR¬ã°wećJE·vÝ·HgéFXjÉê`|ypxkAwWĐpb¥eOsmzwqChóUQl¥F^lafanòsrEvfQdÁUVfÎvÜ^eftET¬ôA\\¢sJnQTjPØxøK|nBzĞ»LYFDxÓvr[ehľvN¢o¾NiÂxGpâ¬zbfZo~hGi]öF||NbtOMn eA±tPTLjpYQ|SHYĀxinzDJÌg¢và¥Pg_ÇzIIII£®S¬ØsÎ¼£N"
                        ],
                        [
                            "@@ifjN@s"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                109628,
                                30765
                            ]
                        ],
                        [
                            [
                                111725,
                                31320
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        106.504962,
                        29.533155
                    ],
                    "name": "重庆",
                    "childNum": 2
                }
            },
            {
                "id": "810000",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@AlBk"
                        ],
                        [
                            "@@mn"
                        ],
                        [
                            "@@EpFo"
                        ],
                        [
                            "@@ea¢pl¸Eõ¹hj[]ÔCÎ@lj¡uBX´AI¹[yDU]W`çwZkmcMpÅv}IoJlcafŃK°ä¬XJmÐ đhI®æÔtSHnEÒrÈc"
                        ],
                        [
                            "@@rMUwAS®e"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                117111,
                                23002
                            ]
                        ],
                        [
                            [
                                117072,
                                22876
                            ]
                        ],
                        [
                            [
                                117045,
                                22887
                            ]
                        ],
                        [
                            [
                                116975,
                                23082
                            ]
                        ],
                        [
                            [
                                116882,
                                22747
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        114.173355,
                        22.320048
                    ],
                    "name": "香港",
                    "childNum": 5
                }
            },
            {
                "id": "820000",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@kÊd°å§s"
                    ],
                    "encodeOffsets": [
                        [
                            116279,
                            22639
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        113.54909,
                        22.198951
                    ],
                    "name": "澳门",
                    "childNum": 1
                }
            }
        ],
        "UTF8Encoding": true
    }})
})

// 传每个省的pinyin，返回每个省对应的数据
router.get("/getProvince",(req,res,next)=>{
    res.send({code:true,data:{
        "type": "FeatureCollection",
        "features": [
            {
                "id": "150100",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@FCBGDEJBH@LBFHJBN@NAHCBCAUF@@FJ@@E\\AAFDFT@LSCEJAvE@AC@@AHBJ@RFNBHAXKLB@B@FN@BEVADB@J`BAORDACHAFI`DIPK@EAABBFHBFA@DPBXBHGCSLO@CfJN@@CNEECDACAFCBAFGJCFC@CHCJITEFAVBBCFBCBNBPCDCLIBCBKCEAMG@MYBIBATHHCJ@JJB@JGHKFGFI@AAKGIAEPU@CEAACDMDEFEDI@CGA@AFSJQAEDAHC`ELENDLE@AOBCA@APABAOCAEHGRKDGLCDGNBNMTAHELEH@FEHC@E@EFCD@HGB@HFDALBFCD@DAHADCBEFAFAFEDE\\GDE@WE@GAGI@IIEEIDEACBCCEDCLELOHEACCENO@EDC@CD@JCPA^IB@DEDCHCLETEvXBBF@FADGFC@EDGCE@AL@FEHAEEBKAKBCAMBCPI@AAEEGR@NDBABKACOMEI@CBAJADCFAFEDGJKBEHCJKHEC@ACDCDMIAACIGLIBA@MAEA@ABG@AEBEFAAAIAECEGGCEEIE@EKU@CDIAG@KCCGCE@YQKECGIBCJALKBO@G^EBIFGBGHCBEKKCEQACCAEDQHM@EAKEBIBEFQCSHIBMGSAQGUEDWLGJA`S\\SL_HOACFKAIGEICEE]@CBANG@CBEAC@CCBE@AGGBECGBMBCRCJCAGDEHAHELADADEBIJMFCPADAHMHMBAL@JCFDFHH@JCLEBCAGFCPGLM@IBCLGHAFKNIFEFCJ@^KVCFEHC@EMU@K@CFEHCHGXMBCHI@EFIXAHADCCICCMC@AAEIEBEIKBGG@MI@A@GTADBFAPDBDFBNADADKIAACAI@GACDEAG@ANCD@LDD@@MDGPS@CGQ@CGGFC@QDEVAJEFQBOFGCKEGGMCIUSNIFMOIKOUGAACGAAMEG@MGIGKAUMBIGQG@@A@CFICIFACEDA@CDC@CGCIEACEGAEEIKE@GQO@GQIGGGEAOEEBABA@SKIBCAECAO@GQi_AMEGECCM@KCEEGOMKWIIUYGEEEKWIMI[EIQQKCKEEEGSGEA[CECQEOMI@AQQMUKM[QIGAEKGEACCKCCIAQDUDKAMEE@GBYCKCQBKJMUgGKIEIAGCEG]WACFMNKJKEMIG@ENEBIKWGCGDIHG@ACC@UFE@MIEDGAIGAESNMBM@[NMAQGCEA@IIECA@KEKKMCQKG@C@KJ[@UFWLaFMJQVKHUJOBMF]NQ@KF_EKOK@E@UHSLMDgCCDILEFE@U@kROBgC]IkU]GQBCHWZAJBFFBPEH@FBBFADGDWJEDCFEDODEBKJEPEFEDWFCBADALCFWBALBTAHGJAL@DJJHLNPDF@HIP@FBDDDTHXFLJ@JKZBDBDF@VAD@FDDH@HALEHAHFT@LJZPZDBZFFH@DGLADBFHJBLCDGJBNAJABQHEDCFChGX@R@L@R@REJ@DFD@BELEHEZGFEBKACDQXKZQVITMNWRQNMRMLS`GHMHUDkBVeVADCRGJ]^]RGHKHgT[RaPeL_FeF_@QLCFBFBHJLDJ@FEFEAICOK@TBNMDLPdBAFRBPHVJ@BB@BBBBR@@FT@DE\\@CHIJJJEf`@EVJRiCADKHGPC@@FILBBCL@DA@ALC@ANUBAFm@BG@AWAI@IL@FDFJFDHcdYEAAMCG@GHO^cAERD@KbS@IDE@IOECsMQDSX@FAB@F@TWB@FS@qhVFClrHEZPDAPaAK^CCAEqOytLDELA@GPAVCRQFFF@BB@HFAJ@BB@DFF@HDBBDE@QNKPBHADDFCJFFDJED@DEFAB@BDHHBBDIL@DCFDDEPEFIDBHD@BDCB@BG@CBKBGCO@MJC@@EIGAAEBGIGAGDEDE@ADCDENGJG@ABHLRPFBDFFDJBADGD@BBJBB@FDD@JADDDADBJIHGDG@ABBBFDDBDR@JHDBBJB@HCDBJBDHHFHCHEDFLGHG@EJI@EFCBBH@FKBE@ABEAAGE@ECAECCSCIFM@EC@AEGEDCCG@EA@CAAMFICG@IFGLIH@JGL@HBBBDCLDFDHCNMJ@NHPVJH@D@V\\JBBDCDCRDHDBBHABEBCDBD@FVNDDHBHLAFGLKBCBUpBPCB@DQFBHDD@DEF@HDFBHAT@HCTDFTJAL@JABOAKB[@CBAB@XCLGVEHCNYZCBE@IEEBIAGBI@YHIJ@JLN@DJJBDCDKDEDLJBFMHCFUFIHKDIAILKFBBEFDHJ@JFNCL@JCHGFBFHNJBFFDBF@LNBMHBBH@BD@BQNADD@NGBDEHDBH@JGB@AFB@NED@DAHAFCXKPBTC@GJC@J@BHHRDAFDNFBDHNFLBZRJ@DJXLDDXA@HCJEDBFXFFJHDJ@CCNAJHFAIKLB@A@ADAFCR@JCF@FFJ@LFVADDFDRAF@JBJFLEN@@GBGOSCIDCVCdALFNBZECQBCT@LCCECMK|SLHJHBJ@LHVdA@ILAFANMJDFAHBNQNCBEHEDK@YQ`EXCDBDDLfLEXCAE@AbODIBArCRKRI\\STGVKVIPIDEHANDBDHDNBD@DHANML@BPPVTDBRBEH@FlJJFdJL_PBZV@BEDFHLNAhNPBDANBHDDHPFVEPCNBRPPDPA"
                    ],
                    "encodeOffsets": [
                        [
                            114172,
                            42326
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        111.670801,
                        40.818311
                    ],
                    "name": "呼和浩特市",
                    "childNum": 1
                }
            },
            {
                "id": "150200",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@ĔVfXDĈÀr¦jƠ´ǆPZAPNnrĈª`ªbHAqRG\\GTKbKLEdUjaJI^WbSrs¼áÆkXS\\eM£jÏIOFUjURYHOFWDqNWHOBKHDKHMXONSNMFKVWXc^mliNUL]VW`VaJKTOLMH]DCBAHMT_Nk\\ehuJIBKN@@EACJAJCFGhClYZ_TQRAVO@MCOgl_NGl_zSl@JOLKZEHVGTSNODcJQVOLWJWxuJUBSAYF]DaAUFIOc@MCEMEHOAMGOMKgKIGCKOOHIBINQbKNIJUAIDEAKBMEBOAgMBKMEGFC@AYUOAK`cIIEkI@EFGQACAUSOO@ANKBMACACC@MAGCACEAGAGBCFOJUJULSH[TQJQLqDABCJaP@BBFWDKFKeCCCAWD_FR@ZCLGFAFMDMRGAEBICMNEBKB@JcBGU@KAIIGKG{TLDNDFKDS@ADDRWFM@MGcBQBEBADDLPRAJBFO@KFIEIAE@QBECCCUBKEI@CEE@KDQ@EDCB@B@BKAHJ@BABE@EGMBDDI@GCEIYG@CFCDI@GWBCCWKCII@YQKAMECGEACMBEQCGG@A@IID@HSDOAWLEDGBCBC@MFA@BEA@IHCBGAFIACMHC@BCRM@AACG@AANGMA@KAEECAEMIGIC@GHIDK@MDIEK@AGFEAALEFGDCJBLCJGVEDENGAEKIHELCBCKK@CKM@IFEFCJCPCH@HAJBFAJFF@DAZYDMFGHUDK@WBADA\\@LAPBBA@IBKSICEDS@GBSAGCE@GFE@CCCAGRE@CDAAOVoDALAHKBEGKGACCUM@EACDCFABAAGCACGDQDCACIAU[C@G@UIGO@MNIDMCGCEDKACAA@GHK@IJGHKJEH@JDNEBB@DFBH@DDFCFH@BFDN@JETDDDBFFDF@BHFBBAF@LA@EAGDAFEJ@FIH@HGEKFCDGEGGGACAIDC@GIAAAGC@ICQCAECAABAH@HCJGAIBCCCBC@ICC@EAAAI@AHCBCIAECCEEAQOGKBAH@HIFMDCBCF@FCHCHBHJFABBJH@FD@NIP@HDLADAH@@ADAACC@AGJCFEFOCCDE@CJKACGACG@ABAFE@CFCCIEEDICEBCAGLORMF@ACCA@GEE@CAAI@EB@GAAE@EERDQBUHOB@FKKCzsrPBFDDL]bBBOOCFYqGDkUErgT@@EXA@S@EBA@ETWRCtNFDJPF@JCT@LaC@FQdBP]HGH@NDBBZFdcCGIECE@EJKJ@XB@BAHn@BEVABMD@BKB@@CDKAAJK@ED@HOLGBCjDIQFU_@FeIIJIDG[@CFS@@EQ@AAAAA@@AUIOGQABEcAKONCAM@SAAII]SiW_OI@ED@DD^EHEBGACAECEIEEseKCG@CHQLEDyN]AE@ABATLPRN@HCBsLKAAABER[FI@EACUMMCcCQBKHGRCDQ@KEODGL@FJNLJFF@HADSHI@Q@KBE@AABEFGACSCUBGBEFHR@FADE@EAYII@GDCRABEBEAMGSOKEOGIAIAEBSPCDAXEDMFEAIGCWEAGD[RIDQ^ABEBCAEICAI@ID[xclSPCBKIUiE@QNOPAF@DRTBFCHCBMAUSKCWBYJMLmrMLKDa@GDEHB^@FEDC@KCYOUIMASAIBMFCF@BLFDD@DEFMHCD@DJH^NDFCDUNKDK@GAAGCEiSWEKAEBKFIHABBBTBDBBFALETQZAN@PCFIJOLQFiJWDEACAOiG[GQEEIEG@GBebCBGAGGC@aFKDCB@HADCBSCeSEBUVIFMDG@ICKMOU@CJO@CACK@EBk`YJoLiFgBOC{_KIKCYEIBaPG@OEEICIEAILMDeAMAyUCAMDG@kYIAE@KNAFFLCDWBWAGBWRSJOH@DVl@FABGBOIIUEAGHINIHWP]JK@KAGC[]CAQFMCGEKMQYKGI@KBcJ_F_@]ACCISMFGF@B@BPNNPCLGHKDGJDHPPFHDHGNOLIJENNLfCHFGLKHgPKHIJEJGRAJAZR\\FRGbLRXNVDRJTTxjNGnSdCbTE`BRGdBXB^HDDdCBR@VF\\RRDtAJCLHTHEDBHJFDHDD@RGH@HADDNDFJFTADLL@HFBB@HPFLBTEJFDJENc`DRGF@@LH@VEBQKCBGDU\\KDOBEFIDCDIZAJEF@TCZENQNSFkJKFOAGIKGOBGJ@N@PSPO@W@QBMDSNIPAPBVQ`C^DLRNjDTFNTCZSRSLajIfINOHGLCXQXOHGJENATEFIB@FEBBLKFEH@FBFHFLBJLAJKA@DBDGJFHDDHBLJD@FCLMD@D@DFDT@@P@TFLC\\@EPCDHF@DEH@JALR@AD@DJDIR@ZSBEBATCDODYBCDONDH@DMJKLSJKL@DRBHDDHDNFLX\\FLDNDZAN­CuE_@[F{B]FCyNRRKR]HQLCHAHDFLJLTFJAVENIlGVO^AJARBJAJIHUZGNBVCLONQHGL@FOL{tppavCF{\\K^az[ZEJ@PDJHHLFRHrHLDTHNN`f\\J®Înx¢bVzrPmâQARkKTHJ@NIHKFEDGLBNELIHAHBPEJMDKJCJ@FFL@JALMVEfSLiJWJQJ"
                    ],
                    "encodeOffsets": [
                        [
                            112009,
                            43467
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        109.840405,
                        40.658168
                    ],
                    "name": "包头市",
                    "childNum": 1
                }
            },
            {
                "id": "150300",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@hPR¯RD^RVLFpNHhfprVTGHCI]BuFMCC[CkASMFUaKa[Y[CUJIDbCPR[AIGCUIEEAGJGP@FG@AQKG@KHG@CCBMPCLIDYPWVKd£HMGYDYNWHXMğ_w@[¨}vWeP_Ü´FWWY@aPKHKgcaÓ[qF}[CCE@@BC@CB@JCJEBCFEBECCCOBG@@INKCAIBGGAIECOACBC@ABAFC@OCKBIBAAGAEEC@GDADBDABEBEFQNKBIAEDILG@EACBERGBGJEAUHE@GBIAEBEFkNUNWVIRKl]vGbGZWRWLKL@NDLBJELIH@JDNVbDPG`@TJX@HOPKR@FJP@DO\\EJKJSBU@KBCFCJDBCHIRI\\CHBNTJDH@FSLYHUBOHE@}XSDCFAHIPCB[FKFORIDKPQ~@XPXNNXNAJDDŌ¼IbAHBHHJPFZRJJDH@FCFMFUNQHKHCH@PJVBNBbAVCPSVCH@DLHBZAxGfIP"
                    ],
                    "encodeOffsets": [
                        [
                            109312,
                            40816
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        106.825563,
                        39.673734
                    ],
                    "name": "乌海市",
                    "childNum": 1
                }
            },
            {
                "id": "150400",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@@EAAHGBGFAAGFBCKE@AEHAACA@MB[PA@GCEBABBFCBCAIKC@EDKCIAKJCKGK@CHGGGF@KEaC[OYBQF_BO@OCGMWUsKOSiUcMaUSI]FMHeLQMOQOGQI]EWISGiWYGQIKKDMJGLEDBD@HFDBBAD@JEBACECAE@CAAAKBHINQCGGEEACAG@KEK@CEG@CACBCAGBAA@IAADO@CBG@GBECOJM@AKGI@KIWBKKIEMCRIBA@CDEA@UCUBQDcPGA@EEAEEK@EEAEEAICG@IDIA@AFE@CBCEEDEIEQEGEGAGGACDGAGPE@IKACECEGEICADJBDFBFC@BHC@GECHABSCAGCCCEC@HKLABASCAJGHG@BEGACMFKMCECHETED@HBNAJCHKJECCMAGIYFoBUUYOMSIE]E[CIK@_IKMMOIIKSUkgCICKBINiNOAAIEAEICMIKCEE@CEAEE@CEEKEqBQHWFMHG@G@A@BHADAD@FDLUTJBIBABJHBFD@FFGFABBDF@DBEFF@BNNB@HFDJJUAAHCAGBEDHDAB@BNDBB@RBFFJCBBFCFCPNNBDCBCCAEC@MGSCCCAB@NC@EJQxELULAFEH@HBVALCHILMHaJEDGJAFDDJZ@FGXBHALCLGLMLaLABCDBFDFBJCRILQDOJGFEHAFLVEJUDGHCDAXENGJKLkXEDCFAHAVDFBFCJGLAHD\\HHXdBLBNCVAXAHEHEDI@C_DAA@CAAKAMFMEIBDD@BKACB]EAD@FADIBEDCBICM@ADFJCDaKCJEAGJI@GDGFDDE@ADC@ECEFSCKDOCKBCB@DABCDEHCBE@GHECABECE@EL@NCFAFKHHD@@cDIAEDAF@FQIIFFJKLIIEB@CEBA@AJG@OCCD@FFLDBAFTTHDEHADTDFDDFABJF@ZBNCDBFMDOBIDI@CDKEMLIDSLKLMDEFAEASCQU_IGgSUIWCCCISCCSAGEEEmCEAOGOGG@OHM@OEUKAEKMi[KEUAQCGCAEAEE]CGEGc]ACGWAAQGAC@CFCLCBC@CDCbBFCNADA@CCOFEHABIHGAKBEFATALEFE@CIK@QBAJEJKTEPDbBFAZUHCHBFCBAACFMJEDGAUGECI@I@GDAHE@IEEBIAGIEBKAC@GCIGIIIMUIGIMSMCEMCEGEI@CHGDKAIBICC@CGGAEFGFAH@HCFGBC@CCCKM@CFKEOGGKG@ADGDC@KNI@EEMEEEC@EBC@CMSEI@CFEGcCKACMIIEGCAEEAEQFMJGJATGFCDCEI@CCAAKKCACIE@ABADANBD@JKDI@GYMAEIIACBKFEDGAGTWCQDKAEGEAEHKCIDGBGF@JJD@BCH@@ACCAAJEBGPIFGDEAEDAFCDAJCJET@DA@ADANANMXALGXEHQOAAAJGHG@E@CIIE@QJCGED@CKBGFUCGDIAKBAA@ANQKC@CHCIG@AL@AGH@BIJ@HGFA@EAE@EBAFB@EFFDCFBHINMDIACM@DGHW@KAMEGSEYQEIE[@E@CDC@KFC@ECCICKDKISKuIY@IEBGFElUEQCCKECCBIR[HSCIEMKCEDCDCFDH@FANIBIGAKIUUE[CI@cDKACAGIAGKCS@WICEBOAOEIMCE@oTWHOBSAeDI[FO@SAaDUBoPIBgAW@UFUPGBGEGMGCEC]@cEK@KAMDMHQNo|ETCHLVBF@DADEBKAMEaIeMmGECEaGOECIA[CsNkPONSJ]BOAQC_CFMBWHU@MAUCW@GBGDGBQAUKOCE@OAa@SAICyGcMCG@MKMIEUCQF]T]`CJAJJJHFFBDEJYLCH@DH\\BL@JEHEHOLQRKFiN]P[FCH@HDDJD^BHBDFBFFJHHVZBFAFITEFCNEH@J@LJLHBBDALEACFKBECIGWBE@AFMLwHYJSNKLEPCPANL`@JAHORURQJWJKBSLBDKRAHBH@dENEFUJEFCFETPxD\\FHFPTXTLZDfCTBZBXEJIJQBGASDKHI\\SVCXHJFJHVfDLFJFZJVHLXRHJDH@JETDBBDBBBFBDCBGHMFG@UVQHEFADMLE@BFCBGDG@CDSHBDKB@@DBDRPBHDNBTHRD@HIHCFJFBFFB@DDBADED@TFNHFBHMFE@EFEHEBBHADEFI@ABMDeAIBUNIDEHDDxDVDJFHDDFAH@BTN@DADBDAFGJQDADE@ADBDIHGHBJADOHC@@EQLYDYEKCQMBMJODOK[SUUEIAYB@aBKDEFCHBHJHPDDANFFDBDCJ@HF@FAHAFBDDBF@XIJ[PqP[FGDEFENBNJPDLFJJNDLFVENURKFPQFSH[^GFMH[LeHKNCJ@HDDPJxVRDPDdRNJJJHJHPILaPSNGJQTMZALBLHLPPFLBPKTEJIJ[XsbMHUP]dUNIJSLcZQLWTCDINKXMVONgfOLKHMBMHILGPAJBJHFHNEBKJOBIAgQoOOGIAaQiKGFE@YEoNFUVYD{BMHWICCEG@GMGHCMBABGBCDI@CDJHMCeAMHUBWGAACIEE_GI@FINE@CCC@GECKKBCAGWMG@KGICKGAAICBECG@ICGKGVBTDLCDEBECMFIAGBCCA@AEI@IACBEBMQGOA@AEAECO@CCCBEA@BKAGBGAE@@BEACBIASBABA@AAE@AAAB@DECCD@BA@@BCB@BE@ADK@@BABCABBGBA@C@EACB@BGB@BAB@AA@@DKBABCBCAEDCACBCBC@@CCB@ACBCCE@@CAAABACCBCCC@ABAAC@ADAA@AG@A@AAGDGEGBABE@MBM@KACCBAIC@AABAA@AA@ABBDE@A@@ACAGACBG@ACEBICCHIAAAI@@BOAABCACD@DEA@BC@AAIBICC@@BB@CBCA@DEAADDBC@E@ACCD@CCBCDC@@AEBBBE@CHCCABBFE@@@C@EDE@@@BAACEBCEEAAGEEDACA@AECFCAACBECDCM@ABI@CCABC@@@ACD@@AIB@AEACD@CAAE@@@A@AAA@BBABMB@ACBABI@ACC@EBGAIA@BEEAEKCDE@GCC@CAABCCABACA@B@AC@ABBCAACABCG@@AAA@@@DCA@AEBAACB@BG@CBAAABCCCD@CC@@BA@BDCACCADCA@EAAABA@BEAAEBAAABAAEA@AICACGBAAABCABAC@CECAABC@@A@AAB@CGBBAC@@AACABAAC@CCC@AAGBCIEEB@BCB@@AAAEAAB@@E@KA@CC@ABAACAABAJBD@DDHBRFDJBBBCHHLBNFREPGHMNIFGLIPIHAFBDDDHD@DELCNEHFF@DAPRbwNSOMZkBRVyteC}FQDsLgF@EqaDKM[lEt@X]O\\zpPdFbZfZjbZVKClJdDzBd@RKxOVit_Tq\\kNOJMDÁtJVK\\HT©t_HatiFIfov[JDX²zD`XJd°rnºVTEtRV`ANºX®O²spu¶NRAFELEVD^JDADDB`CFHJAFBDJFFBFCD@F@DHDEDDHFFPDDBHDBBGJ@BDBCD¨TVEZR@èä«|]¬AJxV_tZpUZbn`PBXU`§fShV~nxz®z|PT\\xȸ^bIp@ZGdBRMHGJEHGBEDCDGFCBCDA@C@CEGBCJCRABA@AHCLEN@JCH@NCDENA@AACDE^KVOUgEEDEHABEBAHGbL\\ONQRADCDCBEF@EIICEEIE@OIGIYMGAEAIAAGAGEACHMNGVGTALBHAVGFCFCb@HAHCF@FDD@DCRBDFNHNBHBNChCNDBBBHGHDF@FBDDBTDHHADNBTTHPfJbFLLBL@THNRJbZjP~QjA^C\\Q^B^FpIPETLNR\\HRHVTNHRGNCZ\\lXJTOR@PNN^AF@DNLBFAHFBH@HJNPFBN@HBDIACCGJED@PANQXFHFADIBMHBLAHCDAFBHABHH@HDJGJIFEJIDADBHEBCHED@DFFJBFFJFBHFDRHBEJAJCbGN@RCL@F@CDBFF@LERAJEFAHGHBHCZF`N\\CROTEVH\\NHP\\bXFPE\\JDJBNELB^FTX@VDHJRDpFVDJJDPC`RHtJHJT^JJZDZANGJS@QP@¤VDAFHFBfJZJPBVKRAFEDEDAJBBCXVRHX`PLXFNTP@TCZBJNPFrJJL\\R\\BZH\\NRRDNAbN`HnHDEHBB@DDDBDFDBFHJ@DEBBHADBDFD@JE@KJAF@DADADE@ADWBADBHAFBHBBEDGLEAEDKBGFAFEBGBEHEAKDKEAFHJAFBDCDDHLDLAJLLFF@JAL@DBDBDCJCDGJGdKVBRAXANEVBFANDJCLBHDAJBBHBHAFFRHHA\\BRHRAHDRALD@DDJ@F[HSAQBHDBDND@HEFAH\\CXAnBRb[JCJORAFKHAFEF@BDHCF@BDFALKHICCHKBCDCBKCYRAFQ@AB@DABG@CFYJDJ@BUJAHBFDDADFD@D@PDBBDAJABDHBDDBBD@JADGDADBFEHFD@FDFJHNKLGDBJAFCHGHA^AZHND^GTBNAPE`EXIPAJ@@HFBBDCJADHLAHDDQHINKAGB@BADGBILEAGEIDOPCFI@FD@BDFAFEBBDAJMBEACNOLNFBFCFDJHB@FFFFDFAVKNCLGPCBCHCLFTD@BCD@HABBBFB@DFHFBCHEBMJCAKAODOHBDFBHFF@PHPDWLQ@EBECE@GAK@BFGDCJGFSRQJALABJflrHFDF@FHBJH@DFBBDHFDHH@NFDERM^EVGNCHANGHBFCD@FCBADCHEBKCEFGCIFG@ECAHC@KR@JE^@BCBANAFEF@LAFDADDHTHBBFJHFFB@BFDBFDBAF@HFF@DABEFAHAHADBFAF@FIJMRRHAD@JCDMFIHSDMJMAIDSL@FIF@FBHFXDFNDDJBJEPADLDJFFDHDDNADży`{DAqr[TOBCBABBDCBB@CB@@@BED@AA@AB@@C@@BCB@DABAF@DAAALCDAJADEFCPBJADA@ABC@CNEDERGAAFE@CFE@EFA@GD@AADA@ABCD@@ADACCDAACBCBCBAFI@CDCAID@@IDCAGDAAABCVQ@EDABEFABEB@@EB@@AB@AAB@@ABAACB@@CB@@CFADGDBDEA@BAAABAAABAAAACB@@A@A@ECAAC@CF@BAAAD@FAAEDEAEFACABE@CLQFAAABAJCBED@@CDCBIDCDADAB@BABA@@D@AADAAEDAAABA@ADCA@BCDBAAHEB@DDBCFAH@@ADCBB@BD@BAB@@@B@D@@CDAFBD@B@@A@AB@BBBCD@AAF@@AHBDCF@DA@AFCJAHB@AJABCF@DAB@DA@CH@@CJB@ABABDDAAADB@CDB@AD@@@AC@@B@BABB@BFAAAD@ACB@DABCAADAD@BCAAAADA@ABC@AD@FID@@AF@BCJB@AD@BAB@J@@AD@@ALA@AFADCD@@A@@D@DCB@DEDB@AD@AAF@@ADAAAHA@ADABABAB@@AHBDAB@@A@@DAAA@AD@FEAABADCBBBAAADAAID@BCFBFCACD@@AF@@CB@DGFCFEF@DABA@CFAB@ACFBBAD@@CJA@ADABAAED@BCB@AAF@AABA@ABABB@CDB@AF@@CBCDBBAF@AABADBFC@AB@DAD@B@D@@AD@@AB@@AB@@AFAAAFBLEBA@CHA@AB@HEDIDA@ADA@AA@D@ACBAA@@CA@FABAC@B@DB@CBAHAACFBCCBADB@AD@BCBBBCC@FC@AB@@AD@BEC@B@@CB@BBD@HC@CFBDAAC@@A@@CA@@CD@B@@CA@DCDBAADAC@@AA@F@@AA@BCD@CAHCCA@AAABAACD@C@DCCAB@@CD@CA@CCDAABAC@FA@EBAA@BELADEBIFKNSJILG^MZIFA\\KVCFBLAJBBAAACECEACCC@AGEEIICCG@EEMFMHEDEBARBJDF@HCBABIPEHGLCHaFEXEN@DEHCBADABCH@@EFOJIbGLBF@PI@CAIDEFAHBFCDABA@EDCAIGCEE@CFEDANAFGHCACBGDABEDAGAFEAAADICDCKABACA@AHDDCFB@AJCBCCCBA@AC@@APIE@AAABECJEScxwIBCGEDCAEECFE@EBABE@KFEAGFABKFEBGHCDENAHEBCHEDCJEAGAEIA@@hstq`BXA`YNhJDIXkb@PCZALDF@PB`BDATWDCIELV[_S_ASuM]gAs£FQLI@LO^UFWM@i¦sN_^Q\\SbafMfwFENQbDFKACCCWKIIEIGCQ@ICGKBKACSKkGYMcEOESCMGQICAICkW[UOASHCAYIYACAAGKISCIEKKQGCEIMECEAO@EAQICGIGEIDICQCEDS[YGCWOWCICKKWKMKKEEAJQ@iC]KMIKESAYBYCOIKIMIIEWEUIIEIIXB\\AT@fHP@F@HCdAZDbJN@TGRBPDVJ`LNBb@bHhAP@HDbRlDZP`@NJHFDBDANKH@BBDHNHFDZFOKGQAKAGGASCKGMCGCEEKCQKIKGCGSAICCI@QIGMGKECMCECAEBEKM@EKEI@EGG@ACEKGE@CAEE@QIBMEEIAGCI@MCUUE@IDCAAEAKMKGIAKCIMMOI@CCGEAOAGEIEG@GAMMAKMEOOICCEEAYDIC@EDI@ECCQACK@OISAQAC@ADECEOCWIEECESISAMEBKEIDED@RFLC@E]GA@BGGCEDIJA@CFAAEKA@GFFJGFKCOO@EACYUACAKOKCEHM@EDIRE@EAG@CEGPQP_XiDs¥dmWMS]COHE`QPKQI@I@CPHJqf]VBaBEjyJOH[T]PgDQHY`cDGN_POBOHABED@DBBFGFBBD@LCDBFC@UQBGAACBCXEDcEC@ER[CE@AfEVIFOMWtuk@UPGJQFBRCD@FCF@BCAGDAicCwSGMEEIGBCFI uBGJGHQPE@ADE]OLEFEJE\\CNHDA@A"
                    ],
                    "encodeOffsets": [
                        [
                            123785,
                            43285
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        118.956806,
                        42.275317
                    ],
                    "name": "赤峰市",
                    "childNum": 1
                }
            },
            {
                "id": "150500",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@DFAHFJG\\PFHHHFXDBDJFT@PELAFCD@XDVJDA\\CXBDABCJ@HEFBFDHEXAB@DENJDAF@FFH@HHB@FGDAHAL@DBLEHIHEBEBAHAHBDFDBXCBERGJ@HC@CB@RIH@NKFAHADCPBBDDD@DBBHCHBF@DB@CDAD@HAR@DCJFFADEF@FECODCDABCFC@CFEDCDCFA@EDERAD@FEFDLABDJ@HCBADC@CFAD@FBF@PMJABAR@HAFICCDIAC@GBAJAFOEGF@HC@CFEFDNAHDDA\\@FA@CDAR@LAFBH@JDDA@IDC@APKFEBEJ@LFB@HE@EJCD@LG@CACNEDC@A@CDCJELCECBCBGGEAG@GBEDCHEIE@EEIBECEHEGE@CFIAEJCFEF@D@JDLCF@BCH@FEFAJKL@BAJCBCBEFAJABA@CJAFEJGJ@HEHATOFIDGDEHAHEH@FGJAJE\\OvQfQhDJGJ@FCHBJCJ@JCVCFCFHJAHBP@FKAILuHBDDL@HCJ@FAJ@JDLAD@J@HAF@BEJALMF@^MJABDF@HCF@HADED@NFF@JIDGVGBC@CHEBEPEFECCGFUHJMGAHQ[gBEEICEIBGCAC@CbKNBFDLCFCFB@GHKMGDKCQDMKQFABELENKFGFOHEAIBKAC@EHATMFG@KJCDGJCFIFAHBJDFFJ@HEDGPO@CJCHCJADAH@REDDJ@DABCPCBGDC\\K`ENCJ@TCFB_LKfCÊHBg|ujAfSOAgĶÏJy\\q¢OJGDQcMhmAQlkJAZcPK^AFU|a¨XUfcNcXDZARChQª§@OMdKhcbQØoZQITMTCJEÀROXAt[BA^KPCbDBĢBRFlVtJjJpNbLVD^VDNV`rpZVjbbLânRJJFJDbRPFlXj^TFbTp^THFFlZ`NvNb@zFV@D@RGAAHCCQFG@EMQIANQFA@IDAQGG@d{IYC@BSU@UE@EFKVwIB@ERCbAjWD@DI^ARB£VACNFBOJWdI@CDIJEÀeHBGGBCEBCM@IDGkQCCCS@AGM@EAA@EKSFIGIEAEHEEGBKI@EFOCAAAJIEADCGAFKUGDMH@BGBKAAHKlONGDABCF@BIFIsICGAAAS@KIB@K@JIN[DBBDFABCPFHODEDIH@BAF@@AACHKF@@AD@BCFDHA@QBATaBECEDGACDCFSTBJGA@@ED@@AHK@EAEBEFADCAWBAKG@IBCAA@G@CBEFABEN@BQA@@CNSHCIGF@JHJA@EFGB@D]A@MA@IIC@cGEBILMFCLFFD@ACCDAHK@CDA@ADABEH@DED@ACHEE@ACDABDDAAEACDC@CHA@C@C@GIGAEDCBCDAACDGFE@GDC@EFCDCCGBAHAACECHCCAC@AE@CJGCEKEBC@AC@EHI@ACG@IC@AFC@AIA@AFEBCKG@AJEDCCK@ICCGBSEIAIBKACDC@EAKIE@ABADBFABKDQBKDCDBDABICGDGFCLED@EDECKBEE@ZmJD@DPB\\WBE@ABAKSAKCCAA¥\\RIAKKUASD_p_GYS]hU|DFIPCPMJOBG@OLOf_LapVBFGL@FDLPLKJOFMVYRSJGPFZ\\RMRSlkrUĂHBE@IEGKE@AN@NFXAA@CCMACC@AHIACEAGDCEBE@A@CFAL@DCEESEBEHGHCPBBA@CAEEES@I@C@@EBA@EFG@CAAC@IE@CDGCMFENA@A@EEAGAKDGHC@KGACEAK@AAGCCE@EBGHG@AHIFKACEAACECA@HG@AJGBEKEM@EBGAECICEEAA@IDE@CLGBIHAL@BAFG@CCCBGCCICAEODCACC@E@ELI@ECEGC@CCCAICCMCAE@EDMFCCEEAE@ACCADKDEAKCAAGCABC@GFIACGCBICAA@ECK@AC@EMECCAGCAK@AABGFCREDCBCGGIAECGCCACKCCGBEHE@@OJIGEAAFCJC@CECECO@E@ACDGCCEBAH@BG@AEGBAH@@OE[@CDIBJBAFI@KLQH@DFDQGIDCCMDGLEHSLIBQE]AMMMGK@KDWAGIIEgG@CWGgGYAGAC@WIEgG_YGCIMCGBEGGUOQ@GCQUKIIMEGJyAOCGGEUiAE@MZKD@FDB@HERCVINCJGF@@AIKKDUEQ@QBQE@@DGKCCCMG]CgM]ASMI@OIGBGGGDMOKCIIMA@CACK@EBCDUEIAEDE@EDEAGBADEBGCCFEAEBIAADIBABQAQQCCJGECSIMCC@GJEKMPMRED[A[@]ACACKIGAOLB@MGDKMDAQQQKAGKMLECIQDFHCFDFCDA@CCE@C@BJG@IAYTAD@FKBMHEEG@AB@FEJMJ@DCD@BKACDGBO@GD@DIJQASHCDELANCB[AaGODWES@OBSBOGiKOLWFMFI@MDMFCNGLIL@BLT@BGFQHWDW@cFKDMBGDe@uHW@UFO@[AcEwCYAECIGAI@GLSFSFO@KHGLOFCPAT@lCbAPAJFF@TDDAFUBKAEICWGECAOCIGIUMcMKEGM@WFMEEaAO@IBKACA@CUEMKGAEDBJAFUJMAICGRIBODS@OB_BEBADALQJMFGNURWFM@GDACDQFKBIEICYBGAKCCICCABTADABG@WEKCKBCDA@C@BCCEA@AFEBC@@EA@QDIDM@ABDHCFG@MCYLQBE@GTEDYGI@AF@BDFAFQFE@OEEAAEBEEESEUACGEEI@cJM@CAACAKMKADAJGFOBE@EACEDOACO@[DCACEAEN[AIIACBGFE@GEEGGCAAJIEGACBIFEACCCE@EHGBICCIDCFADDRAD@BCAAGCUCCCFGDCFEJCNIECGAECJOBIECIAGFAFAFIBGC@ADABEPGBCCE@EBE@ECCCACGIC@CIEaMECACBCCE@CACBIDE@CODBLKHC@CCACBMACIGGACFCNEDK@ECAGIGBEEI@ICEAGSIIB@FHLAHEDKIIECEEKIGM@MCIC@AEEIBGCC@EF@GCCEGCA@EEEWU@EIMSOC@OGUEQFO@C@ECEASLIPEB@FE@BJEDCP@HADEJG@KGGJOFELOHCDCNNHDFAHCFA@CAAAKA@CACM@BMQIK@@ADE@CCCOEG@ADWDkKECGJI@EFEBAAAGGGG@CBAHGJODI@IDIIKI@ADAIGYGOBIEEBEAKFAJGFO@AAFMCAGAe@IACAAEBQAEBC@GACMBKDMJEBG@AGEAABAHE@CKMI[KaGEEGADIFAHADAQKBE@GESIMSICCEGUGECMEI@IFCBCABEJCUGYCM@CDICEC@ICA@CMEGAACECC@CAG@KEAGFG@CGG@GEEE@QMIA@CCAGCE@GCA@@EFCCA@CE@AKCCCBGAA@BDADKECKQOAKM@QAADCDEAYGW[EMGKKBGDEDOFaMNIGGGBCEGDKDGDOLA@BBHDBDCBS@KDCDOEMDKAEBEFG@CB@BBFEFIDI@YHEAGIaCGEEAM@QHGABCCCCF@BCBMG]DGFEFID@B\\PCF@BOFGRIHAHvEJADJHFFHNTDxdjCBBHADE@EDC@QDEAIROH@VlsvNXEPUJeF@BDFQ\\@FFDCdWFADBDHBRA@VEDCAKDC@AAHEAECAC@AFGBAPOPM`CH_dGZCROhS^G\\IPizAFAbUe^IrOG@D@JRJOL_RGFDPT^XNcnt¦CWjO`ORFH@DBH@FQFCJ@FGNDFPLBLBDZVBD@FPPLDHEEIHEB@FLBBDEB@JIFCHDAHB@^H@FKDQEC@CFFJALNFTBTJDFFFXJPDDFCF@BBDBRJT@PDLRBDD@FCJ@FJDZCFBDFJDPPNFBLNNHBH@JFHFPBFBDH@DPJNNDJBLHJNLBLBFDBJCF@VVNDJ@HDJBFFANRJF@BF@DHFFLBDH@FHJ@LF@FLNAFBFFDNDFDHLHNRJJ@DDBJHTHDJLRLLDFFHDNDLHTDHBBHBLHRPLYEECMGCGAAG@MLCBCAGEMI_@YOkCaQGCO@gBaGa@MA_KUIOCQASHM@aIYCcBGDE@O@eGS@[BWAJJJFVJXFJFNJLJPJZDZATBLFNJ^LjDR@IFBLFNLXLLLJDXDXPHD\\ZCTDFDRCJFJJHDHRJFBP@FBFDJNDFRHLLJFTDLJBHDBZBZJDBTGPB\\VlXJDDBRJNHTDPFdFZNlHTLBDALHLJDT@HFBFLLXLFF@BELaCMREFexeNab[T]RM`¥t@jXNE]VKP@KJER¤Bt^hvNBTT``U\\KFJCDSXc@OAE@KCYBODa@WlCJgIM_ZWB_Asrgt@@JBBFBHIFCDGFADGFMBCFGDAHEFALEBBHEF@LAFAB@FEFFDBFCDHFADJwxTdIFFDBABBF@OJ@BD@@BABDDADID@BEACDGC@BDBABLBCDJDBCBBEFHBCBAFCBAHBDGDEHMBCBEF@DFFHDBJCD@FABCBEDGAEBCFBJ@DOJE@KAaHIJEP@FG@ADCBABGDCFM@WFEFGbKDGHOFAJABGDE@ICQAABCFGFENFN@FDHJDFJHF@BDDBDDFDFBBABIAKBEAUD[LEBYJ]NKHIJMTELAJCFKBAFB@AB@FEBD@ABBBDC@DDBC@@DA@DBCDD@C@BDABBB@BDBGDDBC@ADB@@BE@B@@BD@CBBBCACDB@@DA@C@@DB@@DB@@@BDCBEA@DGDC@AAA@@DA@D@AFC@@BA@@BEDD@ADAAADC@@BCAABDDEABDGBAB@DCAA@D@ABEBB@@DB@ABBDC@B@@BCB@BCBCJGFA@@BGB@DABKFEABBEB@BA@@BA@@BC@@BC@A@C@CBA@@BEDCAABBBE@ABCAAD@DE@@BCA@DAAAB@BABBBE@BBA@ADC@BFABCB@BIB@DC@ABEABDA@EB@DABCBE@EFEDCHA@@DE@@BC@BDEDEAADC@BJCBBBABAACDABBBEFC@@BBBCB@@@BA@CBGA@BA@ABABCB@BGBBBCB@BE@BBC@@BCACFA@CDC@@@@BC@CDEB@BKB@BC@@BI@A@ABC@@BIAADE@@BC@EJC@@BAD@BCBBBBBADC@CBBBADCBA@BDC@BBEB@AAAABA@@@BD@@C@@BCA@DCABBCBACAB@BIA@DG@@DCBA@CBE@ADIB@BGAIBED@BCBE@CDGA@BE@BBC@ADAAA@@B@BA@C@EACB@DC@A@@@A@ABC@@AAACD@BG@EBADCCA@GFBBCAADB@CD@BABBBCBBFCBBBC@@@ABABA@CBCBCDAJCD@DC@AFIDABBBEBMRBDAFDBEBBFCFBFEBC@BBABE@@DBDDB@F@B@BA@BDBBABBBABBBABB@CFCACHEB@DA@@DA@BDAB@BA@BBA@@BA@@FA@AFEBAFCB@FURADBBCBBHCD@JC@BJCD@DEJABADADBDCBDDCB@BC@AD@BCBBBC@@HEB@FEF@DEFBBQHCFMF@DCHEBE@OAEDCFIBCBKDBBCBE@ABCBA@AD@@@DA@@BBBC@AF@@A@@DAACDAAABADSPq\\rCB_|Żz_Mg^­^f¦ÂK¬ZH_vþČÀÈYhhhøĎFAF@DACCBALBACBAACL@@AHAN@DAB@@CHCJFBBHAB@BDHDLBLBB@BCDAL@HAHBDA@CJ@ACTCLGD@D@FMF@FABAAADCBBF@BBNL@BJFJBD@T@B@D@D@D@BBBADDD@@IGYDE@GFMBIEGAEEACA@EDC@AMKJGBANADEL@FEDBFHHDDDBBFEF@RGLDFADEPKBGVBPAHEF@DBBFCJEDNCJ@LCFDVPBJCFBJC^KTQP@DHJMGI@KBKJ@B"
                    ],
                    "encodeOffsets": [
                        [
                            122875,
                            46647
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        122.263119,
                        43.617429
                    ],
                    "name": "通辽市",
                    "childNum": 1
                }
            },
            {
                "id": "150600",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@AEEGQEI@OHKNCDINAHBHBFT^@FWPE@CAEEICAC@AACOAEHAJDFFBBDEH@HCDMJJTAPRFHHJBFAPDDF@D@NNLHBF@FCHB@HQJFJDPBFLFP@BBCJBH`TDDFBFCDB@DEBFF@FH@@PCACD@DJ@DH@FFHGB@DFBAJFBBBCJBBWNCDCNEDEA]QAOAEMGSGQAGAOBQCI@GDgGCDALBDAHGDO@CA@CPE@C@AC@AFI@CA@IGC@AGEEAMBGEMCCC@EIKUMK@@CEEGCMGOFICQAQIK@IESD]EEAMSEEGAI@GCGICKOMAA@EACOIBCAEKKKUMKBCDCACGAKGMGEK@EAESAEG@ISUEEOAIEKSMG@AKGEGKKCGBCGCBGCEDC@GAEBEKGC@CCFE@EAEDI@COGAC@GACOOQSECAC@AMCOIEBMJQFEACCABAAKACCCBG@AACBACE@AACBGAC@@AG@AACB@BIBGFEFCDCBIAIFIFCHGREBIBKRKHALEFDFFDDDEFMJCDAF@PCLabIF@DKDONCBCCIBGAA@BIDIACYQKAUBQPEJCDKD[H]@ICAIQYGYTIFC@CCCKAEEEKCCYMSOKCEJAHEBADEBBFED[JOLSFEHIDEHIDGHMHEJIFE@@DQLAHCBBBABKHGLOHGHUHEDNJZRAHOBqCIHOR[NK@IK­bMHBACEOEIEACBIAIMGAAF]BOFUJODAT@TBDAJGJOBGDEFALSJMFIDQR]HQ@EFOH_HIHEBCEAIFSAO@MKWEKCEEEAEEKCU@eUMAM@EAIGICCCKGCCAIAAG@GDE@GCOGYEEEMEmEQIMDMCGDI@OBI@EAMBABC@MRGDCHCBAFGJAHGDAFID@FGHKFADC@KHKPIDC@CCCEYGIO@KCAKHCA@AFOFGLIFCP@JDVIFCPSRMVIJG\\MJG@CACEE]SEAMGSGCKGCOGMISCBK^]\\gEEy@IJGPQH[HQCQMCIIKCAeOkmC@_WQCIESQKO_]KOiASkGEeHMY@C^SJGKgHSBGOEIKg@EEKEKKKIIEKOO@ADEAEEBKJE@CAGCEEOSEE]QEEGCYOMMG@ibSTGDGAIIKGWWAAMAYWcUMKCIBG@EyiKMAGGgCGKEIAY@MCaGaICEKU@OISDMBEDC`YJGRONEBC@CIIcSQSMKaHqhKDK@WOWUggQMYWKGOMCEAMOUIQIICCUI[IIEesQOMCQIWYECQCOIEGIEUGCC@GLODE@UEYCEGKIG{eQGe¡MKMOGWQYAIAEVUJI@CS[QSEKKGMCGE@CL]AGCIBMJMb_²gJQQqSWjwAIY@gAQqIMKIEEFOBGCAUISFG@SIEGBUAGKYAAIAMAcQK@CBOPINCNEZAHeZILStAVWZ_XQFaPq@QAdNOJW@MCKIMeEOCG}@BWHSH]AO_gCKBkNgDQ@OMWOKSCQ@QFQBW@SAMG[UMmMaGQ@QD©zePOBUUCoeKkEEOBIAICMGMEIAeBSHEFGNIRKHYFwDWA_E[KEEGOIMIGIA[BKEUOMCY@KHMNKFOFJIDWNIB}EEDQ`@BT^FZCFMNAD@ZCLINGDW@ABBV[hDh@DP[RMDBBQDWHK@KI@@^MLID_DGECAaJWB[JLULifeLAHLLEFO@C@MYuUC@WPÛlve^KNGFe@_EQQ}PMLADLZpABIF@FCFEDMDiFKBEDUbOP]VADCPKFOLOVCHEFWLWHM@_BULaF_JOLIPEJ]HWRCHQPCDC@KECASBgFGJGBCAIKKKCIAMGCICSDOCGDE@CAEGA@SHIHEBKGCGOMCCM@IBQHKAIBEACKI@ÅVRaNQ@UFSHOFsJaHLUHaRUVYTQBeRuNQJODgHUBYJu\\ZQL]bQRGDUHADG@YFAFMP@FĪÌJHZlpVdFhVĞĜNV |drXZFLRXDDFLhl`^vf¦JPXÌBRI|JAHEPMFC@EDCHAJHRBLCPDD@BEBAD@DAPBFDBJHHJADBML@JH@PADDFDFADEFADI@IDAD@@AF@B@^E~\\rbÔhdGLOL@bXZEXÛ³O`fuX§~@\\`xNĠWGMXCZHZGNc¤ULOXCZKJODAH@FDDH@LGH@RL@BEHO@IHBHFFVJHDBJQ\\OaDCIJDVZ\\b\\bLEVTNlB\\DDDENAvJ^GDHUSoqeGgoMKEU]QQCQ°gOcdKRCRGRARBHHJNDLL@LMbGFBfAT@NDLAN@PEV@HDbBHJJ\\LTRNPTPPFPBTJPPNFXTLVDVFNDBFTNRNJPJLDPB\\@NFTXNL^NHVHHHPF\\\\ZNPRbTDFDJF^Fj@J@JNRJRDDPLHBdDJDRfHHPBXBJDHDNPDDDBNCTGJ@PHNNHJBVEXO\\BLEHIPANLTDNFDLHHHHDFA@ABIBADDP`TX@Lh@NHTEJBJFJCPBTFBLHHBH@TARG\\M\\SPCH@H@FDDJD^RnRVDHNXTlBDNJLDPAHCJGTEZFP@xMX@NBRLPPXVZLlJPLLHFPHJPNHFTDL@FCVQPCLBPFHHNPNN~bBDGTLZJHfRL@jM\\OZKZ@NDNJJHLZBJAHG\\@PDHDDJ@NCRINAF@HF@FINERBZDLLNLHJBTBNAvOPAXILGHKDANDRP@BITBHDFHHJFZHZSbOZO`@\\L`HNFJB\\JL@NGTMPQBETAD@LH^NXAZIJEFARDFHJFDBF@\\IPAT@dFdB\\@DB@LDLBDFBDBVETKNGhEDCDMCSBIJMHEXIhEH@LRCbGbOJ@LBPLHBF@\\SFAjCPBJAbKNYr]XGNQBE@CKWBCFABDALIFAP@fBHCJMNGDE@CACEC_EEC@AFEJKFCN@NJHBHAJClkBC@EOMAEBEJGFAF@ZF\\ALGDIAACAMC@ABCLCX@LPCNETMbgDCH@HDrJLAJADE@GCG]oAGAGDQFGVOR@LBJ@\\FDBBNFHFDN@FANIPILE\\AhLzMvUBCFMNGHAFBLRF@bSHADBDJHFVNLDHN@RAJBHBDBDJH@F@LKDG@SDGDCjBfHJAHADCDIJKDAF@FBBH@HEJ@DDDJ@FARMFEHSFCH@f@TBbHB@FGBG@ICYBON@BBDFDJFHLHT@RGPAVA\\BRDLFH@DCXeDEJCrGR@TDVFTBBEACCEEE@GHILGHBP\\DHRdHXJVFJDD^B`@`EdILAJ@LHRZLNHFNDREDB\\^HDDBT@^IXOJGJMHGFBJVPJHABA@EUk@CPGTIXQHAXBXADCEKBELMF@JBlZH@NCDBzVNBfBNCJKFBDJFJPFH@bOJAZFLDLJ|`PDhAjEpKZIl_FAL@BD@DIP@DPVLNJDH@NCJEVUFAfTTDDABC@GDALCbED@HHHBDAfaHAH@JFFFHRH\\PjDBFBXCZCbKPKJIDE@OBMRYFSBKAECASAAABAJGLEFALBXFjTDFBHHBL@LCVMDCCE]MIG@CDCNGFE@CCCKE@ADENEJATBNBVJZPLDD@FC@EA]FGHCb@LCNKnqNKZIXALDVTNBDADGAEQS@CBEPORMF@VjLJDATOdk\\wJCJ@DBFJDBFABANYFEF@^SHCDBDBBVJHFBNEFCBWDCTOFAJBJBPHLFTPNHFBFABADQHCJ@ZJFBF@BC@EGQFEHAVATDBDEHAFBBF@LAR@J@TGBC@GEEKIIM@EHKPCLFR@DCHQLGRAdDNDLFLL@FEJQ\\AFBBLBtKDA@GQMIKACBUH@^BzMVKBCDGD@JBFBtfFFFJJFDBJAFGC]@CFCJ@`PjX^T\\XJDFBFE@EEMIKAIDEPKD@^@pElKRG`M\\Q`Oze^]HIDQBCbSWlAZENGDET_NKNQRMXQNMJSRULYRWDCLBFAHEFYFGFK@AEC@CFI@Q@Q@K@QHWDgDEFCRGBABIAMHIDCAKGIAEBCHKAECEYECAOYGSAWEMBGFGBC@OCGECC@UBE@ACACLY@IKIWESGCCAC@EJO@GCEMOGKII@CBKHIBGASBKXADEBKBCDAXEFCFEFOLIFAPCFCDEFCXIHCBCAEEAG@OFEAAEBIXYDG@KJMJCXAFABCA[CGEAC@GDITKFMBGEAC@EBERSDI@EISAG@UCMMWGO@EBENKHO@EEQ@EIIECIAG@E@oQ_YQW@IBIAUCOEMMK]IWAaD[CECEAG@KH]FIAICSAEAcDOHCBEAMEWCM@MFKBIEOMaICC]kQQAGBGLE"
                    ],
                    "encodeOffsets": [
                        [
                            113793,
                            40312
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        109.99029,
                        39.817179
                    ],
                    "name": "鄂尔多斯市",
                    "childNum": 1
                }
            },
            {
                "id": "150700",
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [
                        [
                            "@@\\@PBJHN^VB`CVI\\A`DfIZMPMJONKd]DARAPJLBjBrAhPH@JFPFnXFLLhBFDBPFXDRAlCQVAXHRJ@DAVBNHJb`HDRFRBPHJHFLKbGJQFMDCLTJ@NHNpNFJFNXNLDBhEpFXR\\^BRAHGZQfBFLXJH@RDLJFRNXfTFXAPCBS@WBCdA^FJDR@UFFJNLDRAnQPBHJVBNEdgRITP\\HZDRKRGLSFCAG@IDMDANGBADAFCF@BAJCFABCD@@AHADEF@DCJCBEJEDC@AFA@CNAHGNI@ALCBCA@@AFGREF@BAFAFE@ED@BCB@ACH@BEHA@AJADCBEH@@CLG@CHAFGF@JC@CD@@AFA@A@@AABCFABADABCJC@CFAAAHIAABCFAFEFDD@DAAADACABAHABBBAB@DCCADEFBBADBFCD@@CCABA@AD@@ACCCBA@BACAB@A@BAE@B@AA@@EAB@AAB@AADC@AF@BAAAAAJC@AD@@BD@@AB@DBAAB@DCB@@AD@@A@ENE@AAA@CD@B@BBBABAA@DACCDA@AB@@ADBBCB@BCAA@A@CB@BDB@BBBA@AB@BCDB@AB@BAFBBABBBAAADAEA@ABACADAGADCH@ACB@CAB@BCBBBC@AA@ACD@AADCL@AEDAD@BABBB@@AB@@AB@@ABBBAB@BAC@@AACDGDBDCC@DA@AFA@ADBFCHBD@@AAA@AIADA@AFAL@AAD@BCCB@ADAAAD@@@DAC@B@@A@CBBBAB@@AFB@ADAB@BAHA@ABB@@F@ABFBD@CAH@DCA@BACAF@AAC@BA@AB@AAHABBBAC@BCA@BABBBAA@@CD@BCD@CA@AABBEAAB@A@DABBDADBBEC@DAAADED@BCDBCEI@CCF@BAAABAHBDCBBB@D@ECBACAHACADA@CDAF@@CBAJCBAC@@AH@@AC@ACBEF@FBBAAAD@ACBAF@CAFA@AF@AAC@DGD@DBAEJABCFBDAAABABB@AF@AEBAECBCAADAAEFACAF@@@AECAAABAC@@ASKBABA@ADADA@CF@DD@EP@@CBABB@DF@DAFDBCHBDABAFB@@CDBBHCBBDC@CFBFABBDBF@HBLA@DF@JC@ACA@AD@FDJAFEH@FGCA@CFCJDD@BACC@CDAF@DAACEA@ALMAI@CJEAGLGIKJGJBEC@AFEJABCACIBAABEHCBEIBECADCB@CFEAAEBAA@@BCHA@CCABAHBF@@CBAZBBA@AEC@ADAPHFABBEBBBDADEB@DDDBBBJADCHADACCE@BADA@A@AHFD@NE@AGA@CEA@AFAHBB@AI@AH@@AGACBAALEJAAAGABAH@DBJALHVLRNN@HCBCAIDCFBDJD@DA@IGCACFC@CGCBEFC@ACAM@AABEAAG@AAFEHAJBBABCCAI@KDCA@AZIVKHGRCFBHBFA@CCAMGEEC@@CXBLCNBBA@AIE@ADAVIRDNCDCDGACEECAGBKHE@EA@CDCFAH@FEAAACECEBCHC@@ELKBEWMAAFGBKNCHAHBBAACA@KA@CFE@AACICAA@CNCF@BCJ@@EDAHD@DFDHBDA@GACAECEDCH@DAAAAAO@GEE@@ADC@CAAO@AIKKAGBGAOCEG@ABDNCBCBSGIGCEBQTO@GAAOAABCFCHCBECCCECODC@AA@E@AH@JECCEAEBCABGAGJEDEACGCBIACS@I@EHEDEH@LBDBJ@DEFGBOBCA@CECCE@GGWOKBAZG@CCGECMGYAS@[JO@KC@AZAVGBENG@CCC@IEGMKOCcAKCEEACBCHCJEDC@CKGMCMISGG@MBQFIAACBA@CGE@EDGFADCNK@AEMAECEIAMDABAFIHEBKBGDGHGBKAcKEEMKGEECEI@ABAPCLFN@VIJG@EACOCKG@CDCVIN@FADIZEJEFGACAACEAIEGOG[EOEAAFINGDEHCBCAISMAMDCDIJILGHAFE@G@ACQAGEEDGNI@G@GDEJKJUBI@AECGAACDKAEQ@C@GIKACACIGGICGAaDCE@C@ALABGECI@CAACDEAAMGIAYFBDDBPADBBHADWHOAKGGCKMYUICO@KAECAC@EJEJ@JDFABC@ACCEAMBGAOGE@KDC@GGOGKUCQWMEAW@EBCJsFSEECAEDCL@HABEAACAcJI@ACACDMLMFKVQ@CACACECGAODKFgXOFE@GAAKECSC@A@CVEFMJKJSBEA@SEKE@A@EFEF@RANAFCBA@CMKMCS@EACGAGBCLKNG@CICKCC@IBMAGG@ADCRCN@BABEGAKAMDKBEAOGQUGASBECBEAQHU@IAAGCCBKDGAMGCEDEPI@CCIAIXMFCBEMCKDABKDGBICAA@GBCXMBA@GIKKCWEMIUAaHE@IIAG@MJE@IGEAAI@CBCFA@ECAGCCQGEA[FG@GC@AFIVGTKHCX@FAFKAACCc@OCQDO@IACA@C@CDGAC@GACAAMDEDCFAF@PAFABEBMCUOUEECBMJMIGGEcE@CLEHANBVEHE@CcS@EHEHEJCP@PC|CHAFCDEBEAAGEUISEMBKDGDGLEDGBUGSQYAACDCLGTCVBHANGHEDKBQAIMMKGKCWC[AQGCC@GDYCCSWaHK@gCKEACBCJIRIDODCLARKTC@@@CAAUOAC@GNMRINONUDCBEAEEE]BCACCBI`S@C@GIGUIsCiGç§iv¡¢PADFHA@ADAAAH@BABEF@@CDAH@BAA@BCJADEAAB@@AD@ACD@CEBAAADAACB@CA@CA@@Cû@CB{dsE_]£OM_eNGVIDA@IKIBCGIKIO]AMDMBK@GOKWEUBUCEUBYEIEKKA[KS@SIKBEA@AK@[GǛҤVJNL@FCFEFGFMR@HDHLLBD@`DFJDRFBBGJKHIPKJCRDFHHPHZJDF@DABaBODCFE^BDHB@FBDNL@FBPFFDDRBVCL@L@RFDBDDDLFDHBTB\\T@FAFMREJJT@FS`CHALIN@DBDLFbDAL@FJLBF@FCFKPCHBLCN@TJjBFAFCFGBKDAYCKAIEGEMEGAG@IFG@gIG@E@CDKTOJWHYBSDMBEmBgFNQBż؜RCLMV@bH@IFWFGFAD@`PrITEN@PPNXBFPN@NCdCLHXBFLPNHZF"
                        ],
                        [
                            "@@R@ZNJBbE\\FpGnARD\\TPDL@XEL@jRJH\\^JHJDLD`@^AfIxAH@JHDDNBXCV@ZJ~PL]LIvKRKTQHELCTADAJIreFEDGHANAHBXFL@LCNMnWDIAG@KKK@K@GJU@A_EIECEBKAKBCPMNEUPMJG^A^HJCLKHGJWVOBKBEHG@AACQQ@CBCVKFCBEHCNGXEJG@GGKACKCICIQ@EOK@QCECCWGMGwOaEOEGEEIAKW]GM]]A_IQQUOISCMEWQ_CCAFOOUBEVMJS@CQGKCIIS_[OSGGAQGOISCMOg]OEkCICCOCAKECGCEAKKMCIAEGC[ISKGGEEcYYEEMGGQG[AW@QEe@UECCAO[GAC@QAAGAcWYCUIIICIEEIC}OgS@A@CRMHCZCPITEN@rHR@JDNHHAtUdCDADIBMDIAABEDCNBJEHIDAFE@GDAHANEZBL@DADInEDC@WBEDCBIF@VA\\GLGV@HCNIFApDDE@EBCFANKR[PCZH`FTAZMPOJEZAFPCLSpWDCaiGQXKVMXSLOTMNS@[COBGJCvEpIxOaLApDGPBLBZFjZJNH`DHVFP`FHRF xXdMdhFlJTNKLINXH`RJLFRXLBDR`JHCZADBBJF\\DP@FCTsLGLObMpFTCvBfL\\BVE`_JqPKH]BCPA`DJIJUFCfELOHOHCJADBVLVZN@LMFMDQJOh_DE@GSaJSK[JIOXAXAfGtaP@^FFLDJFz@dMAQ^IHhND@JITITIFMEKkMCILQFQB[AUCICAq_IKCIUGKGG¡C]CAGBC`e@CCMa@AFCZCTGBkT[DM@YBKLMBMZUzL\\ABMDGCYCYJSBK@GAGIIWMIQCQXMPIDQN]@QEMBMTOLKLSNMHMBIDKHIAMEKcgAA@EVGJKJMFMDaRWFMAOFMjSHEV[kaACAMvW^QJGNS@IIIWGGAGGCGROZK@MCOIIMKCCQGACJKNGFGBQNG^EPGDKGWBIJMPGJAP@nKPKPIHMAII]@KL_X]ncDCXCTHnLZDVARIZIVAVCZSF@tFPELMVGTEXEVBV@LAJEEIFIbO|MRAPBjVXJZF\\AbIN@nT`DPIdEVBJDFNJLVF\\DPAhEZA~DlHFD@Z\\JhBxNfABNCbJJRDNFHL@`jdLNNBRCZUt]ZGbMR@RD`LN@PA^WX_hg^O^MRKLPPJ~JrJ|@hCz@NDHHJXFFRDdDXDPCFEFAXDHDJBZKXCLBfTNBN@\\KncHCHKFUXE\\MŻ؛HsAOE@KDEROFIAECC@OAg@ECBWCMQGkCQCACHIDKFCTEBEAEDOAEECBKEK@GEC@CLIBAOOJGNE@CEEIGGOIK]WGAW@IBQAICKEEEAMAGQOKHKFgJABBLSHCDDLCBSFGDC@YBQDELBP@LKJM\\GD[JG@GAGEEGYW@ELCFE@K@EKU@OY[IS@GLILADBJJFACQOi@CDCTBF@JQAKDEXEBCBODEHAX@H@BOHIRITCJ@FCFKFK@GGOBE@QM_@IDGHELGHADEAGDEFAFBNHH@\\CNMBGJMHIJAdCJDplJBZBLBNPFBJ@JCJODAZ@HCVAHIHEHBbXJDVDFFFH@H@DIH@FBFFBjBXEFEBGFA^EF@FDDNDBPDPEFCBCEKLOFAL@lPRHLBn@P@^DH@AGIIAMJK@WLOFC\\EPGJ@REF@NFPNǜң\\HL@@BFBLATJT@LB\\LLJFZFVAFVDVAXFPL@HALCNBNP^LJHJADLJ@JCBUJMH`fPN¤`^tF|cDAü@@DB@@DDBA@BDCBBBABDFC@BDC@@BA@BBCFIBADB@ABG@CB@DE@AFABG@BBCB@BGBCEOB¢¡ju¦} f^BODCNILAJCbOPIFGBEAEGG@AFGFE@EEIAMCCAMWQCEGMDC^IJEBAIOCCCIHAECCecCEDOGKICKF@HBHHPADEJMFKJQJiJM@ICEGCI@QDIBIBILIBEBKFELGLENBFDDHBJDDL@@C@IRQ`UHOFCXCLFFBNCDCACCCEG@CJEBECCSIG@CAAA@CDAHCN@DADGBIBIAEDI@CCCIAG@KJEBC@C@AC@CFKPQBGBSBEJCR@DAHICECCUACE@EVKXSJETOLK@ICGWQAAHWCQBI@KEKAEDC`MFEDICGGCAEBCFGBECAWBICACFEJCDEIEFOACCAOGCA@ADGRGAGAECCSIQOCEIIKOOEGE@EBARCDC@EIG@C@AHCR@BA@ECA_AKG@CDEJCHAJC@UCYAEMIACHW@ICCOEKAWFG@IEGGIQOGMKCE@KBG@GCASCQ@MCECIIIMEA_HYLYD]HKJaJIJAFBFNP@FCFMBQGY@MAKCUMIAWFSAK@SHuZMDKBcKYGMEQI[MIMGOAO@IAGEAG@EfsDKBKGEIEGK@GJKDGCCGCIKCGEWOUUUIAKE[]ISGGCQCGEGAG@KLM@GCGEEIEBCACC@CBAHEDE@G@EECWEAA@CFCJCPGBC@GCGGUGGKGIIBGDKACECGAE@MFC@qOO]CI@MFSDIHKFG@EACQMQGoaAGBODGDSDEBWHUGG@OCKCGCUEEMICE@IBUAMAEQIUSCMCIDCBEAECCWICC@GHIBAAEAAEAOHKBECIMIKGCQGIECC@CHIHCXELEHGBGGIQKEK@EDQBODEBKFODCTKBECEUEgSUEGA@C@CBENONIDCBK@IEQAMBEHI@ECGGECC@GBEFEHAVEHEJIBK@KCEGGACBGDEHGREJELWRIHCBCAICCEAOCECAC@CFI@EQCCG@CHEVANEHG@MIEOEGG@GJGBEACACUGAACGBADCBESM@IACcQOIAGLKBCACGCQAECACDCTEJ@FCBGECBEDA@CAAMC]SCE@KEECAGBQFI@GCEE@AFK@AEEMEAOECGAWDWECCDIEECAE@QFK@HLDL@HBDDBRDFBDF@DQL@FBDHDX@VFXDFDDH@HQJETHHNBHFBD@FCHGDGCEB@@FJA@GDEA@CDAAAMECBCDDHGBGAEGE@IFIAEHKAABADDDBBGFBDD@ABE@AEAAEBCD@BFBADBBNBBB@DIDBFEFDDHB@FIFAB@DFDR@D@BD@BGDABBBHBCFBDABCBGAAB@BFFALEBCAEGE@ADFF@DCBIACBCFBHGDBDHDBDGBEHIBCDG@KFIDIHIBCDFHADABECEGC@EBDLLD@FOFCFAHBDFH@DEBG@E@KFCHDDJDBHADCBOASN@FADKFADBFNF@DADIDILDDEB@DB@FABB@DDDJFD@DCDDBBMFK@JBBF@BINE@MAGFCDBDJBLFAHIFADHNHBJAHCB@BBCLBFFFBFCFCBYL@B@FAF@D@DCBMBCBAFDJADAPDBRDDDBDCHEBI@CF@DLHDJBBBFQRAHADEFcHKJQLGBI@c]ÁqaoQwkweqgSQ{UEo]WQE@UOOMg[WMy_GEU[YU[e£oËgSGQ]]KYGmGMBCAEEG@]MQSCOQcOUKUCMMY_kqySQIGiiOKQG·cuMmQ[EuWQK]a·cSCQG]SOIwi_SIKSIIIÙWkQ]eWIKWa]cEKCKA]OUMS@AEGIm@GEOKOIGaq[{eEAECËu]O[I]OSSU[WUgW]cQIqQUEe]YCDGBEFGBEDE@CDGBED@DEBAFGBCDGCIDKBQ@GAAPKB_HaPY@GBIHWDIFUNUFqFRSHMLE@[FG@GCUCCBCHILBHABSASDS@KAMHGBAACGGGUCOKQAYKIAEEKCKEKAIEBCGCCEAKGI@CCIECEAGC@IGGCEECEEBGCGBKTWCC@CCEKBEHKDOCMDIIK@WBAEGACBCH@DKNSAIDCHSNQ@MDS@QGWGMGSAUAKDECA@KBEWECEAEE@GII@CA@CIEOEM@KACCDA@AGCBC@AO@GE@EAASBCAKABCCACDO@GFKBOEAC@EQCGBGIAAEBGAGBGBAABCICeIEHE@GIQAADOFI@CDEBGDGACDIBCFKFK@EFGFG@EACBOFCD]CCAMHICUBKAEBADK@ADGAEBEB@B@DC@E@CDCBC@GCGAO@EAC@A@GDGACCK@ACIBICACCBCAAEC@ACCCC@CDC@CCB@@AMGAAM@AABCE@@EE@ACEB@CEAAACAAAGACGGGCGGAEEKGMAADK@EDCABAEABDEAIBABC@CBBBG@ADB@AHA@AAADCAE@BFGBBBGBBDCDBBCB@BEBBDQHE@BDG@AFIDGDG@CB@BE@CFEBADEB@HG@ADMBIACBQAECACGBG@ECIAWDBBABCBABGD@FIB@FMBE@EDEAMJID@FIBGHABFF@JAB@FCBCBCFKFGHI@SHADBFCB@DED@DC@BDCBKDGAABE@CDGDI@ID]DGBG@ABIBMHK@OBABAHCFBHGDM@WIOEED@BBBHFGBEN@JCDBJAHBDFF@BCJGL@FLH@BBD@FRNLDXFZLPLXLNDT@HDDLEJBLZHRBFJBJGPXL@HW^OLePOJ_ZqXONanIFOH[RebEJHJPRVRDHY^KB}Ig@MBOHDYDEDMPKFKDSBSAUJKFSB[NcVeLiF]JCNHRMJ[AcbMP_LIEEKeUIOQIO@GHOLQGagaDaIKGQGMDMAm_aQIIwAKEOMOGYEEHMFKBCDMHGBKBQDGHGDCDCBeMK@GACECAWAMB@AEABCKE@A@ABCIE@AACEAACE@@A@CC@ACIA@AAAGACCI@B@CAB@CC@@ICCEBAECD@CAA@@AA@AAA@@CCABAAA@AEA@AA@@CC@ACC@EAAAD@CA@AC@ACE@EA@CA@A@AAABAAACABAAC@ECB@IA@@A@@ACAFAA@AABACABCACBEECBA@@B@CCDEC@FABCAABABBBCC@AABACC@AA@@AK@AADCG@BACABACA@ACBAGAAC@GAAAC@BAGCACG@@ACA@EABECAADAE@AABCCBBAA@AAEB@CA@CACBCAABAA@BKAAAA@AACACBECC@@AAA@ACCIB@AC@ABA@AAA@AB@AAAC@A@A@BA@AEBA@BAGA@BC@@AAA@@EBSCEE@AAA@AC@BA@AABC@CBACC@AB@BC@@@ABACD@@AC@BACAA@ABBB@@CA@BE@C@DACCEBB@CDA@@CCAABCCABC@@@A@AAGABAAEBAC@@CEBACAABA@BDACA@AB@@AC@@BAAADAABCAADBBAAABAC@@AC@BAACA@@CG@C@BA@ACBCAE@@AA@DACABCEBACGCDA@EC@GE@@B@@CB@GCBAE@FCAAK@OKC@EBGA@CC@CAOBIESCS@CDG@CA@GICA@ADC@aCKKEAG@CEKFKAK@GACBBDABEBCAD@G@CAEHKBIFGB@BFF@FA@MECBCDBBCBBHEBAAABCB@D@BABBDGBADJB@@GFGJIDMGG@ADABJB@DIHCBCA@CEAC@CDDFEDIDECA@AFCDDD@BABC@CAM@@FKHGBKA@DHDBBGD@DEBCFBBFC@BBBKJQFK@@DFBBDCBC@ICEDC@@ECAAEKBDC@AG@@BD@ADG@CCCB@BC@¨Ƈ­j@VUÒGETaĹĎơǂoxQJĥJ@BDBGBEAEEGACBBL@DKBEHKDAHEBSEC@CFCBGE]AQFOBICIA@ABEAACAEFEBEGCAMDK@ICG@SDGFGBA@EEAEQACBCFCBEAMDGEC@ADDF@DEDKBEDABBDADE@GCEACD@DCBEBGDKBABDFBJABABSDICKAOBKFWEI@ABAHEFIBGAIGM@EAAACGECIAKBEECBGBADEBBDIDCHC@ECBE@AEBADA@C@EC@EGKDAACGDKB@DFB@BC@IEDC@CCAE@OCADEB@A@CACC@CBCAG@ACECEDC@CCBECAIBCDC@AEFADCAACAODUCGDMCECA@ABDDEBGAAEAACBCDC@CAACC@EDI@@BFD@BOAEFEEI@ECEFI@CADC@ACAI@OFCDABUCCB@DC@EECBA@BHKHECAC@@AFA@CAACM@A@BHABI@CCC@ABFFABQEIOCmCSMMMɣȁFSAGGGOESA_EğįǡņxxǹÐ½Hu@ķOǑkMƽŕ«UMQIţĹ{M̝ȨƸE@BDIDEH@DNF@D@BHBAFFBBB@DADDDBDGHA@CCADI@EbʀĒXDoɌFPzƖƦRX}¨ʬώÞĦʒΖNRXQ˨ŵǜ³PEǨEź·¤[ĺN@B@DFG@@FHD@BABEA@HN@HLNBDDJB@BXPCDI@ABNH@DCFBBHFHBPFBDBFE@ALBBFFAJDD`HJCH@FDHAFBHAHEFDBDHCD@BB@FFBD@AC@CF@B@CDBBD@FADFDED@RAHABFPBEFJF@BABKEC@@BDHHBJDJAHBDABBDBFD@B@DBFH@HDDA@C@@LFHABCCC@CJ@CABAJFBCFADFHET@RAHDDCHCV@DB@FCF@BBBHBD@DGHET@JFBDAFJDBB@FHDBFG@@BJFDBJCFBBBBHCDAHBBJ@JCFBBFCDID@B@BJAFB@FCFAFBBHD@BMBADB@\\EXKVBBEDAD@HDDDCFBBD@FIBCJABDEDAFDFTJBHEHHFBBBBHCBA@GB@D@DHHBD@DCFB@FLF@NBDPHABGD@DEBADBBLDBFTAF@BD@JDDIACBCBBDNB@BEBQGAFHHF@JCNAFB@BEDGB@DNDHAFADCDDBFFD^BV@JBJDHFHD@BI@AFDBDBBCBAFBBBAF@BFBH@FF@DFBAFCF@BLEN@FGFDDCD@FBAHBDHBHBJFZCFHR@PFBEBAHB@FADCBGBCB@DHFD@B@HEH@@DQL@DB@HEJ@B@@DOF@FH@BCHAB@CFBBFADBEFFDCBCCC@ADBJI@@BFB@BE@EBCHCBBDRDP@JANGV@XDABEBABFFBBJDF@LCNBBAFABHD@B@BEFEDIBAHBHFJBBBGFCAEA@FJFBDCBEAABFBLAD@GHFADCDAJFB@BCD@@BAFCBEBIF@HAD@BVFCBK@CHEBJDLBKDADB@HBFCB@@FDHDBPDHED@TH@FNFIDBDFBIHDBHCCFBBBDLBJADCB@FDBDLDDAL@BA@CB@BBADIHGBGCAB@BRDDDDCH@BDCBABEACB@L@DPHDDDDF@BCB@FDD@CGDAJDHHFBF@DAJID@BDAHBBB@BAFKDADADB@DIHAF^F@BOHAFDDHD@AAC@CB@FDDA@E@APBHCDCDAL@BAJFCHBHABEB@BZB@ACCBAHB@FABIB@BB@H@JGHADDABGD@BB@PEFABBDFBAAE@CB@FHD@BA@CDABDB@@EDB@BABCFABBBHABIDAJBEDDBJADGB@HDXCD@BFDBDCBEFAB@FDHDD@DCF@@B@HFBJ@CF@BDBH@BCDB@BB@BGBAHBNCBBEDBBNA@ACCF@BDCFDBDCBBABIB@BDBL@DBDDBAB@BDFBABE@BBF@BCB@BDFAFBB@@CH@FCHBAAAA@ADBFDAEJ@BEB@DJJ@@AEED@NNFBN@DB@CDABF@DB@DCF@BBCDDBP@@AAC@@F@DHCBGD@BBBJ@HCFCAA@AJBJFBEB@BB@FB@HCNBBHD@BCF@BB@BCDJABBCDDBFCFBBBCDBBPADAACD@FBBCD@FBAFB@HAFDBA@ACCHBJ@DA@ADADB@BEBAD@@JAN@DABEKDCA@ALAHEBAFBBFFBBABGBAD@FDFACAKABCD@HBDB@H@@J@JBH@DBADHEDADFHAHLB@FCBAAAB@DB@H@@NA@@@CB@DBDMHAD@BHFDRBBBCDLFD@DEJAJBAEFAF@JFBBCFHF@DF@FFJ@BFEBABBBFAFEDAD@BDFNDEB@F@@BGHALBBF@FFFB@DL@JEFDLDDDA@IBECC@AFJDJBTIBCEC@AF@BBFJA@CBAFBFFD@DH@HDHABDF@GDCFHF@HN@BFI@ADED@BNDDB@DJD@BMH@DJABBCDADFFEFBFFBHCJEFIB@FBRCDBDFD@D@@CAGDAJAHBB@BHBBDABCDA@DGHBDHBCBABRJLBJBABGBBHBBHBPBADEBB@NDFFD@BEDAJDHJD@@EB@BJJFODCDJPHF@DAD@BDBD@FMF@BB@JCDFDDFKHABHFCF@BLDBBCBEA@BBBP@RDRADD@FBBFADEDAFAFD@DQFEH@HCFAJ@FDFDBRBLADDF@BFKDEHWLEDI@CDCHKACDAD@DDBHJCHBHBDF@L@BBCBIAAD\\HEHBJEDBDFDJEFABHADEDS@CB@BDB@JNDEFDB@BGBIACFID@BBDHBPAJBT@@@@DGHABBLFD@HLDXDJHFLFDLBBBABGBEBMAK@GDED@DDDVBBDAH@FEDKBCBADBBDBN@@BABMBCD@HCBIBIEK@E@IHKBIEAKCACAGBGJC@GA@CFGBCAAICCBCD@NADSDABADGBKFKGAABIECUCAADCF@@CCCGCK@YFCD@FFHCJ@F@BGDQCKBICUMKMIAO@GF@DFDZJBBADABYIMA_DCBAFBFFD`JDHCDEBOAOBEFAJAFCBG@GC@KECCAGBEDGHADRJLBJVBHFDTAHDBBALDDDBRCRDJ@DALILGDCLAF@FDBFIN@BFDJBHFBHAJ@HDBHBRCJBDFJD@FEFIDEHBBHHLBZFDF@JIJBFDHADKJEB]DGF@DBDFBdBLJDNFJDL@BEFAJBDRFHDHRCFABEBKAEDAFDD@HFDHBN@RBFBDDFRADSJAB@JADIHBFNHJLDBLBVCVNTFFH@FEFAF@DDDJBFAJQHEF@D@LFDHJFFHDFDLDHHFTDDBDFAFYLCFDHFDFBh@TFH@TCF@bXBJANBBDBN@NHDLDDJFV^JHLFDDDF@NHHDFBBCFQHAB@DHDNAHD@BABIHBFBBRDNABBKHGHCT@DHH@DEHWNEHCH@XFFJF@FE@@DAHDFADG@GBEH@HDLDBHDH@FB@FCF@DF@FABBAHF@BDJ@NTNHTFNJLDHHZTDDHVLJBLNTBH@JHJJHNHL@`JHJ@DGFBHFD\\DVFVCbNLJFJADG@GBADDDHBPA`VFBPBHDBJFL@FCHQBCB@DDFLDNCVBFD@DELBFHDX@JD@PGHBBFDIBGFCDCFNRD@V@DBBFDDDHCTFLJJEFKDO@G@CDADFFJBXELADDBJ@HCFEBOFCFAFDFBDOLCHBJML@BJJTDDFBDFBLATITCACGA@AJ@LBRADBDLAJQLULKLADDJRJdHDBBDADGHGHGBGJAB@DFFVLVHPDP@jAPDLNBLCVERDPDDJFZLJ@VEHBJH\\LLLBFEFOFWDYHEL@RLHNFZBVAN@ZBLDJXAJENFJALBFHJHFNFTBFFBFAJQ^GHMJ@JBDFFJH@BGDCD@HFDPDJFLDRLFHLFHHDF@NDJFBFBHADAD@DD@HHDAHBHCJ@HAFURCBAFLPBHDDBFFDHJ@HCHTLENBDDFLJJFPFhFHDDHAHOPOXBDHFJ@\\GRAPCT@NARFPB^F`RXZJFFDJDVPFNHFdDPHLFFTJJFD\\EJBBDDRPHNbHFNDvF\\@D@FPFHNNFD`@RDFF@DOV@HDDLBPFbBjJPD^LNLDFCNQT@HLHHDN@ZBPCTG^CN@RFFJ@F@RIPBBPJLBXEVAXdBNDPDJJCLFPCPDLTPRDLFHFFFPHFFJNTh@DAFULYHEDEHEHBLDDFLLLBD\\VFJHDHBHJLD^IJDBD@D@FEDEBGBAH@DNJZHDBHJBH@ZOR@HDHPHJDVR@LADaZMPOXMLEHBJAJCHBFBFJLBLPJFHCPEDGDYDK@UAMBKHITETIJCBeF]JQHONOHGFCFIJAFDN@RKJEN@DDFHFdAHBDDHJBDAFIV@JTRPH@J@BNP`XDDBXMT@PAJ@FFLFHLJNHFFDHAFKLWLAH@DFHFDtPRHJHFHADAFGFKHSDUASEMBEDKRYLKD{HIBUNQVIFOBmBQBeVqR`]ZIDC@MAeIKIMGeWQCW@Q@[BSAgDgBmHIAUEiW]cWQEQBµNiAWBQAM@]HWLKHGT@VIPIR@N@FZrBLFHDJHJTPHN@FQREL@NCJENU\\MLGPALFHLFrALBXHR@PFDBHNJHfLTLNF\\BhOJ@JBDDNVNNZRHJDDfJfRfFVFNJDDAPCVDHHFRFzBPDFDFF@DERBLPRDLHHNHJBX@rXDDHLDPBFRZdbNJRHPDNHjPJFJRDBPFRBHDFVFJTV^RLDPDLDN@JD\\PNFvFJDLTBPFNHJNFrJJFFD@DCJJHBDAJMP@DBDDBVFLH\\TRPHFbPXBPFv\\^TLDD@XEJBDB@NMTYNAD@DFDVHT@PDZD`JHF@DALBBL@XMJAXB\\AFBDBTPRDlEfIN@LBh@\\EN@PFVRPJjDD@HC@IHER@LEDUBCFEJA"
                        ]
                    ],
                    "encodeOffsets": [
                        [
                            [
                                127444,
                                52594
                            ]
                        ],
                        [
                            [
                                124037,
                                54557
                            ]
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        119.758168,
                        49.215333
                    ],
                    "name": "呼伦贝尔市",
                    "childNum": 2
                }
            },
            {
                "id": "150800",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@¶C~\\fTtTh^ČĖ¢ò^nTŪjNĘ˨ĲxXȬäƢ¦ȲrnFȄHRdVJV¬bÐfCÖƌDĄGĚMpRrB~`JHÊFĒdNVAVCg¸@ĪL¾AƠ{ZBèBRGnK^S¬fîbH\\GZTȤiXAdA\\HàPRIXIjITKFeNUBK@IEK@EDILINCFIAOBGJGFKAMHKFCLEJG@MGILSlBQRnáqOUya¡mw­Í[I_eMMSGKCqGQGKEGGCI@OFI\\YbyL]|[DEbuoo|sPK@EHKRGPMDKAUHMVYJGBIAIBQBIP]HUJkFMBUEIKSKICEBGDGRK^GLQQQzMD^E|A\\E`@vF®DBMCYCMEKW[EKCMCGGCQA@CLKTILKNI@CCGPMDCZAPCDCBSFATA@YJQIC@CBCQ@BK@IFG@CGEDCFO[@KDSEO@@@CSCEC@C@KNEDC@KIGACCEGHIAC@CLBBIIKKAGEAE@EFGLEAKFA@EJAFEBSFMHIPGRWDWHKPGJMJebiTKTQDYMSSEiCQMCKD]R_AUBOJOTMNCRAX@P@TO@O@MHIPALHHJPBLElITERMFMDY@SFEBIJYDCJCFEPALCV[HCDARLFA@UKG@@HECQd_FMCIIESFKAOE@GAAGEK@CKSBIECECMBC@GHG@QCCCGIEAGFCSGKGIDsBQC[QUEQ@AcDCC]GWAcAQH_AFaScDmTMHwiSSQIUCWMKQHaEQQ[BYBIHQFIJILGhOLGHKGEeDMKFMJIPKHMCGEGOOCGHILCHGDKMOOM@CDCRGMcQcCGO[GAKHGJ@HFFDFBDAFSAUESCQ@qHIDCFWfCDG@KEQC[AUBOBQHS@KGEGCICEAAM@APDZ@JAHEHA@aGSAe@G@EDGTEFQNEBI@CC@CFI@GAGEAE@CBILCJCDGBIBeGiACDCH@TCHKLE@G@CICAGAIAQBM@GKCUMGECICAGBaTE@KQEAGBMHENADuVyNgK[BKFOJMJEBM@ECEGAMCA[EI@KAQ@UPEHCRBHBH^pDH@HCFIBKBqIGCG@CDahSNMFODKW@KDAD@BNDDBBBCJKH[BYEE@EBIHAFBFPN@FADklIDGBGAMIM@EDILEF@BFD`FFDBD@DCFMHMPEBcAO@EBKJCBAEBADLX@DAFMRWHq^MZaLIBOAiDEB[TE@GAOKKAI@aPaHQDKG@gFWJGFINAJDTCNCDgFMHSLUFCAEAACCK@KCA[@cAcES@OB[JE@CAIEEGQCEBIFYJWB]MKGC@SBAFORSNMHK@[IIAME_G[K_@YPaPYTYGIEGGCEAGJS@AQOMCCBGLKHWJOBuPMBSAIAKGKMCKAYFQJM@EGEE@MBQJMDI@CCCG@OH[BGAIKYIGMIMCY@YL[PiNK@eQIGKYHSAC}aMMMOGGOEKAODUREDK@SCGEOMGIEOKGOKkIYKWUOOQKMAW@wNO@YESFIHGDOBKCMIACSkMWCGQUQmC]CIECG@G@OD[T[NQHSBG@GAKGEAASDOEIAIFIGS@Mg@KSWO_CCABAJ@BEBGCGGKGECCMKSBMJOFGAKP[FWAUGIMMOGI@SHMDCACCMOGCICWAOAGGQeICcCQIIGIQMO@K@IEiE]CICEaSOQYM[[OEGGUGMG]MKSWME[@OA@b±EÑ^Æ¼®¼K^ş^ÏFç[__]DijĕCċĴg¨ÐMB~Âg~yzBF|I`FdUU¤@B@ZO@@TBcPeT½fK@EFQFMBIAGCCGC@Q@SFC@GHE@CBAFCDC@ABCAADCABDIFBBEBBDA@ADED@BA@BDADOBCDJtAB@BADED@DAJIH[DIDWBymSE@CCifgNÁNaLYFBJñxm^¯H¥`uRKRWJWBUTwjß¯«~«vC\\EXA`C\\Wj½°bdcÐÚa|CFQ`Wn[F`kŪjİHjPÒ"
                    ],
                    "encodeOffsets": [
                        [
                            107760,
                            42754
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        107.416959,
                        40.757402
                    ],
                    "name": "巴彦淖尔市",
                    "childNum": 1
                }
            },
            {
                "id": "150900",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@BMp¹þ­ÒľGTQØá|mVOFAú¸éÁBAFm¦ÕvüĕDe|QļEoÜy¼qĬmÜcnK\\M|ec¬u¢ğªKezGNQfwPO^aZWXOSERMPMBYfsPA|ZXP\\UnBRNC\\eDFLIF@B`P^Tlx`VPXVNVF`RRRL\\\\b^tŎQARAl]N\\~Q@EdM\\EVA\\B^HTLRTNFXAVENGNWBOHSTITEVGXONKNKVE`CED\\CHMQSEQFUHMFQAgRQZGTGLKDQDGJ@dVPNPDTNHBZC`KTKR@RDHJ@JATDFFFL@~O[fwzjN@zQT@|F@LFDnFb@RDJFDDDJLhDHFHXLLJRFNJTFNBXERK|Sh]^QD|SAVVjH@X[wBU\\AFIDMCGHKRhL^FJEbNPNFjVNLXZXfFZBPFHFBNBFApaPAPBWRFRLTEJEFEDGAECEICWQEOHKf[UoèjbEHERC@CCARAHBDIRCGOC@@E[CBAZUCCDAHoYAIcG@@AC@@BKA@AC@@MEBOIOACCG@Q@CDACAACDU@]CABCFCD]DIACCSBwUI@YBKBaT_PMD[DK@KAKEUMICeKQG@I@A@GEECKCEGEBGHEGSBEEEGA@ECAMHMBK_MQAK@AFAFE@AGA@AHCHGPGHCAAC@EADCCC@EDC@CDEHCHEFBHARUDABGCC@EAAGBOCSGCECAACA@IKACDC@@aBAAG@KEiEQGIDKFG@KFKFG@CDA@@CA@CBEDADOAEEBEKECBADECGB@B@FCBAAIKFCBCAEGCBEHAAECCCCGAEBQBIBAABCFAG@@CDIFEUQGIOMIMaiYWSMiciiMKIM@AQICGBECE@EBCDCLKGQDA@ERCBEEOIG@CCATQbYAEJKGAJQSCQHEIJMKIHIDERY|mAOCCCBSFCLUUYGAAI@GDURaASCM@IJMFcFC@@BNMBCBC@EBEHGCG@KFOBIACCE@IEG@EGCDEAEBG@EBA@@E@@G@EBEECACBE@IB@BCBIHAA@ABAA@@AA@BAC@BA@@I@CDCEEAACKAGEWAEIIAIE]GAGEGKEMIMMU@KFI@CCCGMoEIIGMEcKKEIKGOES S\\OB@BCNBFABAHACCEBCGGEBAEABCAA@CCA@ADCAGD@BA@E@E@EAEIEEMEACCAKHEBCCG@EAAK@MEEGIBIGBCBEBABCFCHK@CHGHDHI\\FjOAGG@DK@KEAAAHBBEKA@@J@@ACA@GDCAGT@AQJIJA@DBBANDDBFH@@J@DDB@BEB@FJDFBB@BABB@@D@BABBDEAAD@ACBA@GFANKDA@OJIHEBC@CCGGGGJKG@OBQAKGSEIQOUKYEkAgDKCGIAMCKqyKQ[SMCYA_DOECIJGvYfWhgd_LGVKwNGTSDMB]LULKFIFAB@BFDJFBFEDGPKR@fGNFNGFG@AUCEEI@@AFCBYTWAE@KBGFEGCDC@EDELCRGHICICIYGKIKK@CTI@GLWHCDGJGFKLGTJBBJEJHF@BEACBEBA@OBCAIEEBENIJMXSNQMEK@WCGBKA_GYOIKEKBIPsCO@USeCQCIIKAESUBGLQNMXKTOJS@WAMGIGGUSYESCyOI@GJ_DO@QAQCQGABE@A@BCCEEE@GYWcSoc_MUEOBIF[lIJm`_`@OGOYaQQKEOGY{SQGIICEAKGMiOUMUSo]eYKIKQYSmMK£IMcAcG]ASBeFU@SEGBG@MNKPENCFCJI`IRCFQXMJIDILAHAJADIDOCaMIAmC{K¯]MeAYEgCuQaCwOWKwOEAOC[GKECGAI@YGMAGEOESGQI[KUSsKUGGaKeI]K}]]G_AKB_XAAMNWJKLSJQNKFEFYRQHQRMBeNSBiRG@MJgJYDK@]HYRWLQFEDCHQLCBKB_CmEKCYK[WMEUEKGMIMGGAW@IDG@OCM@AFANERIFUBCF@REDHH@DHR@DOTCH@NC@KCC@MD@BBHCFBD@HBJBDJBCLCBMBEAACOCEBCASB@H@BNJH@AHJLAFJFBF@BNDDDDJCDGBWBEJ@FGJADWNGHGDEF@D@LNV@FGDEFUD]LI@EDEFMJELGBKHAD@JKNOHEDBHADKFIDG@EGECIDK@ABGNGNCBOBEDINAJCFCBKBGFGBCFBHIDQDADANDHAFHH@BAFDDD@FBDAH@BMDA^@FFJDHFBJELBDGPK`[T_TIBKHCXVFRHTBNHJATGRDFEJAFABL@FGNCRBFDDRBDFLLAFGDAHEHAJ]F@HAPKLIBADHJFDLZRF@HDDD@LBHCJ@DLV@FJFFFHDFHFDJBBBEBAHBDH@BADF@LADKJJHBDJBCNCDBDD@GFILGDAFILCHEFEBCDIBAB@DFJPNBDALABMCQ@FHBF@BOJADBNADBLALFFGBEFK@@BDFCHBDADEBCHEBE@AAuWSFKFGDCDCFA@]JOBIDC@@DCD@FMPDFBDGFKPKFCDDFADBDCFFJJF@JHJHBF@@XCF[HCFEFEBEBAFCDGBCBC@EDKACBGEA@GHC@ED@F@FGDEFG@KFGFSBMNMACHKDCHQLGHBFPDABOB@BDBPA@BKFMCKF_FGDCBBFIRET@BHB@DCJEFCFCNBDFB@DOVBFHJBL@BEJEHGLIHA@III@GDSGABAJNZH@BNDFALADONODMADAEAADUAEBSFIJGD@DEDIDEHABEDDBCBFDMF@DM@eI@DKPDTGHWAOA@CEBGAAEBAFBL@JO_CEJGBBDQCBP_A@ICAUBAFM@@E@AKAWLGBMAQEI@GA@BD@@BuFIBDFKTS@CEBE[B@FI@@EE@BVADGDMBM@IAEGKAG@IACFAHEDCBK@OCQOMAODUFOECC@CCAOCANBLCFBJIVMJaLMRAJGJPPDLJHhLNLHPBNGPNFDF@NPdEJBVCbE^BZATIVwvIXKXUPIRCdMPSTUHGYFKLIPk@yTk`MHk`hDP@NUPQBSRY`kZgDEHIDIBBD@FM@ALIJgv[fMlS`GNABCDG^KNSPILUb_UXK^MVkj]nWdUXELMNMTWPGNCLGALGPMXCrEXGPQZiVEVJPiÐN¤[fWTÅl»âqtaT]XIJibcVKFaLSL[HQHrGB²tdLVfP`|bz vt~d|TZC`¦¬T¦¦ÖÌöàx\\RFNLLLÔhRF"
                    ],
                    "encodeOffsets": [
                        [
                            113819,
                            44422
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        113.114543,
                        41.034126
                    ],
                    "name": "乌兰察布市",
                    "childNum": 1
                }
            },
            {
                "id": "152200",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@F@BDFBBD@BJFAD@B@BLFADFB@BNAXBDBDFHBL@fNDADCHCHGRCLAHANGDCLANEFGZFPHPNLFxBJJbRn`NBNCRHLHbJbCbhRHPKHGP@RJJPfVFLJF`KNOda\\BNIGQDM^IjEfKdU\\MTALEVITBTALCLENOFCZCCPGNAh@~JLAZ]CGUQOQGIFIfa\\QPGJEbmPMrW`YPIfOPKX]@GWKHOAIEIQAYGAKFICKGCS@MCWKOKYKWEKCQM@EAC@AKG@EHKDI@AEEACBGAIDC@IFMHAGEAA@AFCPFXJN@HCAGDEBGBAPAL@NGJABAH@HA^CJCJ@HCDCF@BAHBLCDAACD@@CFC@CDAAEBCTGJ@HGLEDEDADABK@EECBCJGHA@EJCLGH@FCF@NA@EJA@EJC@AFAACBAFBPCXFHABDFDRBDAJBNABCH@@GFABCFADEF@@ADAH@HCJCBEH@ACF@RGACFA@ADAAADCACHAAAHAAA@AA@HADBBCDBBGA@BCH@AADAD@BAJAFBACFBABDBFCL@BCNBLHFFHBDHHHDHHBBBDBBBFB@DFABDF@@FF@ADBBN@BBNH@BA@DDD@DCD@DDBDD@BFDBDABDJDJABDL@DDHBHCB@D@FBP@HBHDD@DADCF@D@@C@AFAFAHBBCL@BCFALBVAJDNGDB^DDCPEDAFBH@HEFEL@LEDEJADCHBHCFADCJ@PEBCRBHJF@FGfJJDADBBHAHAHBFABBHJHARD@FBDPFLAHEP@DCDBADLBDBTABB@FHFP@@BADHD@BCBDDLBN@PFJF@DDBJ@HJF@BFDFXFAF@LBFDLCVBTBNHXHRHT@NCR@TMDGJCTBLM@CDGDAHBBFXAL@JJNCPDLCFGLADF@DDDSXALDHAHFFFDDFHH@JHDFBFDDJ@DHJBLDFHDADJFLBLFLDFFJBZLRBPLVDHHDHBBHANGLBT@TCTBBAAGJKDGDAVDHDH@\\EF@NKTGQrEVEVMJEXCJGHAZ@bO`GLABOHBR@LAJCHDDCHABEFA@CFCHADCF@FCHAFEHADC^ZfVFrRJdR^hXXVV\\TT^P\\J^PÌvFDFBFB@YDI@AAAF@B@AAH@ABD@D@CA@ADBBACABABB@CF@@CA@B@@CB@AAF@@AAABAE@HACAA@DABCC@FABDB@@CD@ACB@@ABBBGD@AAFDBCA@@ADB@CDBJ@@AAADAAABAA@@AFB@AB@AAD@AAA@@AA@BABC@B@AEAJIAEBIHED@@CHGJC@EFENCJGH@B@@AD@@EHAAC@AF@FE@CFA@CC@@CDCDB@CE@BCH@@AA@FEDBD@CGBAD@@AAA@ABAHBDC@ACBCCB@DA@AA@@AD@FACCA@AAB@BEFADAAABACA@CDBFAIIDBFEBAC@DA@AF@DABACA@AB@BCLCCCHC@@AADADGFBBA@AACBAFDFA@ADAACBAD@@DD@BAAA@CHBDA@AHAAAA@BA@CB@H@@AAAH@@CJABCFBABHBAADCA@FACCBAAA@ABBDBBC@AB@@AC@BAC@AABADBBA@AFBF@CAFCB@BCD@EEBCAABAAAD@@AFACC@AD@HD@AAAD@BBACDAAAFBBADBCBDBDAA@@CH@B@ABB@DEACAAJCD@@EHC@BCBDBDCD@ADDADBAEB@BDBCCAB@A@@ALEFBABB@HABEB@DELEFBFGNBHA@BBBFA@BC@@BLA@BBBB@D@BCFBCEDDB@@AD@DCC@@AD@BDBAB@@AC@@CF@BB@BB@D@BDBCF@JEHAHBFADCAGA@HAJ@ACBAJBJ@JEXDZEDDFAFBLGJDFEBCJ@@A@APEB@BDPATDJ@LFHYCCOG@MMCOIgSSO@AC@@CIEc[FSDEMA@SAE@CRO@CHCCAZGAEIIAOH@@CBCFDB@DEVBLAXDTCTFTPBBBAVLDHLKDDGHJ@DBDAPFBCCAD@FIAKDI@CGQAG@AJE@IMgBGUAEAHW`eBMECFEBECGBCAECC@CBA@KJMHA@CBCCSXEDIHADGBGAC@INBHHD@DABEDANARGDENABCAA@CDCZAL@FGHCEC@CDADIECAAPMFIBMJCBCJIP@HCLHABCDBDPBF@JBHHPBFHHCD@@DABBBABDBFAD@JFB@FEFBBENDDC@EH@LCPDFBZALBDFFAFFFBPEJAHBFAPHFL@DFBBBCFBDCBADDFFBFDAH@DFBDDCLDJJLHF@DHF@BBDBBFCHFABC@@BFDHHHC@BIH@BFBHALJ@BCDBB@DGDBFEFD@CDFBCBD@ADDDABBHDDCBEA@DDBFADDDAB@@BADDDFB@BHD@BB@BAAC@CJBPCFBBAACB@LJB@FAAFD@JED@BFB@NCH@B@@ED@HFADNFH@JGHDBI@@FDBED@AABABBBDD@@CCAAAFCHDBCFIG@@CC@BAH@HABDFAACGC@ADAFDDAAACEJECA@CJEB@HJFBFADDDBBBJ@LDF@BBHAr¦PhCz[FCRELUN]X³MKxHJAFbOJAHBTEJCROF@HGTKVQVKFKDO|MJ@^HJDNDDHPDFFRB@D@D@BFGHBDDEB@FB@DCB@BBAB@BFA@ECC@AL@@@ADFBBA@AH@ACBAN@BBCB@BHADFDAAELAADBBH@FHFBDKCKBEAKEKASCESWGWEEGICIAQCGKKGICIASJMXQNGPARDb@fCJ@FDJHJZANIPAHBFNNBZ@LFFNE`BFADABC@GGOIKAG@EFGJEbMDC@COOICYGQAQCCCBGFGNGLCr@P@BA@GECC@@AFaCA@EJkK@AAFcACDCFYCCUK]CAĵCA@BCC@KDAAęOACUCGEkGWIiBgCGE@GEGBAF@BEFCCKD_BKoS[GDI@IG@QGGCCDGDIC@ACACDEAEFCAqnsE]EIHS_CK^Eb{EECLmD]GICBO@AAELqD[@½@AEADKAKCCAAJUîÿ©gae@sCTMqoɃwƇAACEBUKM@EEI@Ccqw@EMGIQGGGAER[LKJQAIJGDKJIFQHE@GDCBEcY@CEACGB@WIAIMADINIBG]CDOC@BEK@@GÏIC`CHGBDRIBUBCdOlyHMDkdYRGH@NQNCBEAQIGEMOEMOUCCEAC@ODE@ABAFC`FF@HCHBHG\\ARAH@LCJINOLEHIH{ÃHUAQC@YACD_LsJKeAMHUBCEFECADAECQEKE@GCIDE@CI@@@EAS@ACBCR@BAIEKAEEFCAEMCIDCCBEMBBEFGI@EDEBKG@CIA@CC@@AGAGFAJIHAFCB@LD@AFA@@FCHEABFGAAJKCABGAM@ALBLED@DIBEFGBGNSECFCBABKDG@GBOHGAIDMCC@MJBDEDO@CCIBOBQJCB@CC@@FCBSB@FAB@HEDAFCBC@AF@DFDCFBBDF@FCD@FCHGB@FKJKBEAADEDGAED@DGB@FIDCH@FIBLHCHI@EDK@CBO@CACDMHDFAJEFDFCD@FIAICEMGGADABKFIAEDKDCAEDBDADBDG@MAEBE@AFY@GAAD@FC@CHBHAFOFCDCEaDCABCAEUAIACBCCE@CBIDGHAD@DUJEJB@AFABY@EBICI@IFA@DIEEICIGE@ECGBK@@GAGQAEAE@ECGBCCEI@AF@FEDIFAJDRB@KNABEJEFGJCDGFEEGDGBEDEMCBCCCJABCDACGCCDAEGB@FFL@DCCEBCHEBCIGACBCCCGIEACCLECEE@HG@CCAJIC@@CJKSCGACAEEGACEEEIC@IGGCA@CGAAAACGABCCGEAAIDA@ADBD@FGIOMAGBEECGFMAIAHCBBGDE@GEBSGDEECIAIB@DA@ADB@EHG@FKD@BCMAGEEAIECACGGGOEDGQ@QFGFKAEBE@GDC@AAAKKCAGIG@CNKLADEHABALCDGICCEDEHB@IRENOF@tUfCrQTDTBJ@|MENJHANRBDFD@fLLBD@DF\\DJEFBhIJJZEFBDBJGNBBCJCHFBDD@HABCFAleHYViPeAA@ED@NGFSOeBKaGEDK@IAH[@IDQF@@CD@BIJ@VQ@[T_A_leTC~_nKYfGJ@ZGLCFCFIAMXi][ekEi@c@[FwQ¨U@YF_W[Yo[¥FQ[OUaaRBWeQyq_X­MECCBUCGDGCMBBEAAIQTEBICEDABKHAFFD@JCHIAIBIBMDCJAFI@KCG@GNKTaBOOSDOLQ^KPAVDr@XOGEWEUUOFOBSNMHWoHQ\\HHR_M@FIQMcK[OBECS[_V·fWL_MUSONKL[`]DOGiKCCC\\[bG^@\\EZJRÉEčcOMJWWBP¿QIFSDSNJYR×paRgdcLN@PkhcNQDYBWCMddeWV§{bEV]BOLYdIBklBRgndNCRIH¡P[rIzĵÐBhTPeiB{vhGAÉeDKL`EASDI@MD_F[LCDAHODADCBI@CCQFG@CBIBGDID@DOPCHGFI@EEICGAEBEJIDCHID@LEHSNGB@FBDALBJGFEPEHMLKFAFEBLRCNDRCLNHGL@HEAEDKDECOAABE@GDGDEBADBDHDJADFFJAF\\hGRHBINVGHEDDEFOFAFGF@DADUHCHKJOEC@EFGBE@GDE@ACIB]NE@KNIBAFE@GBI@C@KBICI@EBI@GDK@CCGAKvBJELO@GAIBEGEDUDIDI@IDGAEDI@IHgCeRuR[PIFIBEHG@GFGBCFCHEJSPGBGFI@IHEFIB@DABIBEBAFADIDABK@ILEBEFG@ADE@KDICC@E@EFIDBFEJ@DHFGFDFAFFJ@FJFGFCDAF@HBHHFAHADFDKDIFCD@D@BCDMFBD@DKHC@ID@FGFA@KEI@AFEFOL@BCD@JCBICG@EAKBQ@CB@DEB[@CBGCMBECEF@DGDE@FHEPIBAB@HBDCJDDEJGBQ@ABIBONE@EAC@EB@DCDABGDI@ACKBECEFC@QBCF@FEBCDCDEF@DEDADCBCDDPEFE@CFEBIECDQ@GBC@CB@DCAE@GAGDAA@CCCACOACDGBEBMLG@QJA@@DGDI@QHAFWDCACEGAGBABAFGFGJKFCAK@GBCBEHA@GGG@EEE@CBMICFA@WBGFECEAGFI@ADCBWA[DCBUIWCC@EDKBOFS@IEACWCGEGGOEH[EIBGCE@ALILAJ@NHGI@CROLSD]AIDE@GAAUOECKDI@MDFCDE@GCCE@IFOBI@IAABAFQLAFEBKCQHE@EFEEGCEGCAEFK@CFMBABIF@BNL@BCD@FDBFBBFFHAJEN@HCFHZ@JC@CCABAAC@C@C@A@S@C@IAIE@AMKAAE@AACDBBABEBE@ENC@C@KHSDBDI@@DCBGAGBK@CBADA@KAKAGCACA@GBAAIEGD@DA@CBM@GB@BK@BDABBDKAABDDCBE@EBč÷~^lBxBZDpIxCJIdAXhdR´¶lźURMBCBBDEJPNZDLHPnBjX¼l`Fj[ZBDCH@LCDBFADCFEBGCEBABBFABJDF@DFFBDHFBFJBDADN@FDLBFHGFSDBLIJVDLHBDAPBB@JBBMPA\\\\C`RPfyLQpprJAxMpnoBwVqAÄBBADBBHBBDADB@FDBHJFBDCDDB@BADFDBLBBJD@DT^HTLH@HC@A^DDDh``LPGTUbG^BJWHJJtpFNAPUlB^TNcJC\\BxTT¯X]DKv`T@PWBYFUTQLgnUTK^HJGLBN`TÀKPAL¤G`KDEFC@GDI@AHGBGBGD@FE@CD@AEBCFC@AFKD@FEBABC@ABBBCBKBAFADCAADC@KBBDADAACB@BEACFA@BBCACDC@GBI@QBEAMBCCI@@BCCK@AAC@CBGDM@CBEHCDC@CDFBH@B@@DCBBB@DC@DB@FFB@FB@@FGDA@BCC@@BIBCFFDBAF@CCBAHFBCD@ABDHEBCCA@A@@DCBF@FBBBE@ABAAC@C@@DADFBB@EF@BDBEBHF@BCBACA@ABCBCAAB@CCBE@BDEBAACCC@GDFD@BADB@@BCACA@ACCC@A@A@A@AHCBAFB@BCDDB@@CDB@BC@ABDD@BEAAAAB@BDB@DIE@DADIDE@EBFBABE@AAC@BFCBAAEEEDAEEBA@@BABACC@@FCBABEAEBBBD@ADDBCBFDGDFBDABAACDAHBL@LBLEDFH@FBLLbDD@BCB@JD@HDBH@DCT@TDJFPADBD@@DHBFAD@PLL@BBEDF@ABHDA@@DA@@@HFD@@FCBHDBDFAADDBCBB@@BF@DBDA@BABD@H@@DB@BDABD@@BD@ABBBABCABBADBBBCBB@AD@@BA@@BDBCB@AABBBBDFA@DD@ABBFABHBBBB@@@D@BADDBADB@DB@DCA@FADDCBD@F@@ADB@@AABAB@DBABD@@BC@BDBA@@D@@ABAD@BDDAD@BA@BABD@@BBB@BFFTDFA@@BB@BD@@AHBABB@FA@BABB@B@D@BB@BBAB@BBB@BAD@@BJADD@BBB@BD@FDDADBBBB@BBLB@ABBBADBDADBB@@DFABBB@ABDAADBBF@CBBBFDBA@FDB@BH@BDHDABD@BBHBD@BBBHDA@BDBABDBABH@CDBBL@@BB@@BDDABBBD@ADAAABBBADEBD@CFDDA@@@ABFDAFBDADDBABBBB@EBDB@BB@@@JBA@FDD@BBBABDBBBABBB@B@@DFBH@@DD@@BDBC@BBFBD@BDDBBDFB@BBBABDB@DB@BBB@@BB@DBC@FDABDFJD@@DDA@DBA@J@DDHBBB@BJBBDD@@D@B"
                    ],
                    "encodeOffsets": [
                        [
                            122766,
                            48692
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        122.070317,
                        46.076268
                    ],
                    "name": "兴安盟",
                    "childNum": 1
                }
            },
            {
                "id": "152500",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@LGYcC[JeHODiBQPgLYBQ@QNc@YASEUGGMCK@KFSAIBEBaDO@YBi@I@QHOBKCrDRiHGDOHCRCNSH]FGAKBQAIQiCMC_DG@OQYEE]EGBKHMBI@MIGWEGGEMEKAI@QDQHMJKDcMKE@GMOQeCDEBKIFQAWDQASGGKMMI@kDaHOASGIAQAYAKDULEFOXAFGJMXEHIFSFMCEAGAKMISMMWM_IUCG@IDIBWAQDML@H\\NFDRVF^AFIH]FMFILQJ[CWEUAIDIAUGMGEIEMKcEEUK_EOKeOSAAEEAAGGCBCFABADCAEOECEBEACCA@CECGADKBCMODGFC@AGIGEBCAGCEGCBAGCEACBGAQBCBCDEFKBCIMEI@cDUCICUQAC@ABAD@BCCACIAG@CDERGDENKDGDIAEIAAACAFGUWIAQSe@FJq@GBk@@Ka@CJCB@DEDBDFDKJ@BC@@BBB@A@BIHADAXCLGN_ZKJKTCRCDQPIN[rK\\IJGTAJ@HGDYCOAGA_S[ESAEDKFCFOFKAYQI__AMQKIaQMCE@SFIFI@GAIGCKBQAGGEQEeHM@GCIKIGMGOGGUCQKGGC[DUGIEIIUIcEO@e]MM_SSGECgEGCOCigWwMOEaEME[CUBUEECMIOUHAPMLQhENGCMIGAE@IS]hmZSWMqCi@SCEHKHWnIFI@MEECMOBQBEAEBIGOIGICYEWAoGBNANBLUVSFcB]JUJc@GCMD]PWA@QO@ACIIQGIAG@[LGF[JQA]CoADOAaGoCGCMMOKCASAGBCFANBFHHLFFFDFFJVNLPFd@RF`BVEpIh@JJT@TGXKTMLOTAJEBHFOBABFHAD@HPADBTEXLRBLLPBHTVRDFKRAFUd@LDRCJBHFB@FAJOHAJ@DJABBABCB@BCB@DH@AFCJ@BFB@BGB@BXAJBGJHDEDG@AB@DBB@DIBEHED@DBFEL@BHB@ROpOXMA@CCAEFAFCBCFKAGB@DXB@HFFGDBBABAFEBBDCA@FABAEE@EDCNE@DFADQBBLCRFNEJ@LALBBFB@B@DCB@D@DEFBBEB@DKB@BBDCACB@FCBDFIBAFGFAFKFINE@HD@DDD@DOB[BGpCBDDYVAB\\D@FD@HPQDCJGAQBDB@DQDGFaFçiVpe\\GLFPXRJDDFBFCHEFIFSFQKQEXOAOBobEBMAEAEGAOEYWeWYMKiUMEOaMIF]EgKLQHGNDJCBEV[xA\\@WiGUUB{TC]Rg^{TQLWFMASEMIQEKIWKEGCGKgCICCIEQCa@mEEC@K{ES@R@yMyix\\e}PK@EECEBS@IGIEAKAQ@SL_LYDGASMOCOMcUI@CHCRKLSHYHQRBhERGNEVFRRTGN[DCF_DUFMLMLWPUHSFSJGTAPMXMHUFWBMEQSSK]G[AUB[FcN@F}RM[k^QBBōRsa][[QKQQE_MUWUUOw_k]S_O@AJEEKfCD[QMmA[VWO{YOBetAZONQNFTWPYX]bOPexMRyHf©L¡Ġ«vd{f[NmLÛdīnr»ÛzFpĻ{RCfûĖu¥ÖEnABÂ·êùEBUP{n×âSRĽHÑý®ºoAN`èlôfXTxZJb²IBT@p|ĪĆ²@DXL\\JhL\\D`H`G°Kh©Êq[b½g`OJQHsJ_P{Vi\\g\\_dKNGXEHWNKNgjcOAVDZQ\\gf_ROD¯^CPU|XnnLZfRdPtXNfRRVQÐr¸`~LFANft~LPlx^`¾HR\\`bpXPÒr\\NbzZvR®H^DoʄOfP\\DTEq{naºÑ_æxQºaSXG´B~AÖ[T@bGÞo^CECʌ]lO^UdCÖW~\\¨|ò¼xPNFNZHPJ@TJJZLB\\HD@vPjAXJHZ@v^tV~|XR`HPZ@ļÐhT\\Fb^tbrd\\`zfhThTnJhN¦b°Xønŀ¦c`GITDHR@ĨX~BǔG°X°Z´Z²V°V¸R|ľì|¸bVRrZFAnOTDZLDLtztACPGE`VP[TS^mZD`LpLX`ŤƘtHĆĂvXp\\VpPzBZBBZDLDPJNXPFbBTH\\rPHXA~OŪUÚOŴTXAĖGPCXOlb NT^dw°dFfBnTbHTCTAtDbBTE\\G`T^EXGPIRYDU@SsPKnS`@dDXFZLRTbCR@dIxHXH\\PJHO`LTPD\\FRPHRXVVJ`FZ@nAN@JNJT®@VDVLd^bRn`xJbArB^JXLh`NpĂWraXM¾GÆIXEz\\t^ZBTI`gdCAXE ITDDPAJQTALTZbXhjVTAnF`BHKJiCMQQ^QVBZETPPLZFfLXBHOt{RKh_DIBOfBXRTBNLR@VGV@fMf@RHEBMHGZOTEXOVQZCVTMNSbVxb\\R\\CI^ElLCPCfU^CTBvLl@LIVGRWBWKQvVfJHNNJNHnBPB\\PLRHP\\^LXCPML°YCRDCCB]D@@E@AKGGSS]@CICAAAKECBC@ACADCACIEAGECA@BCACE@CCBAACÃrBxUpAomwNBqIoRozKOe_Q[DB[NOAA@IAABOACKGCUJIAKTCHEEGKAECM@BCACEIEACGEACEE@ICBAAEBAFAHDFADEBCAEDC@KDGAC\\YEik_W»AiOmKGYCOMFIACDANAVQkŹ³µQgcBWJcDIwoJYCwAkA}]ggZg¿Çċý`uYGL«¥Á]e®h]`NBCCMGCECIEKCHSAICIMCAACKCOAG@CBCHC@ETKJCNBNITCJGNEDC@IBCQGNQJI@EBEAEBCBGBGFEBA@CEE@GBECAAGEA@AEAGEEIKEICCGBCECKBE@EFMBABAD]@IFQ@@LGDDB@FEHDJEHDF@LMJABEDC@EDGAMHGBMDUH]FQNAFC@GCKACGGEACEA@CIGGA@ECEGEkqIeBABKRITQHEDIHCAEL@HBF@FDFAR@XKOCOGE@GEEAACPGPCLBDBNIFADGEAEG@CEAAABA@GDC@ASCKEGDADODKHMDULEBECEE@EGACIDEAEMEPKDMFBNABIACFABECE@AECJ@DEPOJCHFFBJKHABC@AHALBJMRGCCBGGKBCDIACEA@GI@OBWJ_FOFMBSA]HMCYG]BGBGHEDIBCAKHMLIGCE@EECFGAEBCHCBC@IACCAACCGBABIACCA@O@CECBCCCAEBGVI@ACIZIDEH@BA@CBAR@BEZQLDDADCLADGJDLGBKCE@ADECG@AFEBELGBEPQDI\\IQamAWB[DBGFE@GMCACGCRATB\\G@ECI@CKCQBGCQBQG[AGBQGEEGBGAAABIGCKAIDMCEBUAMFWBQBUAcLIHCHIDCDCACAK@IBE@KEIKKBKCCGDCACBEGIBELFLCFBFGHAFABEHELAFCFBHKFCAAAGBEAGBCXABCF@BCBC@CBELIF@@IECACBCAGFA@CGIAEECACCC@CAAFGGCGmM_BaCMQQ[MYG[A[QIKqIOEIMYASDO@MSWEOKW_QGWUADIACBCFEFQBULOAYIeIEAEGCB£UO@@RITMHYBYCIIS]GIsIQGD_COIIUCoEQCGIUCW@ESA]FKAMCI[IOFWE[aGO[MUGSFQP[D_MYEGDGAGHEBIFQBKFE@AEDCE@K@QDM@aHIDIBAFQGECAGIEEEIAEE@CFCDGFAAGBCJCFIJEHICI@GGGBAAGBEDCBGAKNGJABCGEWEMROBC@IFDHBDCJGAQAOOGIG@EABGAEMK@CBEM]OMQ@SPWI[kDYHMGQSMGUGQ[MQSKOFoJ]E]A[R]DiB}RiOaYQIGM@SAKKKaEeIGOSSMABCGGSCCAAC@ECEFE@IAAKC_BYFEAMAMGCEQACDC@ECE@GDGBa@EDEDUHGBKASBUHIFGHCHBDHFHBBBBJBFNHJZJH@PJFFFJDFJE@AFCDCDQBMR[PaKGHABAFGBCFFFVhUP]LCFBD@BMBCFMDG@IDM@KFGD@BABQBIDADFH@D@DCBADEDCHCDAFGHIFGHQNcAYHo@aJȷ]w[OSy{­wy}mgUT¨eV_AW_OamVYYo`swUBI^«¬{çã@YQUF§SDCCA@AHIAAGCCAOCEECGFCGC@C@EDCAEEECIEAIBEG_DCABCICC]FUFKBEMQvµo±t­P¹WBMU_QFsUS¹m¯qcI_WyCW±C\\IpuJejEbs`GªsGSL[IUÂsNCPIlMr[`SjsPULw@QAcCyIcDkLYUaYiYeEaOcyoP[ ^@WFskN\\CLrb@FhEtKRC~EfDzsQUlANYTPxMQaBO@CEEFGDMFK@CGCCCACBEJGJOHKJENMHGFOEQAMGKDGAAIAECAQCG@CACBID@"
                    ],
                    "encodeOffsets": [
                        [
                            119700,
                            43406
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        116.090996,
                        43.944018
                    ],
                    "name": "锡林郭勒盟",
                    "childNum": 1
                }
            },
            {
                "id": "152900",
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        "@@Ģ[²O¶OƌoŀaK²MªO²QĎY¤OM\\AjGâWæClCȼUVC´GCĪQĈMÐMtAǤ[Ǝ[CîK¬GtFÈZTDNRFÊVNô`nJxFÌXXBAĮGE A¸GANd\\VVtnÚAEŘEĲKŎCrGX@OĐkȞªUZGĖiĀk²UXIX@\\AĺU¬GlCZG^YRQLM~tqJM`[z}PKz¼¿JOfA̖áüfæOúCʺĿƼÅǰãIʔ©þefKXBƼHtAbFĆbĮ`´V¬TĤ\\BIñCëĨQªOĪNĖH`C}Ǟżh\\F@OÑGiiįlũE_\\XmR_DEb{ÙdÏac¾¯XiD[B_FWD[¬u¬}°àxiVSXAXILQvQ¦_°Gn]òwIAZEbKÂMhMjeDDF@nTzXAJC\\CJGBI@CFCBC@ABAIsDCPABCACB@@AFCBCB@ACFAAAJEACDBBCDBBAD@DCBEDAF@HGD@TER@D@DHHDJBNAREFEL@¾efSdOA@SP@@Y@AV£cV_E{JEyA}zÁhA}ÏNh§ČĳĖDji^C``è\\ÐEŠ]L]­»»ÅÒ]²F@@@aKCOIMIMQESCAEMCUKUWSMEOOSIOAOESOMOSQ[KIIAGAOAYFU@OBMCK@MBSAeHENa@KKKMCGIAGBQHQDQLQdcJOHeBAEKG@CDGTUDOBUAaAMIU@ODGLGRGVMNEDE@ECGIIYQOEGIAGBGJaŋ»CCBIWMMMOW@WR}LOJCPQLE\\EDAJOBGDED@PC~WF@PGVAZGTK@ECGSIAMDGJ[JQDGUESKKAUDoSQMECKAU@iFIDOLyTIGCEQWIQIGGCKMCGEEGCACCCOEEEIAMOQ@DECEEABKCAAC@KIE@KAEIGGAiH[HABQHaDOF_DU@ODIAMAUCKB[EeG]KIBMC[BMCI@ECIGEKD_HUBUDKCeBUL[DOCKKSAICCOGYGMGKEIBMHyFGBQBQFQPGNMJ[EUO[aKQEIIMK]GIOKIKCUKMIY@QEMJE@@IGEGFGHEHGBAAKCIKMGMKAEEIS@ICISKOBKA[MMMQYYQEAYQQQCGBMDMPULK\\DHA@CCEIECKGKWQSECKEGMEUOEGCEKMACBGAAQ@KKOEEEUCCA@GBKHGLIACEGEQBCDCDEDM@ICKAAICGISKAC@ER[BIAAU[MIEEAEDMAEECIEMIIKCG@MBGFKBQPKDIBIBALGBCAGCGAAUEAAEM@OJSDO@SAUIIWOAKFMBIOO@MIIDQLMDOJM@COKS@IGAEHICMAUFMHW@CU]EKAEDKJIBOJGHIL_^[PUBCIQES_}AKQMYMWIKCKE]]CGKWAOBGEQCqCOBIAOH[RoZc`_T[VWNWDCDG@GAEOUO_W[WkAEAMBiDMFIFQD[ESCGKKWWEIEICOM_WUQGMGgIMISEsOK@MHcDQFIBK@SEAAKq@AEEQEGKIIC]@§Gg@oAgBGAoFeR[DWDGAOC_BYE_A]EK@Q@gMaOaC_I]ASCaOMKUKmK}[UCI@QECCic¡waMćMkK@Wu_IAíMýQáGģGEGUBQ}Ec_GiBMGOOaKI@OJI@gM_[CD¡e¯IčÀőĄ_R½OR[fQ\\ƑŘKFVŁYF©`TAP@NGXANBJEJ@FCHALE\\E`CHANERINGFADAP@ZFTIjENCLHF\\zZd²hPFJ@rXFFcäGzI`]tU\\SbObUTώȪ²äÆø~V~V¸rJHnDDAVDNALCdG\\FXJRRjIZELm¦]fÉÖ¡®XnFLFJRldÈABËj³`SDDBeB]Aġ}Ùs·eë]YEYMcGGqOiEwMYIïËÏ¡w]oCAAEIaUqSMCEQMQUOKOIMI_[EAIAQB¥NPiNÍZ«X_DeH_FNJ_D]FW@kT[TUJk\\aTjiVUJUµ[}cm[YMSGgI{I{MMSQmK_ġ]»_G@ECFGjgFC¶¯XY\\I^S¤|[ÅSMEI¯ËÙqi©i[EBIJUNSJMBKCIEYLqLYJQ@CCGEE@MDICOMIEIMYMSOKCGDINWbczEHGF{T}RUHaDMJGJqTuNMJQH[EYF_BGBKFGBSCIDGFKDIHGNCPB@ZDPDFDLLHLBDBJETGVABCBIAJMB]@kNCJCf¨XxCBSEWMóMuGOSO@AFFLDRAdE^ELIH£jSFA@EECMOYMKG@EBpEFENBnAbBDBD@DEH@DDLAHKVKZ@XO^F\\IPAH@ǞĳCKBS@cGSGkII_BPU@QDSBDBäµJĭpsÂZÁàĻdOFáªçX­béØL}NJmRcDoCçGáKeAYDMJQHDLFFLDPB\\ENKXI\\AhJPHjXTFb`JfTfNTNvThVTVl`LRÐHhDfL\\NPJ|ôJRzxXRLFźØRH@ɜÖÞKĊWTįŰ§ÑDƁZŽVěïǟJãFĝFAġ¡o»d³öǍÝBOAICK@OHIFAHGBENOIGAMBCCKGO@CBCBKHO@OCFk`[ZWNeRYHMHINMJKNGPGHCJgÜĉu¸ËʅğU̎ZNÅ¤\\å õ¦½Àɿɾ@BDJAFDBD@@FEBIFCHIBEDAJDDAFEFBBÊ¬ƒłƷˀƍɲşȞßŐ¸Ùń"
                    ],
                    "encodeOffsets": [
                        [
                            99505,
                            43823
                        ]
                    ]
                },
                "properties": {
                    "cp": [
                        105.706422,
                        38.844814
                    ],
                    "name": "阿拉善盟",
                    "childNum": 1
                }
            }
        ],
        "UTF8Encoding": true
    }})
})

router.get("/getSeller",(req,res,next)=>{
    res.send({code:true,data:[
        {
            "name": "商家1",
            "value": 99
        },
        {
            "name": "商家2",
            "value": 102
        },
        {
            "name": "商家3",
            "value": 83
        },
        {
            "name": "商家4",
            "value": 49
        },
        {
            "name": "商家5",
            "value": 200
        },
        {
            "name": "商家6",
            "value": 152
        },
        {
            "name": "商家7",
            "value": 76
        },
        {
            "name": "商家8",
            "value": 23
        },
        {
            "name": "商家9",
            "value": 87
        },
        {
            "name": "商家10",
            "value": 223
        },
        {
            "name": "商家11",
            "value": 145
        },
        {
            "name": "商家12",
            "value": 187
        },
        {
            "name": "商家13",
            "value": 127
        },
        {
            "name": "商家14",
            "value": 57
        },
        {
            "name": "商家15",
            "value": 99
        }
    ]})
})

router.get("/getStock",(req,res,next)=>{
    res.send({code:true,data:[
        {
            "name": "IPhone 11",
            "stock": 2310,
            "sales": 2103
        },
        {
            "name": "长筒靴系带",
            "stock": 34312,
            "sales": 23509
        },
        {
            "name": "打底毛衣宽松",
            "stock": 22140,
            "sales": 12830
        },
        {
            "name": "厚款羽绒服",
            "stock": 10842,
            "sales": 5492
        },
        {
            "name": "牛仔裤",
            "stock": 68102,
            "sales": 44043
        },
        {
            "name": "加厚卫衣",
            "stock": 12032,
            "sales": 8603
        },
        {
            "name": "衬衫",
            "stock": 9890,
            "sales": 8960
        },
        {
            "name": "HUAWEI P30",
            "stock": 20130,
            "sales": 12302
        },
        {
            "name": "手机壳",
            "stock": 89342,
            "sales": 42948
        },
        {
            "name": "打底裤",
            "stock": 5034,
            "sales": 1220
        }
    ]})
})

router.get("/getTrend",(req,res,next)=>{
    res.send({code:true,data:{
        "seller": [
            {
                "id": 1,
                "name": "商家1",
                "data": "22,25,25,25,22,25,22,25,22,25,22,25"
            },
            {
                "id": 2,
                "name": "商家2",
                "data": "55,25,25,25,22,25,22,25,22,25,22,25"
            },
            {
                "id": 3,
                "name": "商家3",
                "data": "66,25,25,25,22,25,22,25,22,25,22,25"
            },
            {
                "id": 4,
                "name": "商家4",
                "data": "66,25,25,25,22,25,22,25,22,25,22,25"
            },
            {
                "id": 5,
                "name": "商家5",
                "data": "11,25,25,25,22,25,22,25,22,25,22,25"
            }
        ],
        "commodity": [
            {
                "id": 1,
                "name": "女装",
                "data": "22,45,25,25,22,25,22,25,22,25,22,25"
            },
            {
                "id": 2,
                "name": "手机数码",
                "data": "22,25,25,25,22,25,22,25,22,25,22,25"
            },
            {
                "id": 3,
                "name": "男装",
                "data": "22,65,25,25,22,25,22,25,22,25,22,25"
            },
            {
                "id": 4,
                "name": "大家电",
                "data": "22,25,25,25,22,25,22,25,22,25,22,25"
            },
            {
                "id": 5,
                "name": "美妆护肤",
                "data": "22,85,25,25,22,25,22,25,22,25,22,25"
            }
        ],
        "month": [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
        ],
        "type": [
            {
                "id": 1,
                "key": "map",
                "text": "地区销售趋势"
            },
            {
                "id": 2,
                "key": "seller",
                "text": "商家销售趋势"
            },
            {
                "id": 3,
                "key": "commodity",
                "text": "商品销售趋势"
            }
        ],
        "map": [
            {
                "id": 1,
                "name": "上海",
                "data": "22,25,25,25,22,25,22,25,22,25,22,25"
            },
            {
                "id": 2,
                "name": "北京",
                "data": "45,25,25,25,5,25,22,25,22,25,22,25"
            },
            {
                "id": 3,
                "name": "深圳",
                "data": "58,25,25,5,22,25,66,25,22,25,54,25"
            },
            {
                "id": 4,
                "name": "广州",
                "data": "10,25,25,25,54,25,2,25,3,25,22,25"
            },
            {
                "id": 5,
                "name": "重庆",
                "data": "88,25,25,25,22,54,22,25,22,25,22,25"
            }
        ]
    }})
})

app.use(router)
app.use((err, req, res, next) => {
    console.log("错误捕获");
    console.log(err.message);
    if (err.message === "invalid token" || err.message === "jwt must be provided" || err.message === "jwt expired" || err.message === "jwt malformed" || err.message === "token已注销") {
        res.send({ code: false, msg: "token无效", data: null })
        return
    }
    res.send({ code: false, msg: err.message, data: null })
})

// 设置定时器，1分钟定时清理黑名单里过期的token
setInterval(() => {
    set.forEach(token => {
        try {
            const res = jwt.verify(token, "qinghaixiaoyu-Doy")
            // console.log("注销的token未过期", res);
        } catch (err) {
            set.delete(token)
            // console.log("过期删除");
        }
    })
}, 60000)

app.listen(3000, () => {
    console.log("监听3000端口");
})
