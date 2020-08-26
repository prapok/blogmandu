import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {Helmet} from 'react-helmet';

const PageTitle =({ptype, title, pagesubtitle, description}) => {
  return(
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
    </Helmet>
    <div className="py-5 bg-light">
     <div className="container">
       <div className="row">
         <div className="col-md-6">
          <span>{ptype}</span>
           <h3>{title}</h3>
           <p>{pagesubtitle}</p>
            {ReactHtmlParser(description)}
         </div>
       </div>
     </div>
    </div>
    </>
  )
}

export default PageTitle;

