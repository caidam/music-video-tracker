from modules.queries_service import get_sources, get_youtube_channels
from googleapiclient.discovery import build
from pytube import YouTube
import pandas as pd
from decouple import config
from io import StringIO
import datetime

#
def create_yt_session():

    youtube = build('youtube',
                    'v3',
                    developerKey=config('GOOGLE_API_DEVELOPER_KEY'),
                    static_discovery=False)
    
    return youtube

############################
#YOUTUBE VIDEO
#
def get_video_id_batches():

    df = pd.read_json(StringIO(get_sources()))
    youtube_urls = list(df['url'])
    video_ids = [YouTube(url).video_id for url in youtube_urls]

    batch_size = 50
    id_batches = [video_ids[i:i + batch_size] for i in range(0, len(video_ids), batch_size)]

    return id_batches

def get_yt_stats(youtube, video_ids):
    '''Fetches YouTube statistics data for the given video IDs.'''
    video_data = []

    yt_data = youtube.videos().list(part=['statistics'], id=video_ids).execute()

    for item in yt_data.get('items', []):
        stats = item.get('statistics', {})
        video_data.append({
            'video_id': item['id'],
            'view_count': stats.get('viewCount', ''),
            'like_count': stats.get('likeCount', ''),
            'comment_count': stats.get('commentCount', ''),
        })

    return video_data

#
def get_yt_snippet(youtube, video_ids):
    '''Fetches YouTube data snippet for the given video IDs.'''
    video_data = []

    yt_data = youtube.videos().list(part='snippet', id=video_ids).execute()

    for item in yt_data.get('items', []):
        snippet = item.get('snippet', {})
        tags = snippet.get('tags', '')
        if isinstance(tags, list):
            tags = ', '.join(tags)  # Convert list of tags to a string

        video_data.append({
            'video_id': item['id'],
            'title': snippet.get('title', ''),
            'channel_id': snippet.get('channelId'),
            'channel_title': snippet.get('channelTitle'),
            'description': snippet.get('description', ''),
            'tags': tags,
            'published_at': snippet.get('publishedAt', ''),
            'thumbnails': snippet.get('thumbnails', ''),
        })

    return video_data

#
def yt_snippet():

    id_batches = get_video_id_batches()
    df = get_yt_info(get_yt_snippet, id_batches)

    # handle types
    df['video_id'] = df['video_id'].astype(str)
    df['title'] = df['title'].astype(str)
    df['channel_id'] = df['channel_id'].astype(str)
    df['channel_title'] = df['channel_title'].astype(str)
    df['description'] = df['description'].astype(str)
    df['tags'] = df['tags'].astype(str)
    df['published_at'] = pd.to_datetime(df['published_at'])
    df['thumbnails'] = df['thumbnails'].astype(str)
    df['loaded_at'] = pd.to_datetime(df['loaded_at'])

    return df

def yt_stats():

    id_batches = get_video_id_batches()
    df = get_yt_info(get_yt_stats, id_batches)

    # handle types
    df['video_id'] = df['video_id'].astype(str)
    df['view_count'] = df['view_count'].astype(int)
    df['like_count'] = df['like_count'].astype(int)
    df['comment_count'] = df['comment_count'].astype(int)
    df['loaded_at'] = pd.to_datetime(df['loaded_at'])

    return df

############################
#YOUTUBE CHANNELS
#
def get_channel_id_batches():

    df = pd.read_json(StringIO(get_youtube_channels()))
    # youtube_urls = list(df['channel_id'])
    channel_ids = list(df['channel_id'])
    # video_ids = [YouTube(url).video_id for url in youtube_urls]

    batch_size = 50
    id_batches = [channel_ids[i:i + batch_size] for i in range(0, len(channel_ids), batch_size)]

    return id_batches

def get_yt_channel_stats(youtube, channel_ids):
    '''Fetches YouTube statistics data for the given video IDs.'''
    channel_data = []

    yt_data = youtube.channels().list(part=['statistics'], id=channel_ids).execute()

    for item in yt_data.get('items', []):
        stats = item.get('statistics', {})
        channel_data.append({
            'channel_id': item['id'],
            'view_count': stats.get('viewCount', ''),
            'video_count': stats.get('videoCount', ''),
        })

    return channel_data

#
def get_yt_channel_snippet(youtube, channel_ids):
    '''Fetches YouTube data snippet for the given video IDs.'''
    channel_data = []

    yt_data = youtube.channels().list(part='snippet', id=channel_ids).execute()

    for item in yt_data.get('items', []):
        snippet = item.get('snippet', {})

        channel_data.append({
            'channel_id': item['id'],
            'title': snippet.get('title', ''),
            'description': snippet.get('description', ''),
            'published_at': snippet.get('publishedAt', ''),
            'thumbnails': snippet.get('thumbnails', ''),
            'country': snippet.get('country', ''),
        })

    return channel_data

#
def yt_channel_snippet():

    id_batches = get_channel_id_batches()
    df = get_yt_info(get_yt_channel_snippet, id_batches)

    # handle types
    df['channel_id'] = df['channel_id'].astype(str)
    df['title'] = df['title'].astype(str)
    df['description'] = df['description'].astype(str)
    # df['published_at'] = pd.to_datetime(df['published_at'])
    df['published_at'] = df['published_at'].astype(str)
    df['thumbnails'] = df['thumbnails'].astype(str)
    df['country'] = df['country'].astype(str)
    df['loaded_at'] = pd.to_datetime(df['loaded_at'])

    return df

def yt_channel_stats():

    id_batches = get_channel_id_batches()
    df = get_yt_info(get_yt_channel_stats, id_batches)

    # handle types
    df['channel_id'] = df['channel_id'].astype(str)
    df['view_count'] = df['view_count'].astype(int)
    df['video_count'] = df['video_count'].astype(int)
    df['loaded_at'] = pd.to_datetime(df['loaded_at'])

    return df


############################
#GET DATA
#
def get_yt_info(get_yt_data_func, id_batches):
    # id_batches = get_video_id_batches()
    youtube = create_yt_session()

    video_data = []

    for batch in id_batches:
        video_data.extend(get_yt_data_func(youtube, batch))

    # Create a DataFrame from the video data
    df_final = pd.DataFrame(video_data)

    # Add a timestamp column to the DataFrame
    df_final['loaded_at'] = datetime.datetime.now().isoformat()

    print('retrieved youtube info')
    # print(df_final.head())
    return df_final


# if __name__ == "__main__":
#     youtube = build('youtube',
#                     'v3',
#                     developerKey=config('GOOGLE_API_DEVELOPER_KEY'),
#                     static_discovery=False)

#     # youtube.videos().list(part=['statistics'], id='pJ6bHjPP6WU').execute()

#     res = youtube.videos().list(part=['statistics'], id='pJ6bHjPP6WU').execute()

#     # print(res)

#     df = pd.read_json(StringIO(get_sources()))
#     print(df)