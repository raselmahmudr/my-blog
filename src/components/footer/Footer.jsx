import React from 'react';

import "./styles.scss";

const Footer = () => {
  let start = '2021-11-08T15:40:15.000Z'
  return (
    <div className="footer">
        <div>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
      <h4 className="title text-md text-white">Project Start ON {new Date(start).toLocaleString()}</h4>
    </div>
  );
};

export default Footer;