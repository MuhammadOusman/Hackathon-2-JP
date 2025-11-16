import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './src/navigation';
import {colors} from './src/theme';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Navigation />
    </>
  );
}

export default App;
