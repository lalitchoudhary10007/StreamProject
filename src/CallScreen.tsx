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


export const CallScreen = ({ navigation }) => {
    const calls = useCalls();
    const call = calls[0];
    const isCallCreatedByMe = call?.isCreatedByMe;
    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (!call) {
        () => navigation.goBack()
        return null;
    }

    if (callingState == CallingState.LEFT || callingState == CallingState.UNKNOWN) {
        () => navigation.goBack()
    }

    return (
        <StreamCall call={call}>
            <View style={styles.container}>
                <Text style={styles.text}>{"state:- " + callingState}</Text>
                <Text style={styles.text}>{"call created:- " + isCallCreatedByMe}</Text>
                <RingingCallContent />
            </View>
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