import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
    Call, StreamCall,
    useStreamVideoClient,
    useCallStateHooks,
    CallingState,
    CallContent,
    IncomingCall,
    OutgoingCall,
    useCall,
    RingingCallContent,
    useCalls,
} from '@stream-io/video-react-native-sdk';


export const CallScreen = ({navigation}) => {
    const calls = useCalls();
    const call = calls[0];
  
    if (!call) {
        () => navigation.goBack()
        return null;
      }

    return (
        <StreamCall call={call}>
            {/* <View style={styles.container}> */}
                {/* <Text style={styles.text}>Here we will add Video Calling UI</Text>
                <Button title="Go back" onPress={goToHomeScreen} />
                <ParticipantCountText />
                <CallContent
                    onHangupCallHandler={goToHomeScreen}
                /> */}
                <RingingCallContent />
            {/* </View> */}
        </StreamCall>
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