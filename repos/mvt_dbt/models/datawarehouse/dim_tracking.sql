with source as (select * from {{ ref('stg__base_usersource') }})

select 
    usersource_id as tracking_id,
    usersource_date_started as tracking_date_started,
    usersource_date_stopped as tracking_date_stopped,
    usersource_source_id as tracking_source_id,
    usersource_user_id as tracking_user_id,
    usersource_updated_at as tracking_updated_at,
    date_diff(current_date(), usersource_updated_at, DAY) as tracking_duration_days
from source