import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Know Before You Go. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
