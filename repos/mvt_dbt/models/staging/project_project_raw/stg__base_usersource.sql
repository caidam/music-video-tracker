with 

source as (

    select * from {{ source('project_project_raw', 'base_usersource') }}

),

renamed as (

    select
        id as usersource_id,
        cast(date_started as date) as usersource_date_started,
        cast(date_stopped as date) as usersource_date_stopped,
        source_id as usersource_source_id,
        user_id as usersource_user_id,
        cast(updated_at as date) as usersource_updated_at

    from source

)

select * from renamed
