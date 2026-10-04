// All campaign chapters. Structure: chapter -> scene -> event.
const XC=(type,text,speaker)=>({type,text,...(speaker?{speaker}:{})}),XN=text=>XC('narration',text),XD=(speaker,text)=>XC('dialogue',text,speaker),XI=text=>XC('notice',text),XB=id=>({type:'battle',id});

const CAMPAIGN_CHAPTER_SCENES={
  "1": [
    [
      {
        "type": "narration",
        "text": "ある世界にそこそこ平和な王国があった。"
      },
      {
        "type": "narration",
        "text": "その王国は近隣諸国を侵攻する魔王軍に対して危機感を持っていた。"
      },
      {
        "type": "narration",
        "text": "そのため古の「勇者」と呼ばれる人物を象徴とした、勇者パーティと呼ばれる対魔王軍を設立。"
      },
      {
        "type": "narration",
        "text": "これはそんな緊迫した世界で勇者となった青年のお話。"
      },
      {
        "type": "notice",
        "text": "シナリオをクリアすると、ユニットが1体貰えるぞ！\n頑張ってクリアしよう。"
      },
      {
        "type": "dialogue",
        "text": "それで、最初の任務として首都近辺の哨戒業務を任された訳だな",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "最初から大変な任務よりマシだね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "ゴブリンの群れを発見。魔王軍の尖兵の可能性あり",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "あれぐらいなら楽勝だろ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "いや、配置的に策略の可能性はあるかな",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "初戦としてはちょうど良い相手だな。油断せず確実に仕留めようか",
        "speaker": "ロイド"
      },
      {
        "type": "battle",
        "id": "goblinScheme"
      }
    ],
    [
      {
        "type": "dialogue",
        "text": "戦闘終了。ほら楽勝だっただろ？",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "あんまり油断するのは良くないけどね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "無駄な力が抜けて、良い緊張感になった。これなら次もいい動きができそうだ",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "敵影発見。なになに、何かしているゴブリンらしいな",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "うーん。多分トラップか何かの配置かな？早めに倒すのが吉だね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "では現場に急行。何らかの準備中のゴブリンを倒そう",
        "speaker": "ロイド"
      },
      {
        "type": "battle",
        "id": "goblinBomb"
      }
    ],
    [
      {
        "type": "dialogue",
        "text": "結局このゴブリン達何がしたかったんだ？",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "これは爆発物だね。爆発してたら危険だったかも",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "完全に組織だった行動だな。近くに親玉がいる可能性が高い",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "親玉を倒せば良いんだな。よし、偵察班気合入れて探せよ",
        "speaker": "エイジ"
      },
      {
        "type": "narration",
        "text": "◆◆◆"
      },
      {
        "type": "dialogue",
        "text": "居たね、親玉",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "オークの群れ、だな。近くのゴブリンの群れを吸収してやがる",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "ほっといたら近くの村町に被害があるかもしれない",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "相手にも戦略があるかもな。さっきのゴブリンとは違いがありそうだ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "ゴブリンの群れの親玉の可能性も高い、潰しておきたいな。全軍、戦略体制に移行、どう戦うか考え実戦しよう",
        "speaker": "ロイド"
      },
      {
        "type": "battle",
        "id": "orc"
      },
      {
        "type": "dialogue",
        "text": "ふぅ、戦闘終了。お疲れ様",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "なかなかの相手だったが俺の槍さばきには敵わなかったな",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "魔王軍がこの程度の集まりなら楽なんだけどね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "とりあえず、他に敵が居ないか調べるが、今日の哨戒業務はここまでにしよう",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "無理は禁物だからね。了解",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "俺としては物足りないが、リーダーの意見には従うぜ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "アゾアラスに報告して今日は終わりだな",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "げ、俺あのおっさん苦手なんだよな。ロイド、オリンポス、任せた",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "こら、エイジ報告も大事な業務だろ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "ははは、じゃあな（脱兎）",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "待てエイジ、って足早っ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "まぁ、あいつも色々ありそうだし、報告は俺とオリンポスでやるとしようか",
        "speaker": "ロイド"
      },
      {
        "type": "narration",
        "text": "第1章完"
      },
      {
        "type": "notice",
        "text": "入手報酬：騎兵隊長・ツクネ"
      },
      {
        "type": "dialogue",
        "text": "よくやった。しかしここまではただの基礎訓練。魔王討伐の「ま」の字にも届かない。今後も精進しろ。ん？　姫騎士萌え？　戦場では男も女も関係ない。歯を食いしばれ！",
        "speaker": "ツクネ"
      }
    ]
  ],
  "2": [
    [
      {
        "type": "narration",
        "text": "ロイド達の活躍により首都周辺の斥候部隊を倒し、近隣の村町を守った。"
      },
      {
        "type": "narration",
        "text": "しかしそれは魔王軍の脅威が足元まで迫っていることを指し示していた。"
      },
      {
        "type": "narration",
        "text": "司令官であるアゾアラスは、ロイド達に古代遺跡の調査を命じる。\n古代技術による戦力増強は急務であり魔王軍との戦略的優位性を逆転させる可能性があるからだった。"
      },
      {
        "type": "narration",
        "text": "ロイド、オリンポス、エイジの3名はドラゴンのハーフであるメイランとエルフの長老ロウジャを連れ、古代遺跡へと向かった。"
      },
      {
        "type": "dialogue",
        "text": "メイドの案内で古代遺跡にレッツゴー",
        "speaker": "メイラン"
      },
      {
        "type": "dialogue",
        "text": "お前案内してないだろう",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "メイランはメイン火力だね。案内役はロウジャさん、よろしくお願いしますね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "安心しておれ、お前たちを安全に古代遺跡まで送り届けよう",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "んで、なんで古代遺跡の調査が進んでないんだ？　俺たちは調査向きじゃないだろう",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "だいたい古代遺跡には守護者がつきものなんだよ。わかってねぇなロイドは",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "あはは、まあそのとおりなんだよね。古代遺跡は守護する通称GGGゴーレムに守られてるんだ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "前に調査団が壊滅しておったのぉ",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "強いのか？",
        "speaker": "メイラン"
      },
      {
        "type": "dialogue",
        "text": "うむ、GGGゴーレムのレーザービームに苦しめられてのう。こちらの準備を崩す強力な攻撃じゃよ",
        "speaker": "ロウジャ"
      },
      {
        "type": "notice",
        "text": "特殊技能：レーザービーム　準備4\n相手の戦力を1500減少、相手の準備が１以上のすべてのユニットの準備を０にする"
      },
      {
        "type": "dialogue",
        "text": "これはえげつねぇな。俺みたいな俊敏な特殊技能なら影響はねぇが、普通のヤツなら大ダメージだぜ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "確か資料によると、相手は古代遺跡のセキュリティー機能と連動して策略を打って来るらしいね。ただゴーレムは連携が苦手らしくて招集つまり仲間に頼る戦法は使わないみたい",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "いつもより招集が重要だよな",
        "speaker": "エイジ"
      },
      {
        "type": "narration",
        "text": "古代遺跡内部"
      },
      {
        "type": "dialogue",
        "text": "お宝ないかな？",
        "speaker": "メイラン"
      },
      {
        "type": "dialogue",
        "text": "あったら良いけどな。だいたいお宝はボス戦後だぜ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "ボス戦？",
        "speaker": "メイラン"
      },
      {
        "type": "narration",
        "text": "ビービー侵入者発見。これより迎撃体制に移行します。"
      },
      {
        "type": "dialogue",
        "text": "やっぱり来たね。",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "来るぞ、GGGゴーレムだ。迎撃開始",
        "speaker": "ロイド"
      },
      {
        "type": "battle",
        "id": "ggg1"
      }
    ],
    [
      {
        "type": "dialogue",
        "text": "削ったが、浅い。",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "駄目ー。硬すぎるよぉ",
        "speaker": "メイラン（ドラゴン）"
      },
      {
        "type": "dialogue",
        "text": "一定以上の戦力を検出。第2戦闘形態に移行",
        "speaker": "GGGゴーレム"
      },
      {
        "type": "dialogue",
        "text": "あー、行動パターンが変わった。レーザービームの頻度が増えるかも",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "危険な状態だが、いったん引くか？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "そんな余裕はなさそうだぜ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "迎撃、迎撃、迎撃、迎撃",
        "speaker": "GGGゴーレム"
      },
      {
        "type": "dialogue",
        "text": "うわぁ、さっきより早くなってるー",
        "speaker": "メイラン（ドラゴン）"
      },
      {
        "type": "dialogue",
        "text": "なら、このまま突っ込むしか無いな。レーザービームに注意しつつ突破するぞ",
        "speaker": "ロイド"
      },
      {
        "type": "battle",
        "id": "ggg2"
      },
      {
        "type": "dialogue",
        "text": "error!!error!!損傷多数発見、起動停止します",
        "speaker": "GGGゴーレム"
      },
      {
        "type": "dialogue",
        "text": "勝った",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "何とか、倒したな",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "頻度上がると思ってたけど、レーザービーム2連発とかなしだよー",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "遺跡、結構派手に壊しちゃったね",
        "speaker": "メイラン（ドラゴン）"
      },
      {
        "type": "dialogue",
        "text": "ふぅ、とりあえずこれでちゃんとした調査ができそうだな",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "ん？そういえば、ロウジャって何処いったんだ？",
        "speaker": "エイジ"
      },
      {
        "type": "narration",
        "text": "◆◆◆"
      },
      {
        "type": "dialogue",
        "text": "あやつら上手くやったようじゃな。本当にGGGゴーレムを倒してしまいおった",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "......おぬしが魔王軍の使者か？",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "これはおぬし達が欲しがっていた遺跡の秘宝よ。わしらは盟約を果たした、魔王軍は里を襲わん変わりにわしらは遺跡の秘宝を渡す",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "（頷いて、秘宝を受け取る）",
        "speaker": "魔王軍の使者"
      },
      {
        "type": "dialogue",
        "text": "ロイドよ。悪いのぉ、しかしこれも策略のうちじゃ",
        "speaker": "ロウジャ"
      },
      {
        "type": "narration",
        "text": "第2章完"
      },
      {
        "type": "notice",
        "text": "入手報酬：ハイエルフ・ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "策略の基礎と言えばわしじゃな。ハイエルフの美女ロウジャじゃ！　少し身長が足りない？　そんな事人間の勝手じゃろう。わしが美女と言えば美女なんじゃ！",
        "speaker": "ロウジャ"
      }
    ]
  ],
  "3": [
    [
      {
        "type": "narration",
        "text": "ロイド達の活躍によって遺跡の調査を行える事になった王国。\nしかし、魔王軍は王国を窮地に追い込む為、密かに計画を進めるのだった。"
      },
      {
        "type": "narration",
        "text": "そんなおり、ロイドは襲撃者に襲われる事となる。"
      },
      {
        "type": "narration",
        "text": "王都での買い物中"
      },
      {
        "type": "dialogue",
        "text": "それでね、友達がー。ん、お兄ちゃんどうしたの？",
        "speaker": "リーリア"
      },
      {
        "type": "dialogue",
        "text": "……いや、何でも無い（何故、リーリアは僕達の買い物に同行しているんだろう。家からも遠いのに）",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "仲いいな。お前ら",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "そうよ。お兄ちゃんと私は運命で結ばれた仲なんだから",
        "speaker": "リーリア"
      },
      {
        "type": "dialogue",
        "text": "いや、ただの兄妹だからね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "そうか、俺は兄弟いないからな。仲が良くて羨ましいよ",
        "speaker": "ロイド"
      },
      {
        "type": "narration",
        "text": "（周りが騒がしくなる）"
      },
      {
        "type": "dialogue",
        "text": "ん、何か聞こえる様な",
        "speaker": "ロイド"
      },
      {
        "type": "narration",
        "text": "（爆音が鳴り響く）"
      },
      {
        "type": "dialogue",
        "text": "パラリラ、パラリラ",
        "speaker": "謎の人物"
      },
      {
        "type": "dialogue",
        "text": "リーリア、下がって",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "よう、お前がロイドだな。俺は『ジャキーン』だ、今からお前をやる",
        "speaker": "謎の人物"
      },
      {
        "type": "dialogue",
        "text": "……暗殺者？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "そう、そうだな。暗殺者ジャキーンだ！　よろしくな",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "（騒がしい奴だな）",
        "speaker": "ロイドの心の声"
      },
      {
        "type": "dialogue",
        "text": "何故だ。",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "金のためだ",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "金か、何か困ってるのか？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "金があればいい服が買えるじゃねぇか。あと女だな",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "うーん（聖剣を構える）",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "はっ、誘導尋問だな。なんて野郎だ",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "ロイド、やっちゃおうか",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "うん",
        "speaker": "ロイド"
      },
      {
        "type": "battle",
        "id": "jackeen1"
      }
    ],
    [
      {
        "type": "dialogue",
        "text": "逃げられた。結構強かった",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "暗殺者としては駄目駄目だったけど、戦力としては優秀な感じだったね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "ひゃう、2人共凄かったです",
        "speaker": "リーリア"
      },
      {
        "type": "dialogue",
        "text": "すまん、ロイド。あんなに派手で襲撃者とは思わなくてな。見逃した",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "それで、逃げたジャキーンはどうしたの？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "もちろん、こっちの調査員達が尾行してるさ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "あの頭の悪い感じだと、黒幕のところまで案内してくれそうだな",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "あー、それを見越して逃したのか",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "リーリアちゃんは少し待っててくれるかな？　さあ、大捕物といこうか",
        "speaker": "ロイド"
      },
      {
        "type": "narration",
        "text": "◆◆◆"
      },
      {
        "type": "dialogue",
        "text": "それでおめおめここまで逃げてきた、だと？",
        "speaker": "ザザン"
      },
      {
        "type": "dialogue",
        "text": "わはは、すまん",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "（少しでも役立つかと思ったが、やはり人間は使えん）",
        "speaker": "ザザンの心の声"
      },
      {
        "type": "dialogue",
        "text": "ん、お前もしや、付けられてはいまいな？",
        "speaker": "ザザン"
      },
      {
        "type": "dialogue",
        "text": "あ、すまん。すでに囲まれてるぞ",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "あー、もう契約変更だ。我が逃げるまで手伝って貰うぞ",
        "speaker": "ザザン"
      },
      {
        "type": "narration",
        "text": "（扉が吹き飛ぶ）"
      },
      {
        "type": "dialogue",
        "text": "さぁ、覚悟",
        "speaker": "ロイド"
      },
      {
        "type": "battle",
        "id": "jackeen_zazan"
      }
    ],
    [
      {
        "type": "dialogue",
        "text": "く、人間から逃げるなど魔族の名折れ。",
        "speaker": "ザザン"
      },
      {
        "type": "dialogue",
        "text": "ここまでくれば追撃はないだろう。",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "では、そろそろ約束の報奨を……くっ",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "バカな人間め、そんな物渡すわけがなかろう。死ね人間、役立たずの無能め",
        "speaker": "ザザン"
      },
      {
        "type": "dialogue",
        "text": "く、くそー。騙したのか",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "トドメだ。せめて魔剣の錆にしてやろう",
        "speaker": "ザザン"
      },
      {
        "type": "narration",
        "text": "（カキーン）"
      },
      {
        "type": "narration",
        "text": "（ロイドがザザンの魔剣を受け止める）"
      },
      {
        "type": "dialogue",
        "text": "なにっ",
        "speaker": "ザザン"
      },
      {
        "type": "dialogue",
        "text": "ロイドナイス。まぁ逃走経路の見通しはついてたからね。逆算して先回りしてたんだよ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "た、助けてくれたのか",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "同じ人間だし当たり前だよ。さぁ一緒に悪者をやっつけようじゃないか",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "確かに、裏切りや不義理には罰を与えなければ",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "クソ、人間め。良いだろう、我が直々に相手をしてやる。この魔剣ただの剣だと侮るな",
        "speaker": "ザザン"
      },
      {
        "type": "dialogue",
        "text": "聖剣と違って周りを強化する魔剣だね。ロイド、さっきの戦いを見て思ったけど、序盤相手は準備に時間がかかるみたい。そこを集中攻撃してやれば良いんじゃないかな？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "何故それを！？",
        "speaker": "ザザン"
      },
      {
        "type": "dialogue",
        "text": "図星みたいだね。まあ誰でも気づくさ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "（気が付かなかった）",
        "speaker": "ジャキーンの心の声"
      },
      {
        "type": "dialogue",
        "text": "なるほど、攻略法はわかった。魔族の男よ、覚悟しろ",
        "speaker": "ロイド"
      },
      {
        "type": "battle",
        "id": "zazan"
      },
      {
        "type": "dialogue",
        "text": "バカな、俺の魔剣が負けるだと",
        "speaker": "ザザン"
      },
      {
        "type": "dialogue",
        "text": "すでに戦略がバレてる相手には負けないって",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "ここで大人しく捕まるか、聖剣のサビになるか選ばせてやるよ",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "く、これでも貴族だ。貴様らの捕虜になってやる。ただし、ちゃんと保護を要求するぞ",
        "speaker": "ザザン"
      },
      {
        "type": "dialogue",
        "text": "なんて偉そうなんだよ。ここで倒しといたほうが良いか？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "まぁ、貴族って王国も似たような物だし……",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "あー、俺の報酬は？",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "そこでそれ触れるの逆に凄い",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "確か、王国法には勇者を傷つけた者には刑罰があったはず......",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "じゃあ、俺はそろそろ（逃げようとする）",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "じゃあ、とりあえずうち（勇者パーティ）で身柄を預かる。うちで働いてる間は褒賞が出るよ？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "働かせてください！！",
        "speaker": "ジャキーン"
      },
      {
        "type": "narration",
        "text": "◆◆◆"
      },
      {
        "type": "dialogue",
        "text": "お前、狙ってただろ",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "バレた？だって勿体ないじゃん、あの戦力",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "まぁ良いけど、ちゃんと躾けておけよ",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "あはは、犬じゃないんだから",
        "speaker": "オリンポス"
      },
      {
        "type": "narration",
        "text": "第3章完"
      },
      {
        "type": "notice",
        "text": "入手報酬：ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "パラリラパラリラ、俺っちはジャキーン様だ。オリンポスの兄貴に言われていろんな仕事を任される優秀な部下って奴よ。主な任務は偵察だな。敵にぶち当たって情報を取る！　やっぱ兄貴、暗殺者を分かってる運用法なんよ",
        "speaker": "ジャキーン"
      }
    ]
  ],
  "4": [
    [
      {
        "type": "narration",
        "text": "無事暗殺者達の襲撃を回避したロイド達、ジャキーンの加入により順調に見えた勇者パーティだが、不穏な影が迫り寄ってくる。"
      },
      {
        "type": "dialogue",
        "text": "つまり、俺たちで前線に行けって事か？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "そういう事だ。現在、前線は押されている。理由はオークヒーロー・ギガガルドと呼ばれる強力な別働隊の存在だ",
        "speaker": "アゾアラス"
      },
      {
        "type": "dialogue",
        "text": "僕達はそれの撃破、もしくはギガガルド軍を抑える事で前線の軍が相手の攻勢を押し止める補助をする役割だね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "この任務には1人補佐を入れて行ってもらう",
        "speaker": "アゾアラス"
      },
      {
        "type": "dialogue",
        "text": "よう、若人共よ。おじさんソレナリフって言うんだ。よろしく！",
        "speaker": "ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "なんか軽いな。",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "エイジタイプだよね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "それで、これが敵の侵攻ルートだ。こちらの伏兵の配置図はこれ。こちらは相手戦力の分析だな",
        "speaker": "アゾアラス"
      },
      {
        "type": "dialogue",
        "text": "こんなの観てよかったの？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "前線に出るのだ。必要な事は頭に入れておけ",
        "speaker": "アゾアラス"
      },
      {
        "type": "dialogue",
        "text": "なるほど。魔王軍の侵攻ルートはこれか。ふむふむ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "ん？　何かあったか？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "いやーたいしたことじゃないし、今回には関係ないから後で伝えるよ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "んじゃ、情報も揃いましたし、行きますかね。ロイド、それで良い？",
        "speaker": "ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "ん、ああ。ソレナリフよろしく頼む。では前線で直にギガガルドを見てみよう。",
        "speaker": "ロイド"
      },
      {
        "type": "narration",
        "text": "◆◆◆"
      },
      {
        "type": "narration",
        "text": "（前線基地）"
      },
      {
        "type": "dialogue",
        "text": "ソレナリフって奴、信用して良いのか？",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "まぁ表向きは補佐だけど実際は僕たちへの監視役だろうね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "げー。逐次あのおっさんに報告されるのかよ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "勇者パーティも軍属だから仕方ないね。悪い事しなきゃ良いだけでしょ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "偵察完了っ！",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "おーお疲れ、首尾は？",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "ひと当てしたが強い強い",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "当ててくんなよ！",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "当てちゃったものは仕方ないね。それで敵の情報は？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "えっと、諜報部隊の人から預かった文だ",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "あはは、んじゃちょっと情報を整理しようか",
        "speaker": "ソレナリフ"
      },
      {
        "type": "notice",
        "text": "特性：無謀\n999以下の戦力減少を受けた時その数値の0.5倍をかわりに受ける。\n1000以上の戦力減少を受けた時、その数値の1.5倍をかわりに受ける"
      },
      {
        "type": "notice",
        "text": "特殊技能：大立ち回り　準備2\n相手と自分が受ける戦力減少の値を1.5倍\n相手の戦力を知略の1.7倍減少"
      },
      {
        "type": "dialogue",
        "text": "よく生きてたね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "あはは、死にかけた",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "硬いな。策略で削るのは難しそうだ。ただこいつ防御の事考えてないんじゃね？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "うん、確かに無謀で小さなダメージは減少させられるとは言え、リスクの高い行動が多い印象だ。",
        "speaker": "ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "そう考えると、相手の戦略も見えてくる。多分ギガガルドは1度もまともに大ダメージを受けた経験が無いんじゃないかな？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "なるほど、だからリスクを軽視した行動が出来る。ってわけか",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "とりあえず、ジャキーンでも何とかなったんだし、1回戦って確かめれば良いんじゃね？",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "ふむ、一理あるな",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "相手の戦略は策略を使ったシンプルな物だと思う。でも何か読み逃がしてる気がするんだよね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "現状のできるのは戦力を最大にして相手に当たるって事だけど。行けそうな気がする",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "行くぞ、ギガガルドの戦略、攻略してやろう",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "どうなるものかね",
        "speaker": "ソレナリフ"
      },
      {
        "type": "battle",
        "id": "gigagald1"
      }
    ],
    [
      {
        "type": "dialogue",
        "text": "な、強かっただろ？",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "ジャキーンの普段の言動のせいでこいつが優秀って事忘れてたよ……",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "読み逃しというか単純に地力で押し切られちゃってるね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "これ、どう勝つんだ？",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "ちょっと待って、えーっとジャキーンの戦力を計算にいれて、それからこっちの戦力を……（ぶつぶつ）",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "とりあえず、相手の戦力を下げる必要がありそうだな",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "あー、駄目だ、戦力が足りない",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "あー大分煮詰まってんな。大丈夫？　口貸そうか？",
        "speaker": "ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "口を貸すって、手じゃねぇのかよ。んで、何か策があるのか？",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "若者は割と一人でやりたがる所あるからねぇ。まぁ、おじさんも対した案があるわけじゃないさ。",
        "speaker": "ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "別に1人じゃねえよ。仲間と協力してんだろ",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "仲間、とはね。大人は仲間以外の人間も使うものさ。",
        "speaker": "ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "仲間以外？　どういう事だよ。知人に協力を仰げって話か？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "知人ねぇ。誰かいい人材がいるのか？",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "あ、わかった。ロウジャさんだよ。ロイド、彼女の「ゲリラ戦術」なら効果的なダメージが与えられるんじゃない？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "ふふふ、思い付いた様だね",
        "speaker": "ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "なるほど、それに合わせてもう１つか2つ策を入れれば、十分ギガガルドを攻略できるかもしれない。",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "トラップだな。相手の防御を下げる様な何かがあれば、対策できそうだ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "逆に相手の攻撃をどうにかする罠は悪手だね。さすがに攻撃が効かなくなれば撤退される危険性がある",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "敵の防御に対して無関心な部分を狙うんだな",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "後はロウジャさんをどう仲間に引き入れるかかな？　効果があるか分かんないけど策は思いついた。",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "早馬でロウジャさんの所まで行こう。あ、ロイド僕馬乗れないから乗せてね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "まあそれまでは俺らがギガガルドを抑えておくぜ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "良いねえ若いってのは。",
        "speaker": "ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "何いってんだよ。おっさんもギガガルド止めるの手伝えよ",
        "speaker": "エイジ"
      },
      {
        "type": "narration",
        "text": "◆◆◆"
      },
      {
        "type": "dialogue",
        "text": "ロウジャさん、時間をいただきありがとうございます",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "それで、話とは？",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "ロウジャさんに対ギガガルド戦の為に力を貸して頂きたくて",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "ほう、それで見返りは？",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "……今後100年間の里との間に不可侵条約を結ぶ。というのでどうです？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "王国とは上手くやれておる。それに何の意味が……",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "今の状態はエルフの里は魔王軍に偏りすぎています",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "何故それを！？",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "なので王国が勝った時にもチップを賭けてバランスを取るというのはどうでしょう？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "……200年",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "200年の不可侵条約じゃ。それで手を打とう。",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "孫の後は分からないですよ？",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "裏切りには慣れておる。しかし、約束があるのとないのとでは大違いじゃ",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "わかりました。これにサインを……",
        "speaker": "オリンポス"
      },
      {
        "type": "narration",
        "text": "（カキカキ）"
      },
      {
        "type": "dialogue",
        "text": "それで、ギガガルドに対応するとな。何をやらせるつもりじゃ？",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "詳細は移動しながら、大丈夫、必ず勝てる策を用意していますよ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "俺はほとんど居ただけだけどすげえな。何でロウジャが魔王軍と内通してるって分かったんだ？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "いや、エルフの里を避けるように魔王軍が進軍してたからね。何かあると思ったんだよ",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "そんな事も分かるんだな。",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "伝令だ。なになにギガガルドが強襲してきて戦闘になったみたい。",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "急いでロウジャ達を合流させないと",
        "speaker": "ロイド"
      }
    ],
    [
      {
        "type": "dialogue",
        "text": "策の起動はまだか？",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "当たり前だ、ロイド達が戻って来てからだよ。おっさん、ジャキーン。耐久戦だ、行くぞ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "まあ少し頑張るかね",
        "speaker": "ソレナリフ"
      },
      {
        "type": "battle",
        "id": "gigagald2"
      },
      {
        "type": "dialogue",
        "text": "すまん、またせた。戦闘状況は？",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "おせぇよ、とりあえず、策は施したが結構押されちまってる",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "策の発動を優先して、ロウジャさん達が来たから。引き気味に戦って後は任せよう",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "肝はゲリラ戦略に掛かってるってわけか",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "ロウジャさんの防御は高くないから、それまでに倒されない様に立ち回らないとね",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "な、なんだこれは？",
        "speaker": "ギガガルド"
      },
      {
        "type": "dialogue",
        "text": "液体？　こんな物では俺は倒せん！相手の戦力を削れ、行くぞ",
        "speaker": "ギガガルド"
      },
      {
        "type": "dialogue",
        "text": "なるほど、そういう策じゃったか。エルフ軍は火矢を持て、行くぞい",
        "speaker": "ロウジャ"
      }
    ],
    [
      {
        "type": "battle",
        "id": "gigagald3"
      },
      {
        "type": "dialogue",
        "text": "何故だ、こんな矮小な攻撃で俺を……",
        "speaker": "ギガガルド"
      },
      {
        "type": "narration",
        "text": "ばたん"
      },
      {
        "type": "dialogue",
        "text": "やったか！？",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "それフラグだからやめろ",
        "speaker": "エイジ"
      },
      {
        "type": "dialogue",
        "text": "倒した。な",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "やったな。みんなの勝利だ",
        "speaker": "ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "（うさんくせー）",
        "speaker": "ロイド達"
      },
      {
        "type": "dialogue",
        "text": "とりあえず、相手の残存兵力を片付けておしまいかな。",
        "speaker": "オリンポス"
      },
      {
        "type": "dialogue",
        "text": "うむ、宴会じゃな",
        "speaker": "ロウジャ"
      },
      {
        "type": "dialogue",
        "text": "宴会か？\nうまいもんが食えそうだ",
        "speaker": "ジャキーン"
      },
      {
        "type": "dialogue",
        "text": "気を緩めるのが早い気はするが、敵軍の大ボスを倒したんだし仕方ないな",
        "speaker": "ロイド"
      },
      {
        "type": "dialogue",
        "text": "ちゃんと警戒してくれてる人もいるし大丈夫でしょ",
        "speaker": "ソレナリフ"
      },
      {
        "type": "narration",
        "text": "こうしてロイド達はギガガルドを倒した。これにより戦力は拮抗し戦いは膠着戦へともつれ込んだ。"
      },
      {
        "type": "narration",
        "text": "しかし、幹部が倒された魔王軍の動きはさらに活発化し、戦いは新たな局面へと進む事になる。"
      },
      {
        "type": "narration",
        "text": "第4章完"
      },
      {
        "type": "notice",
        "text": "入手報酬：ソレナリフ"
      },
      {
        "type": "dialogue",
        "text": "おじさんソレナリフって言うんだ。よろしく！　おじさんは真価ユニットって言って、簡単に言うと本領を発揮してない状態なんだよな。真価を発揮させるにはストーリーやサブクエストの完了が必要となるぞ。おじさんが本領を発揮するとどうなるか？　ははは、それは続きを読んで確かめてみてくれよな",
        "speaker": "ソレナリフ"
      }
    ]
  ]
};

