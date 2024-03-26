<?php 
	
if(function_exists('get_field')){

	function am_get_field($field_name, $html_open = '', $html_close = '', $post_id = null, $esc = ''){
        
        global $post;
        
        $toReturn = '';
        
        if(!$post_id){
            $post_id = $post->ID;
        }
        
        if($value = get_field($field_name, $post_id)){
            if ($esc == '')
                $toReturn = $value;
            elseif ($esc == 'url')
                $toReturn = esc_url($value);
            elseif ($esc == 'attr')
                $toReturn = esc_attr($value);
            elseif ($esc == 'html')
                $toReturn = esc_html($value);
            
            return $html_open.$toReturn.$html_close;
        }
        
        return false;
        
    }
    
    function am_the_field($field_name, $html_open = '', $html_close = '', $post_id = null, $esc = ''){
        
        global $post;
        
        if(!$post_id){
            $post_id = $post->ID;
        }
        
        echo am_get_field($field_name, $html_open, $html_close, $post_id, $esc);
        
    }
	
}

/**
 * Custom comments for single or page templates
 */

function am_comments($comment, $args, $depth) {
		$GLOBALS['comment'] = $comment;
		extract($args, EXTR_SKIP);

		if ( 'article' == $args['style'] ) {
			$tag = 'article';
			$add_below = 'comment';
		} else {
			$tag = 'li';
			$add_below = 'div-comment';
		}
?>
	<<?php echo $tag ?> <?php comment_class(empty( $args['has_children'] ) ? '' : 'parent') ?> id="comment-<?php comment_ID() ?>">
	
		<?php if ($comment->comment_approved == '0') : ?>
				<em class="comment-awaiting-moderation"><?php _e('Your comment is awaiting moderation.','am') ?></em>
				<br />
		<?php endif; ?>
		<p><?php echo get_comment_author_link() ?> | <?php printf( __('%1$s at %2$s','am'), get_comment_date(),  get_comment_time()) ?></a><?php edit_comment_link(__('(Edit)','am'),'  ','' ); ?></p>
		<div class="entry-comment"><?php comment_text() ?></div>
		</<?php echo $tag ?>>
<?php
}

/**
 * Browser detection body_class() output
 */
function am_browser_body_class($classes) {
	global $is_lynx, $is_gecko, $is_IE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone;

	if($is_lynx) $classes[] = 'lynx';
	elseif($is_gecko) $classes[] = 'gecko';
	elseif($is_opera) $classes[] = 'opera';
	elseif($is_NS4) $classes[] = 'ns4';
	elseif($is_safari) $classes[] = 'safari';
	elseif($is_chrome) $classes[] = 'chrome';
	elseif($is_IE) $classes[] = 'ie';
	else $classes[] = 'unknown';

	if(wp_is_mobile()) $classes[] = 'mobile';
	if($is_iphone) $classes[] = 'iphone';
	return $classes;
}

if ( version_compare( $GLOBALS['wp_version'], '4.1', '<' ) ) :
	/**
	 * Filters wp_title to print a neat <title> tag based on what is being viewed.
	 *
	 * @param string $title Default title text for current view.
	 * @param string $sep Optional separator.
	 * @return string The filtered title.
	 */
	function am_wp_title( $title, $sep ) {
		if ( is_feed() ) {
			return $title;
		}

		global $page, $paged;

		// Add the blog name.
		$title .= get_bloginfo( 'name', 'display' );

		// Add the blog description for the home/front page.
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) ) {
			$title .= " $sep $site_description";
		}

		// Add a page number if necessary.
		if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
			$title .= " $sep " . sprintf( esc_html__( 'Page %s', 'wfc' ), max( $paged, $page ) );
		}

		return $title;
	}
	add_filter( 'wp_title', 'am_wp_title', 10, 2 );

	/**
	 * Title shim for sites older than WordPress 4.1.
	 *
	 * @link https://make.wordpress.org/core/2014/10/29/title-tags-in-4-1/
	 * @todo Remove this function when WordPress 4.3 is released.
	 */
	function am_render_title() {
		?>
		<title><?php wp_title( '|', true, 'right' ); ?></title>
		<?php
	}
	add_action( 'wp_head', 'am_render_title' );
endif;

/**
 * Filter for get_the_excerpt
 */
 
function am_excerpt_more( $more ) {
	return '...';
}

function am_has_title($title){
	global $post;
	if($title == ''){
		return get_the_time(get_option( 'date_format' ));
	}else{
		return $title;
	}
}

function am_texturize_shortcode_before($content) {
	$content = preg_replace('/\]\[/im', "]\n[", $content);
	return $content;
}

function am_remove_wpautop( $content ) { 
	$content = do_shortcode( shortcode_unautop( $content ) ); 
	$content = preg_replace('#^<\/p>|^<br \/>|<p>$#', '', $content);
	return $content;
}

// unregister all default WP Widgets
function am_unregister_default_wp_widgets() {
    unregister_widget('WP_Widget_Pages');
    unregister_widget('WP_Widget_Calendar');
    //unregister_widget('WP_Widget_Archives');
    unregister_widget('WP_Widget_Links');
    unregister_widget('WP_Widget_Meta');
    unregister_widget('WP_Widget_Search');
    unregister_widget('WP_Widget_Text');
    //unregister_widget('WP_Widget_Categories');
    //unregister_widget('WP_Widget_Recent_Posts');
    //unregister_widget('WP_Widget_Recent_Comments');
    //unregister_widget('WP_Widget_RSS');
    //unregister_widget('WP_Widget_Tag_Cloud');
    //unregister_widget('WP_Nav_Menu_Widget');
}

/**
 * Add JS scripts
 */
function am_add_javascript( ) {
	
	global $am_option;

	if (is_singular() && get_option('thread_comments'))
		wp_enqueue_script('comment-reply');
		
	wp_enqueue_script('jquery');
	if( !is_admin() ) {
		wp_enqueue_script('am_pugins', get_template_directory_uri().'/includes/js/plugins.js', array( 'jquery' ),$am_option['version'],true );
		wp_enqueue_script('am_general', get_template_directory_uri().'/includes/js/general.js', array( 'jquery' ),$am_option['version'],true );
	}
}

/**
 * Add CSS scripts
 */
function am_add_css( ) {
	
	global $am_option;
	
	wp_enqueue_style('am_style_css', get_template_directory_uri().'/style.css',array(),$am_option['version']);
}

/**
 * Register widgetized areas
 */
function am_the_widgets_init() {
	
    if ( !function_exists('register_sidebars') )
        return;
    
    $before_widget = '<div id="%1$s" class="widget %2$s"><div class="widget_inner">';
    $after_widget = '</div></div>';
    $before_title = '<h3 class="widgettitle">';
    $after_title = '</h3>';

    register_sidebar(array('name' => __('Default','am'),'id' => 'sidebar-default','before_widget' => $before_widget,'after_widget' => $after_widget,'before_title' => $before_title,'after_title' => $after_title));
}

/**
 * Change admin logo url
 */

function am_login_logo_url() {
    return home_url('/');
}

/**
 * Chnage admin logo image
 */

function am_login_logo() { ?>
    <style type="text/css">
        body.login div#login h1 a {
			width: 138px;
			height: 188px;
			display: block;
			cursor: pointer;
			text-indent: -9999em;
			background: url(<?php echo get_bloginfo( 'template_directory' ) ?>/images/logo.png) no-repeat;
			margin: 0 auto 35px;
        }
    </style>
<?php }
?>