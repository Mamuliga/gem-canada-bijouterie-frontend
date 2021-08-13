import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { useTranslation } from 'react-i18next';

const CategoryCard = ({ src, title, onCardClick }) => {
  const { t } = useTranslation();
  return (
    <div className="gem-column-view" id="post-view-clickable-card">
      <Card onClick={onCardClick} className="category-view">
        <div className="gem-main-card">
          <CardImg
            top
            width="100%"
            src={src}
            alt={`${title} ${t('home-image-text')}`}
          />
          <CardBody className="category-body">
            <CardTitle className="card-title">{title}</CardTitle>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

export default CategoryCard;
