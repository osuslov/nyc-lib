/**
 * @module nyc/Directions
 */

/**
 * @desc Provides directions using google maps
 * @public
 * @class
 * @extends {module:nyc/EventHandling~EventHandling}
 * @constructor
 * @param {(string|Element|JQuery)} mapTarget The HTML DOM element on which to render the map for displaying the direction routes
 * @param {(string|Element|JQuery)} routeTarget The HTML DOM element in list route descriptions
 * @param {string} [url={@link module:nyc/Directions~Directions.DEFAULT_GOOGLE_URL}] The Google Maps URL to use
 */
class Directions extends EventHandling {
  /**
   * @desc Provides directions using google maps
   * @public
   * @constructor
   * @param {JQuery|string|Element} mapTarget The HTML DOM element on which to render the map for displaying the direction routes
   * @param {string} [url={@link module:nyc/Directions~Directions.DEFAULT_GOOGLE_URL}] The Google Maps URL to use
   */
  constructor(mapTarget, url) {
    /**
     * @private
     * @member {google.maps.Map}
     */
    this.map = null
    /**
     * @private
     * @member {google.maps.DirectionsService}
     */
    this.service = null
    /**
     * @private
     * @member {google.maps.DirectionsRenderer}
     */
    this.renderer = null
    /**
     * @private
     * @member {module:nyc/Directions~Directions.Request}
     */
    this.args = null
    /**
     * @private
     * @member {string}
     */
	  this.modeBtn = '#mode-transit'
    me.routeTarget = routeTarget
    me.url = (url || Directions.GOOGLE_URL) + '&callback=directions.init'
    global.directions = this
    $('.dir-mode-btn').click($.proxy(me.mode, me))
    $('#fld-from input').keypress(function(e) {
      if (e.keyCode == 13) {
        me.args.from = $('#fld-from input').val()
        me.directions(me.args)
      }
    })
    $("#dir-toggle a").click(function(e) {
      $("#dir-toggle a").removeClass("ui-btn-active")
      $(e.target).addClass("ui-btn-active")
      $("#dir-panel").slideToggle()
    })
  }
	/**
	 * @desc Get directions
	 * @public
	 * @method
	 * @param {module:nyc/Directions~Directions.Request} args The arguments describing the requested directions
	 */
	directions(args) {
		var me = this, mode = args.mode || 'TRANSIT'
		me.args = args
		if (!this.map) {
			setTimeout(function() {
				$.getScript(me.url)
			}, 500)
			return
		}
		$('#fld-from input').val(args.from || '')
		$('#fld-to').html(args.to)
		$('#fld-facility').html(args.facility)
		if (args.from) {
			this.service.route(
				{
					origin: args.from,
					destination: args.to,
					travelMode: google.maps.TravelMode[mode]
				},
				function (response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						var leg = response.routes[0].legs[0],
							addrA = leg.start_address.replace(/\, USA/, ''),
							addrB = leg.end_address.replace(/\, USA/, '')
						me.renderer.setOptions({
							map: me.map,
							panel: $(me.routeTarget).get(0),
							directions: response
						})
						$('#fld-from input').val(addrA)
						$('#fld-to').html(addrB)
					} else {
						$(me.routeTarget).empty()
						me.trigger(nyc.Directions.EventType.NO_DIRECTIONS, {response: response, status: status})
					}
					$('.dir-mode-btn').removeClass('active-mode')
					$(me.modeBtn).addClass('active-mode')
          me.trigger(nyc.Directions.EventType.CHANGED, {response: response, status: status})
				}
			)
		}
	}
	/**
	 * @desc Initializes the class on callback from the Google Maps
	 * @public
	 * @method
	 */
	init() {
		this.map = new google.maps.Map($(this.mapTarget).get(0), {
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			backgroundColor: '#D3D3D3',
			panControl: false,
			streetViewControl: false,
			mapTypeControl: false,
			zoomControl: false,
			maxZoom: 18,
				styles: [
				{
					featureType: 'administrative.country',
					stylers:[{visibility: 'off'}]
				},
				{
					featureType: 'administrative.province',
					stylers: [{visibility: 'off'}]},
				{
					featureType: 'administrative.land_parcel',
					stylers: [{visibility: 'off'}]
				},
				{
					featureType: 'landscape.man_made',
					stylers: [{visibility: 'on'}]
				},
				{
					featureType: 'poi.attraction',
					stylers: [{visibility: 'off'}]
				},
				{
					featureType: 'poi.business',
					stylers: [{visibility: 'off' }]
				},
				{
					featureType: 'poi.place_of_worship',
					stylers: [{visibility: 'off'}]
				},
				{
					featureType: 	'water',
					elementType: 'geometry',
					stylers: [{hue: '#A1D5F1'}, {saturation: 55}, {lightness: 13}, {visibility: 'on'}]
				},
				{
					featureType: 'transit.line',
					stylers: [{visibility: 'off'}]
				},
				{
					featureType: 'road.arterial',
					elementType: 'all',
					stylers: [{hue: '#d4d4d4'}, {saturation: -100}, {lightness: 27}, {visibility: 'on'}]
				},
				{
					featureType: 'road.local',
					elementType: 'all',
					stylers: [{hue: '#e8e8e8'}, {saturation: -100}, {lightness: -9}, {visibility: 'on'}]
				},
				{
					featureType: 'road.highway',
					elementType: 'all',
					stylers: [{hue: '#bababa'}, {saturation: -100}, {lightness: 25}, {visibility: 'on'}]
				},
				{
					featureType: 'poi.park',
					elementType: 'all',
					stylers: [{hue: '#D6DDD5'}, {saturation: -76}, {lightness: 32}, {visibility: 'on'}]
				},
				{
					featureType: 'poi.school',
					elementType: 'all',
					stylers: [{hue: '#DAD4C3'}, {saturation: -51}, {lightness: -2}, { visibility: 'on'}]
				}
			]
		})
		this.service = new google.maps.DirectionsService()
		this.renderer = new google.maps.DirectionsRenderer()
		this.zoomBtns()
		this.directions(this.args)
	}
	/**
	 * @private
	 * @method
	 */
	zoomBtns() {
		$(this.mapTarget).append(nyc.Directions.BUTTONS_HTML).trigger('create')
		$(this.mapTarget).find('.ui-btn').click($.proxy(this.zoom, this))
	},
	/**
	 * @private
	 * @method
	 * @param {JQuery.Event} event
	 */
	zoom(event) {
		var z = this.map.getZoom() || 0
		this.map.setZoom(z + ($(event.target).data('zoom-incr') * 1))
	},
	/**
	 * @private
	 * @method
	 * @param {JQuery.Event} event
	 */
	mode(event) {
		this.args = this.args || {}
		this.modeBtn = event.target
		this.args.mode = $(this.modeBtn).data('mode')
		this.directions(this.args)
	}
}

