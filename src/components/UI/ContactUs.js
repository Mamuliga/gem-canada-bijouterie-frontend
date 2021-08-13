import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, CardBody } from 'reactstrap';
import GoogleMap from './GoogleMap';
import ContactUsForm from './ContactUsForm';

const ContactUsCard = () => {
  const { t } = useTranslation();

  return (
    <div className="content-card">
      <Card className="contact-view-contact">
        <Row>
          <Col sm={12} md={6}>
            <CardBody>
              <ContactUsForm titleKey={'contact-us-contact-us'} />
            </CardBody>
          </Col>
          <Col sm={12} md={6} className="contact-us-right-col">
            <Card className="contact-us-card">
              <GoogleMap />
            </Card>
            <Card className="contact-us-card">
              <div className="contact-us-opening-hours-table-container">
                <h3 className="contact-us-opening-hours-title">
                  {t('contact-us-opening-hours')}
                </h3>
                <table className="contact-us-opening-hours-table">
                  <tbody className="contact-us-table-body-width">
                    <tr className="contact-us-table-row">
                      <td>{t('Monday')}</td>
                      <td>
                        9.00 {t('AM')} - 5.00 {t('PM')}
                      </td>
                    </tr>
                    <tr className="contact-us-table-row">
                      <td>{t('Tuesday')}</td>
                      <td>
                        9.00 {t('AM')} - 5.00 {t('PM')}
                      </td>
                    </tr>
                    <tr className="contact-us-table-row">
                      <td>{t('Wednesday')}</td>
                      <td>
                        9.00 {t('AM')} - 5.00 {t('PM')}
                      </td>
                    </tr>
                    <tr className="contact-us-table-row">
                      <td>{t('Thursday')}</td>
                      <td>
                        9.00 {t('AM')} - 5.00 {t('PM')}
                      </td>
                    </tr>
                    <tr className="contact-us-table-row">
                      <td>{t('Friday')}</td>
                      <td>{t('contact-us-closed-appointments-only')}</td>
                    </tr>
                    <tr className="contact-us-table-row">
                      <td>{t('Saturday')}</td>
                      <td>{t('contact-us-closed-appointments-only')}</td>
                    </tr>
                    <tr className="contact-us-table-row">
                      <td>{t('Sunday')}</td>
                      <td>{t('contact-us-closed-appointments-only')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ContactUsCard;
