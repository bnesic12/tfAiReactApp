import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About';
import FashionItems from './components/fashion/FashionItems';
import FashionRecog from './components/fashion/FashionRecog';
import kerasTfLogo from './components/images/kerasTfSmall.png';
import './App.css';

class App extends Component {
  state = {
    images: [], // [{"fileName": "xTrain1.png"}, {"fileName": "xTrain0.png"}]
    loading: false,
    imagePreviewUrl: '',
    message: null,
    selectedFileName: '',
    errorMsg: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const aiServer = axios.create({
      baseURL: process.env.REACT_APP_FLASK_SERVER_IP,
      timeout: 5000,
      crossOrigin: null,
    });
    /*
     * Handling Errors using async/await
     * has to be done inside an async function
     */
    try {
      const res = await aiServer.get(`/api/images`);
      this.setState({
        images: res.data.items, // {data: {..., items: [...]}}
        loading: false,
        imagePreviewUrl: '',
        message: null,
        selectedFileName: '',
        errorMsg: null,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error);
      this.setState({
        images: [],
        loading: false,
        imagePreviewUrl: '',
        message: null,
        selectedFileName: '',
        errorMsg:
          'Error accessing backend AI server. This app needs access to AI server residing at newly registered domain https://tf.aimg.bnabla.com. Please, make sure your security policy allows access to newly registered domains.',
      });
    }
  }

  // Send fileName of the image file residing already on the server and
  // that is to be used for AI recognition. This is obviously simulation
  // of real scenario where user would send arbitrary file from client
  // machine.
  // It is done to limit user's choice of PNG images to MNIST
  // set of test images given that the neural network is rather basic.
  recogFashionFile = async fileName => {
    this.setState({
      loading: true,
      imagePreviewUrl: '',
      message: null,
      errorMsg: null,
    });
    try {
      const aiServer = axios.create({
        baseURL: process.env.REACT_APP_FLASK_SERVER_IP,
        timeout: 5000,
      });

      const res = await aiServer.get(`/api/recogImage/${fileName}`);

      console.log('recogFashionFile() result=', res);

      this.setState({
        loading: false,
        imagePreviewUrl: `${process.env.REACT_APP_FLASK_SERVER_IP}/api/images/${fileName}`,
        message: res.data.predictions[0],
        error: null,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error);
      this.setState({
        images: [],
        loading: false,
        imagePreviewUrl: '',
        message: null,
        selectedFileName: '',
        errorMsg: 'Error running image recognition',
      });
    }
  };

  goHome = () => {
    window.location.href =
      'http://ec2-3-135-204-62.us-east-2.compute.amazonaws.com:8080/demo03-0.0.2-SNAPSHOT/bnesic12';
  };

  render() {
    const { loading, images, imagePreviewUrl, message, errorMsg } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <button className='backBtn' onClick={this.goHome}>
            <i className='fa fa-home'></i> bnesic12 Home
          </button>
        </div>
        <br></br>
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  {errorMsg === null ? (
                    <FashionItems loading={loading} images={images} />
                  ) : (
                    <h3>{errorMsg}</h3>
                  )}
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/ai/:fileName' // '/ai/:fileName'
              render={props => (
                <FashionRecog
                  {...props}
                  recogFashionFile={this.recogFashionFile}
                  loading={loading}
                  imagePreviewUrl={imagePreviewUrl}
                  message={message}
                />
              )}
            />
          </Switch>

          <label className='container'>
            <br></br>
            <label>
              bnesic12, 2020, Powered by React <i className='fab fa-react' />,
              Flask/Keras/Tensorflow{' '}
              <img className='navbarFooter' src={kerasTfLogo} alt='kears/tf' />
            </label>
          </label>
        </div>
      </Router>
    );
  }
}

export default App;
