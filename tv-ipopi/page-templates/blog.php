<?php
/*
Template Name: Blog
*/

global $more;
$more = 0;
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

get_header(); ?>
	<div id="content" class="col_content">
	
	<?php breadcrumb_trail('echo=1&separator=/'); ?>

	<?php query_posts('post_type=post&paged='.$paged); ?>
	<?php if (have_posts()) : ?>
	<?php while (have_posts()) : the_post(); ?>
		<?php get_template_part( 'templates/content', 'post' ); ?>
	<?php endwhile;  ?>
	
	<?php get_template_part( 'templates/pagination', 'post' ); ?>
		
	<?php else : ?>
		<?php get_template_part( 'templates/content', 'none' ); ?>
	<?php endif; wp_reset_query(); ?>

	</div><!-- /content -->

	<?php get_sidebar(); ?>

<?php get_footer(); ?>