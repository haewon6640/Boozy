import React from "react";
import { Link, withRouter } from "react-router-dom";

const Footer = (props) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
          });
    }
    const path = props.location.pathname;
    if (path.includes("login") || path.includes("signup")) {
        return null;
    }
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-left">
                    {/* <img id="ico" onClick={scrollToTop} src='https://images.squarespace-cdn.com/content/v1/56a01c5f5a56686ee6b460af/1608658525023-M5P08N1CGUQZJTRKSTVB/Summer+Wedding+Signature+Drink+Ideas?format=300w' alt='greyhound'></img> */}
                    <div className="navigation">
                        <a className="main-label" onClick={scrollToTop}>
                            Boozy
                        </a>
                        <ul>
                            <Link to="/recipes">
                                <li>Recipes</li>
                            </Link>
                            <Link to="/profile">
                                <li>Barcart</li>
                            </Link>
                            <a href="https://stackoverflow.com/help">
                                <li>Help</li>
                            </a>
                        </ul>
                    </div>
                </div>
                <div className="footer-right">
                    <div className="navigation">
                        <a className="main-label" href="https://github.com/haewon6640">
                            Developers
                        </a>
                        <ul>
                            <a href="https://www.linkedin.com/in/hae-won-park-64820714a/">
                                <li>Anders Kindall</li>
                            </a>
                            <a href="https://github.com/haewon6640">
                                <li>Jeremy Pietila</li>
                            </a>
                            <a href="https://github.com/haewon6640">
                                <li>Jerry Park</li>
                            </a>
                            <a href="https://github.com/haewon6640">
                                <li>Keenan Parker</li>
                            </a>
                            <a href="https://github.com/haewon6640">
                                <li>Pamela Jane</li>
                            </a>

                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default withRouter(Footer);