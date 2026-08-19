import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";

import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";

import { logOut } from "../../firebase";

const Navbar = () => {
  const navRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        navRef.current?.classList.add("navbar-dark");
      } else {
        navRef.current?.classList.remove("navbar-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="navbar" ref={navRef}>

      {/* LEFT */}
      <div className="navbar-left">

        {/* Menu Icon - Mobile */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <img
          src={logo}
          alt="Netflix Logo"
          className="logo"
        />

        {/* Desktop Menu */}
        <ul className="desktop-menu">
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>

      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        <img
          src={search_icon}
          alt="Search"
          className="icons"
        />

        <p className="children-text">Children</p>

        <img
          src={bell_icon}
          alt="Notifications"
          className="icons"
        />

        <div className="navbar-profile">

          <img
            src={profile_img}
            alt="Profile"
            className="profile"
          />

          <img
            src={caret_icon}
            alt="Dropdown"
            className="caret"
          />

          <div className="dropdown">
            <p onClick={logOut}>
              Sign Out of Netflix
            </p>
          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>

        <ul>
          <li onClick={() => setMenuOpen(false)}>
            Home
          </li>

          <li onClick={() => setMenuOpen(false)}>
            TV Shows
          </li>

          <li onClick={() => setMenuOpen(false)}>
            Movies
          </li>

          <li onClick={() => setMenuOpen(false)}>
            New & Popular
          </li>

          <li onClick={() => setMenuOpen(false)}>
            My List
          </li>

          <li onClick={() => setMenuOpen(false)}>
            Browse by Language
          </li>
        </ul>

      </div>

    </div>
  );
};

export default Navbar;