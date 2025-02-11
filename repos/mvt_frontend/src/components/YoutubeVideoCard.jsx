import React, { useState, useEffect } from 'react';

const YoutubeVideoCard = ({ url }) => {
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    // console.log('URL prop:', url);
    fetch(`https://www.youtube.com/oembed?url=${url}&format=json`)
      .then(response => response.json())
      .then(data => setVideoInfo(data));
  }, [url]);

  if (!videoInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <a href={url} target='parent_'>
      <div style={{ width: '125px', height: '100px', overflow: 'hidden', borderRadius: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={videoInfo.thumbnail_url} alt={videoInfo.title} style={{ maxWidth: '150%', maxHeight: '150%' }} />
      </div>
      </a>
      <div>
        <h2>{videoInfo.title}</h2>
        <p><a href={videoInfo.author_url} target='parent'>{videoInfo.author_name}</a></p>
      </div>
    </div>
  );
};

export default YoutubeVideoCard;
