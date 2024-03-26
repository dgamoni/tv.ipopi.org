<?php get_header(); ?>

	<div class="container">
		<div class="main-content">
			<?php if (have_posts()) : ?>
			<?php while (have_posts()) : the_post(); $post_id = get_the_ID(); ?>
			<div class="main-inner">
				<?php get_template_part( 'templates/content', 'post-single' ); ?>
				<?php break; endwhile; ?>
				<?php if(function_exists('related_posts')) related_posts(); ?>
			</div>
			<?php endif; ?>
		</div>
		<!-- / content -->
	
		<div class="carousel">
			<?php 
				$category = get_the_category();
				query_posts(array( 'showposts' => -1, 'cat' => $category[0]->cat_ID, 'post__not_in'=>array($post_id)));
				if (have_posts()) : ?>
			<ul class="bxslider">
				<?php while (have_posts()) : the_post(); ?>
				<?php get_template_part( 'templates/content', 'post' ); ?>
				<?php endwhile; ?>
			</ul>
			<?php endif; wp_reset_query(); ?>
		</div>
	</div>
	<!-- / container -->

<?php get_footer(); ?>