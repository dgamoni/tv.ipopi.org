<?php
// Do not delete these lines

	if ( post_password_required() ) { ?>
		<p class="nocomments"><?php _e('This post is password protected. Enter the password to view comments.', 'am') ?></p>
	<?php
		return;
	}
?>

<!-- You can start editing here. -->

<div id="comments"></div>

<div class="comment">
<?php 
	$fields =  array(

  'author' =>
    '<p class="comment-form-author"><label for="author">' . __( 'Name', 'domainreference' ) . '</label> ' .
    '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) .
    '" size="30"' . $aria_req . ' /></p>',

  'email' =>
    '<p class="comment-form-email"><label for="email">' . __( 'Email (your email address will not be published)', 'domainreference' ) . '</label> ' .
    '<input id="email" name="email" type="email" value="' . esc_attr(  $commenter['comment_author_email'] ) .
    '" size="30"' . $aria_req . ' /></p>',

  'url' =>
    '',
);
	comment_form(array(
	'comment_notes_after' => '',
	'comment_field' => '<textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea>',
	'logged_in_as' => '',
	'title_reply' => '',
	'title_reply_to' => '',
	'comment_notes_before' => '',
	'fields' => $fields
)
); ?>
</form>

<?php if ( have_comments() ) : ?>

	<section class="comments">
		<?php
			wp_list_comments( array(
				'style'       => 'article',
				'type'  => 'comment',
				'callback'  => 'am_comments',
				'avatar_size' => 34,
			) );
		?>
	</section>

	<?php $paginate_comments_links = paginate_comments_links('echo=0'); ?>
	<?php if(!empty($paginate_comments_links)) : ?>
	<div class="pagination">
		<?php echo $paginate_comments_links; ?>
	</div>
	<?php endif; ?>
<?php endif; ?>
</div>