# ra&ra headless redirect theme

This minimal Shopify Online Store theme redirects storefront traffic back to
the headless ra&ra site. It is needed because the hosted checkout and its
Thank-you page are controlled by Shopify, not by the Next.js storefront.

For India testing the configured storefront URL is:

`http://localhost:3000`

Before the EU launch, change the theme setting to the public HTTPS storefront
URL.

## Install

1. Upload `ra-ra-headless-redirect-theme.zip` in Shopify Admin under
   Online Store > Themes > Add theme > Upload zip file.
2. Customize the uploaded theme and confirm the full storefront URL.
3. Publish the theme.

The Shopify checkout and Thank-you page remain hosted by Shopify. When the
buyer chooses Continue shopping and reaches the Online Store, this theme sends
them to the configured headless storefront.

