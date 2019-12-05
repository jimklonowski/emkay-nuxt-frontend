/**
 * Azure Functions can sometimes share a global scope to save memory (More than one function runs in the same interpreter).
 * When this occurs, babel will try to load twice. This is bad.
 *
 * This file acts as a mediator to prevent it loading twice and always logs the result for my interest.
 * Inside my webpack.config.js, instead of 'babel-polyfill', I have 'src/polyfill/babel' (this file).
 */
if (global._babelPolyfill) {
  /* Polyfill is already loaded */
  if (console && console.warn) {
    console.warn('Babel Polyfill exits in this shared global scope. I will not load it.')
  }
} else {
  /* Polyfill is already loaded */
  if (console && console.warn) {
    console.warn('Babel Polyfill is not present in this shared global scope. Loading it.')
  }
  require('babel-polyfill')
}
