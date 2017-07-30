WordPress Auto Summary
======================

An auto-summary utility. Inspired by autotldr https://www.reddit.com/user/autotldr and SMMRY http://smmry.com/

Generates an auto summary from the post content that can then optionally be added to the excerpt.

Edit Settings With the Following Filters:
-----------------------------------------
```php
apply_filters( 'wp_search_stopwords', 'edit_the_stopwords_array' );
apply_filters( 'excerpt_length', 'edit_the_excerpt_length' );
apply_filters( 'auto_summary_score_minimum', 'edit_summary_score_minimum' ); // Default 0.65
```

Example Summary
---------------

###Original Post
https://wordpress.org/news/2017/05/wordpress-now-on-hackerone/

### Summary With the Default Settings
> Today, the WordPress Security Team is happy to announce that WordPress is now officially on HackerOne!
> HackerOne is a platform for security researchers to securely and responsibly report vulnerabilities to our team.
> This frees our team to spend more time working on improving the security of WordPress.
> The security team has been working on this project for quite some time.
