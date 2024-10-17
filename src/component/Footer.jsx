import React from "react";
import { faInstagram, faFacebook, faXTwitter, faTwitch, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

function Footer(){
    return (
        <footer>
            <div className="ze-logo">
                <FontAwesomeIcon icon={faFilm} className="the-logo" />
                <h3>Movies Now</h3>
            </div>
            <div className="pro-sources">
                <h3>Project Sources</h3>
                <hr/>
                <ul>
                    <li>TMDB - API for movie info</li>
                    <li>YouTube API - For trailers</li>
                    <li>Google Fonts - For fonts</li>
                    <li>Font Awsome - For icons</li>
                    <li>ChatGPT - For learning</li>
                    <li>Other movie platforms - For UI inspiration</li>
                </ul>
            </div>
            <div>
                <h3>Social</h3>
                <hr/>
                <div className="social-icons">
                    <FontAwesomeIcon icon={faInstagram} className="icons"/>
                    <FontAwesomeIcon icon={faFacebook} className="icons"/>
                    <FontAwesomeIcon icon={faXTwitter} className="icons"/>
                    <FontAwesomeIcon icon={faTwitch} className="icons"/>
                    <FontAwesomeIcon icon={faTiktok} className="icons"/>
                    <FontAwesomeIcon icon={faYoutube} className="icons"/>
                </div>
            </div>
            <div>
                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                    &#8593; back to top &#8593;
                </button>
            </div>
        </footer>
    );
}

export default Footer;