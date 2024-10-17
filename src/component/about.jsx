import React from 'react';
import Header from "./header";
import Footer from "./Footer";
import Me_Pic from "./pics/IMG_9905 Large.jpeg";
import "./about.css";

export default function About() {
  return (
    <div className="about-page">
        <Header/>
        <h1>About Movies Now</h1>
        <div className='my-img-con'>
            <img src={Me_Pic} />
        </div>
        <p>
            Movies now is made By Zachary Reynolds where I aimed to create a site to make it easy to use movie playlists. While this project has taken a bit longer than expected it has been fun adding each piece to the project as it gets closer to completion. My GitHub would be reynolds22 to check out more.
        </p>
        <Footer/>
    </div>
  );
}
