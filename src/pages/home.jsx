import React from 'react';
import RecentPosts from '../components/blog/recent-posts';
import FeaturedPosts from '../components/blog/featured-posts';
import './home.styles.css';
import {Helmet} from 'react-helmet';

class Home extends React.Component{

  render(){
    return(
      <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{'Blogmandu: Home'}</title>
      </Helmet>
        <section className="site-section bg-light">
          <div className="container">
            <div className="align-items-stretch retro-layout-2">
              <FeaturedPosts/>
            </div>
          </div>
        </section>
        <section className="site-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12">
                <h2>Recent Posts</h2>
              </div>
            </div>
            <RecentPosts/>
          </div>
        </section>
      </main>
    )
  }
}

export default Home;