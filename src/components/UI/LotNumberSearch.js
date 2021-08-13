import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  getPreciousPostsByLotNumber,
  getSemiPreciousPostsByLotNumber,
} from '../../utils/api';
import { getLocaleText } from '../../utils/helperFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18next from 'i18next';

const LotNumberSearch = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const [noPrecious, setNoPrecious] = useState(false);
  const [noSemiPrecious, setNoSemiPrecious] = useState(false);
  const [lotNumber, setLotNumber] = useState('');
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (noPrecious && noSemiPrecious) {
      toast.info(
        t('lot-number-search-no-product', {
          lotNumber: lotNumber === 0 ? '0' : lotNumber,
        })
      );
      setNoPrecious(false);
      setNoSemiPrecious(false);
      setLotNumber('');
    }
  }, [lotNumber, noPrecious, noSemiPrecious, t]);

  const getTitle = post => {
    const { category_name_en, category_name_fr } = post.gem_variety;
    return getLocaleText(category_name_en, category_name_fr)[
      i18next.language
    ];
  };

  const routeToPostViewPage = post => {
    push({
      pathname: `/category/${getTitle(post)}/${post.lot_number}`,
      state: { post, fromLotNumberSearch: true },
    });
  };

  const preciousData = resp => {
    if (resp.data.length) {
      routeToPostViewPage(resp.data[0]);
      setLotNumber('');
    } else {
      setNoPrecious(true);
    }
    setFetching(false);
  };

  const semiPreciousData = resp => {
    if (resp.data.length) {
      routeToPostViewPage(resp.data[0]);
      setLotNumber('');
    } else {
      setNoSemiPrecious(true);
    }
    setFetching(false);
  };

  const handleEndPointError = () => {
    setLotNumber('');
    setFetching(false);
    toast.error(t('end-point-error'));
  };

  const handleSearchByLotNUmber = e => {
    e.preventDefault();
    setNoSemiPrecious(false);
    setNoPrecious(false);
    if (lotNumber && lotNumber.length) {
      setFetching(true);
      getPreciousPostsByLotNumber(lotNumber)
        .then(preciousData)
        .catch(handleEndPointError);
      getSemiPreciousPostsByLotNumber(lotNumber)
        .then(semiPreciousData)
        .catch(handleEndPointError);
    }
  };

  const handleLotNumberChange = e => {
    setLotNumber(e.target.value);
  };

  return (
    <div className="lot-number-container">
      <Form
        inline
        onSubmit={handleSearchByLotNUmber}
        className="justify-content-center"
      >
        <Input
          type="text"
          name="searchByLotNumber"
          id="searchByLotNumber"
          placeholder={t('lot-number-search')}
          style={{ width: '80%' }}
          value={lotNumber}
          onChange={handleLotNumberChange}
        />
        <Button onClick={handleSearchByLotNUmber}>
          {' '}
          {fetching ? (
            <div className="spinner-grow spinner-grow-sm" role="status"/>
          ) : (
            <i className="fa fa-search" />
          )}
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default LotNumberSearch;
