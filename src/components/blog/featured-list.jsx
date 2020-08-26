import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import categoryColors from '../common/styles';

const FeaturedListItem = ({blogid, title, featuredimage, createdAt, columnSize, columnOrder, categories}) => {

  return(
    <>
      {
        <div className={`grid-item span-${columnSize}`} style={{ order: `${columnOrder}`}}>
          <Link to={`/post/${blogid}`} className="h-entry h-100 gradient">
            <img src={`${featuredimage.url}`}  alt={featuredimage.name} className="img-fluid rounded" />   
              <div className="text">
                <div className="post-categories mb-3">
                  {(() => { if (columnSize === 2) {
                    return (
                      categories.map((category, i) => 
                       (<span key={i} className="post-category text-white" 
                       style={{backgroundColor: categoryColors[category.categoryname]}}>
                      {category.categoryname}</span>))
                        )} 
                    })()}
                  </div>
                    <h2>{title}</h2>
                    <span className="date">{moment(createdAt).format("MMM Do YYYY")}</span>
                </div>
            </Link>
          </div>
        }
      </>
	   )
}

export default FeaturedListItem;