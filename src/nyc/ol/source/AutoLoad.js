/**
 * @module nyc/ol/source/AutoLoad
 */

import $ from 'jquery'

import OlSourceVector from 'ol/source/vector'

require('es6-promise').polyfill()
require('isomorphic-fetch')

/**
 * @desc Class to auto load all features from a URL
 * @public
 * @class
 * @extends {ol.source.Vector}
 */
export default class AutoLoad extends OlSourceVector {
  /**
   * @desc Creates an instance of AutoLoad
   * @public
   * @constructor
   * @extends {ol.source.Vector}
   * @param {Object} options
   */
  constructor(options) {
    options.loader = () => {
      console.warn('Use autoLoad to load features')
    }
    super(options)
    this.autoLoadOptions = options
  }
  /**
   * @desc Load all features
   * @public
   * @method
   * @return {Promise} features
   */
  autoLoad() {
    const options = this.autoLoadOptions
    const format = this.getFormat()
    return new Promise((resolve, reject) => {
      fetch(options.url).then((respose) => {
        return respose.text()
      }).then((resposeText) => {
        const features = format.readFeatures(resposeText)
        this.addFeatures(features)
        this.set('autoload-complete', true)
        resolve(features)
      })
    })
  }
}
