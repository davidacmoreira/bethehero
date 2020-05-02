import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Cases from './pages/Cases';
import Detail from './pages/Detail';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShow: false }}>
                <AppStack.Screen name="cases" component={Cases} />
                <AppStack.Screen name="detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}