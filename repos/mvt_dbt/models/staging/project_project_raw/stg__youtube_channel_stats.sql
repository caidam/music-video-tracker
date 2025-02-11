with 

source as (

    select * from {{ source('project_project_raw', 'raw_youtube_channel_stats') }}

),

renamed as (

    select
        channel_id,
        view_count,
        video_count,
        -- cast(date_trunc(loaded_at, DAY) as DATE) as ref_day
        cast(loaded_at as DATE) as ref_day
    from source

),

dedup as (
    select
        *,
        ROW_NUMBER() OVER 
            (PARTITION BY channel_id, ref_day 
            ORDER BY ref_day) AS rownum
    from renamed

)

select 
    channel_id as youtube_channel_id,
    ref_day as youtube_channel_stats_ref_day,
    view_count as youtube_channel_view_count,
    video_count as youtube_channel_video_count
from dedup
where rownum = 1
