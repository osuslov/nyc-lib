/**
 * @module nyc/ol/source/AutoLoad
 */

import $ from 'jquery'

import OlSourceVector from 'ol/source/vector'

const fetch = window.fetch || require('node-fetch')

export default class AutoLoad extends OlSourceVector {
  constructor(options) {
    options.loader = () => {}
    super(options)
    this.autoLoadOptions = options
  }
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
