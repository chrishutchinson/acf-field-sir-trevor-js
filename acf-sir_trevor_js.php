<?php

/*
Plugin Name: Advanced Custom Fields: Sir Trevor JS
Plugin URI: http://github.com/chrishutchinson
Description: Creates a Sir Trevor JS card in Advanced Custom Fields
Version: 1.0.0
Author: Chris Hutchinson
Author URI: http://github.com/chrishutchinson
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/




// 1. set text domain
// Reference: https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
load_plugin_textdomain( 'acf-sir_trevor_js', false, dirname( plugin_basename(__FILE__) ) . '/lang/' ); 


// 2. Include field type for ACF5
// $version = 5 and can be ignored until ACF6 exists
function include_field_types_sir_trevor_js( $version ) {
	
	include_once('acf-sir_trevor_js-v5.php');
	
}

add_action('acf/include_field_types', 'include_field_types_sir_trevor_js');	




// 3. Include field type for ACF4
function register_fields_sir_trevor_js() {
	
	include_once('acf-sir_trevor_js-v4.php');
	
}

add_action('acf/register_fields', 'register_fields_sir_trevor_js');	

add_action( 'admin_enqueue_scripts', 'actionEnqueueScripts' );

add_action( 'wp_ajax_acf_sirtrevor_nonce', 'wpAjaxAcfSirTrevorNonce' );

function actionEnqueueScripts() {
	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'eventable', plugins_url( dirname(plugin_basename(__FILE__)) . '/js/vendor/eventable/eventable.js' , dirname(__FILE__) ) );
	wp_enqueue_script( 'underscore', plugins_url( dirname(plugin_basename(__FILE__)) . '/js/vendor/underscore/underscore.js' , dirname(__FILE__) ) );
	wp_enqueue_script( 'sir-trevor-js', plugins_url( dirname(plugin_basename(__FILE__)) . '/js/vendor/sir-trevor/sir-trevor.js' , dirname(__FILE__) ), array( 'jquery', 'underscore', 'eventable' ) );

	wp_enqueue_style( 'sir-trevor-js', plugins_url( dirname(plugin_basename(__FILE__)) . '/css/vendor/sir-trevor/sir-trevor.css' , dirname(__FILE__) ));
	wp_enqueue_style( 'sir-trevor-js-icons', plugins_url( dirname(plugin_basename(__FILE__)) . '/css/vendor/sir-trevor/sir-trevor-icons.css' , dirname(__FILE__) ));
}

function wpAjaxAcfSirTrevorNonce() {
	if(strpos($_SERVER['HTTP_REFERER'], get_site_url()) == 0 && current_user_can('edit_posts'))
		echo wp_create_nonce('media-form');
	die();
}

	
?>