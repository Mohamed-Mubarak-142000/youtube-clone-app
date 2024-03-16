import {
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineSmartDisplay,
  MdOutlineWatchLater,
  MdThumbUpOffAlt,
} from "react-icons/md";
import { Link } from "react-router-dom";

const YourLinks = () => {
  const secondaryLinks = [
    {
      icon: <MdOutlineVideoLibrary className="text-xl" />,
      name: "Library",
    },
    {
      icon: <MdHistory className="text-xl" />,
      name: "History",
    },
    {
      icon: <MdOutlineSmartDisplay className="text-xl" />,
      name: "Your Videos",
    },
    {
      icon: <MdOutlineWatchLater className="text-xl" />,
      name: "Watch Later",
    },
    {
      icon: <MdThumbUpOffAlt className="text-xl" />,
      name: "Liked Videos",
    },
  ];
  return (
    <ul>
      {secondaryLinks.map((link) => {
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

export default YourLinks;
