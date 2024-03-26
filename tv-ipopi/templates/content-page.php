<?php if ( has_post_thumbnail()) : ?>
<div class="video no"><?php the_post_thumbnail('large'); ?></div>
<?php endif; ?>
<div class="title"><h1><?php $title = get_field('custom_title'); if(!empty($title)) : echo $title; else : the_title(); endif; ?></h1></div>
<h4>&nbsp;</h4>
<div class="inner-hold">
	<div class="entry">
		<?php the_content(__('Read more', 'am')); ?>
		<div class="clear clearfix"></div>
		<?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'am' ) . '</span>', 'after' => '</div>' ) ); ?>
		<?php edit_post_link(__('Edit', 'am'), '<br /><p>', '</p>'); ?>
	</div>
	<div class="facebook">
		<div class="fb-like" data-href="<?php esc_url(get_permalink()); ?>" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
	</div>
</div>