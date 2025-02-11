import base64
import json
from decouple import config

def encode_json_to_base64(json_obj):
    # Convert the JSON object to a string
    json_str = json.dumps(json_obj)

    # Encode the string to bytes
    json_bytes = json_str.encode('utf-8')

    # Encode the bytes to a base64 string
    base64_str = base64.b64encode(json_bytes).decode('utf-8')

    return base64_str

json_obj = {}

# Encode the JSON object
encoded_json = encode_json_to_base64(json_obj)