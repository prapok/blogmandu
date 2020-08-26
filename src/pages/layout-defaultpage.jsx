import React from 'react';
import {PageTitle} from '../components/common';
import ReactHtmlParser from 'react-html-parser';

export const DefaultLayout = props =>  (
    <>
        {props.pages.map(page => 
            <PageTitle key={page.id} title={page.title} pagesubtitle={page.pagesubtitle}/>
        )}
        {props.pages.map(pageCont => 
            <div className="container" key={pageCont.id} >{ReactHtmlParser(pageCont.description)}</div>
        )}
    </>
);