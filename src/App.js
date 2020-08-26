import React from 'react';
import Navigation from './components/common/navigation';
import Footer from './components/common/footer';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages/home';
import Blog from './pages/blog';
import PageTemp from './pages/page-temp';
import SingleBlog from './components/blog/singleblog';
import CategoryGrid from './components/blog/category-grid';
import './app.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <Switch>
          <Route exact path="/" render={() => <Home />}/>
          <Route exact path="/home" render={() => <Redirect to={`/`}/>} />
          <Route exact path="/blog" render={() => <Blog />} />
          <Route path='/post/:postid' render={ props => (<SingleBlog {...props} />) } />
          <Route path='/categories/:id' render={ props => (<CategoryGrid {...props} />) } />
          <Route exact path='/:slug' render={ props => (<PageTemp {...props}/>) } />
          <Route component={() => <ErrorPage />} />
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

const ErrorPage=()=>{
  return <div className="container"><center><h3>404 - Page not found</h3></center></div>
  }

export default App;
