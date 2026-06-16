const products = [
  // Casual Shoes (休閒鞋款)
  {
    id: 'casual_canvas',
    category: 'casual',
    name: '經典帆布休閒鞋',
    enName: 'Classic Canvas Sneakers',
    price: 1580,
    image: 'images/casual_canvas.png',
    description: '採用高密度純棉帆布與耐磨橡膠大底，輕盈透氣。極簡的黑白配色設計，不論是搭配牛仔褲、短褲或休閒長褲，都是您日常穿搭的完美首選。',
    features: ['高密度棉質帆布', '防滑耐磨橡膠鞋底', '高彈力透氣乳膠鞋墊', '極簡百搭設計']
  },
  {
    id: 'casual_loafer',
    category: 'casual',
    name: '絨面樂福懶人鞋',
    enName: 'Suede Slip-On Loafers',
    price: 2680,
    image: 'images/casual_loafer.png',
    description: '精選義大利進口絨面牛皮，觸感溫潤柔順。免綁帶懶人一腳蹬設計，兼具優雅與便利。搭配輕量化防滑中底，讓您在商務休閒與都市漫步中輕鬆切換。',
    features: ['頂級絨面牛皮', '一腳蹬便捷設計', '防滑耐磨橡膠大底', '手工縫線工藝']
  },
  {
    id: 'casual_knit',
    category: 'casual',
    name: '透氣針織健步鞋',
    enName: 'Breathable Knit Walking Shoes',
    price: 1880,
    image: 'images/casual_knit.png',
    description: '採用 3D 飛織一體成型鞋面，極致貼合腳型。網眼透氣孔洞設計，夏天穿著也不悶熱。超輕量中底提供絕佳的緩震回彈，非常適合長時間行走或日常站立。',
    features: ['3D 飛織一體鞋面', '超輕量緩震 EVA 中底', '環繞防護後跟杯', '卓越透氣排汗功能']
  },
  {
    id: 'casual_leather',
    category: 'casual',
    name: '都市真皮休閒板鞋',
    enName: 'Urban Leather Sneakers',
    price: 2480,
    image: 'images/casual_leather.png',
    description: '嚴選細緻荔枝紋頭層牛皮，手感細膩，耐穿易清潔。經典板鞋廓形融入現代都市美學，側邊精美微細孔洞提升透氣度。厚實且回彈的杯狀大底，提供穩定支撐。',
    features: ['頭層荔枝紋牛皮', '簡約復古板鞋設計', '減震耐磨杯狀大底', '親膚透氣真皮內裡']
  },

  // Formal Shoes (正式鞋款)
  {
    id: 'formal_oxford',
    category: 'formal',
    name: '優雅牛津正裝皮鞋',
    enName: 'Elegant Oxford Dress Shoes',
    price: 4200,
    image: 'images/formal_oxford.png',
    description: '經典正裝牛津皮鞋，採用精選全粒面小牛皮手工製成。鞋面光澤度極佳，呈現尊貴典雅質感。封閉式襟片設計，線條俐落流暢，是您出席重要會議、婚禮等正式場合的必備首選。',
    features: ['全粒面手工小牛皮', '經典封閉式牛津設計', '層積木質耐磨皮底', '人體工學足弓支撐']
  },
  {
    id: 'formal_brogue',
    category: 'formal',
    name: '經典雕花布洛克鞋',
    enName: 'Classic Brogue Leather Shoes',
    price: 4500,
    image: 'images/formal_brogue.png',
    description: '融匯百年英倫工藝，精緻的翼紋雕花 (Wingtip) 與細膩的打孔裝飾，彰顯獨特的紳士品味。拋光小牛皮材質隨著時間穿著會更顯復古色澤，完美兼顧正式度與設計細節。',
    features: ['復古英倫雕花細節', '優質拋光牛皮', '雙重手工固特異縫線效果', '舒適防滑半橡膠皮底']
  },
  {
    id: 'formal_monk',
    category: 'formal',
    name: '高階真皮雙扣孟克鞋',
    enName: 'Premium Leather Monk Strap Shoes',
    price: 4800,
    image: 'images/formal_monk.png',
    description: '獨特雙金屬扣帶設計，打破傳統繫帶皮鞋的沉悶。鞋面採用整張無接縫小牛皮裁剪，流線感十足。奢華酒紅色皮革，低調奢華，極具個性魅力。',
    features: ['經典雙扣孟克設計', '客製化可調金屬扣帶', '高級小牛皮裁切', '吸汗防臭真皮內襯']
  },

  // Athletic Shoes (運動鞋款)
  {
    id: 'sport_running',
    category: 'sport',
    name: '超輕量避震慢跑鞋',
    enName: 'Ultra-Light Running Shoes',
    price: 3280,
    image: 'images/sport_running.png',
    description: '專為長跑愛好者打造，極致輕量化設計。配備新一代超回彈科技中底，吸震效率提升30%。高抓地力耐磨橡膠外底，無懼雨天濕滑路面，為您的每一步提供澎湃動力。',
    features: ['超回彈爆米花科技中底', '工程高強度透氣網布', '高抓地力耐磨碳素橡膠', '夜間反光安全設計']
  },
  {
    id: 'sport_basketball',
    category: 'sport',
    name: '專業高筒防護籃球鞋',
    enName: 'Professional Basketball Shoes',
    price: 3880,
    image: 'images/sport_basketball.png',
    description: '專為高強度對抗設計，防側翻TPU支撐片提供強大的橫向穩定。加高鞋領搭配記憶海綿，完美包裹踝關節，降低運動傷害風險。大底採用人字紋路，抓地與急停表現卓越。',
    features: ['高筒踝部安全包覆', '防側翻雙重 TPU 支撐', '人字紋高耐磨橡膠大底', '前掌氣墊感避震科技']
  },
  {
    id: 'sport_hiking',
    category: 'sport',
    name: '戶外越野防滑登山鞋',
    enName: 'Trail Hiking Athletic Shoes',
    price: 4580,
    image: 'images/sport_hiking.png',
    description: '針對惡劣戶外環境開發。鞋面採用防水防刮複合面料，阻絕露水與沙塵。Vibram 級深度耐磨橡膠齒紋大底，提供強悍的泥地與岩石抓地力。橡膠包覆鞋頭，防撞保護升級。',
    features: ['全方位防水透氣薄膜', '防撞強化橡膠鞋頭', '深齒抗滑越野大底', '高剛性防扭曲抗震板']
  },

  // Shoe Materials & Accessories (鞋材與配件)
  {
    id: 'acc_insoles',
    category: 'acc',
    name: '記憶棉減壓舒適鞋墊',
    enName: 'Memory Foam Insoles',
    price: 390,
    image: 'images/acc_insoles.png',
    description: '採用高彈性慢回彈記憶棉，能貼合每個人不同的足底形狀。後跟配置蜂巢減震矽膠墊，吸收高達 80% 的行走衝擊力。活性炭除臭塗層，保持足部乾爽無異味。',
    features: ['慢回彈記憶棉材質', '蜂巢矽膠減震科技', '活性炭長效吸汗防臭', '可裁剪設計，適配各鞋碼']
  },
  {
    id: 'acc_laces',
    category: 'acc',
    name: '彩色打蠟純棉鞋帶',
    enName: 'Colorful Waxed Cotton Shoelaces',
    price: 150,
    image: 'images/acc_laces.png',
    description: '嚴選100%優質純棉，表面經過精細打蠟工藝處理，不易起毛球、不易鬆脫且防水。多種時尚亮麗色彩可選，一秒為您的皮鞋或休閒鞋注入靈魂與活力。',
    features: ['100% 純棉編織', '高階環保打蠟處理', '耐拉扯、不易鬆脫', '多色可選，個性搭配']
  },
  {
    id: 'acc_trees',
    category: 'acc',
    name: '高階雪松防潮防皺鞋撐',
    enName: 'Premium Cedar Shoe Trees',
    price: 890,
    image: 'images/acc_trees.png',
    description: '使用天然北美紅雪松木手工製作，散發清新原木香氣，能有效吸收鞋內濕氣與異味。彈簧伸縮調節設計，完美維持鞋型，防止皮革乾裂與產生折痕，延長鞋類壽命。',
    features: ['北美紅雪松天然原木', '前後雙向彈簧均勻受力', '防霉、防潮、除臭', '保護皮鞋不變形']
  },

  // Others (其它類)
  {
    id: 'other_waterproof',
    category: 'other',
    name: '強力防水防污保護噴霧',
    enName: 'Waterproof Shoe Protector Spray',
    price: 350,
    image: 'images/other_waterproof.png',
    description: '採用先進奈米科技，噴塗後在鞋子表面形成肉眼不可見的隱形保護膜。有效阻絕雨水、泥漿、髒污與飲料滲入，同時保持鞋子原有的透氣性。適用於皮革、帆布、麂皮等。',
    features: ['奈米級強力防潑水', '長效抗污、防油漬', '不影響材質原有的透氣性', '安全溫和配方，不傷皮質']
  },
  {
    id: 'other_wipes',
    category: 'other',
    name: '快速清潔雙面鞋擦紙',
    enName: 'Quick-Clean Shoe Wipes',
    price: 120,
    image: 'images/other_wipes.png',
    description: '出門在外的急救清潔神器！單片獨立包裝，防乾好攜帶。採用雙面材質設計：粗糙顆粒面用於去除頑固泥沙，平滑柔軟面用於輕柔擦拭污垢，不傷鞋面。',
    features: ['雙面多功能清潔設計', '溫和去污表面活性劑', '獨立包裝，即撕即用', '適用於休閒鞋、中底處']
  },
  {
    id: 'other_deodorizer',
    category: 'other',
    name: '活性炭除臭防霉鞋球',
    enName: 'Deodorizing Shoe Balls',
    price: 180,
    image: 'images/other_deodorizer.png',
    description: '可愛輕巧的球狀外觀，旋開即可釋放香氣與吸附異味。內含高吸附力活性炭與抑菌配方，可迅速置於鞋內、衣櫃或健身包中，有效防潮、抑菌與消除臭味。',
    features: ['旋轉開關，操作極簡', '高效活性炭物理吸附', '抗菌防霉配方', '可持續使用長達3個月']
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}
