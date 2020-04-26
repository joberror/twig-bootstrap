importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.setConfig({
    debug: true
});

const {registerRoute} = workbox.routing;
const {CacheFirst, StaleWhileRevalidate, NetworkFirst} = workbox.strategies;
const {CacheableResponse} = workbox.cacheableResponse;
const {ExpirationPlugin} = workbox.expiration;

registerRoute(
    // Cache CSS files.
    /\.css$/,
    // Use cache but update in the background.
    new NetworkFirst({
        // Use a custom cache name.
        cacheName: 'css-cache',
    })
);

registerRoute(
    /\.js$/,
    new NetworkFirst({
        cacheName: 'script-cache',
    })
);

registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new CacheFirst({
        // Use a custom cache name.
        cacheName: 'image-cache',
        plugins: [
            new ExpirationPlugin({
                // Cache only 20 images.
                maxEntries: 20,
                // Cache for a maximum of a week.
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    }),
);


// Cache the Google Fonts web-font files with a cache first strategy for 1 year.
registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponse({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
            }),
        ],
    }),
);