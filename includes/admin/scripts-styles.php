<?php
/**
 * Scripts and Styles.
 *
 * Register scripts and styles.
 *
 * @package Auto_Summary\Admin\Scripts_Styles
 * @since 0.1.0
 */

namespace Auto_Summary\Admin\Scripts_Styles;

if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Initialize actions.
 *
 * @since 0.1.0
 */
function init() {
	add_action( 'admin_init', __NAMESPACE__ . '\register_admin_scripts_and_styles' );
}

/**
 * Register scripts and styles.
 *
 * @since 0.1.0
 */
function register_admin_scripts_and_styles() {
	wp_register_script( 'auto-summary', plugins_url( 'auto-summary/assets/js/build/auto-summary.min.js' ), array(), \Auto_Summary\VERSION, true );

	wp_register_style( 'auto-summary', plugins_url( 'auto-summary/assets/css/auto-summary.min.css' ), array(), \Auto_Summary\VERSION );
}
