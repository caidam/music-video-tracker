# app.py
from flask import Flask, Response, request
from flask_cors import CORS
from flask_restful import Resource, Api
from decouple import config
from config_test import Config
import logging
from modules import queries_service, bq_schemas
from modules.data_loader import load_pg_to_bq, load_yt_info_to_bq
from modules.external_apis_service import yt_snippet, yt_stats, yt_channel_snippet, yt_channel_stats
from modules.bq_schemas import SCHEMA_YT_SNIPPET, SCHEMA_YT_STATS, SCHEMA_YT_CHANNEL_SNIPPET, SCHEMA_YT_CHANNELS_STATS
from functools import wraps

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
api = Api(app)

# RESTRICT ACCESS

# Define your secret key
SECRET_KEY = config('API_SECRET_KEY')

def require_appkey(view_function):
    @wraps(view_function)
    def decorated_function(*args, **kwargs):
        if request.headers.get('Authorization') and request.headers.get('Authorization') == SECRET_KEY:
            return view_function(*args, **kwargs)
        else:
            return {'error': 'Unauthorized'}, 401
    return decorated_function

class ProtectedResource(Resource):
    method_decorators = [require_appkey]  # apply the decorator to all methods

RESOURCE_TYPE = ProtectedResource

# RESOURCE CLASSES
class HelloWorld(ProtectedResource):
    def get(self):
        return {'hello': 'This is a Flask API.'}, 200
    
# DATA LOADER

class LoadDataResource(RESOURCE_TYPE):
    def get(self, table_name=None):
        if table_name is None:
            return {'error': 'No table name specified. Please specify a table name.'}, 400

        # Infer the schema name from the table name
        schema_name = f"SCHEMA_{table_name.upper()}"

        # Get the schema using the schema name
        schema = getattr(bq_schemas, schema_name, None)

        if schema is None:
            return {'error': f'No schema found for table {table_name}'}, 400

        try:
            success = load_pg_to_bq(table_name, schema)
            if success:
                return {'message': f'Data loaded successfully for table {table_name}'}, 200
            else:
                return {'error': f'Data load failed {table_name}'}, 500
        except Exception as e:
            return {'error': str(e)}, 500
        
# YOUTUBE DATA LOADER

    # YOUTUBE VIDEOS
class LoadYtStatsResource(RESOURCE_TYPE):
    def get(self):

        table_name = 'raw_yt_stats'
        schema = SCHEMA_YT_STATS
        yt_api_func = yt_stats()
        w_disposition = 'WRITE_APPEND'

        try:
            success = load_yt_info_to_bq(table_name, schema, yt_api_func, w_disposition)
            if success:
                return {'message': f'Data loaded successfully for table {table_name}'}, 200
            else:
                return {'error': f'Data load failed {table_name}'}, 500
        except Exception as e:
            return {'error': str(e)}, 500

class LoadYtSnippetResource(RESOURCE_TYPE):
    def get(self):

        table_name = 'raw_yt_snippet'
        schema = SCHEMA_YT_SNIPPET
        yt_api_func = yt_snippet()
        w_disposition = 'WRITE_TRUNCATE'

        try:
            success = load_yt_info_to_bq(table_name, schema, yt_api_func, w_disposition)
            if success:
                return {'message': f'Data loaded successfully for table {table_name}'}, 200
            else:
                return {'error': f'Data load failed {table_name}'}, 500
        except Exception as e:
            return {'error': str(e)}, 500

    # YOUTUBE CHANNELS
class LoadYoutubeChannelStatsResource(RESOURCE_TYPE):
    def get(self):

        table_name = 'raw_youtube_channel_stats'
        schema = SCHEMA_YT_CHANNELS_STATS
        yt_api_func = yt_channel_stats()
        w_disposition = 'WRITE_APPEND'

        try:
            success = load_yt_info_to_bq(table_name, schema, yt_api_func, w_disposition)
            if success:
                return {'message': f'Data loaded successfully for table {table_name}'}, 200
            else:
                return {'error': f'Data load failed {table_name}'}, 500
        except Exception as e:
            return {'error': str(e)}, 500

class LoadYoutubeChannelSnippetResource(RESOURCE_TYPE):
    def get(self):

        table_name = 'raw_youtube_channel_snippet'
        schema = SCHEMA_YT_CHANNEL_SNIPPET
        yt_api_func = yt_channel_snippet()
        w_disposition = 'WRITE_TRUNCATE'

        try:
            success = load_yt_info_to_bq(table_name, schema, yt_api_func, w_disposition)
            if success:
                return {'message': f'Data loaded successfully for table {table_name}'}, 200
            else:
                return {'error': f'Data load failed {table_name}'}, 500
        except Exception as e:
            return {'error': str(e)}, 500

# DATA RETRIEVAL

class Get5Listings(RESOURCE_TYPE):
    def get(self):
        try:
            logging.info("Get5Listings API called")
            json_data = queries_service.get_5_listings()
            logging.info("Successfully retrieved data from Motherduck database")
            return Response(response=json_data, status=200, content_type='application/json')
        except Exception as e:
            logging.error(f"Error in Get5Listings: {e}")
            return Response(response='{"error": "An error occurred"}', status=500, content_type='application/json')

