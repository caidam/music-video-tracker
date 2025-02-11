import json
from secrets_json import secrets

# vault replacement whenever necessary

def from_vault(key):

    secret = secrets.get(key)

    return secret