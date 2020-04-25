import React, { Fragment } from 'react';

// rafc
const About = () => {
  return (
    <Fragment>
      <br></br>
      <h1>About This App</h1>
      <div>
        <h3>Web client:</h3>
        <ul>
          <li>React</li>
          <li>JavaScript</li>
          <li>HTML5</li>
          <li>REST</li>
          <li>JSON</li>
          <li>Git</li>
          <li>Deployed to AWS using AWS Amplify, CI/CD</li>
        </ul>
      </div>
      <div>
        <br></br>
        <h3>AI / Machine Learning neural network server:</h3>
        <ul>
          <li>Python v3.7.7</li>
          <li>Flask</li>
          <li>Tensorflow v2</li>
          <li>Keras v2.2.4-tf</li>
          <li>Git</li>
          <li>Nginx service</li>
          <li>Gunicorn service</li>
          <li>Ubuntu AWS EC2 instance</li>
        </ul>
      </div>
      <div>
        <br></br>
        <h3>Neural network:</h3>
        <ul>
          <li>Layer 0: 784 neurons</li>
          <li>Layer 1: 128 neurons, relu activation</li>
          <li>Layer 2: 10 neurons, softmax activation</li>
          <li>Optimizer: adam</li>
          <li>Loss: sparese categorical crossentropy</li>
          <li>Metrics: accuracy</li>
          <li>Trained on 60,000 images</li>
          <li>Tested on 10,000 images with accuracy of 0.8874</li>
        </ul>
      </div>
      <br></br>
    </Fragment>
  );
};
export default About;
