// karma.conf.js
module.exports = function (config) {
  config.set({
      frameworks: ['jasmine'],
      
      files: [
          // Webpack resolverá la ruta de los imports dentro de este archivo.
          'src/**/*.spec.js' 
      ],

      preprocessors: {
          // Aplica el preprocesador webpack a todos los archivos de prueba
          'src/**/*.spec.js': ['webpack']
      },

      webpack: {
          mode: 'development',
          // Configuración mínima de Babel para que entienda 'import'/'export'
          module: {
              rules: [
                  {
                      test: /\.js$/,
                      exclude: /node_modules/,
                      use: {
                          loader: 'babel-loader',
                          options: {
                              presets: ['@babel/preset-env'] 
                          }
                      }
                  }
              ]
          },
          target: ['web', 'es5']
      },

      reporters: ['spec'],
      browsers: ['ChromeHeadless'],
      singleRun: true,
      concurrency: Infinity
  });
};