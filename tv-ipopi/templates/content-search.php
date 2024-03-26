<div class="result-item">
	<a href="<?php the_permalink(); ?>">
		<?php if ( has_post_thumbnail()) : ?>
			<?php the_post_thumbnail('thumb197x125', array('class' => 'alignleft')); ?>
		<?php else: ?>
			<img src="http://img.youtube.com/vi/<?php the_field('youtube_video_id'); ?>/mqdefault.jpg" alt="" class="alignleft">
		<?php endif; ?>
	</a>
	<div class="holder">
		<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<time class="date" datetime="<?php echo esc_attr(get_the_time('Y-d-m')); ?>"><? _e('PUBLISHED', 'am'); ?> <?php the_time('j F Y') ?></time>
	</div>
</div>