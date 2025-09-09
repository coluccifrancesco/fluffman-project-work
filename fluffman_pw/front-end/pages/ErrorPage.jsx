import "../styles/ErrorPage.css";
import { Link } from "react-router-dom";

export default function Error404Page() {
  return (
    <div className="error-bg">
      <div id="flying-pets">
        {/* Le classi .pet ora usano le emoji tramite CSS */}
        <div className="pet dog-1"></div>
        <div className="pet cat-1"></div>
        <div className="pet dog-2"></div>
        <div className="pet bird-1"></div>
        <div className="pet cat-2"></div>
      </div>

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