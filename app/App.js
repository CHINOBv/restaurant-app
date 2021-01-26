import 'react-native-gesture-handler';
import React from 'react';

import {StatusBar, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SummaryOrder from './views/SummaryOrder';
import Menu from './views/Menu';
import DishDetail from './views/DishDetail';
import NewOrder from './views/NewOrder';
import OrderProgress from './views/OrderProgress';

import FirebaseState from './context/firebase/firebaseState';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FirebaseState>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="NewOrder"
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#ED9F12',
              },
              headerTintColor: '#212837',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            <Stack.Screen
              name="NewOrder"
              component={NewOrder}
              options={{title: 'New Order'}}
            />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="DishDetail" component={DishDetail} />
            <Stack.Screen name="OrderProgress" component={OrderProgress} />
            <Stack.Screen name="SummaryOrder" component={SummaryOrder} />
          </Stack.Navigator>
        </NavigationContainer>
      </FirebaseState>
    </>
  );
};

export default App;
