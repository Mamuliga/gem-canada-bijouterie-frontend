import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { SECONDARY_COLOR } from '../../utils/constant';

const Loading = () => (
  <div className="d-flex justify-content-center m-auto spinner-container">
    <div className="sweet-loading">
      <BeatLoader size={50} color={SECONDARY_COLOR} loading />
    </div>
  </div>
);

export default Loading;
