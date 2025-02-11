import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import YouTubeVideoInfoStatic from '@/components/YoutubeVideoInfoStatic';
import DiscoveryDialogComponent from '@/components/DiscoveryDialogComponent';
import { DJ_BASE_URL } from '@/config';

const DiscoveryPage = () => {
  const [url, setUrl] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user ? user.user_id : null;

  useEffect(() => {
    let apiUrl = `${DJ_BASE_URL}/api/random_url/`;
    if (userId) {
      apiUrl += `?user_id=${userId}`;
    }

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setUrl(data.url));
  }, [userId]);

  return (
    <>
      <Navbar>
        <DiscoveryDialogComponent>
          {url && <YouTubeVideoInfoStatic url={url} />}
        </DiscoveryDialogComponent>
      </Navbar>
    </>
  )
}

export default DiscoveryPage;
