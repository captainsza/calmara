import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Base instructions for the AI
const baseInstructions = `
You are an assistant specializing in sharing peaceful verses from the Quran.

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
   - The verse itself in simple, clear English translation
   - The reference (Surah name and verse number)
   - A very brief (1-2 sentences) explanation of the universal meaning that focuses on the peaceful aspect

5. Example format:
   "And We have not sent you, [O Muhammad], except as a mercy to the worlds."
   (Quran 21:107)
   This verse reminds us that the message of Islam is fundamentally one of mercy and compassion for all creation.
  `,
  hindi: `
4. You MUST provide your response in Hindi. Do NOT respond in English.

5. Format your response as follows:
   - First, provide the verse in Hindi translation
   - Then provide the reference (Surah name and verse number) in both Hindi and English
   - Finally, add a brief (1-2 sentences) explanation in Hindi that focuses on the peaceful message

6. Example format (but in proper Hindi script):
   "और हमने आपको सारे संसार के लिए रहमत (दया) बनाकर भेजा है।"
   (क़ुरान 21:107 / Quran 21:107)
   यह आयत हमें याद दिलाती है कि इस्लाम का संदेश मूल रूप से पूरी सृष्टि के लिए दया और करुणा का संदेश है।

7. Important: Your entire response MUST be in Hindi script. If you cannot provide a response in Hindi, do not respond at all. Always select a verse and translate it to Hindi.
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
    
    // Enhanced prompt specifically for Hindi
    const languagePrompt = language === "hindi" 
      ? "कृपया क़ुरान से एक शांतिपूर्ण आयत हिंदी में प्रदान करें। आयत का अनुवाद, संदर्भ, और एक संक्षिप्त व्याख्या शामिल करें।" 
      : "Please provide a peaceful verse from the Quran in English.";
    
    // Prepare the content for Gemini
    const contents = [
      { role: 'user', parts: [{ text: instructions }] },
      { role: 'user', parts: [{ text: languagePrompt }] }
    ];

    // Call the Gemini API
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    
    const result = await model.generateContent({ contents });
    const response = await result.response;
    
    const responseText = response.text();
    
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
