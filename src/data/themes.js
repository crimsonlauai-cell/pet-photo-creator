// All preset options for the photo customization system

export const BACKGROUNDS = [
  {
    category: "自然戶外",
    items: [
      { id: "bg_sakura", label: "櫻花公園", prompt: "cherry blossom park in full bloom, soft pink petals falling, spring sunlight" },
      { id: "bg_beach", label: "陽光沙灘", prompt: "sunny tropical beach, clear turquoise water, white sand, golden hour light" },
      { id: "bg_forest", label: "翠綠森林", prompt: "lush green forest with dappled sunlight, moss-covered ground, magical atmosphere" },
      { id: "bg_mountain", label: "高山草原", prompt: "alpine meadow with wildflowers, snow-capped mountains in background, blue sky" },
      { id: "bg_lavender", label: "薰衣草田", prompt: "vast lavender field in Provence, purple rows stretching to horizon, golden light" },
      { id: "bg_autumn", label: "秋楓樹林", prompt: "autumn forest with red and orange maple leaves, warm fall light, fallen leaves" },
      { id: "bg_snow", label: "雪景庭院", prompt: "peaceful snowy Japanese garden, pine trees dusted with snow, serene winter scene" },
      { id: "bg_sunset", label: "日落海邊", prompt: "dramatic sunset over the ocean, orange and pink sky, silhouetted cliffs" },
      { id: "bg_garden", label: "英式花園", prompt: "lush English cottage garden, roses and foxgloves, brick pathway, sunny afternoon" },
      { id: "bg_rainforest", label: "熱帶雨林", prompt: "vibrant tropical rainforest, giant ferns and exotic plants, misty atmosphere" },
    ]
  },
  {
    category: "城市場景",
    items: [
      { id: "bg_paris", label: "巴黎街道", prompt: "charming Parisian street cafe, cobblestone road, Eiffel Tower in distance, golden afternoon" },
      { id: "bg_tokyo", label: "東京夜市", prompt: "vibrant Tokyo Shibuya night street, neon lights, busy crosswalk, city glow" },
      { id: "bg_nyc", label: "紐約中央公園", prompt: "New York Central Park in autumn, skyline in background, falling leaves, sunny day" },
      { id: "bg_london", label: "倫敦雨中街", prompt: "rainy London street, red telephone box, Big Ben, reflections on wet pavement" },
      { id: "bg_cafe", label: "溫馨咖啡廳", prompt: "cozy coffee shop interior, warm wooden furniture, soft lighting, latte art, books" },
      { id: "bg_bookshop", label: "古舊書店", prompt: "charming old bookshop interior, floor-to-ceiling shelves, warm lamp light, vintage" },
    ]
  },
  {
    category: "室內居家",
    items: [
      { id: "bg_living", label: "北歐客廳", prompt: "bright Scandinavian living room, white walls, minimal decor, plant pots, natural light" },
      { id: "bg_bedroom", label: "夢幻臥室", prompt: "dreamy pastel bedroom, fairy lights, fluffy pillows, soft morning light" },
      { id: "bg_kitchen", label: "鄉村廚房", prompt: "rustic farmhouse kitchen, wooden counters, hanging herbs, warm cooking light" },
      { id: "bg_window", label: "窗邊陽光", prompt: "sitting by a large sunny window, sheer curtains blowing gently, bright daylight" },
    ]
  },
  {
    category: "節日主題",
    items: [
      { id: "bg_christmas", label: "聖誕節", prompt: "festive Christmas living room, decorated tree, gifts, warm fireplace, snow outside window" },
      { id: "bg_halloween", label: "萬聖節", prompt: "spooky Halloween scene, pumpkins, autumn leaves, misty moonlit night, fun not scary" },
      { id: "bg_lunar", label: "農曆新年", prompt: "Chinese New Year celebration, red lanterns, gold decorations, festive atmosphere" },
      { id: "bg_valentine", label: "情人節", prompt: "romantic Valentine's Day setting, red roses, hearts, soft pink and red tones, love" },
      { id: "bg_birthday", label: "生日派對", prompt: "cheerful birthday party, colorful balloons, confetti, cake with candles, festive streamers" },
    ]
  },
  {
    category: "奇幻夢境",
    items: [
      { id: "bg_fairytale", label: "童話城堡", prompt: "magical fairytale castle courtyard, stone walls with vines, enchanted garden, glowing" },
      { id: "bg_cloud", label: "雲端天空", prompt: "fluffy white clouds at sunset, aerial view, golden and pink sky, dreamlike" },
      { id: "bg_underwater", label: "水底世界", prompt: "vibrant underwater coral reef, colorful tropical fish, crystal clear blue water, sunrays" },
      { id: "bg_galaxy", label: "星空銀河", prompt: "breathtaking Milky Way night sky, star trails, dark mountain silhouette below" },
      { id: "bg_magic_forest", label: "魔法森林", prompt: "enchanted glowing forest, fireflies, bioluminescent plants, mystical light rays" },
    ]
  },
]

