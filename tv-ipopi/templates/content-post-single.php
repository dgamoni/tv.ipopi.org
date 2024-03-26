<div class="video no">
	<div class="videoWrapper"><iframe width="100%" height="530" src="https://www.youtube.com/embed/<?php the_field('youtube_video_id'); ?>" frameborder="0" allowfullscreen></iframe></div>
</div>
<?php am_the_field('time','<p class="time">','</p>'); ?>
<h2><?php the_title(); ?></h2>
<h4><?php _e('PUBLISHED','am'); ?> <?php the_time(get_option('date_format')) ?></h4>
<div class="inner-hold">
	
	<div class="entry">
		<?php the_content(__('Read more', 'am')); ?>
		<div class="clear clearfix"></div>
		<?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'am' ) . '</span>', 'after' => '</div>' ) ); ?>
		<?php edit_post_link(__('Edit', 'am'), '<br /><p>', '</p>'); ?>
	</div>
	
	<ul class="nav-line">
		<li class="current"><a href="<?php the_permalink() ?>#comments"><?php _e('COMMENTS','am'); ?></a></li>
		<li>
			<a href="#" class="addthis_button"><?php _e('SHARE','am'); ?></a>
		</li>
		<li><a href="#" id="embed_code_trigger"><?php _e('COPY EMBED CODE','am'); ?></a></li>
	</ul>
	
	<div id="embed_code">
		<?php
			$code = '<iframe width="853" height="480" src="https://www.youtube.com/embed/'.get_field('youtube_video_id').'" frameborder="0" allowfullscreen></iframe>';
		?>
		<textarea><?php echo esc_textarea($code); ?></textarea>
	</div>
			
	<?php
		// If comments are open or we have at least one comment, load up the comment template.
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;
	?>
	
</div>