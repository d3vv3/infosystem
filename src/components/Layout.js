import Agenda from "./Agenda";
import Videos from "./Videos";

export default function Layout() {
  return (
    <div className="layout">
      <div className="left">
        <Videos />
        <div className="sponsors">
          <h1>
            Sponsors will go here
          </h1>
        </div>
      </div>
      <Agenda />
    </div>
  );
}