export const EXPRESSIONS = [
  { id: "exp_happy", label: "開心微笑", prompt: "happy, content, slightly smiling expression, bright eyes, relaxed" },
  { id: "exp_playful", label: "頑皮調皮", prompt: "playful mischievous expression, curious wide eyes, slightly tilted head" },
  { id: "exp_sleepy", label: "昏昏欲睡", prompt: "drowsy sleepy expression, half-closed eyes, peaceful, relaxed face" },
  { id: "exp_curious", label: "好奇張望", prompt: "curious alert expression, wide eyes, ears perked up, attentive gaze" },
  { id: "exp_proud", label: "驕傲自信", prompt: "proud confident expression, chin slightly up, dignified, regal look" },
  { id: "exp_shy", label: "害羞可愛", prompt: "shy adorable expression, slightly looking away, soft gentle eyes" },
  { id: "exp_excited", label: "興奮雀躍", prompt: "excited enthusiastic expression, bright alert eyes, energetic, joyful" },
  { id: "exp_calm", label: "平靜安詳", prompt: "calm serene expression, relaxed face, soft peaceful eyes, contented" },
  { id: "exp_surprised", label: "驚訝瞪眼", prompt: "surprised expression, wide open eyes, alert, slightly startled" },
  { id: "exp_cool", label: "酷帥淡定", prompt: "cool nonchalant expression, relaxed confident gaze, effortlessly stylish" },
  { id: "exp_loving", label: "深情溫柔", prompt: "loving tender expression, soft gentle eyes, warmth and affection" },
  { id: "exp_grumpy", label: "臭臉不爽", prompt: "grumpy unimpressed expression, slight frown, judging look, humorously annoyed" },
]

export const POSES = [
  { id: "pose_sit", label: "端正坐姿", prompt: "sitting upright, alert posture, looking forward" },
  { id: "pose_lie", label: "優雅趴臥", prompt: "lying down gracefully with paws forward, head up, relaxed" },
  { id: "pose_stand", label: "站立挺胸", prompt: "standing tall, proud posture, all four paws on ground" },
  { id: "pose_stretch", label: "伸懶腰", prompt: "stretching with front paws extended forward, back arched, playful" },
  { id: "pose_curl", label: "蜷縮成球", prompt: "curled up in a ball, cozy sleeping position, peaceful" },
  { id: "pose_paw_up", label: "舉起單爪", prompt: "sitting with one paw raised in the air, cute greeting pose" },
  { id: "pose_head_tilt", label: "歪頭可愛", prompt: "sitting with head tilted to one side, curious and adorable" },
  { id: "pose_look_back", label: "回頭張望", prompt: "body facing away but head turned to look back over shoulder" },
  { id: "pose_jump", label: "跳躍飛奔", prompt: "mid-jump in the air, all four paws off ground, dynamic energy" },
  { id: "pose_roll", label: "打滾撒嬌", prompt: "rolling on back, paws in the air, playful and carefree" },
  { id: "pose_sniff", label: "低頭嗅探", prompt: "nose down to ground, sniffing curiously, tail up" },
  { id: "pose_window", label: "趴窗遠望", prompt: "front paws on windowsill, looking out the window longingly" },
]

