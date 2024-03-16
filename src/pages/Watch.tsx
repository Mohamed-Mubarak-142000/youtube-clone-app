import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatchApp, useSelectorApp } from "../redux/hooks";
import {
  getRecommendVideos,
  getVideoDetails,
} from "../redux/features/videoSlice";
import Navbar from "../components/Navbar";
import { FiArrowDown, FiShare2 } from "react-icons/fi";
import { BsFillHeartbreakFill } from "react-icons/bs";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import OneRecommendVideo from "../components/OneRecommendVideo";
import { RecommendedVideos } from "../redux/Types";
import Sidebar from "../components/Sidebar";

const Watch = () => {
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatchApp();
  const { id } = useParams();
  const currentPlaying = useSelectorApp(
    (state) => state.youtubeApp.currentPlaying
  );
  const recommendVideos = useSelectorApp(
    (state) => state.youtubeApp.recommendVideos
  );

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
      setShowMoreStatus(false);
    } else {
      navigate("/");
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (currentPlaying && id) {
      dispatch(getRecommendVideos(id));
    }
  }, [dispatch, id, currentPlaying]);
  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <>
          <Navbar />

          <div className=" flex gap-3 mx-auto">
            <div className=" h-[90.5vh]">
              <Sidebar />
            </div>




            <div className="flex gap-3 w-[80%] my-[1rem]">
              <div className="min-h-screen overflow-hidden">
                <div className=" shadow-md mb-[1rem]">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay-1`}
                    width={"100%"}
                    height={"500"}
                    allowFullScreen
                    allow="autoplay"
                  ></iframe>
                </div>

                <div className="w-[100%] flex flex-col justify-start">
                  {/***title****/}
                  <h1 className="text-[25px] overflow-hidden h-[50px]">
                    {currentPlaying.videoTitle}
                  </h1>

                  <div className="flex justify-between items-center px-2">
                    <div className="flex items-center">
                      <div className="w-[50px] h-[50px] rounded-full border">
                        <img
                          src={currentPlaying.channelInfo.image}
                          className="w-full h-full rounded-full"
                          alt=""
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[18px] ">
                          {currentPlaying.channelInfo.name}
                        </span>

                        <span className="text-[15px] text-gray-400">{`${currentPlaying.channelInfo.subscribers} subscribers`}</span>
                      </div>

                      <div className="flex gap-3 ml-5">
                        <span className="rounded-full px-3 py-1 bg-gray-300 hover:bg-gray-400 transition duration-200 cursor-pointer ">
                          join
                        </span>
                        <span className="rounded-full px-3 py-1 bg-gray-300 hover:bg-gray-400 transition duration-200 cursor-pointer ">
                          subscription
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ">
                      <div className=" flex justify-center items-center gap-1 rounded-full px-4 py-1 bg-gray-300 ">
                        <span className="flex justify-center items-center gap-1 rounded-full px-4 py-1 bg-gray-300 hover:bg-gray-400 transition duration-200 cursor-pointer ">
                          <AiFillLike /> {currentPlaying.videoLikes}
                        </span>{" "}
                        |
                        <span className="flex justify-center items-center gap-1 rounded-full px-4 py-1 bg-gray-300 hover:bg-gray-400 transition duration-200 cursor-pointer ">
                          <AiFillDislike /> 55
                        </span>
                      </div>
                      <span className=" flex justify-center items-center gap-1 rounded-full px-4 py-1 bg-gray-300 hover:bg-gray-400 transition duration-200 cursor-pointer ">
                        sharing <FiShare2 />{" "}
                      </span>
                      <span className=" flex justify-center items-center gap-1 rounded-full px-4 py-1 bg-gray-300 hover:bg-gray-400 transition duration-200 cursor-pointer ">
                        dawnload <FiArrowDown />{" "}
                      </span>
                      <span className=" flex justify-center items-center gap-1 rounded-full px-4 py-1 bg-gray-300 hover:bg-gray-400 transition duration-200 cursor-pointer ">
                        thanks <BsFillHeartbreakFill />{" "}
                      </span>
                    </div>
                  </div>
                </div>
                {/****description*** */}
                <div
                  className={`bg-gray-200 shadow-md ${
                    showMoreStatus ? "h-fit" : "max-h-[150px]"
                  } rounded-md m-[1rem] p-2 w-[100%] ml-0`}
                >
                  <div className="flex gap-4 mb-5">
                    <span>{`${currentPlaying.videoViews} views`}</span>
                    <span>{currentPlaying.videoAge}</span>
                    <span>{currentPlaying.videoTitle}</span>
                  </div>

                  <div className=" w-full border leading-10 ">
                    {showMoreStatus === true ? (
                      <>{`${currentPlaying.videoDescription}`}</>
                    ) : (
                      <>{`${currentPlaying.videoDescription.slice(
                        0,
                        250
                      )}..`}</>
                    )}
                    <span
                      onClick={() => setShowMoreStatus(!showMoreStatus)}
                      className="text-gray-500 cursor-pointer "
                    >
                      {showMoreStatus ? "less than" : "more than"}
                    </span>
                  </div>
                </div>
              </div>

              {/****recommend videos */}
              <div className=" p-1 flex flex-col gap-1">
                {recommendVideos &&
                  recommendVideos.map((video: RecommendedVideos) => {
                    return (
                      <OneRecommendVideo video={video} key={video.videoId} />
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Watch;
