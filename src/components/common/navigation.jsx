import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

const Navigation = (props) => {
const {REACT_APP_API_URL} = process.env;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [navLinks, setNavLinks] = useState([])
  const fetchNav = async () => {
  const res = await axios.get(`${REACT_APP_API_URL}/categories`);
  setNavLinks(res.data);
  };

    useEffect(() => {
        fetchNav();
      });
  
  return (


    <header className="site-navbar" role="banner">
        <div className="container-fluid">
          <div className="row align-items-center">
          <Navbar light expand="md site-navigation">
            <Link to={'/'}><div className="site-logo text-black h2 mb-0">BlogMandu</div></Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="site-menu ml-auto" navbar>
                <NavItem><Link to={'/'}>Home</Link></NavItem>
                { navLinks.map((link, index) => (link.blogs.length >= 1 ? 
                    <NavItem key={index}>
                    <Link to={`/categories/${link.id}`}>
                    {link.categoryname}</Link>
                    </NavItem> : (''))
                )}
                </Nav>
            </Collapse>
          </Navbar>
              
          </div>
        </div>
    </header>
  );
}

export default Navigation;