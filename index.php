<?php
/**
 * Plugin Name: Atareao Blocks
 * Plugin URI: https://github.com/WordPress/atareao-ytblock
 * Description: Blocks for atareao.es and others
 * Version: 2.0.0
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
    register_block_type(plugin_dir_path( __FILE__ ).'ytblock/' );
    register_block_type(plugin_dir_path( __FILE__ ).'audioblock/');
    register_block_type(plugin_dir_path( __FILE__ ).'formblock/');
}
add_action( 'init', 'atareao_blocks_register_blocks' );

function formblock_endpoint(){
    register_rest_route("atareao-formblock/v1", "enviar", array(
        //"methods" => WP_REST_Server::READABLE,
        "methods" => "Post",
        "callback" => "send_message",
        "permission_callback" => "__return_true"
    ));
}
add_action("rest_api_init", "formblock_endpoint");

function send_message(WP_REST_Request $request){
    $body = $request->get_body();
    if(!empty($body)){
        $data = json_decode($body);
        $options = get_option('admin_settings_options');
        if(isset($options)){
            $bot_token = $options['admin_settings_telegram_bot_token_vida_digital'];
            $chat_id  = $options['admin_settings_telegram_channel_vida_digital'];
            $text = "form: que\nfrom: $data->email\nmessage: $data->message";
            $data =[
                "chat_id" => $chat_id,
                "text"    => $text
            ];
            $url ="https://api.telegram.org/bot$bot_token/sendMessage";
            return custom_http_post($url, $data);
        }
        return new WP_Error("No configuration", "No configuration", array( 'status' => 404 ) );
    }
}

function atareao_formblock_enqueue_scripts(){
    $block_path = "blocks/formblock/formblock.js";
    error_log(plugin_dir_path(__DIR__).$block_path);
    error_log("Cargado");
    wp_enqueue_script(
        "atareao-formblock",
        plugin_dir_url(__DIR__).$block_path,
        ["wp-blocks"],
        filemtime(plugin_dir_path(__DIR__).$block_path)
    );
    $formblock_params = array(
        "url"       => "/wp-json/atareao-formblock/v1/enviar",
    );
    wp_localize_script("atareao-formblock", "php_vars", $formblock_params);

}
add_action("enqueue_block_assets", "atareao_formblock_enqueue_scripts");

function custom_http_post($url, $json)
{
    $ans = null;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    try
    {
        $data_string = json_encode($json);
        // Disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        // Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data_string))
        );
        $ans = json_decode(curl_exec($ch));
        if($ans->ok !== TRUE)
        {
            $ans = null;
        }
    }
    catch(Exception $e)
    {
        echo "Error: ", $e->getMessage(), "\n";
    }
    curl_close($ch);
    return $ans;
}
