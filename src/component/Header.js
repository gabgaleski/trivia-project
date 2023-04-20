import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  imageGravatar = () => {
    const { email } = this.props;
    const md = md5(email).toString();
    const link = (`https://www.gravatar.com/avatar/${md}`);
    return link;
  };

  render() {
    const { name, score } = this.props;
    const image = this.imageGravatar();
    return (
      <header>
        <img src={ image } alt="..." data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">{name}</h4>
        <h3 data-testid="header-score">{score}</h3>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.reducer.login.name,
  email: state.reducer.login.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
