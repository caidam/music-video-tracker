# tests/test_api.py

import pytest

@pytest.fixture
def client():
    from api import app as flask_app
    flask_app.config.from_object('config_test.Config')
    return flask_app.test_client()

def test_unauthorized_endpoint(client):
    response = client.get('/')
    assert response.status_code == 401
    # assert b'hello' in response.data  # Adjust based on actual response content
