import React from 'react';
import Routes from './components/Routes/index';
import { TopNavbar, Header } from './components/UI';
import Footer from './components/UI/Footer';
import ScrollToTop from './components/Routes/ScrollToTop';
import LotNumberSearch from './components/UI/LotNumberSearch';

function App() {
  const isMobileScreens = window.innerWidth <= 767;
  return (
    <div className="main-container">
      <Header />
      {isMobileScreens ? (
        <>
          <TopNavbar />
          <LotNumberSearch />
        </>
      ) : (
        <>
          <LotNumberSearch />
          <TopNavbar />
        </>
      )}

      <ScrollToTop />
      <div className="router-container">
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
