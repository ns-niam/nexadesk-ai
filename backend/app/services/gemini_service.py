import google.generativeai as genai
from app.services.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

for m in genai.list_models():
    if "generateContent" in m.supported_generation_methods:
        print(m.name)
def ask_gemini(prompt: str) -> str:

    try:
        model = genai.GenerativeModel(
        "gemini-2.5-flash"
        )

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"Gemini Error: {str(e)}"
