import { useCalls } from '@stream-io/video-react-native-sdk';
import { PropsWithChildren, useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';


export default function CallProvider({ children }: PropsWithChildren) {
    const calls = useCalls();
    const call = calls[0];
    const navigation = useNavigation();
   // const segments = useSegments();
    //const isOnCallScreen = segments[1] === 'call';
  
    useEffect(() => {
      if (!call) {
        return;
      }
      if (call.state.callingState === 'ringing') {
        console.warn("Call is ringing")
        navigation.navigate('CallScreen');
      }
    }, [call]);
  
    return (
      <>
        {children}
        {call && (
          <Pressable
            onPress={() => console.warn("Call is ringing")}
            style={{
              position: 'absolute',
              backgroundColor: 'lightgreen',
              top: 70,
              left: 0,
              right: 0,
              padding: 10,
            }}
          >
            <Text>
              Call: {call.id} ({call.state.callingState})
            </Text>
          </Pressable>
        )}
      </>
    );
  }