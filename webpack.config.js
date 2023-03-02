// Names are very crucial: {mode, title}

module.exports = {
  entry : {
    index: './src/index.tsx'
  },
  module : {
    rules : [
      {
        test: /\.(js|jsx)$/,
        resolve: {
          extensions: [ '.ts', '.js', '.tsx', '.jsx'],
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          }
        }
      },
      // Typescript loader
      {
         test: /\.(ts|tsx)$/,
         resolve: {
           extensions: [ '.ts', '.js', '.tsx', '.jsx'],
         },
         exclude: /node_modules/,
         use: ["ts-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader"
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
    ],
  },
  
  resolve: {
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },
  },

}
