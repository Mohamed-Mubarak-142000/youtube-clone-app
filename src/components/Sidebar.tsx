import { useSelectorApp } from "../redux/hooks";
import Expolration from "./Expolration";
import HelpsLinks from "./HelpsLinks";
import MainLinks from "./MainLinks";
import TextLinks from "./TextLinks";
import YourLinks from "./YourLinks";

const Sidebar = () => {
  const open = useSelectorApp((state)=> state.youtubeApp.open);
  return (
    <div className={`h-[92.2vh] ${open ? "w-[280px]" : "w-[60px]"} pb-[3rem] overflow-y-auto overflow-x-hidden mt-[1rem] shadow-md`}>
      <MainLinks />
      <YourLinks />
      <Expolration />
      <HelpsLinks />
      <TextLinks />
    </div>
  );
};

export default Sidebar;
