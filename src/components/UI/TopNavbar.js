import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler,
} from 'reactstrap';
import { TOP_NAVBAR_ITEM } from '../../utils/constant';

const TopNavbar = () => {
  const { t } = useTranslation();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggleClick = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const renderNavItem = ({ path, textKey, iconName }) => (
    <NavItem
      key={textKey}
      onClick={handleNavbarToggleClick}
      className="mx-auto navbar-font"
    >
      <NavLink to={path} tag={Link}>
        <i className={`fa fa-${iconName} mr-2`} />
        {t(textKey)}
      </NavLink>
    </NavItem>
  );

  return (
    <div>
      <Navbar color="transparent" light expand="md">
        <NavbarToggler className="ml-auto" onClick={handleNavbarToggleClick} />
        <Collapse navbar isOpen={isNavbarOpen}>
          <Nav className="w-100 justify-content-between" navbar>
            {TOP_NAVBAR_ITEM.map(renderNavItem)}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
