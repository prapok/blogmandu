import React from 'react';
import Subscribe from '../subscribe-form'
import PostTags from '../blog/tags'
import {Link} from 'react-router-dom';

export default function Footer() {
  return(
  <>
    <Subscribe/>
      <div className="site-footer">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4">
            <h3 className="footer-heading mb-4">About Us</h3>
            <p>Blogmandu's ultimate goal is to better empower and motivate all interested travelers with solid advice on how to travel the world. I believe we each need the tools and experiences learned through travel, and the Blogmandu community is committed to motivating students and young adults to expand their worldview through travel.</p>
          </div>
          <div className="col-md-3 ml-auto">
            <h3 className="footer-heading mb-4">Categories</h3>
            <ul className="tags dark">
              <PostTags/>
            </ul>
          </div>
          <div className="col-md-4">
            <div>
              <h3 className="footer-heading mb-4">Connect With Us</h3>
              <p>
                <Link to={"//facebook.com"} target="_blank" rel="noopener"><span className="icon-facebook pt-2 pr-2 pb-2 pl-0"></span></Link>
                <Link to={"//twitter.com"} target="_blank" rel="noopener"><span className="icon-twitter p-2"></span></Link>
                <Link to={"//instagram.com"} target="_blank" rel="noopener"><span className="icon-instagram p-2"></span></Link>
                <Link to={"//rss.com"} target="_blank" rel="noopener"><span className="icon-rss p-2"></span></Link>
                <Link to={"//mail.google.com"} target="_blank" rel="noopener"><span className="icon-envelope p-2"></span></Link>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p>
              Copyright © <script>document.write(new Date().getFullYear());</script>2020 All rights reserved
              </p>
          </div>
        </div>
      </div>
    </div>
    </>
    )
}