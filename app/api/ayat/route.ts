import { NextRequest, NextResponse } from "next/server";

// Hardcoded English ayats array (31 items) with enhanced explanations and examples
const englishAyats = [
  {
    text: "And We have not sent you, [O Muhammad], except as a mercy to the worlds.",
    reference: "Quran 21:107",
    translation: "Sahih International",
    explanation: "This verse emphasizes that the Prophet’s mission is to bring mercy to all of creation. It is similar to a caregiver whose compassion comforts everyone in need. For example, his teachings encourage acts of kindness regardless of one’s background."
  },
  {
    text: "Allah does not burden a soul beyond that it can bear.",
    reference: "Quran 2:286",
    translation: "Sahih International",
    explanation: "This verse reassures believers that every hardship is within their capacity to overcome. It is like a challenging exercise that builds strength—when difficulties arise, they ultimately contribute to personal growth and resilience."
  },
  {
    text: "Indeed, Allah orders justice and the doing of good, and giving to relatives, and forbids immorality, and bad conduct, and oppression.",
    reference: "Quran 16:90",
    translation: "Sahih International",
    explanation: "This verse highlights that a balanced life involves practicing fairness, generosity, and kindness, while avoiding injustice and oppression. For instance, just as a recipe requires the right balance of ingredients to taste good, a harmonious society relies on justice and moral behavior."
  },
  {
    text: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.",
    reference: "Quran 30:21",
    translation: "Sahih International",
    explanation: "This verse underlines that loving relationships are a divine sign and a source of tranquility. It is comparable to a successful partnership in which mutual respect and care lead to a peaceful and supportive environment."
  },
  {
    text: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
    reference: "Quran 49:13",
    translation: "Sahih International",
    explanation: "This verse advocates unity by reminding us of our shared origin. Much like a diverse team that brings different strengths together, this teaching shows that mutual respect and understanding among different communities enrich society."
  },
  {
    text: "Who spend [in the cause of Allah] during ease and hardship and who restrain anger and who pardon the people - and Allah loves the doers of good.",
    reference: "Quran 3:134",
    translation: "Sahih International",
    explanation: "This verse encourages patience, forgiveness, and generosity. It is like a friend who supports you during tough times by forgiving mistakes and offering help, thereby inspiring a cycle of goodwill in the community."
  },
  {
    text: "For indeed, with hardship comes ease.",
    reference: "Quran 94:5-6",
    translation: "Sahih International",
    explanation: "This verse offers hope by assuring that every period of difficulty is followed by relief. It is similar to the way dark clouds eventually give way to sunlight, reminding us that perseverance leads to better times."
  },
  {
    text: "Whoever kills a soul unless for a soul or for corruption [done] in the land - it is as if he had slain mankind entirely.",
    reference: "Quran 5:32",
    translation: "Sahih International",
    explanation: "This verse emphasizes the sanctity of every human life by equating the loss of one life to the loss of all humanity. It serves as a strong reminder that violence affects us all, much like the collapse of a single pillar can compromise an entire building."
  },
  {
    text: "And when My servants ask you concerning Me, indeed I am near.",
    reference: "Quran 2:186",
    translation: "Sahih International",
    explanation: "This verse reassures believers of God's closeness and readiness to help. It is like having a supportive friend nearby during tough times—always available when needed."
  },
  {
    text: "O mankind, there has come to you instruction from your Lord and healing for what is in the breasts.",
    reference: "Quran 10:57",
    translation: "Sahih International",
    explanation: "This verse presents the Quran as both guidance and a remedy for inner pain. Much like a trusted advisor who offers practical solutions and emotional relief, the Quran provides comfort and direction in life."
  },
  {
    text: "Repel evil with that which is better.",
    reference: "Quran 41:34",
    translation: "Sahih International",
    explanation: "This verse teaches that responding to negativity with kindness helps break the cycle of hostility. It is akin to diffusing a heated argument by choosing calm and constructive dialogue instead of retaliation."
  },
  {
    text: "Say, 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah.'",
    reference: "Quran 39:53",
    translation: "Sahih International",
    explanation: "This verse offers hope to those who have erred, assuring them of God’s infinite mercy. It is similar to a teacher giving a second chance to a student who has made mistakes, showing that redemption is always possible."
  },
  {
    text: "Allah is the Light of the heavens and the earth.",
    reference: "Quran 24:35",
    translation: "Sahih International",
    explanation: "This verse portrays God as a guiding light, illuminating the path of truth and righteousness. It is much like a lighthouse that provides direction and safety in the midst of darkness."
  },
  {
    text: "Those who have believed and whose hearts are assured by the remembrance of Allah.",
    reference: "Quran 13:28",
    translation: "Sahih International",
    explanation: "This verse explains that keeping God in remembrance brings inner peace and assurance. For example, just as listening to a favorite, calming song can soothe the mind, regular remembrance fosters tranquility."
  },
  {
    text: "Whoever does righteousness, whether male or female, while being a believer - We will surely cause him to live a good life.",
    reference: "Quran 16:97",
    translation: "Sahih International",
    explanation: "This verse promises that living a righteous life will lead to overall well-being. It is like following a balanced diet: every good deed adds up to a healthier, happier life."
  },
  {
    text: "And We have certainly honored the children of Adam.",
    reference: "Quran 17:70",
    translation: "Sahih International",
    explanation: "This verse reminds us of the inherent dignity bestowed upon every human being. It is similar to how each member of a community is valued for their unique contributions, deserving respect and honor."
  },
  {
    text: "There shall be no compulsion in religion.",
    reference: "Quran 2:256",
    translation: "Sahih International",
    explanation: "This verse upholds that faith should be a matter of personal choice. Much like choosing a career or a hobby, this teaching ensures that belief is embraced willingly, fostering a society based on mutual respect."
  },
  {
    text: "And do not argue with the People of the Scripture except in a way that is best.",
    reference: "Quran 29:46",
    translation: "Sahih International",
    explanation: "This verse calls for respectful and constructive dialogue with people of different faiths. It is like engaging in a thoughtful discussion where the goal is to understand and learn from each other, rather than to conflict."
  },
  {
    text: "By which Allah guides those who pursue His pleasure to the ways of peace.",
    reference: "Quran 5:16",
    translation: "Sahih International",
    explanation: "This verse signifies that the path to divine approval is paved with peace and ethical conduct. It is similar to choosing a serene, scenic route during a journey, ensuring that the destination is reached in harmony."
  },
  {
    text: "And Allah invites to the Home of Peace and guides whom He wills to a straight path.",
    reference: "Quran 10:25",
    translation: "Sahih International",
    explanation: "This verse reminds believers that following the righteous path leads to eternal peace. It is comparable to being welcomed into a safe haven after a long, arduous journey, promising lasting tranquility."
  },
  {
    text: "And your Lord is the Forgiving, Full of Mercy.",
    reference: "Quran 18:58",
    translation: "Sahih International",
    explanation: "This verse highlights the limitless mercy and forgiveness of God. Much like a parent who forgives mistakes and guides with love, God’s compassion offers endless opportunities for renewal."
  },
  {
    text: "So remember Me; I will remember you.",
    reference: "Quran 2:152",
    translation: "Sahih International",
    explanation: "This verse emphasizes a reciprocal relationship where remembering God brings divine care in return. It is like nurturing a friendship where mutual attention and care create a lasting bond."
  },
  {
    text: "And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them harshly, they say words of peace.",
    reference: "Quran 25:63",
    translation: "Sahih International",
    explanation: "This verse illustrates the quiet strength and calm demeanor of true believers. It is akin to a gentle river that remains steady despite obstacles, showing that responding with peace can defuse hostility."
  },
  {
    text: "Indeed, this Quran guides to that which is most suitable.",
    reference: "Quran 17:9",
    translation: "Sahih International",
    explanation: "This verse affirms that the Quran offers complete guidance for a well-rounded life. It is like a detailed map that directs travelers safely to their destination, ensuring both spiritual and practical success."
  },
  {
    text: "And We have made some of you as a trial for others - will you have patience?",
    reference: "Quran 25:20",
    translation: "Sahih International",
    explanation: "This verse reminds us that life’s challenges are tests meant to build character. Much like a rigorous workout strengthens the body, facing difficulties with patience leads to personal growth and deeper understanding."
  },
  {
    text: "He gives life and causes death, and to Him you will be returned.",
    reference: "Quran 10:56",
    translation: "Sahih International",
    explanation: "This verse serves as a reminder of life’s impermanence and the certainty of returning to our Creator. It is comparable to the changing seasons—each phase has its time, and ultimately, all things come full circle."
  },
  {
    text: "And whoever fears Allah - He will make for him a way out and provide for him from where he does not expect.",
    reference: "Quran 65:2-3",
    translation: "Sahih International",
    explanation: "This verse offers hope that reverence for God brings unexpected solutions. Much like discovering a hidden door in a maze, those who trust in God may find relief in places they never imagined."
  },
  {
    text: "And [by] the soul and He who proportioned it.",
    reference: "Quran 91:7-8",
    translation: "Sahih International",
    explanation: "This verse invites reflection on the intricate design and balance of the human soul. It is similar to admiring a masterful piece of art where every detail contributes to a harmonious whole, evoking a sense of wonder and inner calm."
  },
  {
    text: "And He is the Forgiving, the Affectionate.",
    reference: "Quran 85:14",
    translation: "Sahih International",
    explanation: "This verse emphasizes the gentle and compassionate nature of God. It is like receiving a warm embrace during challenging times, reminding us that forgiveness and affection are always available."
  },
  {
    text: "And give the relative his right, and also the poor and the traveler, and do not spend wastefully.",
    reference: "Quran 17:26",
    translation: "Sahih International",
    explanation: "This verse advocates for responsible spending and fair treatment of others. It is similar to managing a household budget wisely so that every member’s needs are met, thereby fostering a caring and stable community."
  },
  {
    text: "And let not the hatred of a people prevent you from being just. Be just; that is nearer to righteousness.",
    reference: "Quran 5:8",
    translation: "Sahih International",
    explanation: "This verse calls for impartiality even in the face of animosity. Much like a judge who must remain neutral despite personal bias, it reminds us that true righteousness is founded on fairness and justice."
  }
];

