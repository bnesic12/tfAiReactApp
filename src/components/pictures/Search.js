import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Search extends Component {
  /*
  state = {
    file: '',
    message: '',
    imagePreviewUrl: '',
    reader: null,
  };
*/
  static propTypes = {
    searchImage: PropTypes.func.isRequired,
    clearImage: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.searchImage();
  };

  onChange = e => {
    console.log('Search.onChange(): ' + e.target.value);
    e.preventDefault();
    this.props.onFileSelectionChange(e.target.files[0]);
  };

  render() {
    let $imagePreview = null;
    if (this.props.imagePreviewUrl !== '') {
      $imagePreview = React.createElement('img', {
        src: this.props.imagePreviewUrl,
      });
    } else {
      $imagePreview = React.createElement(
        'div',
        { className: 'previewText' },
        'Please select an Image for Preview'
      );
    }
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'form',
        { onSubmit: e => this.onSubmit(e) },
        React.createElement('input', {
          className: 'form',
          type: 'file',
          onChange: e => this.onChange(e),
        }),
        React.createElement(
          'button',
          {
            className: 'btn btn-dark btn-block',
            type: 'submit',
            onClick: e => this.onSubmit(e),
          },
          'Recognize Image'
        )
      ),
      React.createElement('div', { className: 'imgPreview' }, $imagePreview)
      //React.createElement('span', {}, this.state.message)
    );
  }
}

export default Search;
