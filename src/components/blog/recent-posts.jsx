import React, { useState, useMemo, useEffect} from 'react';
import {Pagination} from 'antd';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import TagRow from '../common/tag-row';

export default function RecentPosts(){
    const [posts, setPosts] = useState([]);
    const [pageSize, setPageSize] = useState(6);
    const [current, setCurrent]= useState(1);

    const paginatedPosts = useMemo(() => {
    const lastIndex = current * pageSize
    const firstIndex = lastIndex - pageSize
      return posts.sort((a, b) => moment(b.createdAt)
      .format('MMDDYYYY') - moment(a.createdAt).format('MMDDYYYY')).slice(firstIndex, lastIndex)
    }, [current, pageSize, posts])
    
    useEffect(() => {
const {REACT_APP_API_URL} = process.env;
      const fetchPosts = async () => {
      const res = await axios.get(`${REACT_APP_API_URL}/blogs`);
        setPosts(res.data);
      };
      fetchPosts();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
    }, [current, pageSize]);

  return (
  <>
	  <div className="row">
      { paginatedPosts.map((post, index) => (
        <div key={index} className="col-lg-4 mb-4">
            <div className="entry2">
              <Link to={`/post/${post.id}`} className="h-entry v-height gradient">
                <div className="post-grid-image rounded" style={{backgroundImage: `url("${post.featuredimage.url}")`}}></div>   
              </Link>
              <div className="excerpt">
              <TagRow post={post} key={index} />
              <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
              <div className="post-meta align-items-center text-left clearfix">
                <figure className="author-figure mb-0 mr-3 float-left"><img src={require(`../../assets/images/person_1.jpg`)} alt="person" className="img-fluid" /></figure>
                <span className="d-inline-block mt-1">{post.author ? (post.author) : ('Blog Admin')}</span>
                <span>&nbsp;-&nbsp;{moment(post.createdAt).format("MMM Do YYYY")}</span>
              </div>
                {ReactHtmlParser(post.description.slice(0, 205))}
                <p><Link to={`/post/${post.id}`}>Read More</Link></p>
              </div>
            </div>
        </div>
      ))}
	  </div>
    <div className="row text-center pt-5 border-top">
      <div className="container">
        <Pagination basic onShowSizeChange={setPageSize} pageSize={pageSize} 
        total={posts.length} defaultCurrent={current} onChange={setCurrent}/>
      </div>
    </div>
  </>
  );
}