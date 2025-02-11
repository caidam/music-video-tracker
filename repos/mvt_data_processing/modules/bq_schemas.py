from google.cloud import bigquery

# backend data schemas
SCHEMA_BASE_SOURCE = [
    bigquery.SchemaField("id", "INT64"),
    bigquery.SchemaField("url", "STRING"),
    bigquery.SchemaField("type", "STRING"),
    bigquery.SchemaField("date_added", "TIMESTAMP"),
    bigquery.SchemaField("added_by_id", "INT64"),
]

SCHEMA_BASE_USERSOURCE = [
    bigquery.SchemaField("id", "INT64"),
    bigquery.SchemaField("date_started", "TIMESTAMP"),
    bigquery.SchemaField("date_stopped", "TIMESTAMP"),
    bigquery.SchemaField("source_id", "INT64"),
    bigquery.SchemaField("user_id", "INT64"),
    bigquery.SchemaField("updated_at", "TIMESTAMP"),
]

# YOUTUBE API DATA SCHEMAS
#
# YOUTUBE VIDEOS
SCHEMA_YT_SNIPPET = [
    bigquery.SchemaField("video_id", "STRING"),
    bigquery.SchemaField("title", "STRING"),
    bigquery.SchemaField("channel_id", "STRING"),
    bigquery.SchemaField("channel_title", "STRING"),
    bigquery.SchemaField("description", "STRING"),
    bigquery.SchemaField("tags", "STRING"),
    bigquery.SchemaField("published_at", "TIMESTAMP"),
    bigquery.SchemaField("thumbnails", "STRING"),
    bigquery.SchemaField("loaded_at", "TIMESTAMP"),
]

SCHEMA_YT_STATS = [
    bigquery.SchemaField("video_id", "STRING"),
    bigquery.SchemaField("view_count", "INT64"),
    bigquery.SchemaField("like_count", "INT64"),
    bigquery.SchemaField("comment_count", "INT64"),
    bigquery.SchemaField("loaded_at", "TIMESTAMP"),
]
#
# YOUTUBE CHANNELS
#
SCHEMA_YT_CHANNEL_SNIPPET = [
    bigquery.SchemaField("channel_id", "STRING"),
    bigquery.SchemaField("title", "STRING"),
    bigquery.SchemaField("description", "STRING"),
    bigquery.SchemaField("published_at", "STRING"),
    bigquery.SchemaField("thumbnails", "STRING"),
    bigquery.SchemaField("country", "STRING"),
    bigquery.SchemaField("loaded_at", "TIMESTAMP"),
]

SCHEMA_YT_CHANNELS_STATS = [
    bigquery.SchemaField("channel_id", "STRING"),
    bigquery.SchemaField("view_count", "INT64"),
    bigquery.SchemaField("video_count", "INT64"),
    bigquery.SchemaField("loaded_at", "TIMESTAMP"),
]
