import React from 'react';
import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {BrowserRouter} from 'react-router-dom'

import '@testing-library/jest-dom'

import App from './app'

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

test('full app rendering/navigating', async () => {
  const history = createMemoryHistory()
  render(
    <BrowserRouter location={history.location} navigator={history}>
      <App />
    </BrowserRouter>,
  )
  const user = userEvent.setup()
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByText(/Boost your Productivity/i)).toBeInTheDocument()

  await user.click(screen.getByText(/Sign In/i))

  // check that the content changed to the new page
  expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument()
})
