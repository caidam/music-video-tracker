with 

source as (

    select * from {{ source('project_project_raw', 'raw_youtube_channel_snippet') }}

),

renamed as (

    select
        channel_id as youtube_channel_id,
        title as youtube_channel_title,
        description as youtube_channel_description,
        CAST(CAST(SUBSTR(published_at, 1, 19) AS TIMESTAMP) AS DATE) AS youtube_channel_published_at,
        JSON_EXTRACT_SCALAR(thumbnails, '$.medium.url') AS youtube_channel_medium_thumbnail_url,
        country as youtube_channel_country
        -- loaded_at

    from source

)

select *
from renamed
