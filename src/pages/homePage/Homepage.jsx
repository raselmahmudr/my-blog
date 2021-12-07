import React from 'react';
import Posts from "../posts/Posts";
import { Link } from "react-router-dom";

import "./homepage.scss"

const Homepage = () => {
    let topArticle = [
        { s: "javascript", label: "Javascript"},
        { s: "react", label: "React"},
        { s: "programming", label: "Programming"},
        { s: "web development", label: "Web Development"}
    ]
    return (

           <div className="container">

           <div className="top_art mx-auto bg-gray-9 bg-opacity-70 rounded flex px-4  ">
               { topArticle.map((ta, i)=>(
                   <li key={i} className="m-1">
                       <Link className="text-gray-600 text-sm font-medium" to={`/?search=${ta.s}`}>#{ta.label}</Link>
                   </li>
               )) }
           </div>

            <Posts />

        </div>
    );
};

export default Homepage;