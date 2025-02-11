from decouple import config
from sqlalchemy import create_engine
from google.cloud import bigquery
from google.oauth2 import service_account
from modules.utils.decode import decode_base64_to_json
import pandas as pd
import logging
import re

# Load credentials from the service account JSON
# bigquery_credentials = service_account.Credentials.from_service_account_file(config('GOOGLE_APPLICATION_CREDENTIALS'))
bq_creds_json = decode_base64_to_json(config('GOOGLE_APPLICATION_CREDENTIAL_INFO'))
bigquery_credentials = service_account.Credentials.from_service_account_info(bq_creds_json)

# BIGQUERY

def create_bq_client():

    # Construct a BigQuery client object
    client = bigquery.Client(credentials=bigquery_credentials, project=bigquery_credentials.project_id)
    return client

def get_bq_parameter_type(value):
    if isinstance(value, int):
        return "INT64"
    elif isinstance(value, float):
        return "FLOAT64"
    else:
        return "STRING"

def execute_query_bq(sql_query, params=None):
    client = create_bq_client()
    if params is not None:
        # query_parameters = [bigquery.ScalarQueryParameter(key, "STRING", value) for key, value in params.items()]
        query_parameters = [
            bigquery.ScalarQueryParameter(key, get_bq_parameter_type(value), value)
            for key, value in params.items()
        ]
        # for param in query_parameters:
        #     logging.info(f"Parameter: {param.name}, Type: {param.type_}, Value: {param.value}")
    else:
        query_parameters = []
    query_job = client.query(sql_query, job_config=bigquery.QueryJobConfig(query_parameters=query_parameters))
    df = query_job.to_dataframe()

    # Add logging for DataFrame
    # logging.info(f"DataFrame fetched: {df.head()}")

    # Identify and convert 'dbdate' columns to string in the desired format
    for col in df.columns:
        if str(df[col].dtype) == 'dbdate':
            df[col] = df[col].astype('datetime64[ns]').dt.strftime('%Y-%m-%d')

    # Convert DataFrame to JSON
    try:
        json_data = df.to_json(orient='records')
        logging.info(f"JSON data: {json_data[:500]}")  # Log the first 500 characters of the JSON data
    except Exception as e:
        logging.error(f"Error converting DataFrame to JSON: {e}")
        raise
    
    return json_data

# POSTGRESQL

# postgres engine function
def create_db_engine():

    db_uri = config('PG_URI')
    engine = create_engine(db_uri)

    return engine

def execute_query_pg(sql_query, *params):

    engine = create_db_engine()
    
    with engine.connect() as connection:
        df = pd.read_sql_query(sql_query, connection, params=params)
        json_data = df.to_json(orient='records')
    return json_data

def execute_query_pg2(sql_query, *params):

    engine = create_db_engine()


    with engine.connect() as connection:
        if isinstance(params[0], tuple):
            params = params[0]
        df = pd.read_sql_query(sql_query, connection, params=params)
        json_data = df.to_json(orient='records')
    return json_data

if __name__ == "__main__":
    # Test BigQuery connection
    try:
        bq_client = create_bq_client()
        print("Connected to BigQuery successfully!")
    except Exception as e:
        print(f"Failed to connect to BigQuery: {e}")

    # Test PostgreSQL connection
    try:
        engine = create_db_engine()
        connection = engine.connect()
        print("Connected to PostgreSQL successfully!")
        connection.close()
    except Exception as e:
        print(f"Failed to connect to PostgreSQL: {e}")
