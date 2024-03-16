import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatchApp, useSelectorApp } from "../redux/hooks";
import { clearVideos, getSearchPageVideos } from "../redux/features/videoSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import { HomePagesAllVedios } from "../redux/Types";
import { useNavigate } from "react-router-dom";
import OneVideoSearch from "../components/OneVideoSearch";

const Search = () => {
  const dispatch = useDispatchApp();
  const navigate = useNavigate()
  const allVideos = useSelectorApp((state) => state.youtubeApp.allVideos);
  const searchTerm = useSelectorApp((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if(searchTerm === ""){
      navigate("/")
    }else{
      dispatch(getSearchPageVideos(false))
    }
  }, [dispatch , navigate , searchTerm]);


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
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={allVideos.length < 500}
              loader={<Spinner />}
              height={650}
              style={{ overflowX: "hidden" }}
            >
              <div className="grid grid-cols-1 gap-10 ">
                {allVideos.map((video: HomePagesAllVedios) => {
                  return <OneVideoSearch video={video} key={video.videoId} />;
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

export default Search;
