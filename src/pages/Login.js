import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import urlToken from '../services/Apiresult';
import { addEmail } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
  };

  handeChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  clickButton = async () => {
    const returnToken = await urlToken();
    localStorage.setItem('token', returnToken);
    const { history, dispatch } = this.props;
    dispatch(addEmail(this.state));
    history.push('/game');
  };

  clickSetting = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { email, name } = this.state;
    const verifyButton = email.length > 0 && name.length > 0;
    return (
      <form>
        <input
          onChange={ this.handeChange }
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          type="email"
          placeholder="Email:"
        />
        <input
          onChange={ this.handeChange }
          name="name"
          value={ name }
          data-testid="input-player-name"
          type="text"
          placeholder="Nome:"
        />
        <button
          disabled={ !verifyButton }
          onClick={ this.clickButton }
          data-testid="btn-play"
          type="button"
        >
          Play
        </button>
        <button
          onClick={ this.clickSetting }
          type="button"
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(withRouter(Login));
