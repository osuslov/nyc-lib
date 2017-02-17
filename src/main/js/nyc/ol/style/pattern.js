var nyc = nyc || {};
nyc.ol = nyc.ol || {};
nyc.ol.style = nyc.ol.style || {};

/**
 * @desc A class that provides a pattern fill style
 * @public
 * @class
 * @extends {ol.style.Fill}
 * @constructor
 * @param {nyc.ol.style.PatternFill.Options} options Constructor options
 * @fires nyc.ol.style.PatternFill#ready
 */
nyc.ol.style.PatternFill = function(options){
	ol.style.Fill.call(this, {});
	this.opacity = options.opacity !== undefined ? options.opacity : 1;
	this.loadImage(options.image);
};

ol.inherits(nyc.ol.style.PatternFill, ol.style.Fill);
nyc.inherits(nyc.ol.style.PatternFill, nyc.EventHandling);

nyc.ol.style.PatternFill.prototype.loaded = function(event){
	var img = event.target, w = img.width, h = img.height,
		cnv1 = document.createElement('canvas'), 
		cnv2 = document.createElement('canvas'), 
		ctx1 = cnv1.getContext('2d'), 
		ctx2 = cnv2.getContext('2d');
	cnv1.width = w;
	cnv1.height = h;
	ctx1.globalAlpha = this.opacity;
	ctx1.fillStyle = ctx1.createPattern(img, 'repeat');
	ctx1.fillRect(0, 0, cnv1.width, cnv1.height);
	this.setColor(ctx2.createPattern(cnv1, 'repeat'));
	delete ctx1;
	delete ctx2;
	delete cnv1;
	delete cnv2;
	delete img;
	this.trigger('ready', this);
};

nyc.ol.style.PatternFill.prototype.loadImage = function(img){
	var image;
	try {image = $(img).get(0);}catch(ignore){}
	if (image && image.nodeName == 'IMG'){
		this.loaded({target: image});
	}else{
		var image = new Image();
		image.onload = $.proxy(this.loaded, this);
		image.src = img;
	}
};

/**
 * @desc Object type to hold constructor options for {@link nyc.ol.style.PatternFill}
 * @public
 * @typedef {Object}
 * @property {string|Element|JQuery} image The image URL, data URI, selector or element to use for the pattern
 * @property {number} opacity An opacity value for the fill pattern
 */
nyc.ol.style.PatternFill.Options;


/**
 * @desc Enumeration for pattern fill image data URIs
 * @public
 * @enum {string}
 */
nyc.ol.style.PatternFill.Pattern = {
	DOT1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREwQqIh4Q5gAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAEElEQVQY02NgGBrg/1BwJAClqAEAGX8z+wAAAABJRU5ErkJggg==',
	DOT2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREwQE/sgdKQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAD0lEQVQI12NgIAf8J10LADM2AQC/LuX/AAAAAElFTkSuQmCC',
	DOT3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREwMjFIM+hQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAD0lEQVQI12NgwAL+Y4gAABIVAQBMqoVOAAAAAElFTkSuQmCC',
	DOT4: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREwIsnScSVQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAE0lEQVQY02NggID/DIMfDHo3AgDldgH/6mPSZwAAAABJRU5ErkJggg==',
	DOT5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREwIdzPkSbwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAIElEQVQY02NgYGDwYWBg+A+l8QKCCsgGRFk9wG4kbDwAw9gEX8L6AGEAAAAASUVORK5CYII=',
	DOT6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREjsmcrQcxgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAPUlEQVQY02NgYGCYycDA8B9KYwXMUPoLAwPDZgYGhlsM5AJmLGI+DAwMxVA2TpMx3MiMQyHlbsTpcIIOBQCG5gyj0vBlTwAAAABJRU5ErkJggg==',
	DOT7: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIRExgYDL4cOwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAEklEQVQI12NggID/DKQCEnUAAI/ZAf9KrFUzAAAAAElFTkSuQmCC',
	DOT8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREzA0YzvecgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAIElEQVQY02NkYGD4z0AAMDEQAWio6P///4zoYoyD0OEA13IFDa6LPl8AAAAASUVORK5CYII=',
	DOT9: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREzEsaUx3ZQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAH0lEQVQI12NkYGD4z4AGmBiwALjg////GWFsRqK1AwArZAUFeAkaLAAAAABJRU5ErkJggg==',
	DOT10: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREzIsQmEkpgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAHUlEQVQI103JoQEAAAgDIOb/P89ikEpQZ6BtIH8WaDkFAQe2LOEAAAAASUVORK5CYII=',
	DOT11: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREzMrxR6ARAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAALElEQVQY083OMQoAIADDwMT//zlOLoIgTt6aDhWoUo0DgWNcBhfeR5W/fdpNA48KC01Lp/4AAAAASUVORK5CYII=',
	DOT12: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREzUcK/mCzQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAOklEQVQY062OsQ0AMAzC3N5H/j+HTl2iJF2KxIIsZADZBhDgpvgBeF1yym72yEO+rxxLD31zKqGYoAOjhCZHFI4G0wAAAABJRU5ErkJggg==',
	DOT13: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREzkiRi3QagAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAR0lEQVQY053OQQqAMAxE0ZfezwPWa/SAcVNEbOzCD2EgDMOHnpnQkdU1jIjoGD6I2d7Sit+Bc+bN22FxrJYWx99OZakUfXIBzUEcybiVFYUAAAAASUVORK5CYII=',
	DOT14: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREzgWfoIVngAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAJ0lEQVQI14XKMQoAIADDwNP//zkuCjoZKKQQqILOxpaHeZ9qwL88LKBJC/yrf7BkAAAAAElFTkSuQmCC',
	LINE1: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREyYmjBoa7QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAE0lEQVQI12NgYGD4z0AE+E+hAAD+agT8/W/V2QAAAABJRU5ErkJggg==',
	LINE2: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREyQJFf1FNgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAFElEQVQY02NgYGD4z0AF8H9UAQMAyMsI+AZ9wGUAAAAASUVORK5CYII=',
	LINE3: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREykeI4C+vAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAE0lEQVQY02NgwA/+M4wqIBb8BwDIywj4/liVjwAAAABJRU5ErkJggg==',
	LINE4: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIREygRqiSSbAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAE0lEQVQI12NgQAX/GSgXwAb+AwD+agT8ZZqBPQAAAABJRU5ErkJggg==',
	LINE5: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIRFAE3OSCe/wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAJ0lEQVQI12P4//8/AwMDw39kzAhlwMH///8ZUVQh6cIQ+M+AReA/ADoYH+OWxwbfAAAAAElFTkSuQmCC',
	LINE6: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIRFAIbINWh3wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAN0lEQVQY04XKMQ7AMAzEMMn///N1K9DEtTnTJKhhIDCGJNYW1NQWAGoLbTrDlbrwSX/hTVMAeAByeCQNpdN1lQAAAABJRU5ErkJggg==',
	LINE7: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIRFAMFw8Gt/QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAO0lEQVQY04XQSQoAIBADwc78/8/xpKDOknNBoAWYYrYlyTEBgJhAil7woQxcqAIHdQBAtukAgLpO+2UBvwMlCypIDE4AAAAASUVORK5CYII=',
	LINE8: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QIRFAMnFqHsGQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAO0lEQVQY04XQSQoAIBADwc78/8/xpKDOknNBoAWYYrYlyTEBgJhAil7woQxcqAIHdQBAtukAgLpO+2UBvwMlCypIDE4AAAAASUVORK5CYII='
};