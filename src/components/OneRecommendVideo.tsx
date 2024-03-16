import { RecommendedVideos } from "../redux/Types";

const OneRecommendVideo = ({ video }: { video: RecommendedVideos }) => {
  return (
    <div className="w-full shadow-sm rounded-md flex relative">
      <div className="w-[40%] h-full">
        <img
          className="w-full h-full rounded-md"
          src={video.videoThumbnail}
          alt=""
        />
      </div>

      <div className="w-[60%] flex flex-col gap-1 p-1">
        <span>{`${video.videoTitle.slice(0, 70)}...`}</span>
        <span className="text-[13px]">{video.channelInfo.name}</span>
        <span className="text-[12px] text-gray-500">
          {video.videoViews} * {video.videoAge}
        </span>
      </div>

      <div className=" flex gap-1 flex-col absolute top-0 right-0 ">
        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
};

export default OneRecommendVideo;
