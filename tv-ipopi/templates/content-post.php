<?php 


//var_dump( get_field('youtube_video_id') );
?>


<li class="bx_youtube" data-youtube_id="<?php echo get_field('youtube_video_id');?>">
	<a href="<?php the_permalink(); ?>"  >
		<?php if ( has_post_thumbnail()) : ?>
			<?php the_post_thumbnail('thumb313x188'); ?>
		<?php else: ?>
			<img src="http://img.youtube.com/vi/<?php the_field('youtube_video_id'); ?>/mqdefault.jpg" alt="">
		<?php endif; ?>
		<div class="hold">
			<h3><?php the_title(); ?></h3>
			<?php am_the_field('time','<p>','</p>'); ?>
		</div>
	</a>
</li>