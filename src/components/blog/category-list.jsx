import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function CategoryList(){
	const [categories, setCategories] = useState([]);
	const [categ] = useState(0);
	const {REACT_APP_API_URL} = process.env;
	
	useEffect(() => {
		const fetchPosts = async () => {
		const res = await axios.get(`${REACT_APP_API_URL}/categories`);
		setCategories(res.data);
		};
		fetchPosts();
	}, [categ, REACT_APP_API_URL]);

	return(
		<>
		{categories.map((catg, i) => (
			catg.blogs.length >=1 ? (<li key={i}><Link to={`/categories/${catg.id}`}>{catg.categoryname} 
			<span>({catg.blogs.length})</span></Link></li>) : ('')
		))}
		</>
	)
}