import { Link } from "react-router-dom";
import { HomePagesAllVedios } from "../redux/Types";

const OneVideo = ({ video }: { video: HomePagesAllVedios }) => {
  return (
    <Link
      to={`/watch/${video.videoId}`}
      className="w-[345px] h-[380px] shadow-md rounded-md"
    >
      {/***image** */}
      <div className="w-full h-[65%] relative">
        <img
          src={video.videoThumbnail}
          className="w-full h-full rounded-md"
          alt=""
        />
        {/***time of video*** */}
        <span className="absolute right-0 bottom-1 bg-black text-white px-3 z-100">
          {video.videoDuration}
        </span>
      </div>

      {/***info*** */}
      <div className="flex justify-between my-2">
        {/***image channal */}
        <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center">
          <img
            src={video.channelInfo.image}
            className="w-full h-full rounded-full"
            alt={video.channelInfo.name}
          />
        </div>
        {/***info viedo */}
        <div className="flex flex-col gap-1 w-[280px]">
          <span>{`${video.videoTitle.slice(0, 60)}...`}</span>
          <span className="text-gray-500">{video.channelInfo.name}</span>
          <span className="text-gray-500">
            {video.videoViews}
            {video.videoAge}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OneVideo;
