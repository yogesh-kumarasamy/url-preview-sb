import axios from 'axios';
import type { UrlMetaResponse } from './types';

export const extractYouTubeVideoId = (url: string): string | null | undefined => {
  const regex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:.*[?&]v=))([a-zA-Z0-9_-]{11})|https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11}))/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
};
export const getYoutubeThumbnailUrl = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export const fetchUrlMetaData = async (url: string, accessToken: string, apiUrl: string): Promise<UrlMetaResponse> => {
  const response = await axios.post(apiUrl, [url], {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const UrlPreviewSources = {
  VIMEO: 'vimeo.com',
  TELEPORT: 'teleport.video',
  YOUTUBE: 'youtube.com',
  LOOM: 'loom.com',
};
