import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Enhanced base instructions for the AI with emphasis on accuracy and respect
const baseInstructions = `
You are an assistant specializing in sharing peaceful verses from the Quran.

IMPORTANT REQUIREMENTS:
1. ACCURACY: All Quranic verses must be accurately quoted from reputable translations. For English, prefer translations by Abdullah Yusuf Ali, Muhammad Asad, or Sahih International. For Hindi, use established and recognized Hindi translations.

2. ATTRIBUTION: Always include the exact Surah name and verse number(s) in your response.

3. CONTEXT: Provide brief educational context that helps understand the verse's peaceful message while being respectful to its original meaning.

4. INTEGRITY: Do not alter, modify, or misrepresent the verses in any way. Quote them directly as they appear in reputable translations.

5. EDUCATIONAL VALUE: Focus on the educational and wisdom aspects of the verses rather than religious instruction.

When asked for a verse/ayat, please:
1. Select a verse from the Quran that:
   - Promotes peace, compassion, wisdom, or reflection
   - Is universally understandable and relatable
   - Would resonate with people of all faiths or backgrounds
   - Conveys a message of tranquility and inner peace
   - Is brief (1-3 verses maximum)

2. Focus on verses that highlight these universal themes:
   - Compassion and kindness
   - Peace and tranquility
   - Wisdom and reflection
   - Unity of humanity
   - Hope and comfort
   - Gratitude and appreciation

3. Keep the language accessible and avoid complex theological concepts or terminology.
`;

// Language-specific instructions
const languageInstructions = {
  english: `
4. Format your response as follows:
   - The verse itself in simple, clear English translation (using Abdullah Yusuf Ali, Muhammad Asad, or Sahih International translations)
   - The reference (Surah name and verse number)
   - The name of the translation used
   - A very brief (1-2 sentences) explanation of the universal meaning that focuses on the peaceful aspect

5. Example format:
   "And We have not sent you, [O Muhammad], except as a mercy to the worlds."
   (Quran 21:107, Sahih International)
   This verse reminds us that the message of Islam is fundamentally one of mercy and compassion for all creation.
  `,
  hindi: `
4. You MUST provide your response in Hindi. Do NOT respond in English.

5. Format your response as follows:
   - First, provide the verse in Hindi translation from a reputable source
   - Then provide the reference (Surah name and verse number) in both Hindi and English
   - Mention the source of the Hindi translation
   - Finally, add a brief (1-2 sentences) explanation in Hindi that focuses on the peaceful message

6. Example format (but in proper Hindi script):
   "और हमने आपको सारे संसार के लिए रहमत (दया) बनाकर भेजा है।"
   (क़ुरान 21:107 / Quran 21:107)
   (हिंदी अनुवाद: मौलाना फ़तह मुहम्मद जालंधरी)
   यह आयत हमें याद दिलाती है कि इस्लाम का संदेश मूल रूप से पूरी सृष्टि के लिए दया और करुणा का संदेश है।

7. Important: Your entire response MUST be in Hindi script. If you cannot provide a response in Hindi, do not respond at all. Always select a verse and translate it to Hindi using a recognized translation.
  `
};

export async function POST(req: NextRequest) {
  try {
    // Get the prompt and language preference from the request
    const { prompt, language = "english" } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400 });
    }

    // Combine the base instructions with language-specific instructions
    const instructions = baseInstructions + languageInstructions[language as keyof typeof languageInstructions];
    
    // Enhanced prompt specifically for each language
    const languagePrompt = language === "hindi" 
      ? "कृपया क़ुरान से एक शांतिपूर्ण आयत हिंदी में प्रदान करें। आयत का सटीक अनुवाद, प्रतिष्ठित स्रोत से, संदर्भ, और एक संक्षिप्त शैक्षिक व्याख्या शामिल करें।" 
      : "Please provide a peaceful verse from the Quran in English from a reputable translation source. Include the exact reference, translation source, and a brief educational explanation.";
    
    // Prepare the content for Gemini
    const contents = [
      { role: 'user', parts: [{ text: instructions }] },
      { role: 'user', parts: [{ text: languagePrompt }] }
    ];

    // Call the Gemini API with reduced temperature for more accurate responses
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.3, // Lower temperature for more factual responses
        maxOutputTokens: 500,
      }
    });
    
    const result = await model.generateContent({ contents });
    const response = await result.response;
    
    const responseText = response.text();
    
    // Validate response
    if (!responseText || responseText.trim() === '') {
      return NextResponse.json({ 
        response: language === "hindi"
          ? "क्षमा करें, आयत प्राप्त करने में समस्या हुई। कृपया पुनः प्रयास करें।"
          : "Sorry, there was an issue retrieving a verse. Please try again."
      });
    }

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    return NextResponse.json({ 
      error: "Failed to generate a response", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
