import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Register, Login, Home} from '../screens';
export default function Router() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
