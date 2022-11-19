 import React from "react";

const Footer = () => {
  var d = new Date();
  return (
    <footer className="footer row justify-contents-center">
      <div className="copyright col">
        <p>
          Copyright © | Plug2Jobs by{" "} 
          <a href="http://mplug.vercel.app/" target="_blank" rel="noreferrer">
            Emplug
          </a>{" "}
          {d.getFullYear()}. 
           | All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
