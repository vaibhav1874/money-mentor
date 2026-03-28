import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY").strip("\"'")
genai.configure(api_key=api_key)

try:
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Say 'OK' if you can hear me.")
    print(f"RESPONSE: {response.text}")
except Exception as e:
    print(f"ERROR: {e}")
