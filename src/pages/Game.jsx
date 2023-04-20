import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import Question from '../services/ApiQuestions';
import '../GameCss.css';
import { scoreDispatch } from '../redux/actions';

class Game extends Component {
  state = {
    quests: [],
    count: 0,
    answers: [],
    cliqued: false,
    btnenable: false,
    countdown: 30,
    btnnext: false,
  };

  async componentDidMount() {
    const questionApi = await Question();
    if (questionApi.response_code === 0) {
      this.setState({ quests: questionApi.results }, () => {
        this.filterFunction();

        this.countdownFunction();
      });
    } else {
      this.setState({ quests: [] }, () => {
        const { history } = this.props;
        localStorage.removeItem('token');
        history.push('/');
      });
    }
    this.enableButton();
  }

  filterFunction = () => {
    const { quests, count } = this.state;
    const { history } = this.props;
    const filters = quests.filter((element, index) => index === count);
    const MAX_NUMBER = 5;
    if (count === MAX_NUMBER) {
      history.push('/feedback');
    } else {
      const filterArray = [filters[0]
        .correct_answer, ...filters[0].incorrect_answers];
      for (let i = filterArray.length - 1; i > 0; i -= i) {
        const j = Math.floor(Math.random() * (i + 1));
        [filterArray[i], filterArray[j]] = [filterArray[j], filterArray[i]];
      }
      this.setState({ answers: filterArray });
    }
  };

  countClick = () => {
    const { count } = this.state;
    const sum = count + 1;
    this.setState({ count: sum, cliqued: false, countdown: 30, btnnext: false }, () => {
      this.filterFunction();
    });
  };

  answerCLick = () => {
    this.setState(
      { cliqued: true, btnenable: false, btnnext: true },
      () => { this.enableButton(); },
    );
    // this.point();
  };

  rightAnswerCLick = (param) => {
    this.setState(
      { cliqued: true, btnenable: false, btnnext: true },
      () => { this.enableButton(); },
    );
    this.point(param);
  };

  point = (element) => {
    const { countdown } = this.state;
    const { dispatch } = this.props;
    let sum = 0;
    if (element === 'easy') {
      sum = 1;
    }
    if (element === 'medium') {
      sum = 2;
    }
    if (element === 'hard') {
      const magicnum = 3;
      sum = magicnum;
    }
    const magic = 10;
    const soma = magic + (countdown * sum);
    dispatch(scoreDispatch(soma));
  };

  enableButton = () => {
    const timer = 5000;
    setTimeout(() => {
      this.setState({ btnenable: true });
    }, timer);
  };

  countdownFunction = () => {
    const decressTimer = 1000;
    const interval = setInterval(() => {
      this.setState((prevState) => ({ countdown: prevState.countdown - 1 }), () => {
        const { countdown } = this.state;
        if (countdown <= 0) {
          this.setState({ btnenable: false });
          clearInterval(interval);
        }
      });
    }, decressTimer);
  };

  render() {
    const { quests, count, answers, cliqued, btnenable, countdown, btnnext } = this.state;
    const { score } = this.props;
    return (
      <div>
        <Header />
        { quests.map((e, index) => (
          (index === count) && (
            <div key={ e.question }>
              <p data-testid="question-category">
                { e.category }
              </p>
              <p>
                { e.difficulty }
              </p>
              <p data-testid="question-text">
                {e.question}
              </p>
              <div className="container-button" data-testid="answer-options">
                { answers.map((element, i) => {
                  if (element === e.correct_answer) {
                    return (
                      <button
                        disabled={ !btnenable }
                        className={ cliqued ? 'correct' : 'default' }
                        key={ i }
                        data-testid="correct-answer"
                        onClick={ () => { this.rightAnswerCLick(e.difficulty); } }
                      >
                        { element }
                      </button>
                    );
                  }
                  return (
                    <button
                      disabled={ !btnenable }
                      className={ cliqued ? 'incorrect' : 'default' }
                      key={ `wrong-answer-${i}` }
                      data-testid={ `wrong-answer-${i}` }
                      onClick={ this.answerCLick }
                    >
                      {element}
                    </button>
                  );
                })}
              </div>
            </div>
          )
        ))}
        <p>{ score }</p>
        <p>{ countdown }</p>
        {
          btnnext && (
            <button
              data-testid="btn-next"
              onClick={ this.countClick }
            >
              Next
            </button>
          )
        }

      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({ score: state.player.score });

export default connect(mapStateToProps)(Game);
