import React from 'react';
import { useTranslation } from 'react-i18next';
import { addHyphenWhenEmpty } from '../../utils/helperFunctions';

const Availability = ({ sold_out, availability }) => {
  const { t } = useTranslation();
  if (sold_out) {
    return <div className="post-view-sold-out">{t('post-card-sold-out')}</div>;
  }
  if (availability === 'In House') {
    return t('filter-form-right-availability-inhouse-label');
  }
  if (availability === 'Out On Memo') {
    return t('filter-form-right-availability-out-on-memo-label');
  }
  return addHyphenWhenEmpty(availability);
};

export default Availability;
