import os
import requests
from decouple import config

BASE_URL = config('DATA_PROCESSING_API_URL')
API_KEY = config('DATA_PROCESSING_API_KEY')

def make_data_api_request(endpoint):
    url = os.path.join(BASE_URL, endpoint)
    headers = {'Authorization': API_KEY}
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except requests.exceptions.RequestException as err:
        return {"error": str(err)}, 400
    else:
        return response.json(), 200