import HtmlPlugin from "html-webpack-plugin"
import  path from "path"
import { Configuration,  RuleSetRule} from "webpack"
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server"


const ROOT_PATH = __dirname
const outputPath = path.join(ROOT_PATH)

// ============================================
// The function that returns the webpack config
// ============================================
const configFactory = (
  env: unknown,
  _argv: unknown,
  appFileExtensions: string[] = [],
): Configuration => {

    process.env.NODE_ENV =  "development"


  // ==================
  // Rule definitions
  // ==================
  const babelRule: RuleSetRule = {
    test: /\.(js|jsx|ts|tsx)$/,
    use: {
      loader: "babel-loader",
      options: {
        cacheCompression: false,
        cacheDirectory: true,
      },
    },
  }

  const htmlPlugin = new HtmlPlugin({
    template: path.join(ROOT_PATH, "src/index.ejs"),
    templateParameters: {
      cssPath: undefined,
      scriptPath: undefined,
    },
  })


  const config: Configuration & { devServer: WebpackDevServerConfiguration } = {
    devServer: {
      compress: true,
      historyApiFallback: true,
      host: "0.0.0.0",
      hot: true,
    },
    devtool: "source-map" ,
    entry: ROOT_PATH,
    module: {
      rules: [babelRule],
    },
    output: {
      chunkFilename: "js/[name].[contenthash].chunk.js",
      filename: "js/[name].[contenthash].js",
      path: outputPath,
      publicPath: "/", // Ensures all assets are resolved relative to the root
      sourceMapFilename: "[file].map[query]",
    },
    plugins: [
      htmlPlugin, // has to precede pwaManifestPlugin to have manifest injected
    ],
    resolve: {
      alias: {
        "react-native$": "react-native-web", // For node modules that import react-native
      },
      extensions: appFileExtensions.concat([
        ".web.tsx",
        ".web.ts",
        ".tsx",
        ".ts",
        ".web.js",
        ".web.jsx",
        ".js",
        ".jsx"
      ]),
      modules: [path.join(ROOT_PATH, "src"), path.join(ROOT_PATH, "node_modules")],
    },
  }

  return config
}

export default configFactory
