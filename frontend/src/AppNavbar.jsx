// src/AppNavbar.jsx
import { useState } from 'react';
import {
  Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem
} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';

export default function AppNavbar() {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);

  return (
    <Navbar color="dark" dark expand="md" className="mb-3">
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink
              to="/clients"
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              onClick={() => setOpen(false)} // close menu after click on mobile
            >
              Clients
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
