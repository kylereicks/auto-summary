<?php
/**
 * Helper functions.
 *
 * @package Auto_Summary\Helpers
 * @since 0.1.0
 */

namespace Auto_Summary\Helpers;

use Auto_Summary\Helpers\Utility_Query;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Get WordPress stopwords.
 *
 * @since 0.1.0
 *
 * @return array An array of stopwords.
 */
function get_search_stopwords() {
	$utility = new Utility_Query\Utility_Query();
	return $utility->get_search_stopwords();
}
