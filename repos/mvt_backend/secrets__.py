from decouple import config
import hvac

def from_vault(secret):
    # Create a client
    client = hvac.Client(
        url='',
        token=config('VAULT_TOKEN')
    )

    client.renew_token(config('VAULT_TOKEN'))

    # Verify the client is authenticated
    assert client.is_authenticated()  # => True

    # Read a secret
    secret_mount_point = config('VAULT_MOUNT_POINT')
    secret_path = '/secrets'
    secret_kv = client.secrets.kv.v2.read_secret_version(path=secret_path, mount_point=secret_mount_point, raise_on_deleted_version=False)

    secrets = secret_kv['data']['data']['secret_var_json']
    
    # Print the secret
    # print(secrets)
    
    return secrets.get(secret)

# print(secret)
if __name__ == '__main__':

    print(from_vault('EMAIL_HOST'))