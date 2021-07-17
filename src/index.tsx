import React from "react"
import { AppRegistry } from "react-native-web"

const App: React.FC = () => {
  return <div>test</div>
}

AppRegistry.registerComponent("App", () => App)
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root"),
})
