import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import moment from 'moment';

export default function RelatedPosts({post, postid}) {
  const categID = post.categories.map(category => category.id);
  const [relPosts, setRelPosts] = useState([]);
	const [categ] = useState(0);
  const {REACT_APP_API_URL} = process.env;
  
  useEffect(() => {
		const fetchPosts = async () => {
      const res = await axios.get(`${REACT_APP_API_URL}/categories?=${categID}`);
		    setRelPosts(res.data);
		};
		fetchPosts();
  }, [categ, API_URL]);
  
    return (
      <div className="sidebar-box">
        <h3 className="heading">Popular Posts</h3>
        <div className="post-entry-sidebar">
          <ul>
            { relPosts.filter(catItem => catItem.id === `${categID}`).map(posts => posts.blogs.map(postItem => (
              <li>
              
              <Link to={`/post/${postid}`}>
                  <img src={`${postItem.featuredimage.formats.small.url}`} alt="person" className="mr-4" />
                    <div class="text">
                      <h4>{postItem.title}</h4>
                      <div class="post-meta">
                          <span class="mr-2">{moment(postItem.createdAt).format('MMM Do YYYY')}</span>
                      </div>
                    </div>
                </Link>
              </li>
            )))}     
          </ul> 
        </div>
      </div>
    )
}