<?php
/*
 * Plugin Name: Auto Summary
 * Plugin URI: https://github.com/kylereicks/auto-summary
 * Description: An auto-summary utility. Inspired by autotldr https://www.reddit.com/user/autotldr and SMMRY http://smmry.com/
 * Version: 0.1.1
 * Author: Kyle Reicks
 * Author URI: https://github.com/kylereicks/
*/
namespace Auto_Summary;

if ( ! defined( 'WPINC' ) ) {
	die;
}

define( __NAMESPACE__ . '\VERSION', '0.1.1' );

require_once( plugin_dir_path( __FILE__ ) . 'includes/class-utility-query.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/helpers.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/admin/scripts-styles.php' );
require_once( plugin_dir_path( __FILE__ ) . 'includes/admin/view.php' );

Admin\Scripts_Styles\init();
Admin\View\init();
