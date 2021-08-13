import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Youtube } from '../../assets/images';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div row="true">
      <div className="footer-social-media-text">{t('Connect with us')}</div>
      <div className="footer-social-share-icons">
        <a href="https://www.facebook.com/Bijouterie-et-Joyaux-International-Inc-339832630246013/">
          <img
            className="footer-facebook-icon"
            src={Facebook}
            alt="facebook icon"
          />
        </a>
        <a href="https://www.youtube.com/channel/UCdTEm_N5BtO8Ynz79uW1Sqg?view_as=subscriber">
          <img
            className="footer-youtube-icon"
            src={Youtube}
            alt="youtube icon"
          />
        </a>
        <a href="https://www.instagram.com/bijouterie.joyaux/">
          <img
            src={Instagram}
            className="footer-instagram-icon"
            alt="instagram icon"
          />
        </a>
      </div>

      <address className="address">
        620, {t('address')}, suite 755, {t('address2')} (Qc) H3B 1M1 <br />
        {t('phoneNo')}: (514) 996-3370 | (514) 397-9898
        <br />
        {t('Email')}: info@bijouteriejoyaux.com <br />
        {t('Web')}: www.bijouteriejoyaux.com <br />
        {t('All Rights')}
        <br />
        {t('Rights')}
      </address>
    </div>
  );
};

export default Footer;
