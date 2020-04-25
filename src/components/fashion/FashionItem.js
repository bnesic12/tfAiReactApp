import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FashionItem = ({ fileName }) => {
  return (
    <div className='card text-center'>
      <img
        src={`${process.env.REACT_APP_FLASK_SERVER_IP}/api/images/${fileName}`}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />

      <div>
        <Link to={`/ai/${fileName}`} className='btn btn-dark btn-sm my-1'>
          Recognize
        </Link>
      </div>
    </div>
  );
};

FashionItem.propTypes = {
  fileName: PropTypes.string.isRequired,
};

export default FashionItem;