const CAMPAIGN_ENEMIES={
  "goblinScheme": {
    "name": "ゴブリン",
    "power": 500,
    "powerStat": 100,
    "charisma": 0,
    "intel": 100,
    "skill": null,
    "turns": [
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ],
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ],
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ]
    ]
  },
  "goblinBomb": {
    "name": "準備するゴブリン",
    "power": 500,
    "powerStat": 100,
    "charisma": 0,
    "intel": 0,
    "skill": {
      "id": "story_bomb",
      "name": "爆発",
      "cost": 12,
      "text": "決戦スキル・相手の戦力を5000減少",
      "damage": 5000,
      "type": "decisive"
    },
    "turns": [
      [
        "prepare",
        "prepare",
        "prepare",
        "prepare"
      ],
      [
        "prepare",
        "prepare",
        "prepare",
        "prepare"
      ],
      [
        "prepare",
        "prepare",
        "prepare",
        "prepare"
      ]
    ]
  },
  "orc": {
    "name": "オーク",
    "power": 1000,
    "powerStat": 1000,
    "charisma": 100,
    "intel": 200,
    "skill": null,
    "turns": [
      [
        "recruit",
        "recruit",
        "recruit",
        "recruit"
      ],
      [
        "recruit",
        "recruit",
        "scheme",
        "scheme"
      ],
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ]
    ]
  },
  "ggg1": {
    "name": "GGGゴーレム",
    "power": 1500,
    "powerStat": 1500,
    "charisma": 0,
    "intel": 300,
    "skill": {
      "id": "story_laser",
      "name": "レーザービーム",
      "cost": 4,
      "text": "相手の戦力を1500減少、相手の準備が1以上のすべてのユニットの準備を0にする",
      "damage": 1500
    },
    "turns": [
      [
        "scheme",
        "scheme",
        "prepare",
        "prepare"
      ],
      [
        "prepare",
        "prepare",
        "scheme",
        "scheme"
      ],
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ]
    ]
  },
  "ggg2": {
    "name": "GGGゴーレム・第2戦闘形態",
    "power": 1500,
    "powerStat": 1500,
    "charisma": 0,
    "intel": 300,
    "skill": {
      "id": "story_laser",
      "name": "レーザービーム",
      "cost": 4,
      "text": "相手の戦力を1500減少、相手の準備が1以上のすべてのユニットの準備を0にする",
      "damage": 1500
    },
    "turns": [
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ],
      [
        "prepare",
        "prepare",
        "prepare",
        "prepare"
      ],
      [
        "prepare",
        "prepare",
        "prepare",
        "prepare"
      ]
    ]
  },
  "jackeen1": {
    "name": "ジャキーン",
    "power": 960,
    "powerStat": 960,
    "charisma": 400,
    "intel": 370,
    "skill": {
      "id": "raid",
      "name": "襲撃",
      "cost": 3,
      "text": "相手の戦力を武力×1.0倍減少する",
      "damage": 960
    },
    "turns": [
      [
        "recruit",
        "recruit",
        "recruit",
        "scheme"
      ],
      [
        "prepare",
        "recruit",
        "prepare",
        "recruit"
      ],
      [
        "prepare",
        "scheme",
        "scheme",
        "scheme"
      ]
    ]
  },
  "jackeenZazan": {
    "name": "ジャキーン＋ザザン",
    "power": 960,
    "powerStat": 960,
    "charisma": 400,
    "intel": 370,
    "units": {
      "A": {
        "name": "ジャキーンA",
        "powerStat": 960,
        "charisma": 400,
        "intel": 370
      },
      "B": {
        "name": "ザザンB",
        "powerStat": 800,
        "charisma": 450,
        "intel": 400,
        "skill": {
          "id": "enemy_magic_sword",
          "name": "魔剣",
          "cost": 3,
          "type": "decisive",
          "multiplier": 1.7,
          "text": "決戦スキル・戦力を1.7倍"
        }
      }
    },
    "turns": [
      [
        [
          "B",
          "prepare"
        ],
        [
          "B",
          "prepare"
        ],
        [
          "B",
          "prepare"
        ],
        [
          "A",
          "scheme"
        ]
      ],
      [
        [
          "A",
          "recruit"
        ],
        [
          "A",
          "recruit"
        ],
        [
          "A",
          "scheme"
        ],
        [
          "A",
          "scheme"
        ]
      ],
      [
        [
          "B",
          "recruit"
        ],
        [
          "B",
          "recruit"
        ],
        [
          "B",
          "scheme"
        ],
        [
          "B",
          "scheme"
        ]
      ]
    ]
  },
  "zazanStory": {
    "name": "ザザン",
    "power": 800,
    "powerStat": 800,
    "charisma": 450,
    "intel": 400,
    "skill": {
      "id": "enemy_magic_sword",
      "name": "魔剣",
      "cost": 3,
      "type": "decisive",
      "multiplier": 1.7,
      "text": "決戦スキル・戦力を1.7倍"
    },
    "turns": [
      [
        "prepare",
        "prepare",
        "prepare",
        "scheme"
      ],
      [
        "scheme",
        "scheme",
        "recruit",
        "recruit"
      ],
      [
        "recruit",
        "scheme",
        "scheme",
        "scheme"
      ]
    ]
  },
  "gigagald": {
    "name": "ギガガルド",
    "power": 2400,
    "powerStat": 1200,
    "charisma": 400,
    "intel": 500,
    "skill": {
      "id": "grandstand",
      "name": "大立ち回り",
      "cost": 2,
      "text": "このターン相手と自分が受ける戦力減少を1.5倍にし、相手の戦力を知略の1.7倍減少"
    },
    "trait": "reckless",
    "details": "特性・無謀：999以下の戦力減少は0.5倍、1000以上は1.5倍。\n特性・耐久戦：決戦フェイズなし。3ターン終了時に戦力が残っていれば進行。戦力を0にしても進行。",
    "durable": true,
    "turns": [
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ],
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ],
      [
        "prepare",
        "prepare",
        "scheme",
        "scheme"
      ]
    ]
  },
  "gigagaldFire": {
    "name": "ギガガルド",
    "power": 2400,
    "powerStat": 1200,
    "charisma": 400,
    "intel": 500,
    "skill": {
      "id": "grandstand",
      "name": "大立ち回り",
      "cost": 2,
      "text": "このターン相手と自分が受ける戦力減少を1.5倍にし、相手の戦力を知略の1.7倍減少"
    },
    "trait": "reckless",
    "details": "特性・無謀：999以下の戦力減少は0.5倍、1000以上は1.5倍。戦力反映時、小数点以下切り捨て。\n特性・無我夢中（火災）：知略依存の戦力減少を受けた時、その値を1.5倍。",
    "fire": true,
    "turns": [
      [
        "prepare",
        "prepare",
        "scheme",
        "scheme"
      ],
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ],
      [
        "scheme",
        "scheme",
        "scheme",
        "scheme"
      ]
    ]
  }
};

