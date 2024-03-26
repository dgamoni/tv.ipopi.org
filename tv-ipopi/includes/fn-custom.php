<?php
	function am_change_wp_search_size($query) {
		if ( $query->is_search )
			$query->query_vars['posts_per_page'] = -1;

		return $query;
	}
	add_filter('pre_get_posts', 'am_change_wp_search_size'); 
?>