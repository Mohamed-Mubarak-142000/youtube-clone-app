import { Link } from "react-router-dom";

const TextLinks = () => {
  const textLinks = [
    [
      "About",
      "Press",
      "Copyright",
      "Contact us",
      "Creator",
      "Advertise",
      "Developers",
    ],
    [
      "Terms",
      "Privacy",
      "Policy & Safety",
      "How YouTube works",
      "Test new features",
    ],
  ];

  return (
    <>
      <ul className="w-[300px] flex flex-wrap mt-[2rem] p-1">
        {textLinks[0].map((link) => {
          return (
            <li key={link}>
              <Link
                className="w-full flex items-center text-[15px] text-gray-600 ml-4 gap-2"
                to={"/"}
              >
                <span>{link}</span>|
              </Link>
            </li>
          );
        })}
        <hr />
      </ul>

      <ul className="w-[300px] flex flex-wrap mt-[2rem] p-1">
        {textLinks[1].map((link) => {
          return (
            <li key={link}>
              <Link
                className="w-full flex items-center text-gray-600 text-[15px] ml-4 gap-2"
                to={"/"}
              >
                <span>{link}</span> |
              </Link>
            </li>
          );
        })}
        <hr />
        <span className="mt-[2rem] w-full text-[18px] capitalize pl-4">
          &copy; 2024 google
        </span>

        <span className="mt-[2rem] w-full text-[15px] p-1 text-center text-gray-500 capitalize">
          this is youtube clone app is created <br /> by dev:mohamed.mubarak
        </span>
      </ul>
    </>
  );
};

export default TextLinks;
