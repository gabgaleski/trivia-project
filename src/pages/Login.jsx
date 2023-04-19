import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  state = {
    Email: '',
    Name: '',
  };

  handeChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { Email, Name } = this.state;
    const verifyButton = Email.length > 0 && Name.length > 0;
    return (
      <form>
        <input
          onChange={ this.handeChange }
          name="Email"
          value={ Email }
          data-testid="input-gravatar-email"
          type="email"
          placeholder="Email:"
        />
        <input
          onChange={ this.handeChange }
          name="Name"
          value={ Name }
          data-testid="input-player-name"
          type="text"
          placeholder="Nome:"
        />
        <button
          disabled={ !verifyButton }
          data-testid="btn-play"
          type="button"
        >
          Play
        </button>
      </form>
    );
  }
}

export default connect()(Login);
