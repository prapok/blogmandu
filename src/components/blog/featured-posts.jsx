import React from 'react';
import fetch from 'isomorphic-fetch';
import FeaturedListItem from './featured-list';
import moment from 'moment';
import './featured.styles.css'

class FeaturedPosts extends React.Component{
	constructor(){
	super();
	this.state = {
		blogs: []
		}
	}

	componentDidMount(){
const {REACT_APP_API_URL} = process.env;
		fetch(`${REACT_APP_API_URL}/blogs`).then((response)=>{
			if(response.status >= 400){
				throw new Error("Bad response from server");
			}
			return response.json();
			}).then((blogs)=> {
				this.setState({blogs: blogs});
			});
	}

	render(){
		const featuredPosts = this.state.blogs.sort((a, b) => moment(b.createdAt)
		.format('MMDDYYYY') - moment(a.createdAt).format('MMDDYYYY')).filter(post => post.featured);

		return(
		<>
		<div className="grid-layout">
			{ featuredPosts.filter((item, idx) => idx < 5).map(({id, ...otherProps}) => (
				<FeaturedListItem key={id} blogid={id} {...otherProps} />
			))}
		</div>
		</>
		)
	}
}

export default FeaturedPosts;