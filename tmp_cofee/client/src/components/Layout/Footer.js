
// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFacebookF,
//   faInstagram,
//   faTwitter,
//   faYoutube,
// } from "@fortawesome/free-brands-svg-icons";
// import "../../styles/footer.css";
// // import { Link } from 'react-router-dom';
// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="container">
//         <div className="mini">
//           <div className="icon-F">
//             <a href="https://www.facebook.com/saumya.keservani.7" className="social-link-f">

//             <span>
//               <FontAwesomeIcon icon={faFacebookF} />
//             </span>
//             </a>
//           </div>
//           <div className="icon-I">
//           <a href="https://www.instagram.com/saumyakeservani/" className="social-link-i">
//             <span>
//               <FontAwesomeIcon icon={faInstagram} />
//             </span>
//             </a>
//           </div>
//         </div>
//         <h4 className="text-center copyrt">
//           All rights are reserved &copy; jms-commerce
//         </h4>
//         <div className="mini">
//           <div className="icon-T">
//             <a href="https://twitter.com/KeservaniS16527" className="social-link-t">

//             <span>
//               <FontAwesomeIcon icon={faTwitter} />
//             </span>
//             </a>
//           </div>
//           <div className="icon-Y">
//             <a href="https://www.youtube.com/channel/UCHWbzfO5hbwKs1KttjYmtTA" className="social-link-y">

//             <span>
//               <FontAwesomeIcon icon={faYoutube} />
//             </span>
//             </a>
//           </div>
//         </div>
//       </div>
//       <p className="text-center mt-3">
//         <Link to="/about" className="lnk">About</Link>|<Link to="/contact" className="lnk">contact</Link>|
//         <Link to="/policy" className="lnk">privacy policy</Link>
//       </p>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "../../styles/footer.css";
// import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className=" mini">
          <div className="icon-F">
            <a href="https://www.facebook.com/saumya.keservani.7" className="social-link-f">

            <span>
              <FontAwesomeIcon icon={faFacebookF} />
            </span>
            </a>
          </div>
          <div className="icon-I">
          <a href="https://www.instagram.com/saumyakeservani/" className="social-link-i">
            <span>
              <FontAwesomeIcon icon={faInstagram} />
            </span>
            </a>
          </div>
        </div>
        {/* <div className="col-md-8"> */}

        <h4 className="text-center copyrt">
          All rights are reserved &copy; jms-commerce
        </h4>
        {/* </div> */}
        <div className="mini">
          <div className="icon-T">
            <a href="https://twitter.com/KeservaniS16527" className="social-link-t">

            <span>
              <FontAwesomeIcon icon={faTwitter} />
            </span>
            </a>
          </div>
          <div className="icon-Y">
            <a href="https://www.youtube.com/channel/UCHWbzfO5hbwKs1KttjYmtTA" className="social-link-y">

            <span>
              <FontAwesomeIcon icon={faYoutube} />
            </span>
            </a>
          </div>
        </div>
      </div>
      <p className="text-center mt-3">
        <Link to="/about" className="lnk">About</Link>|<Link to="/contact" className="lnk">contact</Link>|
        <Link to="/policy" className="lnk">privacy policy</Link>
      </p>
    </div>
  );
};

export default Footer;
