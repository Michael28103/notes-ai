from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import base64
import io

app = Flask(__name__)
CORS(app)

@app.route("/ocr", methods=["POST"])
def ocr():
    data = request.get_json()
    image_data = data["image"].split(",")[1]
    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes))

    image = image.convert("L")

    text = pytesseract.image_to_string(image, config="--psm 6")

    return jsonify({ "text": text.strip() })

if __name__ == "__main__":
    app.run(port=5001)