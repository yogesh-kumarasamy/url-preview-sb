import { useEffect, useState } from "react";
import type { Orientation, UrlPreviewData } from "./types";
import {
  extractYouTubeVideoId,
  fetchUrlMetaData,
  getYoutubeThumbnailUrl,
  UrlPreviewSources,
} from "./utils";

export function useImageOrientation(
  imageUrl: string | undefined,
  fallback: Orientation
): Orientation {
  const [orientation, setOrientation] = useState<Orientation>(fallback);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const { width, height } = img;

      if (width === height) {
        setOrientation("square");
      } else if (width > height) {
        setOrientation("landscape");
      } else {
        setOrientation("portrait");
      }
    };

    img.onerror = () => {
      console.error("Failed to load image:", imageUrl);
      setOrientation(null);
    };
  }, [imageUrl]);

  return orientation;
}

// Create a module-level cache (global to the module)
const metaDataCache = new Map<
  string,
  {
    metaData: UrlPreviewData | null;
  }
>();

export const useUrlMetaData = (
  previewUrl: string,
  accessToken: string,
  metadataApiUrl: string
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [metaData, setMetaData] = useState<UrlPreviewData | null>(null);

  useEffect(() => {
    if (!previewUrl || !accessToken) return;

    const loadData = async () => {
      // Check cache first
      if (metaDataCache.has(previewUrl)) {
        const cached = metaDataCache.get(previewUrl)!;
        setMetaData(cached.metaData);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchUrlMetaData(
          previewUrl,
          accessToken,
          metadataApiUrl
        );
        const { data: apiResponse, ok } = data;
        if (apiResponse?.urlMeta && ok) {
          const urlMetaDataArray = Object.values(apiResponse.urlMeta);
          const urlMetaData = urlMetaDataArray[0];
          if (urlMetaData) {
            const source = urlMetaData.source;
            if (source === UrlPreviewSources.YOUTUBE) {
              const videoId = extractYouTubeVideoId(previewUrl);
              const imageUrl = videoId ? getYoutubeThumbnailUrl(videoId) : "";
              urlMetaData.imageUrl = imageUrl;
            }
            setMetaData(urlMetaData);
            // Cache the result
            metaDataCache.set(previewUrl, {
              metaData: urlMetaData,
            });
          }
        } else {
          setMetaData(null);
          // Cache the result
          metaDataCache.set(previewUrl, {
            metaData: null,
          });
        }
      } catch (err: unknown) {
        console.error(err);
        setMetaData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [previewUrl, accessToken, metadataApiUrl]);

  return {
    isLoading,
    metaData,
  };
};
