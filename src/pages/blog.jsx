import React from 'react';
import {PageTitle} from '../components/common';
import RecentPosts from '../components/blog/recent-posts';

export default function Blog() {
  return(
    <>
    <PageTitle title={'Blog'} pagesubtitle={'Latest blog posts'} />
    <div className="site-section">
      <div className="container">
        <div className="row mb-5">
            <div className="col-12">
              <h2>Latest Posts</h2>
            </div>
        </div>
        <RecentPosts />
      </div>
    </div>
    </>
    );
}
