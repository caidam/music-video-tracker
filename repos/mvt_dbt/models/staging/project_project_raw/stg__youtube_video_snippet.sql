with 

source as (

    select * from {{ source('project_project_raw', 'raw_yt_snippet') }}

),

renamed as (

    select
        video_id as youtube_video_id,
        title as youtube_video_title,
        channel_id as youtube_video_channel_id,
        description as youtube_video_description,
        tags as youtube_video_tags,
        CAST(CAST(SUBSTR(cast(published_at as string), 1, 19) AS TIMESTAMP) AS DATE) AS youtube_video_published_at,
        JSON_EXTRACT_SCALAR(thumbnails, '$.medium.url') AS youtube_video_medium_thumbnail_url

    from source

)

select * from renamed
