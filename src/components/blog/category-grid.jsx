import React from 'react';
import fetch from 'isomorphic-fetch';
import {Link} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import {PageTitle} from '../../components/common';
import categoryColors from '../common/styles';

class CategoryGrid extends React.Component{
      constructor(){
        super();
        this.state = {
          categoriesp: [],
          cat_name: []
        }
      }

      componentDidMount(){
const {REACT_APP_API_URL} = process.env;
          fetch(`${REACT_APP_API_URL}/categories/${this.props.match.params.id}`).then((response)=>{
          if(response.status >= 400){
            throw new Error("Bad response from server");
          }
          return response.json();
          }).then((categ)=> {
            this.setState({categoriesp: categ.blogs});
            this.setState({cat_name: categ});
          });
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
      }

      componentDidUpdate = (prevProps) => {
const {REACT_APP_API_URL} = process.env;
        if(this.props.match.params.id !== prevProps.match.params.id ) {
        // fetch page data when param /slug changes
        fetch(`${REACT_APP_API_URL}/categories/${this.props.match.params.id}`)
        .then((response)=>{
            if(response.status >= 400){
              throw new Error("Bad response from server");
            }
            return response.json();     
          }).then((categ)=> {
            this.setState({categoriesp: categ.blogs});
            this.setState({cat_name: categ});
          });
        }
    }

  render(){
    const postss = this.state.categoriesp;
    const category = this.state.cat_name;
    const sortedPosts = postss.sort((a, b) => moment(b.createdAt).format('MMDDYYYY') - moment(a.createdAt).format('MMDDYYYY'));
 
    return(
      <>
      <PageTitle ptype={'Category'} title={category.categoryname} description={category.categoryDescription} />
      <div className="site-section">
      <div className="container">
      <div className="row">
        { sortedPosts.map((post, index) => (
          <div key={index} className="col-lg-4 mb-4">
            <div className="entry2">
              <Link to={`/post/${post.id}`} className="h-entry v-height gradient">
                <div className="post-grid-image rounded" style={{backgroundImage: `url("${post.featuredimage.url}")`}}></div>   
              </Link>
              <div className="excerpt">
              <span className="post-category text-white mb-3" 
              style={{backgroundColor: categoryColors[category.categoryname]}}>{category.categoryname}
              </span>
              <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
              <div className="post-meta align-items-center text-left clearfix">
                <figure className="author-figure mb-0 mr-3 float-left"><img src={require(`../../assets/images/person_1.jpg`)} alt="person" className="img-fluid" /></figure>
                <span className="d-inline-block mt-1">{post.author ? (post.author) : ('Blog Admin')}</span>
                <span>&nbsp;-&nbsp;{moment(post.createdAt).format('MMM Do YYYY')}</span>
              </div>
                {ReactHtmlParser(post.description.slice(0, 205))}
                <p><Link to={`/post/${post.id}`}>Read More</Link></p>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div> 
    </div>
  </>
  )}
}

export default CategoryGrid;

