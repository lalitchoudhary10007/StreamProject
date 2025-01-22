import messaging from '@react-native-firebase/messaging';
import {
  isFirebaseStreamVideoMessage,
  firebaseDataHandler,
  onAndroidNotifeeEvent,
  isNotifeeStreamVideoEvent
} from '@stream-io/video-react-native-sdk';
import notifee from "@notifee/react-native";

export const setFirebaseListeners = () => {
  // Set up the background message handler for
  // 1. incoming call notifications
  // 2. non-ringing notifications
  messaging().setBackgroundMessageHandler(async (msg) => {
    if (isFirebaseStreamVideoMessage(msg)) {
      await firebaseDataHandler(msg.data);
    }else {
      console.info("Push notification received", msg.data);
    }
  });

  notifee.onBackgroundEvent(async (event) => {
    if (isNotifeeStreamVideoEvent(event)) {
      await onAndroidNotifeeEvent({ event, isBackground: true });
    } else {
      // your other background notifications (if any)
    }
  });

  // Set up the foreground message handler for
  // 1. incoming call notifications
  // 2. non-ringing notifications
  messaging().onMessage((msg) => {
    if (isFirebaseStreamVideoMessage(msg)) {
      firebaseDataHandler(msg.data);
    }else{
      console.info("Push notification received", msg.data);
    }
  });
};