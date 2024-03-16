import { MdOutlineSportsVolleyball } from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { GiFilmStrip } from "react-icons/gi";
const Expolration = () => {
  const subscriptionLinks = [
    {
      icon: <TbMusic className="text-xl" />,
      name: "Music",
    },
    {
      icon: <MdOutlineSportsVolleyball className="text-xl" />,
      name: "Sport",
    },
    {
      icon: <TbDeviceGamepad2 className="text-xl" />,
      name: "Gaming",
    },
    {
      icon: <GiFilmStrip className="text-xl" />,
      name: "Films",
    },
  ];

  return (
    <ul>
      {subscriptionLinks.map((link) => {
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

export default Expolration;
