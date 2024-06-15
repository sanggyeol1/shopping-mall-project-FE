import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../style/footer.style.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="text-center py-3 mt-4">
      <div>© 2024 Han Sang Gyeol</div>
      <div>
        <a
          href="https://github.com/sanggyeol1"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <FontAwesomeIcon icon={faGithub} className="footer-icon" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
