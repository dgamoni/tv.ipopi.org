<?php
global $am_option;

$am_option['shortname'] = "am";
$am_option['textdomain'] = "am";
$am_option['version'] = "1.1.4";

$am_option['url']['includes_path'] = 'includes';
$am_option['url']['includes_url'] = get_template_directory_uri().'/'.$am_option['url']['includes_path'];
$am_option['url']['extensions_path'] = $am_option['url']['includes_path'].'/extensions';
$am_option['url']['extensions_url'] = get_template_directory_uri().'/'.$am_option['url']['extensions_path'];

// Functions
require_once($am_option['url']['includes_path'].'/fn-core.php');
require_once($am_option['url']['includes_path'].'/fn-custom.php');

/* Theme Init */
require_once ($am_option['url']['includes_path'].'/theme-widgets.php');
require_once($am_option['url']['includes_path'].'/theme-init.php');

/* Remove URL field from comments */
add_filter('comment_form_default_fields', 'url_filtered');
function url_filtered($fields)
{
  if(isset($fields['url']))
   unset($fields['url']);
  return $fields;
}

/* Link To Latest Post To WordPress Nav Menu */

// Front end only, don't hack on the settings page
if ( ! is_admin() ) {
    // Hook in early to modify the menu
    // This is before the CSS "selected" classes are calculated
    add_filter( 'wp_get_nav_menu_items', 'replace_placeholder_nav_menu_item_with_latest_post', 10, 3 );
}
 
// Replaces a custom URL placeholder with the URL to the latest post
function replace_placeholder_nav_menu_item_with_latest_post( $items, $menu, $args ) {
 
    // Loop through the menu items looking for placeholder(s)
    foreach ( $items as $item ) {
        if ( '#latestpost1' == $item->url ) {
            $latestpost = get_posts( array(
                'numberposts' => 1,
                'category' => 1,
            ) );
        }
        elseif ( '#latestpost2' == $item->url ) {
            $latestpost = get_posts( array(
                'numberposts' => 1,
                'category' => 2,
            ) );
        }
        elseif ( '#latestpost3' == $item->url ) {
            $latestpost = get_posts( array(
                'numberposts' => 1,
                'category' => 3,
            ) );
        }
        elseif ( '#latestpost4' == $item->url ) {
            $latestpost = get_posts( array(
                'numberposts' => 1,
                'category' => 4,
            ) );
        }
        else {
            $latestpost = false;
        }
 
        if ( empty( $latestpost ) ) {
            continue;
        }
 
        $item->url = get_permalink( $latestpost[0]->ID );
    }
 
    // Return the modified (or maybe unmodified) menu items array
    return $items;
}

add_action('wp_footer', 'add_custom_css');
function add_custom_css() { ?>
    <script>
        jQuery(document).ready(function($) {
            $('.bx_youtube').click(function(event) {
                event.preventDefault();
               var data_youtube_id = $(this).attr('data-youtube_id');
               console.log(data_youtube_id);
               var code = '<iframe id="youtube_autoplay" width="100%" height="530" src="https://www.youtube.com/embed/'+data_youtube_id+'" frameborder="0" allowfullscreen></iframe>';
                $('.videoWrapper').html(code);
                //$("#youtube_autoplay")[0].src += "?autoplay=1";

            });
        });
    </script>
    <style>

    </style>
    <?php
}