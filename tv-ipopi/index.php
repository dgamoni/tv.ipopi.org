<?php global $wp_query; get_header(); ?>

	<div class="container">
		<div class="main-content">
			<?php $post_id = null; if (have_posts()) : ?>
			<div class="main-inner">
				<?php while (have_posts()) : the_post(); $post_id = get_the_ID(); ?>
				<?php get_template_part( 'templates/content', 'post-single' ); ?>
				<?php break; endwhile; ?>
				<?php endif; wp_reset_query(); ?>
			<?php 
				query_posts(array_merge(array( 'showposts' => 1, 'post__not_in'=>array($post_id))));
				if (have_posts()) : ?>
			<div class="yarpp-related">
			<div class="right-col">
				<h3><?php _e('Related VIDEO','am'); ?></h3>
				<?php while (have_posts()) : the_post(); ?>
						<a href="<?php the_permalink() ?>">
							<p><?php the_title(); ?></p>
							<?php if ( has_post_thumbnail()) : ?>
								<?php the_post_thumbnail('thumb197x125'); ?>
							<?php else: ?>
								<img src="http://img.youtube.com/vi/<?php the_field('youtube_video_id'); ?>/mqdefault.jpg" alt="">
							<?php endif; ?>
						</a>
					
				<?php endwhile; ?>
				</div>
			</div>
			<?php endif; wp_reset_query(); ?>
			</div>
		</div>
		<!-- / content -->
	
		<div class="carousel">
			<?php 
				query_posts(array_merge(array( 'showposts' => -1, 'post__not_in'=>array($post_id)), $wp_query->query));
				if (have_posts()) : ?>
			<ul class="bxslider">
				<?php while (have_posts()) : the_post(); ?>
				<?php get_template_part( 'templates/content', 'post' ); ?>
				<?php endwhile; ?>
			</ul>
			<?php endif; ?>
		</div>
	</div>
	<!-- / container -->

<?php get_footer(); ?>