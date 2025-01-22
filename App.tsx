/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { HomeScreen } from './src/HomeScreen';
import { CallScreen } from './src/CallScreen';
import VideoProvider from './src/VideoProvider';
import CallProvider from './src/CallProvider';
import NotificationsProvider from './src/NotifcationsProvider';
import { navigationRef } from './src/utils/staticNavigation';

function App(): React.JSX.Element {

  return (
    <NavigationContainer ref={navigationRef}>
      <VideoProvider>
        <NotificationsProvider>
          <CallProvider>
            <SafeAreaView style={styles.container}>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{ title: 'Welcome' }}
                />
                <Stack.Screen name="CallScreen" component={CallScreen} />
              </Stack.Navigator>
            </SafeAreaView>
          </CallProvider>
        </NotificationsProvider>
      </VideoProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
