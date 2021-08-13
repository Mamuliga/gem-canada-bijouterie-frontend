import React from 'react';
import { Card /* , CardImg, CardBody, CardTitle */ } from 'reactstrap';
import { useTranslation } from 'react-i18next';

const EventsCard = ({ imageSrc, title, content, description }) => {
  const { t } = useTranslation();
  return (
    <Card className="event-view-card">
      <div className="event-situation-title">{t('events-situation-title')}</div>
      {/* <CardTitle >{title}</CardTitle> */}
      {/* <CardImg top width="100%" src={imageSrc} />
      <CardBody className="event-body">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </CardBody> */}
    </Card>
  );
};

export default EventsCard;
