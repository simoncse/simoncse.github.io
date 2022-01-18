const path = require('path');
module.exports = {
    entry: {
        index: path.resolve(__dirname, 'js/index.js')
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js'
    }
}