const CAMPAIGN_BATTLES={
  "goblinScheme": {
    "enemy": "goblinScheme",
    "title": "ゴブリン戦",
    "lose": [
      [
        "オリンポス",
        "えーっと、逆にどうやって負けたの。ちゃんとコマンド使った？　おかしいな。負ける方が難しいよ"
      ]
    ]
  },
  "goblinBomb": {
    "enemy": "goblinBomb",
    "title": "準備するゴブリン戦",
    "lose": [
      [
        "オリンポス",
        "あはは、大爆発だったね。ちょっと倒すのが遅すぎたかな。準備を整えてる相手は危険だ。長い準備ほど強力な事が多いからね。次は策略でさっさと倒しちゃおうよ、ん、耐えれる？　まぁ狙ってみても面白いかもね"
      ]
    ]
  },
  "orc": {
    "enemy": "orc",
    "title": "オーク戦",
    "lose": [
      [
        "オリンポス",
        "それなりに手応えのある相手だったね。相手の招集は強いコマンドでこっちの策略を無効にしてくる。逆に準備中に相手の策略を受けると結構痛いね。今回の相手は戦略を変えてこないから今回とはコマンドを変えてもう1回挑戦してみない？"
      ]
    ]
  },
  "ggg1": {
    "enemy": "ggg1",
    "title": "GGGゴーレム戦・1回目",
    "lose": [
      [
        "メイラン",
        "レーザービーム強ーい。でもでも、相手は1ターン目から準備を初めてるからタイミングは計れそう。後は、策略は招集で防げるからちゃんと防いで戦えば勝負になると思うよ"
      ]
    ]
  },
  "ggg2": {
    "enemy": "ggg2",
    "title": "GGGゴーレム戦・2回目",
    "lose": [
      [
        "オリンポス",
        "かなりの強敵だ。レーザービームが強いね。対策は特殊技能のタイミングを考える。特に2ターン目を跨いで特殊技能を使おうとするとキャンセルされちゃうからね。\n後はやっぱり序盤の招集が大事だ。戦力がある程度ないとレーザービームで倒されちゃう。招集と特殊技能のタイミングが大切な戦闘だね"
      ]
    ]
  },
  "jackeen1": {
    "enemy": "jackeen1",
    "title": "ジャキーン戦",
    "lose": [
      [
        "オリンポス",
        "うわー。こんな奴に負けるなんて悔しい。でも相手はちゃんとした戦略を使える相手だね。こちらも、しっかりした戦略で対抗しないと厳しそう。チュートリアルはやった？　ツクネさんとの戦いが参考になりそうかな"
      ]
    ]
  },
  "jackeen_zazan": {
    "enemy": "jackeenZazan",
    "title": "ジャキーン＋ザザン戦",
    "lose": [
      [
        "エイジ",
        "こんなのに負けるなんて、多分ジャキーン単体のが強いだろ？\n相手は序盤を準備に割いてる。この間に叩いちまうのが妥当じゃねぇか。相手の決戦スキルは強いが、隙は多いから、ちゃんと戦力を高めつつ相手の隙を策略ですぱーんと叩きゃ勝てんだろ"
      ]
    ]
  },
  "zazan": {
    "enemy": "zazanStory",
    "title": "ザザン戦",
    "lose": [
      [
        "オリンポス",
        "うーん、僕の指摘は当たってたと思うから、何が悪かったのか。気を抜いて適当に戦ってない？相手の策略はたしかに痛いけど、戦略的には悪手でそんなに強くは無いんだ。もし詰まる様なら戦い方を変えて見るのもおすすめだよ"
      ]
    ]
  },
  "gigagald1": {
    "enemy": "gigagald",
    "title": "ギガガルド戦・1回目",
    "lose": [
      [
        "オリンポス",
        "あららやられちゃったね、耐久戦だから戦力を積み重ねて相手の策略を防ぐ必要があるよ。戦術的にはただ策略をしてるだけなんだけど相手のパワーが段違いだね"
      ]
    ]
  },
  "gigagald2": {
    "enemy": "gigagald",
    "title": "ギガガルド戦・2回目",
    "lose": [
      [
        "エイジ",
        "基本的な戦略は1回目と全く同じだぜ。無理に攻めないで招集を心がけりゃ勝てはしなくても負けない試合ぐらいは可能だろ？　ロイド達が戻るまで踏ん張るぞ"
      ]
    ]
  },
  "gigagald3": {
    "enemy": "gigagaldFire",
    "title": "ギガガルド戦・3回目",
    "lose": [
      [
        "オリンポス",
        "この戦いはロウジャさんに頼ってゲリラ戦術によるダメージを狙うと気持ちいいね。ただロウジャさんは招集をあまり持ってないから防御面は僕達でカバーしてあげないと"
      ]
    ]
  }
};

const CAMPAIGN_SCENE_TITLES={
  "1": [
    "ゴブリンの群れ",
    "準備するゴブリン",
    "ゴブリン達の親玉"
  ],
  "2": [
    "古代遺跡の守護者",
    "GGG第2戦闘形態"
  ],
  "3": [
    "襲撃者ジャキーン",
    "ジャキーン＋ザザン",
    "魔剣のザザン"
  ],
  "4": [
    "ギガガルドとの初戦",
    "対抗策を探して",
    "耐久戦",
    "炎上する戦場"
  ]
};

// Compatibility for previously cached campaign.html during deployment.
const EXTRA_CHAPTER_SCENES=CAMPAIGN_CHAPTER_SCENES;
const EXTRA_ENEMIES=CAMPAIGN_ENEMIES;
const EXTRA_BATTLES=CAMPAIGN_BATTLES;

