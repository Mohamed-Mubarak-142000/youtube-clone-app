import { Link } from "react-router-dom";
import { HomePagesAllVedios } from "../redux/Types";

const OneVideoSearch = ({ video }: { video: HomePagesAllVedios }) => {
  return (
    <Link
      to={`/watch/${video.videoId}`}
      className="w-[90%] h-[200px] shadow-sm rounded-md flex relative "
    >
      {/***image** */}
      <div className="w-[30%] h-full relative">
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
      <div className="flex justify-center flex-col-reverse my-2 p-2">
        {/***image channal */}
        <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center">
          <img
            src={video.channelInfo.image}
            className="w-full h-full rounded-full"
            alt={video.channelInfo.name}
          />
        </div>
        {/***info viedo */}
        <div className="flex flex-col gap-1 w-full">
          <span>{video.videoTitle}</span>
          <span className="text-gray-500">{video.channelInfo.name}</span>
          <span className="text-gray-500">
            {`${video.videoViews} - 
            ${video.videoAge}`}
          </span>
          <span className="text-gray-500">{video.videoDescription}</span>

        </div>
      </div>

      
      <div className=" flex gap-1 flex-col absolute top-0 right-0 ">
        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
        <div className="w-1 h-1 rounded-full bg-gray-500"></div>
      </div>
    </Link>
  );
};

export default OneVideoSearch;
