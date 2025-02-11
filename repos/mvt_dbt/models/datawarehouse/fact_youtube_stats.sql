with youtube_variation as (select * from {{ ref('int__youtube_variation') }})

select 
    yv.*,
    sy.youtube_video_title,
    sy.youtube_video_published_at,
    sy.youtube_video_thumbnail_url,
    sy.youtube_channel_title,
    sy.youtube_channel_published_at,
    sy.youtube_channel_medium_thumbnail_url,
    sy.youtube_channel_country
from youtube_variation yv
left join {{ ref('summary_youtube_video_channel') }} sy on yv.youtube_video_id = sy.youtube_video_id
-- order by ref_day desc