class GetCities(RESOURCE_TYPE):
    def get(self):
        json_data = queries_service.get_cities()
        return Response(response=json_data, status=200, content_type='application/json')

class GetCity(RESOURCE_TYPE):
    def get(self, city='Paris'):
        json_data = queries_service.get_city(city)
        return Response(response=json_data, status=200, content_type='application/json')

class GetMarkers(RESOURCE_TYPE):
    def get(self, city='Paris', neighbourhood=None):
        json_data = queries_service.get_markers(city, neighbourhood)
        return Response(response=json_data, status=200, content_type='application/json')

class GetNeighbourhoods(RESOURCE_TYPE):
    def get(self, city='Paris'):
        json_data = queries_service.get_neigbourhoods(city)
        return Response(response=json_data, status=200, content_type='application/json')

class GetCityKpis(RESOURCE_TYPE):
    def get(self, city='Paris', neighbourhood=None):
        json_data = queries_service.get_city_kpis(city, neighbourhood)
        return Response(response=json_data, status=200, content_type='application/json')

class GetTopHosts(RESOURCE_TYPE):
    def get(self, city='Paris', neighbourhood=None):
        json_data = queries_service.get_top_hosts(city, neighbourhood)
        return Response(response=json_data, status=200, content_type='application/json')

#
class GetSources(RESOURCE_TYPE):
    def get(self):
        json_data = queries_service.get_sources()
        return Response(response=json_data, status=200, content_type='application/json')

class GetYoutubeChannels(RESOURCE_TYPE):
    def get(self):
        json_data = queries_service.get_youtube_channels()
        return Response(response=json_data, status=200, content_type='application/json')

#
class GetUserSourceSummary(RESOURCE_TYPE):
    def get(self, user, source):
        try:
            logging.info("GetUserSourceSummary API called")
            user = int(user)
            source = int(source)
            logging.info(f"Received parameters - User: {user}, Source: {source}")
            json_data = queries_service.get_usersource_summary(user, source)
            logging.info("Successfully retrieved data from database")
            return Response(response=json_data, status=200, content_type='application/json')
        except ValueError as ve:
            logging.error(f"ValueError: {ve}")
            return Response(response='{"error": "Invalid input: user and source should be integers."}', status=400, content_type='application/json')
        except Exception as e:
            logging.error(f"Error in GetUserSourceSummary: {e}")
            return Response(response='{"error": "An error occurred"}', status=500, content_type='application/json')

class GetSourceStats(RESOURCE_TYPE):
    def get(self, user, source):
        try:
            logging.info("GetSourceStats API called")
            user = int(user)
            source = int(source)
            logging.info(f"Received parameters - User: {user}, Source: {source}")
            json_data = queries_service.get_source_stats(user, source)
            logging.info("Successfully retrieved data from database")
            return Response(response=json_data, status=200, content_type='application/json')
        except ValueError as ve:
            logging.error(f"ValueError: {ve}")
            return Response(response='{"error": "Invalid input: user and source should be integers."}', status=400, content_type='application/json')
        except Exception as e:
            logging.error(f"Error in GetSourceStats: {e}")
            return Response(response='{"error": "An error occurred"}', status=500, content_type='application/json')

# ROUTES
    #
api.add_resource(HelloWorld, '/')

    #  DATA LOADING
api.add_resource(LoadDataResource, '/load_data', '/load_data/<string:table_name>')

    # YOUTUBE DATA LOADER
        # VIDEOS
api.add_resource(LoadYtStatsResource, '/load_youtube_stats')
api.add_resource(LoadYtSnippetResource, '/load_youtube_snippets')
        # CHANNELS
api.add_resource(LoadYoutubeChannelStatsResource, '/load_youtube_channel_stats')
api.add_resource(LoadYoutubeChannelSnippetResource, '/load_youtube_channel_snippets')

    #
api.add_resource(Get5Listings, '/5_listings')
api.add_resource(GetCities, '/cities')
api.add_resource(GetCity, '/city/', '/city/<string:city>')
api.add_resource(GetMarkers, '/markers/', '/markers/<string:city>', '/markers/<string:city>/<string:neighbourhood>')
api.add_resource(GetNeighbourhoods, '/neighbourhoods/', '/neighbourhoods/<string:city>')
api.add_resource(GetCityKpis, '/city_kpis/', '/city_kpis/<string:city>', '/city_kpis/<string:city>/<string:neighbourhood>')
api.add_resource(GetTopHosts, '/top_hosts/', '/top_hosts/<string:city>', '/top_hosts/<string:city>/<string:neighbourhood>')

#
api.add_resource(GetSources, '/sources') 
api.add_resource(GetYoutubeChannels, '/youtube_channels')

#
api.add_resource(GetUserSourceSummary, '/usersource_summary/<string:user>/<string:source>')
api.add_resource(GetSourceStats, '/source_stats/<string:user>/<string:source>')

# comment below when deploying with zappa and delete .env
if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000, debug=config('DEBUG'))

    # app.run(host='0.0.0.0', port=80, debug=config('DEBUG')) # test EC2