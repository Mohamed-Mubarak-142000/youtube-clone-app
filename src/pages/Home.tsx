import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatchApp, useSelectorApp } from "../redux/hooks";
import { clearVideos, getHomePageVideos } from "../redux/features/videoSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import OneVideo from "../components/OneVideo";
import { HomePagesAllVedios } from "../redux/Types";

const Home = () => {
  const dispatch = useDispatchApp();
  const allVideos = useSelectorApp((state) => state.youtubeApp.allVideos);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);


  useEffect(()=>{
    return()=>{
      dispatch(clearVideos())
    }
  },[dispatch])

  
  return (
    <div className="max-h-screen overflow-hidden">
      <div>
        <Navbar />
      </div>

      <div className="flex">
        <div className=" h-[90.5vh]">
          <Sidebar />
        </div>
        <div className="mx-3 mt-[2rem] w-full">
          {allVideos.length ? (
            <InfiniteScroll
              dataLength={allVideos?.length}
              next={() => dispatch(getHomePageVideos(true))}
              hasMore={allVideos.length < 500}
              loader={<Spinner />}
              height={650}
              style={{ overflowX: "hidden" }}
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4 xl:gap-5 ">
                {allVideos.map((video: HomePagesAllVedios) => {
                  return <OneVideo video={video} key={video.videoId} />;
                })}
              </div>
            </InfiniteScroll>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
