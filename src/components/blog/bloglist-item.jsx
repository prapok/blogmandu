import React from 'react';
import {Link} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

const BlogListItem = ({blogid, title, description, featuredimage, categories, createdAt}) => {
    
    const category = categories.map((category)=>{
        return (<span className="post-category text-white bg-success mb-3">{category.categoryname}</span>)
      })

    return(
      <>
        <div className="col-lg-4 mb-4">
          <div className="entry2">
              <Link to={`/post/${blogid}`} className="h-entry mb-30 v-height gradient">
                <img src={`${featuredimage.url}`} alt={featuredimage.name} className="img-fluid rounded" />   
              </Link>
              <div className="excerpt">
               {category}
              <h2><Link to={`/post/${blogid}`}>{title}</Link></h2>
              <div className="post-meta align-items-center text-left clearfix">
                <span className="d-inline-block mt-1">By <Link href={'/'}>Admin</Link></span>
                <span>&nbsp;-&nbsp;{moment(createdAt).format("MMM Do YYYY")}</span>
              </div>
               {ReactHtmlParser(description.slice(0, 150))}
                <p><Link to={`/post/${blogid}`}>Read More</Link></p>
              </div>
            </div>
        </div>
    </>
	)
}

export default BlogListItem;