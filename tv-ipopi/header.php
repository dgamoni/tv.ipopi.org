<?php global $am_option; ?><!DOCTYPE html>
<!--[if IE 7]> <html class="ie7 oldie" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]> <html class="ie8 oldie" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 9]> <html class="ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 9]><!--> <html <?php language_attributes(); ?>> <!--<![endif]-->
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="format-detection" content="telephone=no">
	<meta property="og:image" content="http://tv.ipopi.org/wp-content/uploads/2016/02/share.jpg" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<link rel="icon" href="<?php echo get_bloginfo( 'template_directory' ) ?>/images/favicon.ico" type="image/x-icon"/>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	
	<!--<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>-->

	<div class="about-con">
		<div class="container">
			<div class="hold">
				<?php the_field('about','option') ?>
				<span class="close"></span>
			</div>
		</div>
		<!-- / container -->
	</div>

	<header id="header">
		<div class="container">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" id="logo" title="<?php bloginfo('name'); ?>"><?php bloginfo('name'); ?></a>
			<a class="right-pic" href="<?php echo esc_url( home_url( '/' ) ); ?>"><img src="<?php echo get_bloginfo( 'template_directory' ) ?>/images/1.jpg" alt=""></a>
			<p class="slogan"><?php bloginfo('description'); ?></p>
		</div>
		<!-- / container -->
	</header>
	<!-- / header -->

	<nav id="menu">
		<div class="container">
			<div class="current-categorie">
				<?php
					if(is_page()){
						the_title();
					}elseif(is_single()){
						$category = get_the_category();
						echo $category[0]->cat_name;
					}elseif(is_search()){
						_e('Search: ');
						echo get_search_query();
					}elseif(is_404()){
						_e('Error 404');
					}elseif(is_category()){
						echo single_cat_title( '', false );
					}elseif(is_archive()){
						the_archive_title( '', '' );
					}
				?>
			</div>
			<div class="trigger"></div>
			<div class="holder">
				<?php 
					if (!is_search()){
						wp_nav_menu( array( 'theme_location' => 'mainmenu', 'menu_class' => 'sf-menu', 'menu_id'=>'sf-menu', 'container'=>'', 'depth'=>1) );
					}
					else {
						$search_query = get_search_query();
						if($search_query){
							echo '<h1><a href="'.home_url('/').'" class="search-back"></a>';
							echo '<span>“'.$search_query.'”</span></h1>';
						}
					}
					
				?>
				<div class="right">
					<p class="search-tx"><?php _e('WHAT ARE YOU LOOKING FOR?','am'); ?></p>
					<form method="get" action="<?php echo esc_url(home_url().'/'); ?>">
						<button type="submit"></button>
						<input name="s" type="text">
					</form>
				</div>
			</div>
		</div>
		<!-- / container -->
	</nav>
	<!-- / navigation -->