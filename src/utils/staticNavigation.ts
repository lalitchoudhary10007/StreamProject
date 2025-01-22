import { createNavigationContainerRef } from "@react-navigation/native";

//import { RootStackParamList } from "../navigation/types";

type RootStackParamList = {
    Home: undefined;
    CallScreen: undefined;
  };

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * This is used to run the navigation logic from root level even before the navigation is ready
 */
export const staticNavigate = (
  ...navigationArgs: Parameters<typeof navigationRef.navigate>
) => {
  // note the use of setInterval, it is responsible for constantly checking if requirements are met and then navigating
  const intervalId = setInterval(async () => {
    // run only when the navigation is ready and add any other requirements (like authentication)
    if (navigationRef.isReady() && GlobalState.hasAuthentication) {
      clearInterval(intervalId);
      navigationRef.navigate(...navigationArgs);
    }
  }, 300);
};