with 

source as (

    select * from {{ source('project_project_raw', 'base_source') }}

),

renamed as (

    select
        id as source_id,
        url as source_url,
        REGEXP_EXTRACT(url, r'v=([^&]+)') AS source_video_id,
        -- type,
        cast(date_added as date) as source_date_added,
        added_by_id as source_added_by_user_id

    from source

)

select * from renamed
