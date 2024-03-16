import axios from "axios";
import { YOUTUBE_URL_APP } from "./constants";
import { convertRawViewstoString } from "./convertRowtoString";
import { timeSince } from "./timeSince";


const API_KEY = import.meta.env.VITE_REACT_YOUTUBE_DATA_API;

export const parseDetailsVideo = async (item: {
    snippet: {
      channelId: string;
      title: string;
      description: string;
      publishedAt: Date;
      channelTitle: string;
    };
    id: string;
    statistics: { viewCount: string; likeCount: string };
  }) => {
    const {
      data: {
        items: [
          {
            snippet: {
              thumbnails: {
                default: { url: channelImage },
              },
            },
            statistics: { subscriberCount },
          },
        ],
      },
    } = await axios.get(
      `${YOUTUBE_URL_APP}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
    );
  
    return {
      videoId: item.id,
      videoTitle: item.snippet.title,
      videoDescription: item.snippet.description,
      videoViews: parseInt(item.statistics.viewCount).toLocaleString(),
      videoLikes: convertRawViewstoString(item.statistics.likeCount),
      videoAge: timeSince(new Date(item.snippet.publishedAt)),
      channelInfo: {
        id: item.snippet.channelId,
        image: channelImage,
        name: item.snippet.channelTitle,
        subscribers: convertRawViewstoString(subscriberCount, true),
      },
    };
  };
  