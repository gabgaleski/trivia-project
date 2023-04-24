import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
    const MAGIC_NUMBER = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        {
          assertions >= MAGIC_NUMBER ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>
        }
        <button
          data-testid="btn-play-again"
          onClick={ () => { history.push('/'); } }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => { history.push('/ranking'); } }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions, score: state.player.score });

export default connect(mapStateToProps)(Feedback);
