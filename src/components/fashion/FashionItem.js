import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FashionItem = ({ fileName }) => {
  return (
    <div className='card text-center'>
      <img
        //src={`http://127.0.0.1:5000/api/images/${fileName}`}
        src={`https://15.223.107.254/api/images/${fileName}`}
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
  //recogFashion: PropTypes.func.isRequired
};

export default FashionItem;
