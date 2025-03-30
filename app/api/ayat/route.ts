import { NextRequest, NextResponse } from "next/server";

// English ayats array with 31 items, using Sahih International translation
const englishAyats = [
  {
    text: "And We have not sent you, [O Muhammad], except as a mercy to the worlds.",
    reference: "Quran 21:107",
    translation: "Sahih International",
    explanation: "This verse highlights the Prophet’s role as a source of mercy for all creation. It’s like a caregiver who offers comfort to everyone, showing how kindness can uplift communities. For example, his teachings inspire acts of generosity across all backgrounds."
  },
  {
    text: "Allah does not burden a soul beyond that it can bear.",
    reference: "Quran 2:286",
    translation: "Sahih International",
    explanation: "This verse reassures us that challenges are within our capacity. It’s similar to a tough workout that builds strength—difficulties foster resilience. For instance, overcoming obstacles often reveals our inner potential."
  },
  {
    text: "Indeed, Allah orders justice and the doing of good, and giving to relatives, and forbids immorality, and bad conduct, and oppression.",
    reference: "Quran 16:90",
    translation: "Sahih International",
    explanation: "This verse promotes a balanced life of fairness and kindness. Like a recipe needing the right mix of ingredients, society thrives on justice and goodwill. For example, helping a neighbor reflects this harmony."
  },
  {
    text: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.",
    reference: "Quran 30:21",
    translation: "Sahih International",
    explanation: "This verse shows relationships as a source of peace. It’s like a partnership where mutual care creates calm—think of a team working smoothly together, fostering support and stability."
  },
  {
    text: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
    reference: "Quran 49:13",
    translation: "Sahih International",
    explanation: "This verse encourages unity through diversity. Like a team with varied skills, our differences strengthen us. For example, learning from other cultures builds mutual respect."
  },
  {
    text: "Who spend [in the cause of Allah] during ease and hardship and who restrain anger and who pardon the people - and Allah loves the doers of good.",
    reference: "Quran 3:134",
    translation: "Sahih International",
    explanation: "This verse praises generosity and patience. It’s like a friend who forgives and helps in tough times, inspiring kindness. For instance, staying calm in conflict can heal relationships."
  },
  {
    text: "For indeed, with hardship comes ease.",
    reference: "Quran 94:5-6",
    translation: "Sahih International",
    explanation: "This verse promises relief after struggle. Like clouds parting for sunlight, challenges lead to brighter moments. For example, persisting through a task often brings unexpected rewards."
  },
  {
    text: "Whoever kills a soul unless for a soul or for corruption [done] in the land - it is as if he had slain mankind entirely.",
    reference: "Quran 5:32",
    translation: "Sahih International",
    explanation: "This verse underscores life’s value, equating one loss to all humanity’s. It’s like a single pillar’s fall weakening a structure—violence ripples widely. For instance, protecting one life benefits all."
  },
  {
    text: "And when My servants ask you concerning Me, indeed I am near.",
    reference: "Quran 2:186",
    translation: "Sahih International",
    explanation: "This verse comforts with God’s closeness. Like a friend always there to help, it offers reassurance. For example, seeking support in tough times feels answered."
  },
  {
    text: "O mankind, there has come to you instruction from your Lord and healing for what is in the breasts.",
    reference: "Quran 10:57",
    translation: "Sahih International",
    explanation: "This verse presents the Quran as guidance and comfort. Like an advisor easing worries, it heals the heart. For instance, its wisdom calms inner turmoil."
  },
  {
    text: "Repel evil with that which is better.",
    reference: "Quran 41:34",
    translation: "Sahih International",
    explanation: "This verse advises countering negativity with good. Like calming a dispute with kindness, it breaks hostility. For example, a smile can diffuse tension."
  },
  {
    text: "Say, 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah.'",
    reference: "Quran 39:53",
    translation: "Sahih International",
    explanation: "This verse offers hope despite mistakes. Like a teacher giving a second chance, it shows redemption’s open. For instance, starting anew after failure reflects this mercy."
  },
  {
    text: "Allah is the Light of the heavens and the earth.",
    reference: "Quran 24:35",
    translation: "Sahih International",
    explanation: "This verse depicts God as a guiding light. Like a lighthouse in a storm, it shows the way. For example, clarity often emerges in confusion with guidance."
  },
  {
    text: "Those who have believed and whose hearts are assured by the remembrance of Allah.",
    reference: "Quran 13:28",
    translation: "Sahih International",
    explanation: "This verse links remembrance to peace. Like a soothing song, it calms the mind. For instance, quiet reflection often restores balance."
  },
  {
    text: "Whoever does righteousness, whether male or female, while being a believer - We will surely cause him to live a good life.",
    reference: "Quran 16:97",
    translation: "Sahih International",
    explanation: "This verse ties good deeds to well-being. Like a healthy diet improving life, righteousness brings joy. For example, helping others uplifts our own spirits."
  },
  {
    text: "And We have certainly honored the children of Adam.",
    reference: "Quran 17:70",
    translation: "Sahih International",
    explanation: "This verse affirms human dignity. Like valuing every team member, it calls for respect. For instance, honoring others fosters community strength."
  },
  {
    text: "There shall be no compulsion in religion.",
    reference: "Quran 2:256",
    translation: "Sahih International",
    explanation: "This verse supports free choice in faith. Like picking a career freely, it respects will. For example, voluntary belief builds genuine harmony."
  },
  {
    text: "And do not argue with the People of the Scripture except in a way that is best.",
    reference: "Quran 29:46",
    translation: "Sahih International",
    explanation: "This verse urges respectful dialogue. Like a thoughtful debate, it seeks understanding. For instance, listening well bridges differences."
  },
  {
    text: "By which Allah guides those who pursue His pleasure to the ways of peace.",
    reference: "Quran 5:16",
    translation: "Sahih International",
    explanation: "This verse ties guidance to peace. Like a scenic route on a trip, it ensures calm. For example, ethical choices lead to tranquil outcomes."
  },
  {
    text: "And Allah invites to the Home of Peace and guides whom He wills to a straight path.",
    reference: "Quran 10:25",
    translation: "Sahih International",
    explanation: "This verse promises peace through righteousness. Like a haven after a journey, it offers rest. For instance, good actions pave a serene path."
  },
  {
    text: "And your Lord is the Forgiving, Full of Mercy.",
    reference: "Quran 18:58",
    translation: "Sahih International",
    explanation: "This verse highlights God’s compassion. Like a parent forgiving a child, it renews hope. For example, mercy allows fresh starts."
  },
  {
    text: "So remember Me; I will remember you.",
    reference: "Quran 2:152",
    translation: "Sahih International",
    explanation: "This verse suggests mutual care in remembrance. Like a friendship nurtured by attention, it bonds us. For instance, reflection strengthens resolve."
  },
  {
    text: "And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them harshly, they say words of peace.",
    reference: "Quran 25:63",
    translation: "Sahih International",
    explanation: "This verse praises humility and calm. Like a river flowing past rocks, it stays steady. For example, peaceful replies soothe conflicts."
  },
  {
    text: "Indeed, this Quran guides to that which is most suitable.",
    reference: "Quran 17:9",
    translation: "Sahih International",
    explanation: "This verse touts the Quran’s guidance. Like a map to a goal, it directs well. For instance, its wisdom aids daily choices."
  },
  {
    text: "And We have made some of you as a trial for others - will you have patience?",
    reference: "Quran 25:20",
    translation: "Sahih International",
    explanation: "This verse sees challenges as growth tests. Like a workout building muscle, patience refines us. For example, enduring trials deepens character."
  },
  {
    text: "He gives life and causes death, and to Him you will be returned.",
    reference: "Quran 10:56",
    translation: "Sahih International",
    explanation: "This verse reflects life’s cycle. Like seasons changing, it’s natural. For instance, it reminds us to value time."
  },
  {
    text: "And whoever fears Allah - He will make for him a way out and provide for him from where he does not expect.",
    reference: "Quran 65:2-3",
    translation: "Sahih International",
    explanation: "This verse promises solutions through reverence. Like finding a hidden exit, help comes unexpectedly. For example, trust often yields surprises."
  },
  {
    text: "And [by] the soul and He who proportioned it.",
    reference: "Quran 91:7-8",
    translation: "Sahih International",
    explanation: "This verse marvels at the soul’s design. Like art with perfect balance, it inspires awe. For instance, self-reflection reveals inner harmony."
  },
  {
    text: "And He is the Forgiving, the Affectionate.",
    reference: "Quran 85:14",
    translation: "Sahih International",
    explanation: "This verse shows God’s loving mercy. Like a warm embrace in need, it comforts. For example, forgiveness heals past wounds."
  },
  {
    text: "And give the relative his right, and also the poor and the traveler, and do not spend wastefully.",
    reference: "Quran 17:26",
    translation: "Sahih International",
    explanation: "This verse urges fair sharing. Like budgeting for all needs, it balances care. For instance, aiding a traveler builds community."
  },
  {
    text: "And let not the hatred of a people prevent you from being just. Be just; that is nearer to righteousness.",
    reference: "Quran 5:8",
    translation: "Sahih International",
    explanation: "This verse demands fairness despite enmity. Like a judge staying impartial, it’s noble. For example, treating rivals justly earns respect."
  }
];

