with date_ref as (select * from {{ ref('int__youtube_stats') }})

, variations as (
    select 
        dc.*,
        -- daily kpi variations
        -- dod
        dc.daily_views - previous_day.daily_views as daily_views_dod_volume,
        case when previous_day.daily_views = 0 then 0 else
        round(((dc.daily_views * 1.0 - previous_day.daily_views)/previous_day.daily_views) * 100, 2) end as daily_views_dod_variation,
        -- dod_w
        dc.daily_views - previous_week.daily_views as daily_views_dod_w_volume,
        case when previous_week.daily_views = 0 then 0 else
        round(((dc.daily_views * 1.0 - previous_week.daily_views)/previous_week.daily_views) * 100, 2)  end as daily_views_dod_w_variation,
        -- dod_m
        dc.daily_views - previous_month.daily_views as daily_views_dod_m_volume,
        case when previous_month.daily_views = 0 then 0 else
        round(((dc.daily_views * 1.0 - previous_month.daily_views)/previous_month.daily_views) * 100, 2) end as daily_views_dod_m_variation,
        --
        -- weekly kpi variations
        -- wow
        dc.weekly_views - previous_week.weekly_views as weekly_views_wow_volume,
        case when previous_week.weekly_views = 0 then 0 else
        round(((dc.weekly_views * 1.0 - previous_week.weekly_views)/previous_week.weekly_views) * 100, 2) end as weekly_views_wow_variation,
        -- wow_m
        dc.weekly_views - previous_month.weekly_views as weekly_views_mom_m_volume,
        case when previous_month.weekly_views = 0 then 0 else
        round(((dc.weekly_views * 1.0 - previous_month.weekly_views)/previous_month.weekly_views) * 100, 2) end as weekly_views_mom_m_variation,
        --
        -- monthly kpi variations
        -- mom
        dc.monthly_views - previous_month.monthly_views as monthly_views_mom_volume,
        case when previous_month.monthly_views = 0 then 0 else
        round(((dc.monthly_views * 1.0 - previous_month.monthly_views)/previous_month.monthly_views) * 100, 2) end as monthly_views_mom_variation,
        --
        -- yearly kpi variations
        -- dc.daily_views - previous_day.daily_views,
        -- round(((dc.daily_views * 1.0 - previous_day.daily_views)/previous_day.daily_views) * 100, 2),
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

select
    concat(youtube_video_id, ref_day) as youtube_stats_id,
    youtube_video_id,
    youtube_channel_id,
    ref_day,
    -- format_date('%Y-%m-%d', ref_day) as ref_day_fmt,
    --
    video_view_count,
    video_like_count,
    video_comment_count,
    channel_view_count,
    channel_video_count,
    --
    daily_views,
    daily_likes,
    daily_comments,
    daily_channel_views,
    daily_channel_videos,
    --
    weekly_views,
    weekly_likes,
    weekly_comments,
    weekly_channel_views,
    weekly_channel_videos,
    --
    monthly_views,
    monthly_likes,
    monthly_comments,
    monthly_channel_views,
    monthly_channel_videos,
    --
    yearly_views,
    yearly_likes,
    yearly_comments,
    yearly_channel_views,
    yearly_channel_videos,
    --
    daily_views_dod_volume,
    daily_views_dod_variation,
    daily_views_dod_w_volume,
    daily_views_dod_w_variation,
    daily_views_dod_m_volume,
    daily_views_dod_m_variation,
    --
    weekly_views_wow_volume,
    weekly_views_wow_variation,
    weekly_views_mom_m_volume,
    weekly_views_mom_m_variation,
    --
    monthly_views_mom_volume,
    monthly_views_mom_variation
from variations