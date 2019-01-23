/**
 * @module nyc/Zoom
 */

import $ from 'jquery'

import Container from 'nyc/Container'

/**
 * @desc Abstract class for zoom and search controls
 * @public
 * @abstract
 * @class
 * @extends module:nyc/Container~Container
 * @fires module:nyc/Zoom~Zoom#geolocate
 */
class Zoom extends Container {
  /**
   * @desc  Create an instance of Zoom
   * @access protected
   * @constructor
   * @param {jQuery|Element|string} target The target
   */
  constructor(target) {
    super($(Zoom.HTML))
    $(target).append(this.getContainer())
    this.find('.btn-z-in, .btn-z-out').click($.proxy(this.zoom, this))
  }
  /**
   * @desc Handle the zoom event triggered by user interaction
   * @public
   * @abstract
   * @method
   * @param {jQuery.Event} event The event triggered by the zoom buttons
   */
  zoom(event) {
    throw 'Not implemented'
  }
}

/**
 * @desc The user has requested their geolocation
 * @event module:nyc/Zoom~Zoom#geolocate
 */

/**
 * @private
 * @const
 * @type {string}
 */
Zoom.HTML = '<div class="zoom">' +
  '<button class="btn-z-in btn-sq rad-all" data-zoom-incr="1" title="Zoom in">' +
    '<span class="screen-reader-only">Zoom in</span>' +
  '</button>' +
  '<button class="btn-z-out btn-sq rad-all" data-zoom-incr="-1" title="Zoom out">' +
    '<span class="screen-reader-only">Zoom out</span>' +
  '</button>' +
'</div>'

export default Zoom
