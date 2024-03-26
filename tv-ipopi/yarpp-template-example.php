<?php 
/*
YARPP Template: Simple
Author: mitcho (Michael Yoshitaka Erlewine)
Description: A simple example YARPP template.
*/
?>
<?php if (have_posts()):?>
	
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
<?php endif; ?>
