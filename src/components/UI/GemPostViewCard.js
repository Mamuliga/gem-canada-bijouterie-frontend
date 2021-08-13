import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

const GemPostViewCard = ({ title, content }) => {
  return (
    <Card className="content-view">
      <div className="content-card">
        <CardTitle className="card-title">
          <h1>{title}</h1>
        </CardTitle>

        <CardBody className="content-body">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </CardBody>
      </div>
    </Card>
  );
};

export default GemPostViewCard;
