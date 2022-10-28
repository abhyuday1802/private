/**
 * App Header
 */
import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link
                onClick={() => localStorage.setItem("firstload", "true")}
                to="/app/main/dashboard"
              >
                <i className="la la-home" /> <span>Back to Home</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
