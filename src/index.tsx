import React, { useCallback, useRef, useState } from "react"
import { AppRegistry } from "react-native-web"

import {
  NavigationContainer,
  NavigationContainerRef,
  NavigationState,
  getPathFromState,
  useNavigation,
} from "@react-navigation/native"
import { StackHeaderProps, createStackNavigator } from "@react-navigation/stack"

enum Routes {
  first = "first",
  second = "second",
}

type RouteParams = {
  [Routes.first]?: undefined
  [Routes.second]: { key }
}

const Stack = createStackNavigator<RouteParams>()

const FirstScreen: React.FC = () => {
  const { navigate } = useNavigation()
  const handleNavigate = useCallback(() => {
    navigate(Routes.second, { key: "test" })
  }, [])
  return (
    <div style={{ display: "flex" }}>
      <button onClick={handleNavigate} style={{ margin: "auto" }}>
        Nav To Second
      </button>
    </div>
  )
}

const SecondScreen: React.FC = () => {
  const { navigate } = useNavigation()
  const [navIndex, setNavIndex] = useState(0)
  const handleNavigate = useCallback(() => {
    setNavIndex((curNavIndex) => {
      navigate(Routes.second, { key: curNavIndex })
      return curNavIndex + 1
    })
  }, [])

  const handleBack = useCallback(() => {
    history.back()
  }, [])

  return (
    <div style={{ display: "flex" }}>
      <button onClick={handleNavigate} style={{ margin: "auto" }}>
        Nav Within Second: Click this a bunch of times
      </button>
      <button onClick={handleBack} style={{ margin: "auto" }}>
        BackButton: Click this after clicking the other button a few times
      </button>
      <span>
        Bug: No matter what you do within the SecondScreen clicking back will
        always take you back to the first screen.
      </span>
    </div>
  )
}

const App: React.FC = () => {
  const navigationRef = useRef<NavigationContainerRef>(null)

  return (
    <div>
      <NavigationContainer
        linking={{
          config: {
            screens: {
              [Routes.first]: {
                path: "",
              },
              [Routes.second]: {
                path: "second/:key",
              },
            },
          },
          prefixes: ["http://localhost:9999"],
        }}
        ref={navigationRef}
      >
        <Stack.Navigator initialRouteName={Routes.first}>
          <Stack.Screen component={FirstScreen} name={Routes.first} />
          <Stack.Screen component={SecondScreen} name={Routes.second} />
        </Stack.Navigator>
      </NavigationContainer>
    </div>
  )
}

AppRegistry.registerComponent("App", () => App)
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root"),
})
