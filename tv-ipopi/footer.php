	<footer id="footer">
		<div class="container">
			<div class="about-trigger"><?php _e('ABOUT IPOPI','am'); ?></div>
			<div class="hold">
				<span class="sponsor"><?php _e('SPONSOR','am'); ?></span>
				<?php
					$sponsor_url = get_field('sponsor_url_2','option');
					$sponsor_title = get_field('sponsor_2_logo','option');
					if($sponsor_url && $sponsor_url):
				?>
				<a target="_blank" class="logo" href="<?php echo esc_url($sponsor_url); ?>"><img src="<?php echo $sponsor_title['sizes']['thumbnail']; ?>" alt=""></a>
				<?php endif; ?>
			</div>
			<p class="copy"><a class="link" href="http://www.ipopi.org" target="_blank">WWW.IPOPI.ORG</a><?php _e('Copyright','am'); ?> &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); _e('. All Rights Reserved.','am'); ?></p>
		</div>
		<!-- / container -->
	</footer>
	<!-- / footer -->
	<?php wp_footer(); ?>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-15284268-2', 'auto');
  ga('send', 'pageview');

</script>
</body>
</html>