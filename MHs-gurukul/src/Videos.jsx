import React, { useEffect, useState } from 'react';
import './App.css';

const apiKey = "AIzaSyBKhtL5_3QiPQxzhd60smT6UFZltLqyZBM";
const channelId = 'UCe_4EwNFWnGMMymUqRcDP7A';
const uploadsId = 'UUe_4EwNFWnGMMymUqRcDP7A';

function App() {
  const [uploads, setUploads] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaylistItems = async (playlistId) => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=25&key=${API_KEY}`
    );
    const data = await res.json();
    return data.items || [];
  };

  const fetchChannelPlaylists = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=1&key=${API_KEY}`
    );
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const firstPlaylistId = data.items[0].id;
      return await fetchPlaylistItems(firstPlaylistId);
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const uploadItems = await fetchPlaylistItems(uploadsId);

        const shorts = uploadItems.filter((item) =>
          item.snippet.title.toLowerCase().includes('#shorts')
        );

        const regular = uploadItems.filter(
          (item) => !item.snippet.title.toLowerCase().includes('#shorts')
        );

        const playlistVideos = await fetchChannelPlaylists();

        setUploads(regular);
        setShorts(shorts);
        setPlaylistVideos(playlistVideos);
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderVideos = (videos) =>
    videos.map((video, idx) => {
      const { title, thumbnails, resourceId } = video.snippet;
      const videoId = resourceId?.videoId || video.snippet.resourceId?.videoId || video.contentDetails?.videoId;
      return (
        <div key={idx} className="video-card">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={thumbnails.medium.url} alt={title} />
            <h3>{title}</h3>
          </a>
        </div>
      );
    });

  return (
    <div className="App">
      <h1>YouTube Channel Sections</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>🎬 Regular Uploads</h2>
          <div className="video-grid">{renderVideos(uploads)}</div>

          <h2>📱 Shorts</h2>
          <div className="video-grid">{renderVideos(shorts)}</div>

          <h2>📁 Playlist Videos</h2>
          <div className="video-grid">{renderVideos(playlistVideos)}</div>
        </>
      )}
    </div>
  );
}

export default App;
