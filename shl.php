<?php
/*
Plugin Name: Syntax Highlighter Lite
Version: 3.2.2
Plugin URI: http://wpthemes4u.co.uk/plugins/syntax-highlighter-lite/
Description: This plugin prettifies/beautifies/highlights source code placed inside <code>&lt;pre class=&quot;prettyprint&quot;&gt;</code> tags. It is a light plugin with only 2 files.
Author: Gareth Gillman
Author URI: http://www.garethgillman.co.uk

Copyright 2013, 2014, 2015 Ciprian Popescu (email: getbutterfly@gmail.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//
define('SHL_PLUGIN_URL', WP_PLUGIN_URL . '/' . dirname(plugin_basename(__FILE__)));
define('SHL_PLUGIN_PATH', WP_PLUGIN_DIR . '/' . dirname(plugin_basename(__FILE__)));
define('SHL_PLUGIN_VERSION', '3.2.0');
//

// plugin localization
$plugin_dir = basename(dirname(__FILE__)); 
load_plugin_textdomain('sample', false, $plugin_dir . '/languages'); 
//

function shl_styles() {
	wp_enqueue_style('shl-style', SHL_PLUGIN_URL . '/css/shl-default.css');	
}

function shl_scripts() {
	wp_enqueue_script('jquery');
	wp_enqueue_script('shl-core', plugins_url('/js/shl-core.js', __FILE__));
	wp_enqueue_script('shl-functions', plugins_url('/js/shl-functions.js', __FILE__));
}

add_action('wp_print_styles', 'shl_styles');
add_action('wp_enqueue_scripts', 'shl_scripts');

add_filter('the_content', 'pre_content_filter', 0);

// convert <pre> tag contents to HTML entities
function pre_content_filter($content) {
	return preg_replace_callback('|<pre.*>(.*)</pre|isU', 'convert_pre_entities', $content);
}
function convert_pre_entities($matches) {
	return str_replace($matches[1], htmlentities($matches[1]), $matches[0]);
}


// tinymce button
function shl_tinymce_button() {
 global $typenow;
 if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
  return;
 }
 if( ! in_array( $typenow, array( 'post', 'page' ) ) )
  return;
  if ( get_user_option('rich_editing') == 'true') {
   add_filter("mce_external_plugins", "shl_tinymce_plugin");
   add_filter('mce_buttons', 'shl_register_btn');
  }
}
add_action('admin_head', 'shl_tinymce_button');

function shl_tinymce_plugin($plugin_array) {
 $plugin_array['shl_btn'] = plugins_url( '/js/shl-register-tinymce.js', __FILE__ );
 return $plugin_array;
}

function shl_register_btn($buttons) {
 array_push($buttons, "imsel_btn");
 return $buttons;
}

?>