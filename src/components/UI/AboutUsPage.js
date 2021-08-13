import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row } from 'reactstrap';
import {
  AboutUs1,
  AboutUs2,
  AboutUs0,
  AboutUs4,
  AboutUs3,
} from '../../assets/images';

const AboutUsCard = () => {
  const { t } = useTranslation();
  return (
    <Card className="content-view-card">
      <Row>
        <img src={AboutUs0} alt="about us" className="about-us-image-0" />
      </Row>

      <div className="about-us-paragraph-one">{t('about-us-section-1')}</div>

      <div className="about-us-paragraph">{t('about-us-section-2')}</div>

      <div className="about-us-paragraph">{t('about-us-section-3')}</div>

      <div className="about-us-paragraph">{t('about-us-section-4')}</div>

      <Row className="about-us-single-image-row">
        <div className="about-us-single-image">
          <img src={AboutUs1} alt="about us" className="about-us-image-1" />
          <div className="about-us-image-name">Mohamed Saleem</div>
        </div>
        <div className="about-us-single-image">
          <img src={AboutUs2} alt="about us" className="about-us-image-1" />
          <div className="about-us-image-name">Mohamed Nuhman</div>
        </div>
        <div className="about-us-single-image">
          <img src={AboutUs3} alt="about us" className="about-us-image-1" />
          <div className="about-us-image-name">
            <div>Mohamed Fazeen</div>
            <div className="about-us-image-company">
              BIJOUTERIE ET JOYAUX INTERNATIONAL
              <div>Canada</div>
            </div>
          </div>
        </div>
        <div className="about-us-single-image">
          <img src={AboutUs4} alt="about us" className="about-us-image-1" />
          <div className="about-us-image-name">Mohamed Farhan</div>
          <div className="about-us-image-company">
            SERENDIB GEM BUREAU
            <div>Sri Lanka</div>
          </div>
        </div>
      </Row>

      <div className="about-us-paragraph">{t('about-us-section-5')}</div>

      <div className="about-us-paragraph">{t('about-us-section-6')}</div>

      <div className="about-us-paragraph">{t('about-us-section-7')}</div>

      <div className="about-us-paragraph">{t('about-us-section-8')}</div>

      <div className="about-us-paragraph">{t('about-us-section-9')}</div>

      <div className="about-us-paragraph">{t('about-us-section-10')}</div>

      <div className="about-us-paragraph">{t('about-us-section-11')}</div>

      <div className="about-us-paragraph">{t('about-us-section-12')}</div>

      <div className="about-us-paragraph">{t('about-us-section-13')}</div>

      <div className="about-us-paragraph">{t('about-us-section-14')}</div>
    </Card>
  );
};

export default AboutUsCard;
