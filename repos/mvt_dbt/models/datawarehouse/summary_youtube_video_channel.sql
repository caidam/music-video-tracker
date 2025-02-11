with video as (select * from {{ ref('dim_youtube_video') }})

, channel as (select * from {{ ref('dim_youtube_channel') }})


select
    concat(youtube_video_source_id, youtube_video_id, youtube_channel_id) as youtube_video_channel_id,
    youtube_video_source_id,
    youtube_video_id,
    youtube_video_url,
    youtube_video_source_first_date_added,
    youtube_video_first_added_by_user_id,
    youtube_video_title,
    youtube_channel_id,
    youtube_video_description,
    youtube_video_tags,
    youtube_video_published_at,
    youtube_video_thumbnail_url,
    youtube_channel_title,
    youtube_channel_description,
    youtube_channel_published_at,
    youtube_channel_medium_thumbnail_url,
    youtube_channel_country
from video v
inner join channel c on v.youtube_video_channel_id = c.youtube_channel_id