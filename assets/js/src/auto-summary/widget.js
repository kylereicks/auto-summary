/**
 * @summary Create and manage the view of the auto summary widget.
 *
 * @since 0.1.0
 * @class AutoSummary\Widget
 * @classdesc Create and manage the view of the auto summary widget.
 */
export default class {

	/**
	 * @summary Constructor: Setup references to elements and settings data.
	 *
	 * @since 0.1.0
	 *
	 * @class AutoSummary\Widget
	 * @global {object} autoSummarySettings Localized settings.
	 *
	 * @param {function} getSummaryText Optional. The callback function to return the summary text.
	 * @returns {AutoSummary\Widget} Returns the current instance.
	 */
	constructor( getSummaryText ) {

		/**
		 * Function to retrieve summary text.
		 *
		 * @since 0.1.0
		 * @property {function} getSummaryText
		 */
		this.getSummaryText = getSummaryText;

		/**
		 * The content textarea.
		 *
		 * @since 0.1.0
		 * @property {DOMNode} contentTextarea
		 */
		this.contentTextarea = document.getElementById( 'content' ),

		/**
		 * The post excerpt metabox.
		 *
		 * @since 0.1.0
		 * @property {DOMNode} postexcerptMetaBox
		 */
		this.postexcerptMetaBox = document.getElementById( 'postexcerpt' ),

		/**
		 * The post excerpt textarea.
		 *
		 * @since 0.1.0
		 * @property {DOMNode} postexcerptTextArea
		 */
		this.postexcerptTextArea = document.getElementById( 'excerpt' ),

		/**
		 * The div.inside container within the post excerpt metabox.
		 *
		 * @since 0.1.0
		 * @property {DOMNode} postexcerptMetaBoxInside
		 */
		this.postexcerptMetaBoxInside = this.postexcerptMetaBox ? this.postexcerptMetaBox.getElementsByClassName( 'inside' )[0] : false,

		/**
		 * Container object for the elements inside the widget view.
		 *
		 * @since 0.1.0
		 * @property {object} viewElements
		 */
		this.viewElements = {};

		/**
		 * Container node for the auto summary widget.
		 *
		 * @since 0.1.0
		 * @property {null/DOMNode} autoSummaryViewContainer
		 */
		this.autoSummaryViewContainer = null, // Set in the render function.

		/**
		 * Container fragment for the auto summary widget.
		 *
		 * @since 0.1.0
		 * @property {null/DOMFragment} containerFragment
		 */
		this.containerFragment = null, // Set in the render function.

		/**
		 * Auto Summary settings object.
		 *
		 * @since 0.1.0
		 * @property {object} settings
		 */
		this.settings = window.autoSummarySettings || { text: { auto_summary_title: 'Auto Summary', use_auto_summary_button: 'Use Auto Summary' } };

		return this;
	}

	/**
	 * @summary Remove the auto summary widget from the document.
	 *
	 * @since 0.1.0
	 *
	 * @class AutoSummary\Widget
	 *
	 * @returns {AutoSummary\Widget} Returns the current instance.
	 */
	clear() {
		if ( this.autoSummaryViewContainer && this.autoSummaryViewContainer.parentNode ) {
			this.autoSummaryViewContainer.parentNode.removeChild( this.autoSummaryViewContainer );
		}

		return this;
	}