// Hardcoded Hindi ayats array (31 items) with enhanced explanations and examples
const hindiAyats = [
  {
    text: "और हमने आपको सारे जहान के लिए रहमत बनाकर भेजा है।",
    reference: "क़ुरान 21:107",
    explanation: "यह आयत दर्शाती है कि पैगम्बर का मकसद सभी के लिए दया और करुणा फैलाना है। जैसे एक देखभाल करने वाला व्यक्ति बिना भेदभाव के हर किसी की मदद करता है, वैसे ही उनकी शिक्षाएँ भी सभी के लिए मार्गदर्शन प्रदान करती हैं।"
  },
  {
    text: "अल्लाह किसी प्राणी पर उस से अधिक तकलीफ नहीं देता, जितना वह उठा सके।",
    reference: "क़ुरान 2:286",
    explanation: "यह आयत इस बात का आश्वासन देती है कि हर कठिनाई हमारे सामर्थ्य के भीतर है। जैसे कड़ी कसरत करने से ताकत बढ़ती है, वैसे ही चुनौतियाँ हमारे भीतर मजबूती और सहनशीलता पैदा करती हैं।"
  },
  {
    text: "निस्संदेह, अल्लाह न्याय, भलाई और रिश्तेदारों के साथ सद्भाव की हिदायत देता है, और अनैतिकता तथा अन्याय को मना करता है।",
    reference: "क़ुरान 16:90",
    explanation: "यह आयत हमें बताती है कि जीवन में न्याय, दया और सद्भाव बनाए रखना जरूरी है। जैसे एक संतुलित रेसिपी में सही मात्रा में सभी सामग्री मिलकर स्वाद बढ़ाती है, वैसे ही सही आचरण समाज में शांति और सहयोग को बढ़ावा देता है।"
  },
  {
    text: "उनके निशानों में से है कि उसने तुम्हारे लिए तुम में से ही जोड़े बनाए, ताकि तुम उनमें सुकून प्राप्त कर सको, और उसने तुम में आपसी मोहब्बत और रहमत रखी।",
    reference: "क़ुरान 30:21",
    explanation: "यह आयत बताती है कि प्रेमपूर्ण रिश्ते ईश्वर की एक बड़ी निशानी हैं। जैसे किसी सफल साझेदारी में विश्वास और सहयोग से सफलता मिलती है, वैसे ही ऐसे संबंध जीवन में शांति और समर्थन प्रदान करते हैं।"
  },
  {
    text: "हे इंसान! हमने तुम्हें पुरुष और महिला से बनाया और तुम्हें जातियों तथा क़बीलों में बाँटा, ताकि तुम एक-दूसरे को जान सको।",
    reference: "क़ुरान 49:13",
    explanation: "यह आयत मानव जाति में एकता और समझदारी का संदेश देती है। जैसे विभिन्न गुणों और क्षमताओं से एक टीम मजबूत बनती है, वैसे ही हमारी विविधता समाज में आपसी सम्मान और सहयोग बढ़ाती है।"
  },
  {
    text: "जो लोग आसानी और मुश्किल में अल्लाह के रास्ते में खर्च करते हैं, क्रोध को नियंत्रित करते हैं और लोगों को माफ कर देते हैं, अल्लाह उन्हें अच्छा कार्य पसंद है।",
    reference: "क़ुरान 3:134",
    explanation: "यह आयत उदारता, धैर्य और माफी की प्रेरणा देती है। जैसे एक मित्र कठिन समय में साथ देता है और गलतियों को माफ कर देता है, वैसे ही इस आयत में दया और सहानुभूति का संदेश है।"
  },
  {
    text: "निस्संदेह, हर कठिनाई के साथ आसानी है।",
    reference: "क़ुरान 94:5-6",
    explanation: "यह आयत आश्वस्त करती है कि कठिनाइयों के बाद हमेशा राहत मिलती है। जैसे बादल छंटते ही सूरज की किरणें फैल जाती हैं, वैसे ही चुनौतियाँ समय के साथ दूर हो जाती हैं।"
  },
  {
    text: "जो कोई भी किसी की हत्या करे, सिवाय बदले की या ज़मीन में फैली गड़बड़ी के, मानो उसने सारी मानवता का कत्ल कर दिया।",
    reference: "क़ुरान 5:32",
    explanation: "यह आयत हर जीवन की पवित्रता पर जोर देती है। जैसे एक इमारत की नींव कमजोर होने से पूरा भवन डगमगा जाता है, वैसे ही किसी की हानि से पूरी मानवता प्रभावित होती है।"
  },
  {
    text: "जब मेरे गुलाम मुझसे पूछें, तो कह दो कि मैं उनके बहुत करीब हूँ।",
    reference: "क़ुरान 2:186",
    explanation: "यह आयत बताती है कि ईश्वर हमेशा अपने चाहने वालों के पास हैं। जैसे किसी परेशान व्यक्ति को सहारा मिलता है, वैसे ही यह आयत दिलासा देती है कि मदद हमेशा उपलब्ध है।"
  },
  {
    text: "हे इंसान! तुम्हारे पास तुम्हारे रब की ओर से वह हिदायत आ चुकी है, जो दिलों के लिए शिफा है।",
    reference: "क़ुरान 10:57",
    explanation: "यह आयत कुरान को दिलों के लिए मार्गदर्शक और उपचार के रूप में प्रस्तुत करती है। जैसे कोई परामर्शदाता भावनात्मक दर्द को कम करता है, वैसे ही ये आयत शांति और मार्गदर्शन प्रदान करती है।"
  },
  {
    text: "बुरे का मुकाबला अच्छाई से करो।",
    reference: "क़ुरान 41:34",
    explanation: "यह आयत सिखाती है कि नकारात्मकता का सामना सकारात्मकता से करना चाहिए। जैसे ठंडे पानी से गर्मी कम की जाती है, वैसे ही अच्छाई से बुराई का मुकाबला करना सामाजिक सौहार्द को बढ़ावा देता है।"
  },
  {
    text: "कहो, 'हे मेरे उन गुलामों, जिन्होंने अपनी ही आत्माओं पर अत्याचार किया है, अल्लाह की रहमत से निराश न होओ।'",
    reference: "क़ुरान 39:53",
    explanation: "यह आयत उन लोगों को आशा देती है जो अपनी गलतियों के कारण निराश हो गए हैं। जैसे कोई शिक्षक गलती सुधारने का दूसरा मौका देता है, वैसे ही यह आयत बताती है कि माफी और सुधार की राह हमेशा खुली है।"
  },
  {
    text: "अल्लाह आसमानों और ज़मीन का नूर है।",
    reference: "क़ुरान 24:35",
    explanation: "यह आयत ईश्वर को प्रकाश के रूप में दर्शाती है, जो अंधेरे में मार्गदर्शन प्रदान करता है। जैसे एक लाइटहाउस जहाजों को सुरक्षित रास्ता दिखाता है, वैसे ही अल्लाह हमें सही दिशा दिखाते हैं।"
  },
  {
    text: "जो लोग ईमान लाए और जिनके दिलों को अल्लाह का ज़िक्र सुकून देता है।",
    reference: "क़ुरान 13:28",
    explanation: "यह आयत बताती है कि अल्लाह का ज़िक्र दिल को शांति और संतोष प्रदान करता है। जैसे किसी प्रिय संगीत की मधुर धुन से मन शांत होता है, वैसे ही नियमित ज़िक्र से दिल में सुकून मिलता है।"
  },
  {
    text: "जो भी अच्छा काम करें, चाहे पुरुष हो या महिला, अल्लाह उन्हें अच्छी जिंदगी देगा।",
    reference: "क़ुरान 16:97",
    explanation: "यह आयत वादा करती है कि निःस्वार्थ कर्म से जीवन में समृद्धि आती है। जैसे संतुलित आहार से स्वास्थ्य सुधरता है, वैसे ही अच्छे कर्म से मन और जीवन में खुशहाली आती है।"
  },
  {
    text: "और हमने ज़रूर आदम के बच्चों को इज़्ज़त दी है।",
    reference: "क़ुरान 17:70",
    explanation: "यह आयत हर व्यक्ति की अंतर्निहित गरिमा को दर्शाती है। जैसे किसी समुदाय में हर सदस्य की अहमियत होती है, वैसे ही हर इंसान सम्मान का हकदार है।"
  },
  {
    text: "धर्म में जबरदस्ती नहीं है।",
    reference: "क़ुरान 2:256",
    explanation: "यह आयत बताती है कि आस्था एक व्यक्तिगत पसंद है जिसे जबरदस्ती थोपना सही नहीं। जैसे जीवन में अपने मार्ग का चयन स्वेच्छा से होता है, वैसे ही धर्म भी स्वतंत्र रूप से अपनाया जाना चाहिए।"
  },
  {
    text: "और किताब वाले लोगों से सबसे अच्छे ढंग से बहस करो।",
    reference: "क़ुरान 29:46",
    explanation: "यह आयत विभिन्न मतभेदों में सम्मान और समझदारी से बातचीत करने की सलाह देती है। जैसे अच्छे वार्तालाप से समस्याएँ सुलझती हैं, वैसे ही यह आयत सहमति और आपसी सम्मान को बढ़ावा देती है।"
  },
  {
    text: "अल्लाह उन लोगों को, जो उसके करीब होना चाहते हैं, शांति के रास्ते दिखाता है।",
    reference: "क़ुरान 5:16",
    explanation: "यह आयत बताती है कि ईमान की राह में शांति और दिशा दोनों हैं। जैसे एक शांतिपूर्ण मार्ग चुनने से यात्रा सुखद होती है, वैसे ही ईमानदार जीवन में संतुलन और शांति आती है।"
  },
  {
    text: "अल्लाह तुम्हें शांति के घर में बुलाता है और जो चाहे उसे सीधे रास्ते पर चलाता है।",
    reference: "क़ुरान 10:25",
    explanation: "यह आयत बताती है कि अंतिम स्वर्ग में अनंत शांति का वादा है। जैसे एक थकान भरी यात्रा के बाद आरामदेह विश्राम गृह मिलता है, वैसे ही इस आयत में ईमान के द्वारा प्राप्त होने वाली अंतिम शांति का आश्वासन है।"
  },
  {
    text: "और तुम्हारा रब बहुत क्षमाशील, रहमत से भरपूर है।",
    reference: "क़ुरान 18:58",
    explanation: "यह आयत बताती है कि ईश्वर की ममता असीम है और वह हमेशा माफ करने के लिए तैयार है। जैसे कोई माता-पिता अपने बच्चों की गलतियों को माफ कर देता है, वैसे ही ईश्वर भी अपनी दया से सबको संवारते हैं।"
  },
  {
    text: "मुझको याद करो, मैं तुम्हें याद करूंगा।",
    reference: "क़ुरान 2:152",
    explanation: "यह आयत हमें याद दिलाती है कि जब हम ईश्वर को याद करते हैं तो वह भी हमारी देखभाल करता है। जैसे एक मित्र का साथ कठिन समय में दिलासा देता है, वैसे ही नियमित याद से आत्मिक सुरक्षा और सहारा मिलता है।"
  },
  {
    text: "और रहमत वाले के बंदे वो हैं, जो ज़मीन पर सरलता से चलते हैं, और जब उन पर बुरे शब्द कहे जाते हैं, तो वे सलामत के बोल कहते हैं।",
    reference: "क़ुरान 25:63",
    explanation: "यह आयत विनम्रता और शांतिपूर्ण व्यवहार का संदेश देती है। जैसे एक शांत धारा अपने मार्ग में आने वाली बाधाओं को सहजता से पार कर जाती है, वैसे ही समझदारी से शब्दों का चयन करने से समाज में सकारात्मक बदलाव लाया जा सकता है।"
  },
  {
    text: "निस्संदेह, यह कुरान सबसे उपयुक्त हिदायत की ओर ले जाता है।",
    reference: "क़ुरान 17:9",
    explanation: "यह आयत बताती है कि कुरान हमें जीवन के हर पहलू में सही दिशा प्रदान करता है। जैसे एक विस्तृत नक्शा हमें अंजाम तक ले जाता है, वैसे ही इस आयत में दी गई हिदायत से व्यक्ति अपना सर्वांगीण विकास कर सकता है।"
  },
  {
    text: "और हमने तुम में से कुछ को दूसरों के लिए परीक्षा बनाया है, क्या तुम सब्र करोगे?",
    reference: "क़ुरान 25:20",
    explanation: "यह आयत बताती है कि जीवन की चुनौतियाँ हमारे चरित्र का परीक्षण हैं। जैसे कसरत से शरीर मजबूत होता है, वैसे ही धैर्य और सहिष्णुता से व्यक्ति में आंतरिक शक्ति आती है।"
  },
  {
    text: "वह जीवन देता है और मृत्यु देता है, और अंत में तुम उसी के पास लौटोगे।",
    reference: "क़ुरान 10:56",
    explanation: "यह आयत जीवन की नश्वरता और ईश्वर की ओर लौटने की अनिवार्यता को दर्शाती है। जैसे मौसम बदलते हैं, वैसे ही हर जीवन के चरण परिवर्तनशील होते हैं और अंततः सब कुछ अपने मूल में लौट आता है।"
  },
  {
    text: "जो अल्लाह से डरता है, अल्लाह उसके लिए बाहर का रास्ता निकालेगा और अनदेखे स्थानों से उसे रब फराहम करेगा।",
    reference: "क़ुरान 65:2-3",
    explanation: "यह आयत आशा देती है कि ईश्वर का भय रखने वाले हमेशा अनपेक्षित सहारा और समाधान पाते हैं। जैसे किसी भूलभुलैया में छिपा हुआ रास्ता मिल जाए, वैसे ही ईश्वर उन लोगों के लिए राह निकालते हैं।"
  },
  {
    text: "और उसने आत्मा और उसकी माप-तोल बनाई।",
    reference: "क़ुरान 91:7-8",
    explanation: "यह आयत मानव जीवन की जटिलता और खूबसूरती को दर्शाती है। जैसे किसी कलाकृति के हर छोटे विवरण में गहराई होती है, वैसे ही आत्मा की संरचना हमें चमत्कार का अहसास कराती है।"
  },
  {
    text: "और वह बहुत माफ़ करने वाला, प्यार करने वाला है।",
    reference: "क़ुरान 85:14",
    explanation: "यह आयत ईश्वर के असीम करुणा और ममता को दर्शाती है। जैसे किसी गहरे दुख के क्षण में सुकून देने वाला आलिंगन, वैसे ही यह आयत बताती है कि माफी और प्रेम हमेशा उपलब्ध हैं।"
  },
  {
    text: "रिश्तेदारों, गरीबों और मुसाफिरों को उनका हक दो, और बर्बादी से खर्च न करो।",
    reference: "क़ुरान 17:26",
    explanation: "यह आयत उदारता और संतुलित खर्च को बढ़ावा देती है। जैसे एक सुव्यवस्थित बजट से परिवार में संतुलन बना रहता है, वैसे ही समाज में न्यायपूर्ण वितरण से स्थिरता आती है।"
  },
  {
    text: "और लोगों से नफरत के कारण न्याय से न हटो; न्याय ही धार्मिकता के करीब है।",
    reference: "क़ुरान 5:8",
    explanation: "यह आयत निष्पक्षता की महत्ता को रेखांकित करती है। जैसे एक न्यायाधीश अपने निर्णय में पूर्ण निष्पक्षता बरतता है, वैसे ही हर व्यक्ति को बिना पूर्वाग्रह के न्याय देना एक सच्ची धार्मिकता का प्रतीक है।"
  }
];

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
