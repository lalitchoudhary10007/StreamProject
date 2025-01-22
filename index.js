/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setPushConfig } from "./src/utils/setPushConfig";
import { setFirebaseListeners } from "./src/utils/setFirebaseListeners";

setPushConfig();
setFirebaseListeners();

AppRegistry.registerComponent(appName, () => App);
