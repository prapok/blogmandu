import React from 'react';
import fetch from 'isomorphic-fetch';
import BlogListItem from './bloglist-item';

class BlogList extends React.Component{
constructor(){
	super();
	this.state = {
		blogs: []
	}
}

componentWillMount(){
const {REACT_APP_API_URL} = process.env;
	fetch(`${REACT_APP_API_URL}/blogs`).then((response)=>{
		if(response.status >= 400){
			throw  new Error("Bad response from server");
		}
		return response.json();
	}).then((blogs)=> {
		this.setState({blogs: blogs});
	});
	}

	render(){
		return(
			<>
			{this.state.blogs.map(({id, ...otherProps}) => (
				<BlogListItem key={id} blogid={id} {...otherProps} />
			))}
			</>
		)
	}
}

export default BlogList;