# Repo for react-navigate web history bug

With the current setup in `useLinking.web` it is not possible to navigate within a single page while adding each navigation to history. This repository highlights this issue.

To reproduce:

1. Run `yarn install`
2. Run `yarn start`
3. Visit `http://localhost:9999` to arrive on `FirstScreen`
4. Click `Nav To Second` to arrive on `SecondScreen`
5. Click `Nav Within Second`. This simulates a navigation that should be added to the browser history
6. Click `BackButton` or the browser's back button. You will arrive on `FirstScreen`, no matter how many times `Nav Within Second` was pressed