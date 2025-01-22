import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk';


export default function NotificationsProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const unsubscribeTokenRefreshListenerRef = useRef<() => void>();
    const videoClient = useStreamVideoClient();

    const requestPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    };

    useEffect(() => {
        // Register FCM token with stream chat server.
        const registerPushToken = async () => {

            unsubscribeTokenRefreshListenerRef.current?.();
            const token = await messaging().getToken();
            console.log("Firebase Token:- ", token);
            const push_provider = 'firebase';
            const push_provider_name = 'Firebase'; // name an alias for your push provider (optional)
            videoClient?.addDevice(token, push_provider, push_provider_name, "Lalit_123");

            // await AsyncStorage.setItem('@current_push_token', token);
            // const removeOldToken = async () => {
            //     const oldToken = await AsyncStorage.getItem('@current_push_token');
            //     if (oldToken !== null) {
            //         await client.removeDevice(oldToken);
            //     }
            // };

            unsubscribeTokenRefreshListenerRef.current = messaging().onTokenRefresh(async newToken => {
                await Promise.all([
                    //removeOldToken(),
                    videoClient?.addDevice(token, push_provider, "Lalit_123", push_provider_name),
                    //AsyncStorage.setItem('@current_push_token', newToken),
                ]);
            });

        };

        const init = async () => {
            await requestPermission();
            await registerPushToken();

            setIsReady(true);
        };

        init();
    }, []);

    if (!isReady) {
        return null;
    }

    return <>{children}</>;
}