/**
 * @desc The default URL for loading Google APIs
 * @public
 * @const
 * @type {string}
 */
Directions.DEFAULT_GOOGLE_URL = 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization'

/**
 * @desc Object type for getting directions
 * @public
 * @typedef {Object}
 * @property {string=} from The origin location
 * @property {string} to The destination location
 * @property {google.maps.DirectionsTravelMode} mode The directions mode
 * @property {string} facility The name of the destination
 */
Directions.Request

/**
 * @desc Object type for getting directions
 * @public
 * @typedef {Object}
 * @property {Object} response The Google response
 * @property {google.maps.DirectionsStatus} status The status of the response
 */
Directions.Response

/**
 * @desc The class has completed initialization
 * @event nyc.Directions#changed
 * @type {Directions.Response}
 */

 /**
  * @private
  * @const
  * @type {string}
  */
 Directions.BUTTONS_HTML = '<a class="btn-z-in ctl ctl-btn" data-role="button" data-icon="plus" data-iconpos="notext" data-zoom-incr="1" title="Zoom in">' +
	 '<span class="screen-reader-only">Zoom in</span>' +
 '</a>' +
 '<a class="btn-z-out ctl ctl-btn" data-role="button" data-icon="minus" data-iconpos="notext" data-zoom-incr="-1" title="Zoom out">' +
	 'Zoom out' +
 '</a>'