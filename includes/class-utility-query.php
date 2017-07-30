<?php
/**
 * Utility Query.
 *
 * @package Auto_Summary\Helpers
 * @since 0.1.0
 */

namespace Auto_Summary\Helpers\Utility_Query;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Utility class to expose the protected stopwords array.
 *
 * @see WP_Query
 *
 * @since 0.1.0
 */
class Utility_Query extends \WP_Query {

	/**
	 * Override get_search_stopwords to make it public.
	 *
	 * @since 0.1.0
	 *
	 * @see WP_Query
	 *
	 * @return array WordPress search stopwords.
	 */
	public function get_search_stopwords() {
		return parent::get_search_stopwords();
	}
}

