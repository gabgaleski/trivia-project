import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../component/Header';
import { saveRank } from '../redux/actions';

class Feedback extends Component {
  // state = {
  //   image: '',
  //   name: '',
  //   score: 0,
  // };

  componentDidMount() {
    const { name, score, dispatch } = this.props;
    const image = this.imageGravatar();
    // this.setState({
    //   image,
    //   name,
    //   score,
    // }, () => {
    dispatch(saveRank({ name, score, image }));
    // });
  }

  imageGravatar = () => {
    const { email } = this.props;
    const md = md5(email).toString();
    const link = (`https://www.gravatar.com/avatar/${md}`);
    return link;
  };

  rankingFunc = () => {
    const { history, rank } = this.props;
    // const saveRank = [];
    localStorage.setItem('ranking', JSON.stringify(rank));
    history.push('/ranking');
  };

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
          onClick={ this.rankingFunc }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  rank: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  email: state.reducer.login.email,
  name: state.reducer.login.name,
  rank: state.player.rank,
});

export default connect(mapStateToProps)(Feedback);
