import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class FashionRecog extends Component {
  componentDidMount() {
    // match.params.fileName corresponds to URI of this page
    // defined with '/ai/:fileName' in Route in App.js
    this.props.recogFashionFile(this.props.match.params.fileName);
    //this.props.recogFashionFile(this.props.selectedFileName);
  }

  render() {
    const { loading, imagePreviewUrl, message } = this.props;

    if (loading) {
      return <Spinner />;
    } else {
      if (imagePreviewUrl === '') {
        return (
          <div className='container'>
            <br></br>
            <Fragment>
              <Link to='/' className='btn btn-light btn-block'>
                {' '}
                Back to Fashion Items
              </Link>
              <div className='card grid-1'>
                <div className='all-center'>
                  <h3>Invalid image selection</h3>
                </div>
              </div>
            </Fragment>
          </div>
        );
      }
      return (
        <div className='container'>
          <br></br>
          <Fragment>
            <Link to='/' className='btn btn-light btn-block'>
              {' '}
              Back to Fashion Items
            </Link>
            <div className='card grid-1'>
              <div className='all-center'>
                <img
                  src={imagePreviewUrl}
                  alt='fashion item'
                  style={{ width: '150px' }}
                />
                <h3>Fashion item: {message.item}</h3>
                <h3>Probability: {message.probability}</h3>
              </div>
            </div>
            <br></br>
          </Fragment>
        </div>
      );
    }
  }
}

FashionRecog.propTypes = {
  loading: PropTypes.bool.isRequired,
  imagePreviewUrl: PropTypes.string.isRequired,
};

export default FashionRecog;
