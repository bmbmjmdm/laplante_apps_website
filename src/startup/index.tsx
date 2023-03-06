import './index.css';
import App from '../Navigation';
// @ts-ignore-next-line
import { AppRegistry } from "react-native";

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});
