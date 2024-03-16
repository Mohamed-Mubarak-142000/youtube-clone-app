import { BiSearch, BiVideo } from "react-icons/bi";
import { BsList, BsYoutube } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { BsPersonCircle } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { useDispatchApp, useSelectorApp } from "../redux/hooks";
import {
  changeSearchTerm,
  clearSearchTerm,
  clearVideos,
  getSearchPageVideos,
  openSidebar,
} from "../redux/features/videoSlice";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatchApp();
  const searchTerm = useSelectorApp((state) => state.youtubeApp.searchTerm);
  const open = useSelectorApp((state) => state.youtubeApp.open);

  const handleSearch = () => {
    if (location.pathname !== "/search") {
      navigate("/search");
    } else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  return (
    <div className="flex justify-between items-center left-0 top-0 w-full h-[70px] shadow-md px-[50px]">
      {/***logo*** */}
      <div className="flex justify-center items-center gap-7">
        <div className="p-2 rounded-full bg-gray-200 hover:cursor-pointer hover:bg-gray-300 transition duration-200">
          <BsList size={25} onClick={() => dispatch(openSidebar(!open))} />
        </div>
        <Link to={"/"}>
          <div className="flex justify-center items-center gap-1">
            <BsYoutube size={30} color="red" />
            <span className="text-[25px] font-[600] capitalize">youtube</span>
          </div>
        </Link>
      </div>

      {/*******box search**** */}
      <div className="flex items-center justify-center h-full p-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex justify-center items-center"
        >
          <div className="flex items-center relative">
            <input
              value={searchTerm}
              onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
              type="text"
              placeholder="search.."
              className=" border capitalize px-8 rounded-s-full outline-none py-2 w-[400px] "
            />
            <BiSearch
              className="absolute top-50 left-1 text-gray-500 ml-1"
              size={25}
            />

            <IoClose
              onClick={() => dispatch(clearSearchTerm())}
              className={`absolute top-50 right-1 ${
                !searchTerm ? "invisible" : "visible"
              }`}
              size={25}
            />
          </div>

          <button className=" flex justify-center items-center rounded-e-full bg-gray-300 py-2 w-[50px] h-full">
            <BiSearch size={25} />
          </button>

          <div className="ml-5 p-2 rounded-full bg-gray-200 hover:cursor-pointer hover:bg-gray-300 transition duration-200">
            <FaMicrophone size={25} />
          </div>
        </form>
      </div>

      {/****others****/}
      <div className="flex justify-center items-center  gap-10">
        <div className=" p-2 rounded-full bg-gray-200 hover:cursor-pointer hover:bg-gray-300 transition duration-200">
          <BiVideo size={25} />
        </div>
        <div className=" relative p-2 rounded-full bg-gray-200 hover:cursor-pointer hover:bg-gray-300 transition duration-200">
          <MdNotificationsActive size={25} />
          <span className="absolute top-[-10px] left-[-5px] bg-[red] text-center text-[14px] w-[20px] h-[20px] rounded-full text-white">
            9+
          </span>
        </div>
        <div className=" p-2 rounded-full bg-gray-200 hover:cursor-pointer hover:bg-gray-300 transition duration-200">
          <HiMiniSquares2X2 size={25} />
        </div>

        <div className=" p-2 rounded-full bg-gray-200 hover:cursor-pointer hover:bg-gray-300 transition duration-200">
          <BsPersonCircle size={25} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
