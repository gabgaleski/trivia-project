import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Header from '../component/Header';

class Ranking extends Component {
  state = {
    rank: [],
  };

  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ rank: storage });
  }

  render() {
    const { history } = this.props;
    const { rank } = this.state;
    const ranksort = rank.sort((a, b) => (b.score - a.score));
    // console.log(ranksort);
    return (
      <div>
        {/* <Header /> */}
        <h1 data-testid="ranking-title"> Ranking</h1>
        <button
          data-testid="btn-go-home"
          onClick={ () => { history.push('/'); } }
        >
          Tela Inicial
        </button>
        { ranksort.map((e, index) => (
          <div key={ index }>
            <img src={ e.image } alt={ e.name } />
            <p data-testid={ `player-name${index}` }>{e.name}</p>
            <p data-testid={ `player-score${index}` }>{e.score}</p>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.reducer.login.name,
  email: state.reducer.login.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
