import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import AppStyles from './App.styles';
import {PostAuthStack, PreAuthStack} from './stacks';

const App: FC = () => {
  return (
    <NavigationContainer>
      <PreAuthStack />
      <PostAuthStack />
    </NavigationContainer>
  );
};

export default App;
