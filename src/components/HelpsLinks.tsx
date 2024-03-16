import {
  MdSettings,
  MdOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
} from "react-icons/md";
import { Link } from "react-router-dom";

const HelpsLinks = () => {
  const helpLinks = [
    {
      icon: <MdSettings className="text-xl" />,
      name: "Settings",
    },
    {
      icon: <MdOutlinedFlag className="text-xl" />,
      name: "Report history",
    },
    {
      icon: <MdOutlineHelpOutline className="text-xl" />,
      name: "Help",
    },
    {
      icon: <MdOutlineFeedback className="text-xl" />,
      name: "Send feedback",
    },
  ];
  return (
    <ul>
      {helpLinks.map((link) => {
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

export default HelpsLinks;
