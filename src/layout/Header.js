import React from "react";
import { FaPizzaSlice } from "react-icons/fa";

import logo from "../static/img/logo.png";

export const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src={logo} alt="Todoist Logo" />
        </div>
        <div className="settings">
          <ul>
            <li>+</li>
            <li>
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
