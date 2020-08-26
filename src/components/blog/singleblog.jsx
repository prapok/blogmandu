import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import fetch from 'isomorphic-fetch';
import {Helmet} from 'react-helmet';
import moment from 'moment';
import CategoryList from './category-list';
import PostTags from './tags';
import TagRow from '../common/tag-row';
import DisqusThread from '../DisqusThread';
import PopularPosts from './popular-posts';

class SingleBlog extends React.Component {
	constructor(){
	super();
    this.state = {
      SingleBlog: [],
      BlogImage: '',
      CategoryNames: []
    }
  }

  componentDidMount(){
const {REACT_APP_API_URL} = process.env;
    fetch(`${REACT_APP_API_URL}/blogs/${this.props.match.params.postid}`).then((response)=>{
      if(response.status >= 400){
        throw new Error("Bad response from server");
      }
      return response.json();
      }).then((post)=> {
      this.setState({SingleBlog: post});
      this.setState({BlogImage: post.featuredimage.url});
      this.setState({CategoryNames: <TagRow post={post} /> });
    });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
  }

  componentDidUpdate = (prevProps) => {
const {REACT_APP_API_URL} = process.env;
    if(this.props.match.params.postid !== prevProps.match.params.postid ) {
    // fetch page data when param /slug changes
    fetch(`${REACT_APP_API_URL}/blogs/${this.props.match.params.postid}`).then((response)=>{
      if(response.status >= 400){
        throw new Error("Bad response from server");
      }
      return response.json();
      }).then((post)=> {
      this.setState({SingleBlog: post});
      this.setState({BlogImage: post.featuredimage.url});
      this.setState({CategoryNames: <TagRow post={post} /> });
    });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
    }
}

  render(){
  	const {id, title, description, createdAt, author } = this.state.SingleBlog;
    const style = { backgroundImage: `url("${this.state.BlogImage}")`,
    backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}
    const category = this.state.CategoryNames;
   
    const showComments = () => {
      return <DisqusThread id={`${id}`} title={`${title}`} path={`/blogs/${id}`} /> }

    return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`Blogmandu: ${title}`} </title>
      <meta name="description" content={description} />
    </Helmet>
    <div className="site-cover site-cover-sm same-height overlay single-page" style={style}>
      <div className="container">
        <div className="row same-height justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="post-entry text-center">
              {category}
              <h1 className="mb-4">{title}</h1>
              <div className="post-meta align-items-center text-center">
                <span className="d-inline-block mt-1">{author ? (author) : ('Blog Admin')}</span>
                <span>&nbsp;-&nbsp; {moment(createdAt).format("MMM Do YYYY")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section className="site-section py-lg">
        <div className="container">
          <div className="row blog-entries element-animate">
              <div className="col-md-12 col-lg-8 main-content">
                <div className="post-content-body">
                  <div key={id}>
                    <img width="100%" className="mb-3" src={`${this.state.BlogImage}`} alt={this.state.BlogImage.name} />
                      {ReactHtmlParser(description)}
                  </div>
                    {showComments()}
                </div>
              </div>
            <div className="col-md-12 col-lg-4 sidebar">
               <div className="sidebar-box">
                <div className="bio text-center">
                  <img src={require("../../assets/images/person_4.jpg")} alt="person_4" className="img-fluid mb-5"/>
                  <div className="bio-body">
                    <h2>{author ? (author) : ('Blog Admin')}</h2>
                    <p className="mb-4">
                    Welcome to Blogmandu and thanks for stopping by. I am Steve, this site has been my home since I left to travel around the world in 2008. I launched Blogmandu as a way to share my journey, as well as share the hows and whys for others feeling adrift and looking for a change in their lives.
                    </p>
                  </div>
                </div>
            </div>
          {/* end author */}
          <PopularPosts/>
          {/* end popular posts */}
          <div className="sidebar-box">
              <h3 className="heading">Categories</h3>
              <ul className="categories">
                <CategoryList/>
              </ul>
            </div>

            <div className="sidebar-box">
              <h3 className="heading">Tags</h3>
              <ul className="tags">
              <PostTags/>
              </ul>
            </div>
          </div>
          {/* sidebar ends */}
          </div>
      </div>
    </section>
    </>
    )
  }
}

export default SingleBlog;