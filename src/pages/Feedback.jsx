import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const MAGIC_NUMBER = 3;
    return (
      <div>
        <Header />
        {
          assertions >= MAGIC_NUMBER ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({ assertions: state.player.assertions });

export default connect(mapStateToProps)(Feedback);
