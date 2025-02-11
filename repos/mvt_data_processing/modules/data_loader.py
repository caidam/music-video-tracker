import pandas as pd
import logging
from google.cloud import bigquery
from modules.db_utils import create_bq_client, create_db_engine

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_pg_table(table_name):
    try:
        engine = create_db_engine()
        query = f'SELECT * FROM "{table_name}"'
        df = pd.read_sql_query(query, con=engine)
        return df
    except Exception as e:
        logger.error(f"Error loading data from PostgreSQL: {e}")
        raise

def load_bigquery_table(df, table_name, schema, w_disposition):
    try:
        bigquery_client = create_bq_client()
        dataset_id = 'project_project_raw'  # Replace with your actual dataset ID
        table_ref = bigquery_client.dataset(dataset_id).table(table_name)
        job_config = bigquery.LoadJobConfig()

        # Specify column types for each table
        job_config.schema = schema

        job_config.write_disposition = w_disposition # 'WRITE_TRUNCATE' # 'WRITE_APPEND' # Change as needed
        bigquery_job = bigquery_client.load_table_from_dataframe(df, table_ref, job_config=job_config)
        bigquery_job.result()  # Wait for the job to complete
        logger.info(f"Data loaded into BigQuery table: {table_name}")
    except Exception as e:
        logger.error(f"Error loading data into BigQuery: {e}")
        raise

def load_pg_to_bq(table_name, schema):
    try:
        df = load_pg_table(table_name)
        w_disposition = 'WRITE_TRUNCATE'
        load_bigquery_table(df, table_name, schema, w_disposition)
        return True
    
    except Exception as e:
        logger.error(f"Error during data transfer: {e}")
        raise

#
def load_yt_info_to_bq(table_name, schema, yt_api_func, w_disposition):
    try:
        df = yt_api_func
        # w_disposition = 'WRITE_APPEND'
        load_bigquery_table(df, table_name, schema, w_disposition)
        return True
    
    except Exception as e:
        logger.error(f"Error during data transfer: {e}")
        raise

if __name__ == "__main__":

    dtype_mapping = {
        'int64': 'INT64',
        'int32': 'INT64',
        'float64': 'FLOAT64',
        'float32': 'FLOAT64',
        'object': 'STRING',
        'bool': 'BOOL',
        'datetime64[ns]': 'TIMESTAMP',
        'timedelta[ns]': 'TIME',
        'category': 'STRING',
        'datetime64[ns, UTC]': 'TIMESTAMP',
    }

    df = load_pg_table('base_source')

    # for col in df.columns:
    #     print(f"Column: {col}, Type: {df[col].dtype}")

    # Assuming df is your DataFrame
    schema_template = "\n".join([
        f'bigquery.SchemaField("{col}", "{dtype_mapping.get(str(df[col].dtype), str(df[col].dtype))}"),' 
        for col in df.columns
    ])
    print(schema_template)


    # try:
    #     table_name = "base_source"
    #     load_pg_to_bq(table_name)
    # except Exception as e:
    #     logger.error(f"Script execution failed: {e}")