// Hindi ayats array with 31 items, using a recognized translation
const hindiAyats = [
  {
    text: "और हमने आपको सारे जहान के लिए रहमत बनाकर भेजा है।",
    reference: "क़ुरान 21:107",
    explanation: "यह आयत पैगम्बर को सभी के लिए दया का स्रोत बताती है। जैसे एक देखभाल करने वाला सबकी मदद करता है, वैसे ही उनकी शिक्षाएँ सभी को प्रेरित करती हैं। उदाहरण के लिए, दया से समाज में एकता बढ़ती है।"
  },
  {
    text: "अल्लाह किसी प्राणी पर उस से अधिक तकलीफ नहीं देता, जितना वह उठा सके।",
    reference: "क़ुरान 2:286",
    explanation: "यह आयत आश्वासन देती है कि कठिनाइयाँ हमारी शक्ति के भीतर हैं। जैसे मेहनत से ताकत बढ़ती है, वैसे ही चुनौतियाँ हमें मजबूत बनाती हैं। मिसाल के तौर पर, मुश्किलें पार करना आत्मविश्वास देता है।"
  },
  {
    text: "निस्संदेह, अल्लाह न्याय, भलाई और रिश्तेदारों के साथ सद्भाव की हिदायत देता है।",
    reference: "क़ुरान 16:90",
    explanation: "यह आयत संतुलित जीवन की सीख देती है। जैसे खाने में सही मिश्रण स्वाद बढ़ाता है, वैसे ही न्याय समाज को बेहतर बनाता है। उदाहरण के लिए, किसी की मदद करना शांति लाता है।"
  },
  {
    text: "और उसके निशानों में से है कि उसने तुम में से ही जोड़े बनाए ताकि तुम सुकून पाओ।",
    reference: "क़ुरान 30:21",
    explanation: "यह आयत रिश्तों को शांति का स्रोत बताती है। जैसे सहयोग से काम आसान होता है, वैसे ही प्यार शांति देता है। मिसाल के तौर पर, आपसी समझ जीवन को सुखद बनाती है।"
  },
  {
    text: "हे इंसान! हमने तुम्हें एक पुरुष और महिला से बनाया ताकि तुम एक-दूसरे को जान सको।",
    reference: "क़ुरान 49:13",
    explanation: "यह आयत विविधता में एकता की बात करती है। जैसे अलग-अलग लोग मिलकर टीम बनाते हैं, वैसे ही सम्मान से समाज मज़बूत होता है। उदाहरण के लिए, दूसरों को समझना दोस्ती बढ़ाता है।"
  },
  {
    text: "जो लोग आसानी और मुश्किल में खर्च करते हैं और क्रोध को रोकते हैं, अल्लाह उन्हें पसंद करता है।",
    reference: "क़ुरान 3:134",
    explanation: "यह आयत दया और धैर्य की तारीफ करती है। जैसे दोस्त मुश्किल में साथ देता है, वैसे ही शांति रिश्ते जोड़ती है। मिसाल के तौर पर, गुस्सा रोकना समझदारी दिखाता है।"
  },
  {
    text: "निस्संदेह, हर कठिनाई के साथ आसानी है।",
    reference: "क़ुरान 94:5-6",
    explanation: "यह आयत मुश्किल के बाद राहत का वादा करती है। जैसे बादल हटने पर धूप आती है, वैसे ही मेहनत रंग लाती है। उदाहरण के लिए, धैर्य से काम पूरा होता है।"
  },
  {
    text: "जो कोई किसी की हत्या करे, मानो उसने सारी मानवता का कत्ल कर दिया।",
    reference: "क़ुरान 5:32",
    explanation: "यह आयत जीवन की कीमत बताती है। जैसे एक दीवार टूटने से घर कमज़ोर होता है, वैसे ही हिंसा सबको नुकसान पहुँचाती है। मिसाल के तौर पर, शांति से सब सुरक्षित रहते हैं।"
  },
  {
    text: "जब मेरे बंदे मुझसे पूछें, तो कह दो कि मैं करीब हूँ।",
    reference: "क़ुरान 2:186",
    explanation: "यह आयत ईश्वर की नज़दीकी का भरोसा देती है। जैसे दोस्त मुश्किल में साथ देता है, वैसे ही यह सुकून देता है। उदाहरण के लिए, मदद माँगने से राहत मिलती है।"
  },
  {
    text: "हे इंसान! तुम्हारे पास हिदायत और दिलों की शिफा आ चुकी है।",
    reference: "क़ुरान 10:57",
    explanation: "यह आयत कुरान को मार्गदर्शन और इलाज बताती है। जैसे सलाह से चिंता कम होती है, वैसे ही यह शांति देता है। मिसाल के तौर पर, समझ से मन हल्का होता है।"
  },
  {
    text: "बुरे का जवाब अच्छाई से दो।",
    reference: "क़ुरान 41:34",
    explanation: "यह आयत नकारात्मकता को सकारात्मकता से हराने की सीख देती है। जैसे मुस्कान से तनाव कम होता है, वैसे ही अच्छाई शांति लाती है। उदाहरण के लिए, दया से दुश्मनी खत्म हो सकती है।"
  },
  {
    text: "कहो, 'जिन्होंने गलतियाँ कीं, वे अल्लाह की रहमत से निराश न हों।'",
    reference: "क़ुरान 39:53",
    explanation: "यह आयत गलतियों के बाद भी आशा देती है। जैसे शिक्षक दूसरा मौका देता है, वैसे ही यह नई शुरुआत की बात करती है। मिसाल के तौर पर, सुधार से जीवन बेहतर होता है।"
  },
  {
    text: "अल्लाह आसमानों और ज़मीन का नूर है।",
    reference: "क़ुरान 24:35",
    explanation: "यह आयत ईश्वर को रोशनी की तरह दर्शाती है। जैसे दीपक रास्ता दिखाता है, वैसे ही यह मार्गदर्शन देता है। उदाहरण के लिए, सही दिशा से भटकाव कम होता है।"
  },
  {
    text: "जो लोग ईमान लाए, उनके दिल अल्लाह के ज़िक्र से सुकून पाते हैं।",
    reference: "क़ुरान 13:28",
    explanation: "यह आयत याद से शांति की बात करती है। जैसे संगीत मन को ठंडक देता है, वैसे ही यह सुकून लाता है। मिसाल के तौर पर, चिंतन से तनाव कम होता है।"
  },
  {
    text: "जो अच्छा काम करें, उन्हें अच्छी जिंदगी मिलेगी।",
    reference: "क़ुरान 16:97",
    explanation: "यह आयत अच्छे कर्मों से सुख की बात करती है। जैसे मेहनत से फल मिलता है, वैसे ही यह खुशी देता है। उदाहरण के लिए, दूसरों की मदद से मन प्रसन्न रहता है।"
  },
  {
    text: "और हमने आदम के बच्चों को इज़्ज़त दी है।",
    reference: "क़ुरान 17:70",
    explanation: "यह आयत हर इंसान की गरिमा बताती है। जैसे सबकी अहमियत होती है, वैसे ही सम्मान जरूरी है। मिसाल के तौर पर, सबको मान देने से समाज मज़बूत होता है।"
  },
  {
    text: "धर्म में जबरदस्ती नहीं है।",
    reference: "क़ुरान 2:256",
    explanation: "यह आयत आस्था की आज़ादी की बात करती है। जैसे पसंद से राह चुनी जाती है, वैसे ही यह सम्मान देता है। उदाहरण के लिए, अपनी मर्ज़ी से विश्वास शांति लाता है।"
  },
  {
    text: "किताब वालों से सबसे अच्छे ढंग से बात करो।",
    reference: "क़ुरान 29:46",
    explanation: "यह आयत सम्मान से बातचीत की सलाह देती है। जैसे समझदारी से बहस सुलझती है, वैसे ही यह एकता बढ़ाती है। मिसाल के तौर पर, सुनना मतभेद कम करता है।"
  },
  {
    text: "अल्लाह शांति के रास्ते दिखाता है।",
    reference: "क़ुरान 5:16",
    explanation: "यह आयत सही राह से शांति की बात करती है। जैसे शांत रास्ता सुखद होता है, वैसे ही यह संतुलन देता है। उदाहरण के लिए, अच्छे काम से मन को ठंडक मिलती है।"
  },
  {
    text: "अल्लाह तुम्हें शांति के घर में बुलाता है।",
    reference: "क़ुरान 10:25",
    explanation: "यह आयत अच्छाई से शांति का वादा करती है। जैसे यात्रा के बाद आराम मिलता है, वैसे ही यह सुकून देता है। मिसाल के तौर पर, नेकी से जीवन सुखी होता है।"
  },
  {
    text: "और तुम्हारा रब क्षमाशील, रहमत वाला है।",
    reference: "क़ुरान 18:58",
    explanation: "यह आयत ईश्वर की दया को दर्शाती है। जैसे माता-पिता माफ़ करते हैं, वैसे ही यह आशा देता है। उदाहरण के लिए, माफी से नया मौका मिलता है।"
  },
  {
    text: "मुझे याद करो, मैं तुम्हें याद करूंगा।",
    reference: "क़ुरान 2:152",
    explanation: "यह आयत याद से जुड़ाव की बात करती है। जैसे दोस्ती में ध्यान से रिश्ता बनता है, वैसे ही यह मज़बूत करता है। मिसाल के तौर पर, सोच से हिम्मत मिलती है।"
  },
  {
    text: "और रहमत वाले के बंदे सरलता से चलते हैं और शांति के बोल बोलते हैं।",
    reference: "क़ुरान 25:63",
    explanation: "यह आयत नम्रता और शांति की तारीफ करती है। जैसे नदी बाधाओं को पार करती है, वैसे ही यह शांति लाती है। उदाहरण के लिए, शांत जवाब से झगड़ा खत्म होता है।"
  },
  {
    text: "यह कुरान सबसे उपयुक्त हिदायत की ओर ले जाता है।",
    reference: "क़ुरान 17:9",
    explanation: "यह आयत कुरान को सही मार्ग बताती है। जैसे नक्शा रास्ता दिखाता है, वैसे ही यह मदद करता है। मिसाल के तौर पर, इसकी सीख से फैसले आसान होते हैं।"
  },
  {
    text: "हमने कुछ को दूसरों के लिए परीक्षा बनाया है, क्या तुम सब्र करोगे?",
    reference: "क़ुरान 25:20",
    explanation: "यह आयत कठिनाइयों को सबक बताती है। जैसे मेहनत से ताकत बढ़ती है, वैसे ही सब्र से समझ आती है। उदाहरण के लिए, मुश्किलें हल करने से हिम्मत बढ़ती है।"
  },
  {
    text: "वह जीवन देता है और मृत्यु देता है, और उसी के पास लौटना है।",
    reference: "क़ुरान 10:56",
    explanation: "यह आयत जीवन के चक्र की बात करती है। जैसे मौसम बदलते हैं, वैसे ही यह समय की कीमत बताता है। मिसाल के तौर पर, वक्त का सदुपयोग जरूरी है।"
  },
  {
    text: "जो अल्लाह से डरता है, उसके लिए रास्ता निकलेगा और अनदेखी जगह से मदद मिलेगी।",
    reference: "क़ुरान 65:2-3",
    explanation: "यह आयत भरोसे से राहत की बात करती है। जैसे अचानक रास्ता मिल जाता है, वैसे ही मदद आती है। उदाहरण के लिए, विश्वास से मुश्किल हल होती है।"
  },
  {
    text: "और उसने आत्मा और उसकी संरचना बनाई।",
    reference: "क़ुरान 91:7-8",
    explanation: "यह आयत आत्मा की सुंदरता दिखाती है। जैसे कला में संतुलन होता है, वैसे ही यह चमत्कार दिखाता है। मिसाल के तौर पर, सोच से शांति मिलती है।"
  },
  {
    text: "और वह माफ़ करने वाला, प्यार करने वाला है।",
    reference: "क़ुरान 85:14",
    explanation: "यह आयत ईश्वर की दया को दर्शाती है। जैसे गले लगाने से सुकून मिलता है, वैसे ही यह राहत देता है। उदाहरण के लिए, माफी से बोझ हल्का होता है।"
  },
  {
    text: "रिश्तेदारों, गरीबों और मुसाफिरों को उनका हक दो।",
    reference: "क़ुरान 17:26",
    explanation: "यह आयत उदारता की सीख देती है। जैसे बजट से सबकी जरूरत पूरी होती है, वैसे ही यह एकता बढ़ाता है। मिसाल के तौर पर, मदद से समाज मज़बूत होता है।"
  },
  {
    text: "लोगों से नफरत के कारण न्याय से न हटो।",
    reference: "क़ुरान 5:8",
    explanation: "यह आयत निष्पक्षता की बात करती है। जैसे जज बिना पक्षपात के फैसला लेता है, वैसे ही यह सम्मान बढ़ाता है। उदाहरण के लिए, दुश्मन को भी इंसाफ देना सही है।"
  }
];

// POST handler for the API route
export async function POST(req: NextRequest) {
  try {
    const { prompt, language = "english" } = await req.json();
    let ayatText: string;

    if (language === "hindi") {
      const randomIndex = Math.floor(Math.random() * hindiAyats.length);
      const selected = hindiAyats[randomIndex];
      ayatText = `${selected.text}\n(${selected.reference})\n${selected.explanation}`;
    } else {
      const randomIndex = Math.floor(Math.random() * englishAyats.length);
      const selected = englishAyats[randomIndex];
      ayatText = `${selected.text}\n(${selected.reference}, ${selected.translation})\n${selected.explanation}`;
    }

    return NextResponse.json({ response: ayatText });
  } catch (error) {
    console.error("Error retrieving ayat:", error);
    return NextResponse.json(
      { error: "Failed to retrieve ayat" },
      { status: 500 }
    );
  }
}