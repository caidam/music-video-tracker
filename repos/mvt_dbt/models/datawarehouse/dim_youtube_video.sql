with source as (select * from {{ ref('stg__base_source') }})

, snippet as (select * from {{ ref('stg__youtube_video_snippet') }})

select 
    so.source_id as youtube_video_source_id,
    sn.youtube_video_id,
    so.source_url as youtube_video_url,
    so.source_date_added as youtube_video_source_first_date_added,
    so.source_added_by_user_id as youtube_video_first_added_by_user_id,
    sn.youtube_video_title,
    sn.youtube_video_channel_id,
    sn.youtube_video_description,
    sn.youtube_video_tags,
    sn.youtube_video_published_at,
    sn.youtube_video_medium_thumbnail_url as youtube_video_thumbnail_url
from source so
inner join snippet sn on so.source_video_id = sn.youtube_video_id 