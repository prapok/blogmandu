import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import moment from 'moment';

export default function PopularPosts() {
  const [popPosts, setPopPosts] = useState([]);
	const [categ] = useState(0);
  const {REACT_APP_API_URL} = process.env;
  const shuffled = popPosts.sort(function(){return .5 - Math.random()});

  useEffect(() => {
		const fetchPosts = async () => {
      const res = await axios.get(`${REACT_APP_API_URL}/blogs`);
      setPopPosts(res.data);
		};
		fetchPosts();
  }, [categ, REACT_APP_API_URL]);
  
    return (
      <div className="sidebar-box">
        <h3 className="heading">Popular Posts</h3>
        <div className="post-entry-sidebar">
          <ul>
            { shuffled.filter((item, idx) => idx < 4).map((postItem, index)=>
              <li key={index}>
                <Link to={`/post/${postItem.id}`}>
                  <img src={`${postItem.featuredimage.formats.thumbnail.url}`} alt="person" className="mr-4 cover" />
                  <div className="text">
                    <h4>{postItem.title}</h4>
                      <div className="post-meta">
                        <span className="mr-2">{moment(postItem.createdAt).format('MMM Do YYYY')}</span>
                    </div>
                  </div>
                </Link>
              </li>
            )}  
          </ul> 
        </div>
      </div>
    )
}