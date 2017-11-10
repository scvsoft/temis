import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-i18n', () => ({ t: jest.fn((translation) => translation), }));

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
});
