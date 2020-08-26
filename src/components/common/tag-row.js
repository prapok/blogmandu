import React from 'react';
import categoryColors from './styles';
import {Link} from 'react-router-dom';

export default function TagRow({post}) {
    return (
        <div className="post-categories mb-3">
             {post.categories.map((category, i) => 
             (<span key={i} className="post-category text-white" 
             style={{backgroundColor: categoryColors[category.categoryname]}}>
             <Link to={`/categories/${category.id}`}>{category.categoryname}</Link></span>))}
        </div>
    )
}