with 

source as (

    select * from {{ source('project_project_raw', 'raw_yt_stats') }}

),

renamed as (

    select
        video_id,
        view_count,
        like_count,
        comment_count,
        cast(loaded_at as date) as ref_day

    from source

),

dedup as (
    select
        *,
        ROW_NUMBER() OVER 
            (PARTITION BY video_id, ref_day 
            ORDER BY ref_day) AS rownum
    from renamed

)

select 
    video_id as youtube_video_id,
    view_count as youtube_video_view_count,
    like_count as youtube_video_like_count,
    comment_count as youtube_video_comment_count,
    ref_day as youtube_video_stats_ref_day
from dedup
where rownum = 1

