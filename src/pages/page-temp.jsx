import React from 'react';
import {DefaultLayout} from './layout-defaultpage';
import fetch from 'isomorphic-fetch';
import {Helmet} from 'react-helmet';

class PageTemp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pages: []
        }
    }
 
    componentDidMount (){
const {REACT_APP_API_URL} = process.env;
        fetch(`${REACT_APP_API_URL}/pages/?slug=${this.props.match.params.slug}`)
        .then((response)=>{
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();     
        }).then((pagedata)=> {
            this.setState({pages: pagedata});
        });
    }

    componentDidUpdate = (prevProps) => {
const {REACT_APP_API_URL} = process.env;
        if(this.props.match.params.slug !== prevProps.match.params.slug ) {
        // fetch page data when param /slug changes
        fetch(`${REACT_APP_API_URL}/pages/?slug=${this.props.match.params.slug}`)
        .then((response)=>{
            if(response.status >= 400){
                throw new Error("Bad response from server");
            }
            return response.json();     
            }).then((pagedata)=> {
                this.setState({pages: pagedata});
            });
        }
    }

    render(){  
        const {pages} = this.state;
        return(
        <>
        <Helmet>
            <meta charSet="utf-8" />
            {pages.map(page => (
            <>
            <title>{page.title}</title>
            <meta name="description" content={page.description} />
            </>
            ))}
        </Helmet>   
		<DefaultLayout pages={pages}/>
        </>
        )
    }
}
export default PageTemp;