import "../styles/ErrorPage.css";
import { Link } from "react-router-dom";

export default function Error404Page() {
  return (
    <div className="error-bg">
      <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x1_5"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
      </div>

      {/* Contenitore centrale con testo */}
      <div className="c">
        <div className="_404">404</div>

        <div className="_1">THE PAGE</div>
        <div className="_2">WAS NOT FOUND</div>
        <Link className="btn-404-home" to="/">
          BACK HOME
        </Link>
      </div>
    </div>
  );
}
