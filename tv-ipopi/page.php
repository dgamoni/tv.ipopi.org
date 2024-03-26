<?php get_header(); ?>

	<div class="container">
		<div class="main-content full">
			<div class="main-inner">

				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
					<?php get_template_part( 'templates/content', 'page' ); ?>
				<?php endwhile; endif; ?>
				
			</div>
		</div>
		<!-- / content -->
	</div>
	<!-- / container -->

<?php get_footer(); ?>