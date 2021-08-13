import React, { useState } from 'react';
import { FormGroup, Form, Label, Input, Button, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

const ContactUsForm = ({ titleKey, lotNumber }) => {
  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState({});

  const { t } = useTranslation();

  const validatePhoneNo = phoneNo => {
    const phoneNoRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (phoneNo.match(phoneNoRegex)) {
      setPhoneError('');
      return true;
    } else {
      setPhoneError(t('contact-us-form-phone-error'));
      return false;
    }
  };

  const handleSubmitButtonClicked = e => {
    e.preventDefault();
    const { email, firstName, lastName, phoneNumber, message } = inputValue;
    let params = `firstName=${firstName}&lastName=${lastName}&email=${email}&phoneNumber=${phoneNumber}&message=${
      message}`;

    if (lotNumber) {
      params += `&lotNumber=${lotNumber}`;
    }

    if (validatePhoneNo(phoneNumber)) {
      setLoading(true);
      fetch(`https://bijouteriejoyaux.com/sendmail.php?${params}`)
        .then(() => {
          setLoading(false);
          setMessage(t('contact-us-form-sent-success'));
        })
        .catch(() => {
          // Assumes no issues with the server mail file
          setLoading(false);
          setMessage(t('contact-us-form-sent-success'));
        });
    }
  };

  const handleInputChange = event => {
    const {
      target: { value, name },
    } = event;
    setInputValue({ ...inputValue, [name]: value });
    if (name === 'phoneNumber') {
      setPhoneError('');
    }
  };

  return (
    <>
      {titleKey && <h3 className="contact-title">{t(titleKey)}</h3>}
      <Form onSubmit={handleSubmitButtonClicked}>
        <FormGroup>
          <Label for="firstName">{t('contact-us-first-name')}*</Label>
          <Col>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder={t('contact-us-first-name')}
              onChange={handleInputChange}
              value={inputValue['firstName']}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="lastName">{t('contact-us-last-name')}*</Label>
          <Col>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder={t('contact-us-last-name')}
              onChange={handleInputChange}
              value={inputValue['lastName']}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="email">{t('contact-us-email')}*</Label>
          <Col>
            <Input
              sm={10}
              type="email"
              name="email"
              id="email"
              placeholder={t('contact-us-email')}
              onChange={handleInputChange}
              value={inputValue['email']}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="phoneNo">{t('contact-us-phone-number')}*</Label>
          <Col>
            <Input
              sm={10}
              type="text"
              name="phoneNumber"
              id="phoneNo"
              placeholder={'(604) 555-5555'}
              onChange={handleInputChange}
              value={inputValue['phoneNumber']}
              required
            />
            {phoneError && (
              <div>
                <small id="phoneError" className="text-danger">
                  {phoneError}
                </small>
              </div>
            )}
          </Col>
        </FormGroup>
        <FormGroup>
          <Label for="message">{t('contact-us-message')}*</Label>
          <Col>
            <Input
              rows={5}
              sm={10}
              type="textarea"
              name="message"
              id="message"
              placeholder={t('contact-us-message')}
              value={inputValue['message']}
              onChange={handleInputChange}
              required
            />
          </Col>
        </FormGroup>
        <div className="modal-footer">
          <Button block>{t('contact-us-submit')}</Button>
        </div>
        <div
          className={
            lotNumber
              ? 'contact-us-form-message-inquiry'
              : 'contact-us-form-message-contact-us'
          }
        >
          {loading ? <Loading /> : message}
        </div>
      </Form>
    </>
  );
};

export default ContactUsForm;
