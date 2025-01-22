import {
    StreamVideoClient,
    StreamVideo,
} from '@stream-io/video-react-native-sdk';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';


export default function VideoProvider({ children }: PropsWithChildren) {
    const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
        null
    );

    useEffect(() => {
        const initVideoClient = async () => {
            const user = {
                id: 'Lalit_123',
                name: 'Lalit kumar',
                image: "https://robohash.org/John",
            };
            const apiKey = 'z5meshqjyfkj';
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTGFsaXRfMTIzIn0.h8xa5fQmgBuXhrPjV24r7PmvW_W9msEq89ZA4OkD_ic';
            const client = new StreamVideoClient({ apiKey , user, token });
            setVideoClient(client);
        };

        initVideoClient();

        return () => {
            if (videoClient) {
                videoClient.disconnectUser();
            }
        };
    }, ['Lalit_123']);

    if (!videoClient) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}