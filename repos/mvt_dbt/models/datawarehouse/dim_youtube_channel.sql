with source as (select * from {{ ref('stg__youtube_channel_snippet') }})

select *
from source