	/**
	 * @summary Render the auto summary widget.
	 *
	 * @since 0.1.0
	 *
	 * @class AutoSummary\Widget
	 *
	 * @param {function} getSummaryText Optional. The callback function to return the summary text.
	 * @returns {AutoSummary\Widget} Returns the current instance.
	 */
	render( getSummaryText ) {

		// Create elements.
		this.containerFragment = document.createDocumentFragment(),
		this.viewElements.useSummaryButton = this.containerFragment.appendChild( document.createElement( 'button' ) );
		this.viewElements.textSummaryLabel = this.containerFragment.appendChild( document.createElement( 'label' ) );
		this.viewElements.textSummaryLabelText = this.viewElements.textSummaryLabel.appendChild( document.createElement( 'span' ) );
		this.viewElements.summaryTextarea = this.viewElements.textSummaryLabel.appendChild( document.createElement( 'textarea' ) );

		// Set element attributes and values.
		this.viewElements.textSummaryLabelText.appendChild( document.createTextNode( this.settings.text.auto_summary_title ) );
		this.viewElements.useSummaryButton.appendChild( document.createTextNode( this.settings.text.use_auto_summary_button ) );
		this.viewElements.useSummaryButton.classList.add( 'button', 'button-primary', 'button-large' );
		this.viewElements.textSummaryLabelText.classList.add( 'screen-reader-text' );
		this.viewElements.summaryTextarea.setAttribute( 'disabled', true );

		// Add widget to the DOM.
		this.autoSummaryViewContainer = this.postexcerptMetaBoxInside.appendChild( document.createElement( 'div' ), this.postexcerptMetaBoxInside.firstChild ),
		this.autoSummaryViewContainer.setAttribute( 'id', 'auto-summary-view-container' );
		this.autoSummaryViewContainer.appendChild( this.containerFragment );

		if ( ! getSummaryText ) {
			getSummaryText = this.getSummaryText;
		}

		// Display the summary text.
		if ( getSummaryText  && 'function' === typeof getSummaryText ) {
			this.viewElements.summaryTextarea.value = getSummaryText( this.contentTextarea.value );
			this.viewElements.summaryTextarea.style.height = this.viewElements.summaryTextarea.scrollHeight + 'px';
		}

		return this;
	}

	/**
	 * @summary Setup events for the auto summary widget.
	 *
	 * @since 0.1.0
	 *
	 * @class AutoSummary\Widget
	 * @listens contentTextarea:change
	 * @listens tinymce.editors.content:change
	 * @listens useSummaryButton:click
	 *
	 * @param {function} getSummaryText Optional. The callback function to return the summary text.
	 * @returns {AutoSummary\Widget} Returns the current instance.
	 */
	setEvents( getSummaryText ) {
		const widget = this;

		if ( ! getSummaryText ) {
			getSummaryText = this.getSummaryText;
		}

		if ( ! getSummaryText || 'function' !== typeof getSummaryText ) {
			return;
		}

		// Update the summary text when the content textarea changes.
		this.contentTextarea.addEventListener( 'change', function( event ) {
			event.preventDefault();
			widget.viewElements.summaryTextarea.value = getSummaryText( this.value );
			widget.viewElements.summaryTextarea.style.height = widget.viewElements.summaryTextarea.scrollHeight + 'px';
		} );

		// If the content editor is not yet available, wait until it is added to hook the change event.
		if ( window.tinymce && ! window.tinymce.editors.content ) {
			window.tinymce.on( 'addEditor', function( event ) {
				if ( this.editors.content && event.editor === this.editors.content ) {

					// Update the summary text when the tinyMCE editor changes.
					event.editor.on( 'change', function( event ) {
						widget.viewElements.summaryTextarea.value = getSummaryText( this.getContent() );
						widget.viewElements.summaryTextarea.style.height = widget.viewElements.summaryTextarea.scrollHeight + 'px';
					} );
				}
			} );
		} else if ( window.tinymce.editors.content ) {

			// Update the summary text when the tinyMCE editor changes.
			window.tinymce.editors.content.editor.on( 'change', function( event ) {
				widget.viewElements.summaryTextarea.value = getSummaryText( this.getContent() );
				widget.viewElements.summaryTextarea.style.height = widget.viewElements.summaryTextarea.scrollHeight + 'px';
			} );
		}

		// Replace the excerpt text area with the auto summary content.
		this.viewElements.useSummaryButton.addEventListener( 'click', ( event ) => {
			event.preventDefault();
			this.postexcerptTextArea.value = this.viewElements.summaryTextarea.value;
		} );

		return this;
	}
}
