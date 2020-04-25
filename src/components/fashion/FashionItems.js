import React from 'react';
import FashionItem from './FashionItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const FashionItems = ({ images, loading }) => {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={fashionStyle}>
        {images.map(image => (
          <FashionItem key={image.fileName} fileName={image.fileName} />
        ))}
      </div>
    );
  }
};

FashionItems.propTypes = {
  images: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const fashionStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default FashionItems;
