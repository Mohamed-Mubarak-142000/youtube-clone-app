import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomePagesAllVedios, InitialState, RecommendedVideos } from "./../Types";
import { RootState } from "../store";
import axios from "axios";
import { YOUTUBE_URL_APP } from "../../utils/constants";
import { parseData } from "../../utils/parseData";
import { parseRecommendedData } from "../../utils/paresRecommendVideos";
import { convertRawViewstoString } from "../../utils/convertRowtoString";
import { timeSince } from "../../utils/timeSince";
import { parseDetailsVideo } from "../../utils/paresDetailsVideo";

const initialState: InitialState = {
  allVideos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResult: [],
  nextPageToken: null,
  recommendVideos: [],
  open:false
};

// Create a function to asynchronously fetch the API key
const API_KEY = import.meta.env.VITE_REACT_YOUTUBE_DATA_API;

export const getHomePageVideos = createAsyncThunk(
  "youtubeApp/homePageVidoes",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, allVideos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_URL_APP}/search?maxResults=20&q="reactjs music movies sports song"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    const parsedData: HomePagesAllVedios[] = await parseData(items);
    return { parsedData: [...allVideos, ...parsedData], nextPageToken };
  }
);

//search 
export const getSearchPageVideos = createAsyncThunk(
  "youtubeApp/getSearchPageVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, allVideos , searchTerm },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_URL_APP}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );
    const parsedData: HomePagesAllVedios[] = await parseData(items);
    return { parsedData: [...allVideos, ...parsedData], nextPageToken };
  }
);


export const getRecommendVideos = createAsyncThunk(
  "youtubeApp/getRecommendVideos",
  async (videoId: string, { getState }) => {
    const {
      youtubeApp: { 
        currentPlaying:{
          channelInfo:{id:channelId}
        }
       },
    } = getState() as RootState;
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_URL_APP}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    );
    
    const parsedData: RecommendedVideos[] = await parseRecommendedData(
      items,
      videoId
    );

    return { parsedData };
  }
);

export const getVideoDetails = createAsyncThunk(
  "yotubeApp/videoDetails",
  async (id: string) => {
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_URL_APP}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );

    return parseDetailsVideo(items[0]);
  }
);


const youtubeSlice = createSlice({
  name: "youtubeApp",
  initialState,
  reducers: {
    clearVideos :(state)=>{
      state.allVideos=[];
      state.nextPageToken=null;
    },
    changeSearchTerm : (state , action:PayloadAction<string>)=>{
      state.searchTerm = action.payload;
    },
    clearSearchTerm:(state)=>{
      state.searchTerm=""
    },
    openSidebar :(state ,action)=>{
      state.open = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.allVideos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.allVideos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getRecommendVideos.fulfilled, (state, action) => {
      state.recommendVideos = action.payload.parsedData;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });
  },
});

export const {clearVideos,clearSearchTerm,changeSearchTerm ,openSidebar} = youtubeSlice.actions
export default youtubeSlice.reducer;
