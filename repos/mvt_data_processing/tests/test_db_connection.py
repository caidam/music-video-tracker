# test_db_queries.py

import pytest
from modules.db_utils import execute_query_bq, execute_query_pg

def test_bigquery_query():
    sql_query = "SELECT 1"
    try:
        result = execute_query_bq(sql_query)
        print("BigQuery query result:", result)
        assert result  # Ensure that the result is not empty
    except Exception as e:
        pytest.fail(f"Failed to execute BigQuery query: {e}")

def test_postgresql_query():
    sql_query = "SELECT 1"
    try:
        result = execute_query_pg(sql_query)
        print("PostgreSQL query result:", result)
        assert result  # Ensure that the result is not empty
    except Exception as e:
        pytest.fail(f"Failed to execute PostgreSQL query: {e}")
