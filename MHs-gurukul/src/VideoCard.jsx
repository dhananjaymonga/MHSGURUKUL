import React, { useEffect, useState, useRef, useCallback } from 'react';
import Footer from './Pages/Footer';

const apiKey = "AIzaSyBKhtL5_3QiPQxzhd60smT6UFZltLqyZBM";
const channelId = "UCe_4EwNFWnGMMymUqRcDP7A";
const uploadsId = "UUe_4EwNFWnGMMymUqRcDP7A";


function Videos() {
  const [uploads, setUploads] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [playlistVideos, setPlaylistVideos] = useState({});
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const loader = useRef(null);

  const fetchUploads = async (token = '') => {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${uploadsId}&key=${apiKey}&pageToken=${token}`);
    const data = await res.json();
    return data;
  };

  const fetchShorts = async () => {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&q=shorts&type=video&key=${apiKey}`);
    const data = await res.json();
    console.log(data);
    setShorts(data.items || []);
  };

  const fetchInitialData = async () => {
    try {
      const uploadsData = await fetchUploads();
      setUploads(uploadsData.items || []);
      setNextPageToken(uploadsData.nextPageToken || null);

      const playlistsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=50&key=${apiKey}`
      );
      const playlistsData = await playlistsResponse.json();
      const playlistItems = playlistsData.items || [];
      setPlaylists(playlistItems);

      const playlistVideosData = {};
      for (const playlist of playlistItems) {
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlist.id}&key=${apiKey}`
        );
        const videosData = await videosResponse.json();
        playlistVideosData[playlist.id] = videosData.items || [];
      }
      setPlaylistVideos(playlistVideosData);
      await fetchShorts();
      setLoading(false);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      setLoading(false);
    }
  };

  const loadMoreVideos = useCallback(async () => {
    if (!nextPageToken) return;
    const data = await fetchUploads(nextPageToken);
    setUploads((prev) => [...prev, ...(data.items || [])]);
    setNextPageToken(data.nextPageToken || null);
  }, [nextPageToken]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPageToken) {
        loadMoreVideos();
      }
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader, nextPageToken, loadMoreVideos]);

  const VideoCard = ({ video }) => {
    const videoId = video.snippet.resourceId?.videoId || video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description;

    return (
      <div className="group relative bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?controls=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-white bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-700 mb-4 line-clamp-3">{description}</p>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Watch Now
          </a>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Uploaded Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uploads.map((video) => (
            <VideoCard key={video.snippet.resourceId?.videoId} video={video} />
          ))}
        </div>
        <div ref={loader} className="text-center mt-8 text-gray-500">Loading more videos...</div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Playlists</h2>
        {playlists.map((playlist) => (
          <div key={playlist.id} className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              {playlist.snippet.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(playlistVideos[playlist.id] || []).map((video) => (
                <VideoCard key={video.snippet.resourceId?.videoId} video={video} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">YouTube Shorts</h2>
        <div className="bg-white p-2 rounded shadow min-h-[280px] flex flex-col">
        {shorts.map((video) => (
            <VideoCard key={video.id.videoId} video={video} />
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Videos;