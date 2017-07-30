WordPress Auto Summary
======================

An auto-summary utility. Inspired by autotldr https://www.reddit.com/user/autotldr and SMMRY http://smmry.com/

Generates an auto summary from the post content that can then optionally be added to the excerpt.

```php
apply_filters( 'wp_search_stopwords', 'edit_the_stopwords_array' );
apply_filters( 'excerpt_length', 'edit_the_excerpt_length' );
apply_filters( 'auto_summary_score_minimum', 'edit_summary_score_minimum' ); // Default 0.65
```
