import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from 'reactstrap';
import i18next from 'i18next';
import { Logo } from '../../assets/images';
import { LANGUAGES } from '../../utils/constant';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const [selectedLang, setSelectedLang] = useState(i18next.language);
  const handleLanguageChange = lang => {
    const languageChange = () => {
      i18next.changeLanguage(lang.code);
      setSelectedLang(lang.code);
    };
    return languageChange;
  };

  useEffect(()=>{
    if(!(LANGUAGES.find(lang => selectedLang === lang.code))){
      i18next.changeLanguage(LANGUAGES[0].code);
    }
  },[selectedLang])

  const { push } = useHistory();

  const handleLogoClick = () => {
    push('/');
  };

  return (
    <div>
      <div className="header">
        <img
          src={Logo}
          alt="logo"
          className="company-logo"
          onClick={handleLogoClick}
        />
        <UncontrolledDropdown className="language-dropdown">
          <DropdownToggle tag="a" caret>
            <i className="fa fa-globe mr-2" />
            {LANGUAGES.find(lang => selectedLang === lang.code)?.name || LANGUAGES[0].name}
          </DropdownToggle>
          <DropdownMenu>
            {LANGUAGES.map(lang => (
              <DropdownItem
                key={lang.code}
                onClick={handleLanguageChange(lang)}
              >
                {lang.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </div>
  );
};

export default Header;
