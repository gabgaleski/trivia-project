import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import Question from '../services/ApiQuestions';

class Game extends Component {
  state = {
    quests: [],
    count: 0,
    answers: [],
  };

  async componentDidMount() {
    const questionApi = await Question();
    if (questionApi.response_code === 0) {
      this.setState({ quests: questionApi.results }, () => {
        this.filterFunction();
      });
    } else {
      this.setState({ quests: [] }, () => {
        const { history } = this.props;
        localStorage.removeItem('token');
        history.push('/');
      });
    }
    console.log(questionApi);
  }

  filterFunction = () => {
    const { quests, count } = this.state;
    const filters = quests.filter((element, index) => index === count);
    const filterArray = [filters[0].correct_answer, ...filters[0].incorrect_answers];
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
    this.setState({ count: sum });
  };

  render() {
    const { quests, count, answers } = this.state;
    // console.log(shuffle(answers));
    return (
      <div>
        <Header />
        { quests.map((e, index) => {
          // console.log(e);
          if (index === count) {
            return (
              <div key={ e.question }>
                <p data-testid="question-category">
                  { e.category }
                </p>
                <p data-testid="question-text">
                  {e.question}
                </p>
                {/* <div data-testid="answer-options">
                  <button
                    data-testid="correct-answer"
                    onClick={ this.countClick }
                  >
                    { e.correct_answer }
                  </button>
                  {e.incorrect_answers.map((el, i) => (
                    <button
                      data-testid={ `wrong-answer-${i}` }
                      key={ el }
                      onClick={ this.countClick }
                    >
                      {el}
                    </button>
                  ))}
                </div> */}
                <div data-testid="answer-options">
                  { answers.map((element, i) => {
                    if (element === e.correct_answer) {
                      return (
                        <button
                          key={ i }
                          data-testid="correct-answer"
                          onClick={ this.countClick }
                        >
                          { element }
                        </button>
                      );
                    }
                    return (
                      <button
                        key={ `wrong-answer-${i}` }
                        data-testid={ `wrong-answer-${i}` }
                        onClick={ this.countClick }
                      >
                        {element}
                      </button>
                    );
                  })}
                </div>
                <p>{ count }</p>
              </div>
            );
          } return console.log('oi');
        }) }

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
