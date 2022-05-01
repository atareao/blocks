<?php
/**
 * Plugin Name: Atareao Blocks
 * Plugin URI: https://github.com/WordPress/atareao-ytblock
 * Description: Blocks for atareao.es and others
 * Version: 1.0.0
 * Author: Lorenzo Carbonell <a.k.a. atareao>
 *
 * @package atareao-blocks
 */

defined( 'ABSPATH' ) || exit;
/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
function atareao_blocks_register_blocks() {

    if ( ! function_exists( 'register_block_type' ) ) {
        // Gutenberg is not active.
        return;
    }
    register_block_type( plugin_dir_path( __FILE__ ) . 'ytblock/' );
}
add_action( 'init', 'atareao_blocks_register_blocks' );
