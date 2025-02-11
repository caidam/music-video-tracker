-- You can use the helper function codegen.get_models and specify a directory and/or 
-- prefix to get a list of all matching models, to be passed into model_names list.

-- {% set models_to_generate = codegen.get_models(directory='datawarehouse', prefix='fct_') %}

-- {% set models_to_generate = codegen.get_models(directory='datawarehouse', prefix='') %}
-- {{ codegen.generate_model_yaml(
--     model_names = models_to_generate
-- ) }}

-- ---------------
-- to be compiled

-- "table_names":["table_1", "table_2"]

-- {{ 
--     codegen.generate_source(
--         schema_name = 'project_project_raw', 
--         generate_columns = true, 
--         include_data_types = false
--     ) 
-- }}
-- -----------
{{ codegen.generate_model_yaml(
    model_names=['fact_youtube_stats']
) }}