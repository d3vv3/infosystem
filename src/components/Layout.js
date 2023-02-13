import Agenda from "./Agenda";
import Videos from "./Videos";
import Banner from "./Banner";

export default function Layout() {
  return (
    <div className="layout">
      <div className="left">
        <Videos />
        <Banner />
      </div>
      <Agenda />
    </div>
  );
}