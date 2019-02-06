// from https://tisnote.com/vue-webpack-yarn/

const path = require('path');
 
module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'www',
    port: 4000,
    inline: true
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // おまじない
    }
  }
};
