import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import Search from './components/pictures/Search';
import './App.css';

class App extends Component {
  state = {
    file: null,
    imagePreviewUrl: '',
    message: '',
    loading: false,
  };

  goHome = () => {
    window.location.href =
      'http://ec2-3-135-204-62.us-east-2.compute.amazonaws.com:8080/demo03-0.0.2-SNAPSHOT/bnesic12';
  };

  searchImage = () => {
    this.setState({
      loading: true,
    });

    return new Promise((resolve, reject, imageIn = this.state.file) => {
      let imageFormData = new FormData();
      console.log('Promise(): image is ' + imageIn);
      imageFormData.append('image', this.state.file);

      var xhr = new XMLHttpRequest();
      var z = this;

      xhr.open('post', 'http://127.0.0.1:5000/api/image', true);

      xhr.onload = function () {
        if (this.status === 200) {
          var msg = JSON.parse(this.response);
          console.log(
            'prediction: ' +
              msg.predictions[0].item +
              ', probability: ' +
              msg.predictions[0].probability
          );
          var prob = Math.round(msg.predictions[0].probability * 100);
          z.setState({
            message: `Fashion item is "${msg.predictions[0].item}" with probability: ${prob}%.`,
            loading: false,
          });
          resolve(this.response);
        } else {
          reject(this.statusText);
        }
      };

      xhr.send(imageFormData);
    });
  };

  onFileSelectionChange = file => {
    let reader = new FileReader();

    reader.onloadend = (progressEvent, inReader = reader) => {
      this.setState({
        file: file,
        message: '',
        imagePreviewUrl: inReader.result,
        loading: false,
        reader: inReader,
      });
    };

    reader.readAsDataURL(file);
    console.log('onChange(): reader=' + reader);
  };

  clearImage = () => {
    this.setState({
      file: '',
      imagePreviewUrl: '',
      message: '',
      loading: false,
    });
  };

  // the only required method is render()
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />

          <button className='backBtn' onClick={this.goHome}>
            <i className='fa fa-home'></i> bnesic12 Home
          </button>
        </div>
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <br></br>
                  <label>
                    <h3>Select PNG file:</h3>
                  </label>

                  <Search
                    searchImage={this.searchImage}
                    clearImage={this.clearImage}
                    showClearButton={this.state.file ? false : true}
                    imagePreviewUrl={this.state.imagePreviewUrl}
                    onFileSelectionChange={this.onFileSelectionChange}
                  />
                  <br></br>
                  <label>
                    <h3>Recognition results:</h3>
                  </label>
                  {this.state.file !== null ? (
                    <label className='container'>
                      <h4>{this.state.message}</h4>
                    </label>
                  ) : (
                    <label className='container'></label>
                  )}
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
          </Switch>

          <label className='container'>
            <br></br>
            <label>
              bnesic12, 2020, Powered by React <i className='fab fa-react' />,
              Tensorflow
            </label>
          </label>
        </div>
      </Router>
    );
  }
}

export default App;
