<?php
/*
 * Setup WordPress
 */
    function custom_wordpress_setup() {

        // Enable tags for Pages (@see: https://wordpress.org/support/topic/enable-tags-screen-for-pages#post-29500520
        //register_taxonomy_for_object_type('post_tag', 'page');

        // Enable excerpts for pages
        add_post_type_support('page', 'excerpt');

    }
    add_action('init', 'custom_wordpress_setup');


/*
 * Setup theme
 */
    function custom_theme_setup() {

	    // Turn on menus
		add_theme_support('menus');

		// Enable HTML5 support
		add_theme_support('html5');

	}
	add_action( 'after_setup_theme', 'custom_theme_setup' );


/*
 * Enqueue any Custom Admin Scripts
 */
	function custom_admin_scripts() {
		wp_register_script('fuxt-admin', get_template_directory_uri() . '/js/admin.js', 'jquery', "1.1");
		wp_enqueue_script('fuxt-admin');
	}
	add_action( 'admin_enqueue_scripts', 'custom_admin_scripts' );


/*
 * Style login page and dashboard
 */
	// Style the login page
	function custom_loginpage_logo_link($url) {
	     // Return a url; in this case the homepage url of wordpress
	     return get_bloginfo('url');
	}
	function custom_loginpage_logo_title($message) {
	     // Return title text for the logo to replace 'wordpress'; in this case, the blog name.
	     return get_bloginfo('name');
	}
	function custom_loginpage_styles() {
        wp_enqueue_style('login_css', get_template_directory_uri() . '/css/login.css');
	}
	function custom_admin_styles() {
        wp_enqueue_style('admin-stylesheet', get_template_directory_uri() . '/css/admin.css');
	}
	add_filter('login_headerurl','custom_loginpage_logo_link');
	add_filter('login_headertext','custom_loginpage_logo_title');
	add_action('login_head','custom_loginpage_styles');
    add_action('admin_print_styles', 'custom_admin_styles');


/*
 * Add post thumbnail into RSS feed
 */
    function rss_post_thumbnail($content) {
        global $post;

        if( has_post_thumbnail($post->ID) ) {
            $content = '<p><a href='.get_permalink($post->ID).'>'.get_the_post_thumbnail($post->ID).'</a></p>'.$content;
        }

		return $content;
	}
	add_filter('the_excerpt_rss', 'rss_post_thumbnail');


/*
 * Allow SVG uploads
 */
    function add_mime_types($mimes) {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
    }
    //add_filter('upload_mimes', 'add_mime_types');

/*
 * Force SVG uploads!
 * This snippit will force SVGs to be allowed to upladed if the above code doesn't work.
 * I think this code will allow all files to be uploaded, so don't use it unless needed.
 */
	function force_svg_uploads($data, $file, $filename, $mimes) {
	    global $wp_version;
	    $filetype = wp_check_filetype( $filename, $mimes );

	    return [
	        'ext'             => $filetype['ext'],
	        'type'            => $filetype['type'],
	        'proper_filename' => $data['proper_filename']
	    ];

	}
    //add_filter( 'wp_check_filetype_and_ext', 'force_svg_uploads', 10, 4);

/*
 * Allow subscriber to see Private posts/pages
 */
	function add_theme_caps() {
	    // Gets the author role
	    $role = get_role('subscriber');

	    // Add capabilities
	    $role->add_cap('read_private_posts');
		$role->add_cap('read_private_pages');
	}
	//add_action( 'switch_theme', 'add_theme_caps');


/*
 * Change the [...] that comes after excerpts
 */
    function custom_excerpt_ellipsis( $more ) {
        return '...';
    }
    add_filter('excerpt_more', 'custom_excerpt_ellipsis');

/*
 * Prevent Google from indexing any PHP generated part of the API.
 */
	function add_nofollow_header() {
        header("X-Robots-Tag: noindex, nofollow", true);
	}
    add_action('send_headers', 'add_nofollow_header');

/*
 * Add useful args to post/page preview URLs
 */
	function add_custom_preview_link($link, $post) {
		$args = array(
			"id"		=> $post->ID,
			"type"		=> get_post_type($post),
			"status"	=> get_post_status($post)
		);

		// Add slug and build path
		if($post->post_name) {
			$args['slug'] = $post->post_name;
			$args['path'] = get_page_uri($post);
		}

		return add_query_arg($args, $link);
	}
	add_filter('preview_post_link', "add_custom_preview_link", 10, 2);



/*
 * This function auto saves drafts posts, to force them to get a URL for previews to work.
 * See: https://wordpress.stackexchange.com/questions/218168/how-to-make-draft-posts-or-posts-in-review-accessible-via-full-url-slug
 */
	function auto_set_post_status( $post_id, $post, $update ) {

		if( $post->post_status == "draft" && ! $post->post_name ) {
	        // Un-hook to prevent infinite loop
	        remove_action( 'save_post', 'auto_set_post_status', 13, 3 );

	        // Set the post to publish so it gets the slug is saved to post_name
	        wp_update_post( array( 'ID' => $post_id, 'post_status' => 'publish' ) );

	        // Immediately put it back to draft status
	        wp_update_post( array( 'ID' => $post_id, 'post_status' => 'draft' ) );

	        // Re-hook save
	        add_action( 'save_post', 'auto_set_post_status', 13, 3 );
	    }

	}
	add_action('save_post', 'auto_set_post_status', 13, 3);


/*
 * Set permlinks on theme activate
 */
    function set_custom_permalinks() {
        $current_setting = get_option('permalink_structure');

        // Abort if already saved to something else
        if($current_setting) {
            return;
        }

        // Save permalinks to a custom setting, force create of rules file
        global $wp_rewrite;
        update_option("rewrite_rules", FALSE);
        $wp_rewrite->set_permalink_structure('/news/%postname%/');
        $wp_rewrite->flush_rules(true);
    }
    add_action('after_switch_theme', 'set_custom_permalinks');
