// Names are very crucial: {mode, title}

module.exports = {
  entry : {
    index: './src/startup/index.mjs'
  },
  module : {
    rules : [
      {
        test: /\.(js|jsx|mjs)$/,
        resolve: {
          extensions: ['.web.js', '.ts', '.js', '.tsx', '.jsx', '.mjs'],
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            plugins: ['react-native-web'],
            cacheDirectory: true, // Enable caching for babel-loader
          }
        }
      },
      // Typescript loader
      {
         test: /\.(ts|tsx)$/,
         resolve: {
           extensions: ['.ts', '.js', '.tsx', '.jsx'],
         },
         exclude: /node_modules/,
         use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Skip type checking for performance
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true, // Minify HTML
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.ttf$/,
        loader: 'file-loader',
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]',
      },
    ],
  },
  
  resolve: {
    alias: {
        'react-native$': 'react-native-web',
        '../Utilities/Platform': 'react-native-web/dist/exports/Platform',
        '../../Utilities/Platform': 'react-native-web/dist/exports/Platform',
        './Platform': 'react-native-web/dist/exports/Platform',
        'react-native-linear-gradient': 'react-native-web-linear-gradient',
    }
}

}
