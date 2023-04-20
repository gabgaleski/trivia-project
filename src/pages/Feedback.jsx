import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';

class Feedback extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
      </div>
    );
  }
}

export default connect()(Feedback);
