/**
 * Initialize the auto summary utility as soon as the document content is available.
 *
 * @summary Initialize the auto summary utility.
 *
 * @since     0.1.0
 */
 
import { getSummaryText } from './auto-summary/nlp';
import Widget from './auto-summary/widget';

/**
 * @summary Initialize the auto summary utility.
 *
 * Create a new instance of the UI widget and pass
 * the function to get the text summary.
 *
 * @since 0.1.0
 *
 * @see auto-summary/widget
 * @see auto-summary/nlp
 *
 * @returns {null}
 */
const init = function() {
	const widget = new Widget( getSummaryText );

	widget.render().setEvents();
};


if ( 'complete' === document.readyState ){
	init();
} else {
	window.addEventListener( 'DOMContentLoaded', init );
}
