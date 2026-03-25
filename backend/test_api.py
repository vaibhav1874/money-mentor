import urllib.request, json
url = "https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBw55j_ogTFrFaJwAvx7B55A2VYfwiStvg"
req = urllib.request.Request(url, method="GET")
try:
    with urllib.request.urlopen(req) as f:
        data = json.loads(f.read().decode('utf-8'))
        for m in data.get('models', []):
            if 'generateContent' in m.get('supportedGenerationMethods', []):
                print(m['name'])
except Exception as e:
    print(e)
