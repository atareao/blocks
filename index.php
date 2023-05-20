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
    register_block_type(plugin_dir_path( __FILE__ ).'contactblock/');
    register_block_type(plugin_dir_path( __FILE__ ).'metablock/');
}
add_action( 'init', 'atareao_blocks_register_blocks' );

/**/
// register custom meta tag field
function atareao_blocks_register_post_meta() {
    register_post_meta( 'post', 'nombre', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
    ));
    register_post_meta( 'post', 'apellido', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
    ));
    register_post_meta( 'post', 'alias', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
    ));
    register_post_meta( 'post', 'mp3_url', array(
        'show_in_rest' => true,
        'single'       => true,
        'type'         => 'string',
    ));
}
add_action( 'init', 'atareao_blocks_register_post_meta' );
/**/

function contactblock_endpoint(){
    register_rest_route("atareao-contactblock/v1", "send", array(
        //"methods" => WP_REST_Server::READABLE,
        "methods" => "Post",
        "callback" => "send_mattermost_message",
        "permission_callback" => "__return_true"
    ));
}
add_action("rest_api_init", "formblock_endpoint");

function send_mattermost_message(WP_REST_Request $request){
    $body = $request->get_body();
    if(!empty($body)){
        $data = json_decode($body);
        $options = get_option('admin_settings_options');
        if(isset($options)){
            $token = $options['admin_settings_mattermost_token'];
            $channel_id  = $options['admin_settings_mattermost_channel_id'];
            $message = "form: que\nfrom: $data->email\nmessage: $data->message";
            $data =[
                "channel_id" => $channel_id,
                "message"    => $message
            ];
            $url = "https://mm.territoriolinux.es/api/v4/posts";

            return custom_http_post_with_bearer($url, $data, $token);
        }
        return new WP_Error("No configuration", "No configuration", array( 'status' => 404 ) );
    }
}

function atareao_contactblock_enqueue_scripts(){
    $block_path = "blocks/contactblock/formblock.js";
    error_log(plugin_dir_path(__DIR__).$block_path);
    error_log("Cargado");
    wp_enqueue_script(
        "atareao-contactblock",
        plugin_dir_url(__DIR__).$block_path,
        ["wp-blocks"],
        filemtime(plugin_dir_path(__DIR__).$block_path)
    );
    $formblock_params = array(
        "url"       => "/wp-json/atareao-contact/v1/send",
    );
    wp_localize_script("atareao-formblock", "php_vars", $formblock_params);
}
add_action("enqueue_block_assets", "atareao_formblock_enqueue_scripts");

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

function atareao_audioblock_enqueue_scripts(){
    $block_path = "blocks/audioblock/wavesurfer.js";
    $main_path = "blocks/audioblock/simple.js";
    wp_enqueue_script(
        "atareao-audioblock",
        plugin_dir_url(__DIR__).$block_path,
        ["wp-blocks"],
        filemtime(plugin_dir_path(__DIR__).$block_path)
    );
    wp_enqueue_script(
        "atareao-audioblock-main",
        plugin_dir_url(__DIR__).$main_path,
        ["wp-blocks", "atareao-audioblock"],
        filemtime(plugin_dir_path(__DIR__).$main_path)
    );
}
add_action("enqueue_block_assets", "atareao_audioblock_enqueue_scripts");

function custom_http_post_with_bearer($url, $json, $token)
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
            "Authorization: Bearer $token",
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
