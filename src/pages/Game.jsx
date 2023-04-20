import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import Question from '../services/ApiQuestions';
import '../GameCss.css';

class Game extends Component {
  state = {
    quests: [],
    count: 0,
    answers: [],
    cliqued: false,
    btnenable: false,
    countdown: 30,
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
    console.log(questionApi);
    this.enableButton();
  }

  filterFunction = () => {
    const { quests, count } = this.state;
    const filters = quests.filter((element, index) => index === count);
    const filterArray = [filters[0]
      .correct_answer, ...filters[0].incorrect_answers];
    for (let i = filterArray.length - 1; i > 0; i -= i) {
      const j = Math.floor(Math.random() * (i + 1));
      [filterArray[i], filterArray[j]] = [filterArray[j], filterArray[i]];
    }
    this.setState({ answers: filterArray });
    return console.log(filterArray);
  };

  countClick = () => {
    const { count } = this.state;
    const sum = count + 1;
    this.setState({ count: sum, cliqued: false }, () => { this.filterFunction(); });
  };

  answerCLick = () => {
    this.setState({ cliqued: true, btnenable: false }, () => { this.enableButton(); });
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
      const { countdown } = this.state;
      this.setState({ countdown: countdown - 1 });
      if (countdown === 1) {
        this.setState({ btnenable: false });
        clearInterval(interval);
      }
    }, decressTimer);
  };

  render() {
    const { quests, count, answers, cliqued, btnenable, countdown } = this.state;
    // console.log(shuffle(answers));
    return (
      <div>
        <Header />
        { quests.map((e, index) => (
          // console.log(e);
          (index === count) && (
            <div key={ e.question }>
              <p data-testid="question-category">
                { e.category }
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
                        onClick={ this.answerCLick }
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
              <p>{ count }</p>
            </div>
          )
        ))}
        <p>{ countdown }</p>
        <button data-testid="btn-next" onClick={ this.countClick }>Next</button>

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
