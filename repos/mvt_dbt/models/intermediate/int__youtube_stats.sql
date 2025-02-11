with video_stats as (select * from {{ ref('stg__youtube_video_stats') }})

, channel_stats as (select * from {{ ref('stg__youtube_channel_stats') }})

, video_snippet as (select * from {{ ref('stg__youtube_video_snippet') }})

, youtube_stats as (
    select 
        vs.youtube_video_id,
        cs.youtube_channel_id,
        vs.youtube_video_stats_ref_day as ref_day,
        vs.youtube_video_view_count,
        vs.youtube_video_like_count,
        vs.youtube_video_comment_count,
        cs.youtube_channel_view_count,
        cs.youtube_channel_video_count
    from video_stats vs
    inner join video_snippet sn on vs.youtube_video_id = sn.youtube_video_id
    inner join channel_stats cs 
        on sn.youtube_video_channel_id = cs.youtube_channel_id
        and vs.youtube_video_stats_ref_day = cs.youtube_channel_stats_ref_day
)

, date_ref as (
    select 
        *,
        date_sub(ref_day, interval 1 day) as previous_day,
        date_sub(ref_day, interval 7 day) as previous_week,
        date_sub(ref_day, interval 1 month) as previous_month,
        date_sub(ref_day, interval 1 year) as previous_year 
    from youtube_stats
)

, previous_ref as (
select 
        dc.youtube_video_id,
        dc.youtube_channel_id,
        dc.ref_day,
        -- date_ref
        dc.previous_day,
        dc.previous_week,
        dc.previous_month,
        dc.previous_year,
        -- daily stats
        dc.youtube_video_view_count as video_view_count,
        dc.youtube_video_like_count as video_like_count,
        dc.youtube_video_comment_count as video_comment_count,
        dc.youtube_channel_view_count as channel_view_count,
        dc.youtube_channel_video_count as channel_video_count,
        -- previous day stats
        previous_day.youtube_video_view_count as previous_day_video_view_count,
        previous_day.youtube_video_like_count as previous_day_video_like_count,
        previous_day.youtube_video_comment_count as previous_day_video_comment_count,
        previous_day.youtube_channel_view_count as previous_day_channel_view_count,
        previous_day.youtube_channel_video_count as previous_day_channel_video_count,
        -- previous week stats
        previous_week.youtube_video_view_count as previous_week_video_view_count,
        previous_week.youtube_video_like_count as previous_week_video_like_count,
        previous_week.youtube_video_comment_count as previous_week_video_comment_count,
        previous_week.youtube_channel_view_count as previous_week_channel_view_count,
        previous_week.youtube_channel_video_count as previous_week_channel_video_count,
        -- previous month stats
        previous_month.youtube_video_view_count as previous_month_video_view_count,
        previous_month.youtube_video_like_count as previous_month_video_like_count,
        previous_month.youtube_video_comment_count as previous_month_video_comment_count,
        previous_month.youtube_channel_view_count as previous_month_channel_view_count,
        previous_month.youtube_channel_video_count as previous_month_channel_video_count,
        -- previous year stats
        previous_year.youtube_video_view_count as previous_year_video_view_count,
        previous_year.youtube_video_like_count as previous_year_video_like_count,
        previous_year.youtube_video_comment_count as previous_year_video_comment_count,
        previous_year.youtube_channel_view_count as previous_year_channel_view_count,
        previous_year.youtube_channel_video_count as previous_year_channel_video_count
    from date_ref dc
        left join date_ref previous_day on dc.previous_day = previous_day.ref_day
            and dc.youtube_video_id = previous_day.youtube_video_id
        left join date_ref previous_week on dc.previous_week = previous_week.ref_day
            and dc.youtube_video_id = previous_week.youtube_video_id
        left join date_ref previous_month on dc.previous_month = previous_month.ref_day
            and dc.youtube_video_id = previous_month.youtube_video_id
        left join date_ref previous_year on dc.previous_year = previous_year.ref_day
            and dc.youtube_video_id = previous_year.youtube_video_id
)

, date_comparison as (
    select
        youtube_video_id,
        youtube_channel_id,
        ref_day,
        -- date_ref
        previous_day,
        previous_week,
        previous_month,
        previous_year,
        -- base stats
        video_view_count,
        previous_day_video_view_count,
        video_like_count,
        video_comment_count,
        channel_view_count,
        channel_video_count,
        -- daily
        video_view_count - previous_day_video_view_count as daily_views,
        video_like_count - previous_day_video_like_count as daily_likes,
        video_comment_count - previous_day_video_comment_count as daily_comments,
        channel_view_count - previous_day_channel_view_count as daily_channel_views,
        channel_video_count - previous_day_channel_video_count as daily_channel_videos,
        -- weekly
        video_view_count - previous_week_video_view_count as weekly_views,
        video_like_count - previous_week_video_like_count as weekly_likes,
        video_comment_count - previous_week_video_comment_count as weekly_comments,
        channel_view_count - previous_week_channel_view_count as weekly_channel_views,
        channel_video_count - previous_week_channel_video_count as weekly_channel_videos,
        -- monthly
        video_view_count - previous_month_video_view_count as monthly_views,
        video_like_count - previous_month_video_like_count as monthly_likes,
        video_comment_count - previous_month_video_comment_count as monthly_comments,
        channel_view_count - previous_month_channel_view_count as monthly_channel_views,
        channel_video_count - previous_month_channel_video_count as monthly_channel_videos,
        --yearly
        video_view_count - previous_year_video_view_count as yearly_views,
        video_like_count - previous_year_video_like_count as yearly_likes,
        video_comment_count - previous_year_video_comment_count as yearly_comments,
        channel_view_count - previous_year_channel_view_count as yearly_channel_views,
        channel_video_count - previous_year_channel_video_count as yearly_channel_videos
    from previous_ref
)

select *
from date_comparison