export const OUTFITS = [
  {
    category: "節日服裝",
    items: [
      { id: "out_santa", label: "聖誕老人", prompt: "wearing a red Santa Claus hat and red coat with white fur trim" },
      { id: "out_elf", label: "聖誕小精靈", prompt: "wearing a green elf costume with pointed hat and jingle bell collar" },
      { id: "out_witch", label: "萬聖女巫", prompt: "wearing a tiny witch hat and black cape, Halloween style" },
      { id: "out_pumpkin", label: "南瓜裝", prompt: "wearing an orange pumpkin costume, jack-o-lantern face print" },
      { id: "out_bunny", label: "復活節兔子", prompt: "wearing bunny ears headband and pastel bow tie, Easter theme" },
    ]
  },
  {
    category: "紳士淑女",
    items: [
      { id: "out_tuxedo", label: "黑色燕尾服", prompt: "wearing a miniature black tuxedo with white shirt and bow tie, dapper gentleman" },
      { id: "out_suit", label: "商務西裝", prompt: "wearing a tailored business suit with tie, professional and smart" },
      { id: "out_dress", label: "優雅洋裝", prompt: "wearing an elegant floral dress with lace details, feminine and charming" },
      { id: "out_graduation", label: "畢業袍帽", prompt: "wearing a graduation cap and gown, proud academic achievement" },
      { id: "out_wedding", label: "婚禮禮服", prompt: "wearing a tiny wedding outfit, white dress or white suit with boutonnière" },
    ]
  },
  {
    category: "可愛休閒",
    items: [
      { id: "out_hoodie", label: "連帽衫", prompt: "wearing a cozy colorful hoodie, casual and cute" },
      { id: "out_sweater", label: "毛衣針織", prompt: "wearing a knitted wool sweater with pattern, warm and snuggly" },
      { id: "out_raincoat", label: "雨衣雨靴", prompt: "wearing a yellow raincoat and tiny rain boots, ready for rain" },
      { id: "out_pajamas", label: "睡衣", prompt: "wearing cute pajamas with animal print, bedtime cozy" },
      { id: "out_sports", label: "運動服", prompt: "wearing sporty athletic wear with stripes, active and energetic" },
    ]
  },
  {
    category: "職業主題",
    items: [
      { id: "out_chef", label: "大廚廚師", prompt: "wearing a white chef's hat (toque) and apron, professional chef" },
      { id: "out_doctor", label: "醫生白袍", prompt: "wearing a tiny doctor's white coat and stethoscope around neck" },
      { id: "out_police", label: "警察制服", prompt: "wearing a miniature police uniform with badge, authoritative and cute" },
      { id: "out_astronaut", label: "太空人", prompt: "wearing a space suit helmet, astronaut ready for space mission" },
      { id: "out_pilot", label: "飛行員", prompt: "wearing pilot uniform with aviator sunglasses and captain's hat" },
      { id: "out_knight", label: "中世紀騎士", prompt: "wearing miniature medieval knight armor with tiny shield" },
    ]
  },
  { category: "無服裝", items: [
    { id: "out_none", label: "保持原樣", prompt: "" }
  ]}
]

export const ACCESSORIES = [
  {
    category: "頭部飾物",
    items: [
      { id: "acc_flower_crown", label: "花環頭冠", prompt: "wearing a floral flower crown wreath on head" },
      { id: "acc_crown", label: "閃亮皇冠", prompt: "wearing a sparkling golden crown or tiara on head" },
      { id: "acc_bow", label: "大蝴蝶結", prompt: "wearing a large cute bow on head" },
      { id: "acc_sunglasses", label: "時尚墨鏡", prompt: "wearing stylish sunglasses" },
      { id: "acc_glasses", label: "文青眼鏡", prompt: "wearing round intellectual glasses" },
      { id: "acc_hat_straw", label: "草帽", prompt: "wearing a straw sun hat" },
      { id: "acc_beret", label: "法式貝雷帽", prompt: "wearing a French beret hat" },
      { id: "acc_cap", label: "棒球帽", prompt: "wearing a baseball cap" },
      { id: "acc_party_hat", label: "派對尖帽", prompt: "wearing a colorful party hat" },
    ]
  },
  {
    category: "頸部配件",
    items: [
      { id: "acc_bowtie", label: "蝴蝶領結", prompt: "wearing a dapper bow tie around neck" },
      { id: "acc_bandana", label: "頸巾", prompt: "wearing a bandana tied around neck" },
      { id: "acc_necklace", label: "珍珠頸鏈", prompt: "wearing a pearl necklace" },
      { id: "acc_scarf", label: "圍巾", prompt: "wearing a cozy knitted scarf around neck" },
      { id: "acc_collar_fancy", label: "華麗項圈", prompt: "wearing a decorative fancy jeweled collar" },
    ]
  },
  {
    category: "手持道具",
    items: [
      { id: "acc_balloon", label: "彩色氣球", prompt: "holding a bunch of colorful balloons" },
      { id: "acc_flowers", label: "手捧鮮花", prompt: "holding a bouquet of fresh flowers" },
      { id: "acc_umbrella", label: "小雨傘", prompt: "holding a tiny decorative umbrella" },
      { id: "acc_wand", label: "魔法棒", prompt: "holding a sparkling magic wand with star tip" },
      { id: "acc_gift", label: "禮物盒", prompt: "holding or sitting next to a wrapped gift box with bow" },
      { id: "acc_toy", label: "玩具公仔", prompt: "holding a plush toy in mouth or paws" },
    ]
  },
  {
    category: "無配件",
    items: [
      { id: "acc_none", label: "不加配件", prompt: "" }
    ]
  }
]

export const PHOTO_STYLES = [
  { id: "style_portrait", label: "專業人像", prompt: "professional portrait photography, shallow depth of field, bokeh background, studio lighting" },
  { id: "style_lifestyle", label: "生活寫真", prompt: "lifestyle photography, natural ambient light, candid feel, warm tones" },
  { id: "style_editorial", label: "雜誌封面", prompt: "editorial magazine style, high fashion photography, dramatic lighting, professional" },
  { id: "style_golden", label: "黃金時刻", prompt: "golden hour photography, warm golden sunlight, long shadows, magical atmosphere" },
  { id: "style_cinematic", label: "電影感", prompt: "cinematic photography, movie-like color grading, dramatic composition, widescreen feel" },
]
