import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
  //   MdOutlineVideoLibrary,
  //   MdHistory,
  //   MdOutlineSmartDisplay,
  //   MdOutlineWatchLater,
  //   MdThumbUpOffAlt,
  //   MdSettings,
  //   MdOutlinedFlag,
  //   MdOutlineHelpOutline,
  //   MdOutlineFeedback,
  //   MdOutlineSportsVolleyball,
} from "react-icons/md";
// import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { FaRegCompass } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { GiFilmStrip } from "react-icons/gi";

const MainLinks = () => {
  const mainLinks = [
    {
      icon: <MdHomeFilled size={25} />,
      name: "Home",
    },
    {
      icon: <FaRegCompass size={25} />,
      name: "Explore",
    },
    {
      icon: <MdOutlineSlowMotionVideo size={25} />,
      name: "Shorts",
    },
    {
      icon: <MdSubscriptions size={25} />,
      name: "Subscriptions",
    },
  ];
  return (
    <ul>
      {mainLinks.map((link) => {
        return (
          <li
            className=" rounded-full my-1 p-2 hover:bg-gray-300 transition duration-150"
            key={link.name}
          >
            <Link className="w-full flex items-center ml-4 gap-4" to={"/"}>
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          </li>
        );
      })}
      <hr />
    </ul>
  );
};

export default MainLinks;
