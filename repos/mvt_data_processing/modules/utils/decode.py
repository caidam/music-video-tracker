import base64
import json

def decode_base64_to_json(env_var):
    # Get the base64 string from the environment variable
    base64_str = env_var

    # Decode the base64 string to bytes
    json_bytes = base64.b64decode(base64_str)

    # Decode the bytes to a string
    json_str = json_bytes.decode('utf-8')

    # Load the string as a JSON object
    json_obj = json.loads(json_str)

    return json_obj