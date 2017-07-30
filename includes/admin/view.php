<?php
/**
 * View for the auto summary utility.
 *
 * @package Auto_Summary\Admin\View
 * @since 0.1.0
 */

namespace Auto_Summary\Admin\View;

use Auto_Summary\Helpers;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Initialize actions.
 *
 * @since 0.1.0
 */
function init() {
	add_action( 'admin_init', __NAMESPACE__ . '\add_utility_to_posts' );
}

/**
 * Add the auto summary utility to posts that support excerpt.
 *
 * @since 0.1.0
 */
function add_utility_to_posts() {
	$post_types = get_post_types();
	foreach ( $post_types as $post_type ) {
		if ( post_type_supports( $post_type, 'excerpt' ) ) {
			add_action( 'add_meta_boxes_' . $post_type, __NAMESPACE__ . '\enqueue_scripts_and_styles' );
		}
	}
}

/**
 * Enqueue scripts and styles.
 *
 * @since 0.1.0
 */
function enqueue_scripts_and_styles() {
	wp_localize_script( 'auto-summary', 'autoSummarySettings', array(
		'stopWords' => Helpers\get_search_stopwords(),
		'exerptLength' => apply_filters( 'excerpt_length', 55 ),
		'scoreMinimum' => apply_filters( 'auto_summary_score_minimum', 0.65 ),
		'text' => array(
			'auto_summary_title' => esc_html__( 'Auto Summary', 'auto-summary' ),
			'use_auto_summary_button' => esc_html__( 'Use Auto Summary', 'auto-summary' ),
		),
	) );

	wp_enqueue_script( 'auto-summary' );
	wp_enqueue_style( 'auto-summary' );
}
