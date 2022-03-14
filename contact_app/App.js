import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import EditContact from './src/EditContact';
import AddContact from './src/AddContact';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AddContact' component={AddContact} />
        <Stack.Screen name='EditContact' component={EditContact} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
  