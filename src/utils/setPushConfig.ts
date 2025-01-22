import {
    StreamVideoClient,
    StreamVideoRN,
    onAndroidNotifeeEvent,
    isNotifeeStreamVideoEvent,
    oniOSNotifeeEvent,
} from '@stream-io/video-react-native-sdk';
import { AndroidImportance } from '@notifee/react-native';
import { Platform } from 'react-native';
import notifee from '@notifee/react-native';
import { setFirebaseListeners } from './setFirebaseListeners';

export function setPushConfig() {
    StreamVideoRN.setPushConfig({
        ios: {
            pushProviderName: 'rn-apn-video',
        },
        android: {
            pushProviderName: 'Firebase',
            callChannel: {
                id: 'stream_incoming_call',
                name: 'Call notifications',
                importance: AndroidImportance.HIGH,
                sound: 'default',
            },
            incomingCallChannel: {
                id: 'stream_incoming_call_channel_update2',
                name: 'Incoming call notifications',
                importance: AndroidImportance.HIGH,
            },
            incomingCallNotificationTextGetters: {
                getTitle: (createdUserName: string) =>
                    `Incoming call from ${createdUserName}`,
                getBody: (_createdUserName: string) => 'Tap to open the call',
            },
            callNotificationTextGetters: {
                getTitle(type, createdUserName) {
                    if (type === 'call.live_started') {
                        return `Call went live, it was started by ${createdUserName}`;
                    } else {
                        return `${createdUserName} is notifying you about a call`;
                    }
                },
                getBody(_type, _createdUserName) {
                    return 'Tap to open the call';
                },
            },
        },
        createStreamVideoClient,
    });

    setFirebaseListeners();
    if (Platform.OS === 'android') {
        // on press handlers of background notifications
        notifee.onBackgroundEvent(async (event) => {
            if (isNotifeeStreamVideoEvent(event)) {
                await onAndroidNotifeeEvent({ event, isBackground: true });
            }
        });
        // on press handlers of foreground notifications
        notifee.onForegroundEvent((event) => {
            if (isNotifeeStreamVideoEvent(event)) {
                onAndroidNotifeeEvent({ event, isBackground: false });
            }
        });
    }
    if (Platform.OS === 'ios') {
        // on press handlers of foreground notifications for iOS
        // note: used only for non-ringing notifications
        notifee.onForegroundEvent((event) => {
            if (isNotifeeStreamVideoEvent(event)) {
                oniOSNotifeeEvent({ event, isBackground: false });
            }
        });
    }
}

/**
 * Create a StreamVideoClient instance with the user details from mmkvStorage.
 * This is used to create a video client for incoming calls in the background on a push notification.
 */
const createStreamVideoClient = async () => {
    const userId = 'Lalit_123';
    const userName = 'Lalit kumar';
    const userImageUrl = "https://robohash.org/John"

    if (!userId || !userImageUrl) {
        return undefined;
    }
    const user = {
        id: userId,
        name: userName,
        imageUrl: userImageUrl,
    };
    const apiKey = 'z5meshqjyfkj';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTGFsaXRfMTIzIn0.h8xa5fQmgBuXhrPjV24r7PmvW_W9msEq89ZA4OkD_ic';
    const client = StreamVideoClient.getOrCreateInstance({
        apiKey,
        user,
        token,
        options: { logLevel: 'warn' },
    });
    return client;
};