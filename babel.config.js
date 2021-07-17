/* eslint-env node */

const yargs = require("yargs")

module.exports = (api) => {
  const mode = yargs.argv.mode ?? "development"
  api.cache.using(() => mode) // Cache babel config by environment

  const config = {
    plugins: [
      "react-native-web",
    ].filter(Boolean),
    presets: ["@babel/preset-typescript", "module:metro-react-native-babel-preset"],
    retainLines: true,
    sourceType: "unambiguous", // https://github.com/storybookjs/storybook/issues/3346
  }

  return config
}
