import React from 'react';
import { render } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom'; // Use HashRouter for consistency
import '@testing-library/jest-dom';

// Add a simple test here if needed
test('test-utils.js is working correctly', () => {
  expect(true).toBe(true);
});

const customRender = (ui, options) =>
  render(ui, { wrapper: Router, ...options });

export * from '@testing-library/react';
export { customRender as render };
