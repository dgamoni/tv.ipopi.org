<?php get_header(); ?>

	<div class="container">
		<div class="main-content full">
			<div class="main-inner">
				<div class="results-block">
					<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
						<?php get_template_part( 'templates/content', 'search' ); ?>
					<?php endwhile; endif; ?>
				</div>
			</div>
		</div>
		<!-- / content -->
	</div>
	<!-- / container -->

<?php get_footer(); ?>