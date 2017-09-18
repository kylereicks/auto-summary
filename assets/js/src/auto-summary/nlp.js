'use strict'
/**
 * @summary Functions to parse text and return sentences that summarize the content.
 *
 * @since     0.1.0 (if available)
 * @requires compromise.js https://github.com/nlp-compromise/compromise
 */
import compromise from '../vendor/compromise';

/**
 * @summary Get top sentences.
 *
 * Parse the passed text and create a list of the 10 most common words (noun, verb, adjective, and "values")
 * as well as any 3 word "grams" that appear more than twice. Use that list to rate the value of
 * each sentence and return a list of sentences that meet the minimum value criteria.
 *
 * @since 0.1.0
 *
 * @see compromise
 * @global {object} autoSummarySettings Localized settings.
 *
 * @param {string} text A text string to parse.
 * @returns {array} An array of sentence data objects.
 */
export function getTopSentences( text, _settings ) {

	// Parse the text.
	const parsedText = compromise( text ),
	ngrams = parsedText.ngrams(),
	words = parsedText.terms(),
	sentences = parsedText.sentences(),
	allWords = Array.from( new Set( words.out( 'array' ) ) ),

	// Settings.
	settings = _settings || {},
	scoreMinimum = settings.scoreMinimum || window.autoSummarySettings.scoreMinimum || 1,
	excerptLength = settings.excerptLength || window.autoSummarySettings.excerptLength || 55,
	stopWords = settings.stopWords || window.autoSummarySettings.stopWords || [],

	// Setup word data for nouns, verbs, adjectives, and "values".
	wordData = words.list.reduce( function( dataObject, term ) {
		if ( ( term.has( '#Noun' ) && ! term.has( '#Pronoun' ) ) || term.has( '#Verb' ) || term.has( '#Value' ) || term.has( '#Adjective' ) ) {
			let normalizedTerm = term.data().normal;
			if ( -1 === stopWords.indexOf( normalizedTerm ) ) {
				if ( dataObject[ normalizedTerm ] ) {
					dataObject[ normalizedTerm ].count++;
				} else {
					dataObject[ normalizedTerm ] = {
						count: 1,
						normal: normalizedTerm
					};
				}
			}
		}
		return dataObject;
	}, {} );

	// Top tokens. Including words and three word "grams".
	let topTokens = null,

	// The number of words left to reach the summary limit.
	remainingWords = excerptLength,
	sentenceData = [];

	// Sort words by frequency.
	allWords.sort( function( a, b ) {
		let aValue = 0,
		bValue = 0;
		if ( wordData[ a ] && wordData[ a ].count ) {
			aValue = wordData[ a ].count;
		}
		if ( wordData[ b ] && wordData[ b ].count ) {
			bValue = wordData[ b ].count;
		}

		return bValue - aValue;
	} );

	// Set top tokens. Top 10 words, and 3 word grams that occur more than twice.
	topTokens = Array.from( new Set( allWords.slice( 0, 10 ).concat( ngrams.trigrams().data().filter( function( gram ) {
		return gram.count > 2;
	} ).map( function( gram ) { return gram.normal } ) ) ) );

	// Assign a score to each sentence based on the top tokens that it contains.
	sentenceData = sentences.list.reduce( function( dataArray, sentence, sentenceIndex ) {
		let data = {
			index: sentenceIndex,
			text: sentence.out( 'text' ).trim(),
			data: sentence,
			wordCount: sentence.terms.length,
			topTokenCount: 0,
			topTokenDensity: 0,
			score: 0,
		};
		data.topTokenCount = topTokens.reduce( function( count, token ) {
			return count + ( sentence.out( 'normal' ).match( token.replace( /[-\/\\^$*+?.()|[\]{}]/g, '\\$&' ) ) || [] ).length;
		}, 0 );
		data.topTokenDensity = ( data.topTokenCount / sentence.terms.length );
		data.score = ( data.topTokenCount * data.topTokenDensity );
		dataArray.push( data );
		return dataArray;
	}, [] );

	// Return sentences that meet the score minimum in chronological order.
	return sentenceData.filter( function( sentence ){
		let keep = sentence.score >= scoreMinimum && remainingWords > 0;
		remainingWords -= keep ? sentence.wordCount : 0;
		return keep;
	} ).sort( function( a, b ) { return a.index - b.index; } );
};

/**
 * @summary Summarize the passed text.
 *
 * Remove HTML form the passed text and return the top sentences as a string.
 *
 * @since 0.1.0
 *
 * @see getTopSentences
 *
 * @param {string} text The text to summarize.
 * @returns {string} The summary text.
 */
export function getSummaryText( text ) {
	const utilityContainer = document.createElement( 'div' );
	utilityContainer.innerHTML =  text.replace( /(^<p>)|(<\/p>$)/g, '' ).replace( /<\/p><p>/g, "\n\n" );
	return getTopSentences( utilityContainer.textContent ).map( function( sentence ) { return sentence.text; } ).join( "\n\n" );
}
