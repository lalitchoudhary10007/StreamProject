import React from 'react';
import {Text, Button, StyleSheet, View} from 'react-native';
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk';


  export const HomeScreen = ({navigation}) => {

    const videoClient = useStreamVideoClient();

    const joinCall = async () => {
      const callId = 'appointment_0145';
      const call = videoClient?.call('default', callId);
      await call?.getOrCreate({
        ring: true,
        data: {
          members: [{ user_id: "Lalit_123" }, { user_id: "Doctor_123" }],
        },
      });
    };

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Video Calling Tutorial</Text>
        <Button title="Join Video Call" onPress={joinCall} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    text: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
  });