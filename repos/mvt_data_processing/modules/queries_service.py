from modules.db_utils import execute_query_bq

def get_5_listings():
    # sql_query = "select * from adventureworks-warehousing.listings limit 5"
    sql_query = "SELECT  * FROM adventureworks-warehousing.abnb_raw.listings LIMIT 5"
    return execute_query_bq(sql_query)

def get_cities():
    sql_query = """
    select *
    from adventureworks-warehousing.abnb_raw.cities
    order by city;
    """
    return execute_query_bq(sql_query)

def get_city(city='Paris'):
    # Use COALESCE to handle NULL values and provide a default value ('%') if job_search is not provided
    sql_query = """
    select *
    from adventureworks-warehousing.abnb_raw.cities
    where city = @city
    """
    return execute_query_bq(sql_query, {'city' : city})

def get_markers(city='Paris', neighbourhood=None):
    # Use COALESCE to handle NULL values and provide a default value ('%') if job_search is not provided
    sql_query = """
    select *
    from adventureworks-warehousing.abnb_raw.listings
    where city = @city
    and neighbourhood = coalesce(@neighbourhood, neighbourhood)
    order by number_of_reviews_ltm desc
    limit 3000
    """
    return execute_query_bq(sql_query, {'city' : city, 'neighbourhood' : neighbourhood})

def get_neigbourhoods(city='Paris'):
    # Use COALESCE to handle NULL values and provide a default value ('%') if job_search is not provided
    sql_query = """
    select
        concat(lower(city), '_', lower(neighbourhood)) as id
        , neighbourhood
    from adventureworks-warehousing.abnb_raw.city_kpis
    where city = @city
    order by city, is_total desc, neighbourhood
    """
    return execute_query_bq(sql_query, { 'city' : city })

def get_city_kpis(city='Paris', neighbourhood='None'):
    # Use COALESCE to handle NULL values and provide a default value ('%') if job_search is not provided
    sql_query = """
    select *
    from adventureworks-warehousing.abnb_raw.city_kpis
    where city = @city
    and neighbourhood = coalesce(@neighbourhood, neighbourhood)
    order by city, is_total desc, neighbourhood
    """
    return execute_query_bq(sql_query, { 'city' : city, 'neighbourhood' : neighbourhood })

def get_top_hosts(city='Paris', neighbourhood='None'):
    # Use COALESCE to handle NULL values and provide a default value ('%') if job_search is not provided
    sql_query = """
    select
        host_name,
        sum(case when room_type = 'Entire home/apt' then 1 else 0 end) as entire_homes_apts,
        sum(case when room_type = 'Hotel room' then 1 else 0 end) as hotel_rooms,
        sum(case when room_type = 'Private room' then 1 else 0 end) as private_rooms,
        sum(case when room_type = 'Shared room' then 1 else 0 end) as shared_rooms,
        count(distinct id) as nb_listings,
        host_id
    from adventureworks-warehousing.abnb_raw.listings
    where city = @city
    and neighbourhood = coalesce(@neighbourhood, neighbourhood)
    and host_name is not null
    group by host_name, host_id
    order by 6 desc
    limit 100
    """
    return execute_query_bq(sql_query, { 'city' : city, 'neighbourhood' : neighbourhood })

def get_sources():
    sql_query = """
    select *
    from adventureworks-warehousing.project_project_raw.base_source;
    """
    return execute_query_bq(sql_query)

def get_youtube_channels():
    sql_query = """
    select distinct channel_id
    from adventureworks-warehousing.project_project_raw.raw_yt_snippet;
    """
    return execute_query_bq(sql_query)

#
def get_usersource_summary(user, source):
    # Use COALESCE to handle NULL values and provide a default value ('%') if job_search is not provided
    sql_query = """
    SELECT 
        *
    FROM adventureworks-warehousing.project_project_warehouse.dim_tracking t
    INNER JOIN adventureworks-warehousing.project_project_warehouse.summary_youtube_video_channel s ON t.tracking_source_id = s.youtube_video_source_id
    WHERE t.tracking_user_id = @user AND t.tracking_source_id = @source
    """

    return execute_query_bq(sql_query, { 'user' : user, 'source' : source })

def get_source_stats(user, source):
    # Use COALESCE to handle NULL values and provide a default value ('%') if job_search is not provided
    sql_query = """
    SELECT
        s.*
    FROM project_project_warehouse.dim_tracking t
    INNER JOIN project_project_warehouse.dim_youtube_video v ON t.tracking_source_id = v.youtube_video_source_id 
    INNER JOIN project_project_warehouse.fact_youtube_stats s ON v.youtube_video_id = s.youtube_video_id 
    WHERE t.tracking_user_id = @user AND t.tracking_source_id = @source
    AND s.ref_day >= t.tracking_updated_at
    ORDER BY s.ref_day
    """

    return execute_query_bq(sql_query, { 'user' : user, 'source' : source })