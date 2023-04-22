import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login'
import { act } from 'react-dom/test-utils';

jest.mock('../services/Apiresult');
jest.spyOn(window.localStorage.__proto__, 'setItem');

describe('Testa o componente Login.js', () => {
  
  it('Testa se os inputs e os buttons são renderizados', () => {
    renderWithRouterAndRedux(<Login />)
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    });
    const buttonSetings = screen.getByRole('button', {
      name: /configurações/i
    });
    
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    expect(buttonPlay).toBeInTheDocument()
    expect(buttonSetings).toBeInTheDocument()
  })

  it('testa se o estado é atualizado quando os inputs são preenchidos', () => {
    renderWithRouterAndRedux(<Login />)
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    userEvent.type(inputName, 'test');
    userEvent.type(inputEmail, 'test@trybe.com');
    expect(inputName.value).toBe('test');
    expect(inputEmail.value).toBe('test@trybe.com');
  })
  
  it('testa se a ação é executada corretamente quando o button play é clicado', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const playButton = screen.getByRole('button', {
      name: /play/i
    });
    
    userEvent.type(inputName, 'test');
    userEvent.type(inputEmail, 'test@trybe.com');
    userEvent.click(playButton);
    act(() => {
      history.push('/game');
    });
    expect(history.location.pathname).toBe('/game')
    
  })
  
  it('testa a função clickButton', async () => {
    const { history } = renderWithRouterAndRedux(<Login/>)
    
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const playButton = screen.getByRole('button', {
      name: /play/i
    });
    userEvent.type(inputName, 'test');
    userEvent.type(inputEmail, 'test@trybe.com');
    userEvent.click(playButton);

    await waitFor(() => expect(window.localStorage.__proto__.setItem).toHaveBeenCalled());

    expect(history.location.pathname).toBe('/game');
  })

  it('testa a função clickSettings', () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    
    const buttonSetings = screen.getByRole('button', {
      name: /configurações/i
    });

    userEvent.click(buttonSetings);

    expect(history.location.pathname).toBe('/config');

  })
});
