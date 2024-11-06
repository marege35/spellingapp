import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './MainPage';
import AlphabetPage from './AlphabetPage';
import ToOrdTabellPage from './To_ord_tabell';
import Trebokstaver from './Trebokstaver';
import LetterRecognitionGame from './LetterRecognitionGame';LetterRecognitionGame

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="AlphabetPage" component={AlphabetPage} />
        <Stack.Screen name="ToOrdTabell" component={ToOrdTabellPage} />
        <Stack.Screen name="Trebokstaver" component={Trebokstaver} />
        {/* Add a screen for the lesetrening component */}
        <Stack.Screen name="LetterRecognitionGame" component={LetterRecognitionGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
