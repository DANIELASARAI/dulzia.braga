import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Dulzia direitos reservados </p>
      <a href="https://instagram.com/dulziabraga">
        <p className="icons">
          <AiFillInstagram />
        </p>
      </a>
    </div>
  );
};

export default Footer;
