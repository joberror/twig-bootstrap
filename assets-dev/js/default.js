// default.js
// widely used functions or codes goes here.

/**
 * Detect and apply active menu class
 * @param {string} elClass css class name
 * How-to:
 * Script - > import navLinkActive module - > importModuleName('active_Link_Class_Name')
 */
let navLinkActive = (elClass) => {
    document.querySelector('nav a[href^="/' + location.pathname.split("/")[1] + '"]')
        .parentElement
        .classList.add(elClass);
};

/**
 * Load svg in html files
 * A snippet of https: //blobfolio.com/2018/06/lazy-loading-sprites-inline/
 * How-to:
 * Script -> import svgLoader module -> importModuleName.init();
 * HTML -> <svg data-url='URL_of_SVG_File'></svg>
 */
let svgLoader = (() => {
    let process = {
        init: () => {
            window.addEventListener('load', function () {
                // Find our SVGs.
                const svgs = document.querySelectorAll('svg[data-url]');
                const svgsLen = svgs.length;
                // Loop and process.
                for (let i = 0; i < svgsLen; ++i) {
                    // Grab the URL and delete the attribute; we no longer
                    // need it.
                    let url = svgs[i].getAttribute('data-url');
                    svgs[i].removeAttribute('data-url');
                    // We'll let another function handle the actual fetching
                    // so we can use the async modifier.
                    process.fetchSVG(url, svgs[i]);
                }
            });
        },
        /**
         * Fetch the SVG
         * @param {String} url URL
         * @param {Element} el Element
         * @returns {Promise<void>}
         */
        fetchSVG: async function (url, el) {
            // Dog bless fetch() and await, though be advised you'll need
            // to transpile this down to ES5 for older browsers.
            let response = await fetch(url);
            let data = await response.text();

            // This response should be an XML document we can parse.
            const parser = new DOMParser();
            const parsed = parser.parseFromString(data, 'image/svg+xml');

            // The file might not actually begin with "<svg>", and
            // for that matter there could be none, or many.
            let svg = parsed.getElementsByTagName('svg');
            if (svg.length) {
                // But we only want the first.
                svg = svg[0];

                // Copy over the attributes first.
                const attr = svg.attributes;
                const attrLen = attr.length;
                for (let i = 0; i < attrLen; ++i) {
                    if (attr[i].specified) {
                        // Merge classes.
                        if ('class' === attr[i].name) {
                            const classes = attr[i].value.replace(/\s+/g, ' ').trim().split(' ');
                            const classesLen = classes.length;
                            for (let j = 0; j < classesLen; ++j) {
                                el.classList.add(classes[j]);
                            }
                        }
                        // Add/replace anything else.
                        else {
                            el.setAttribute(attr[i].name, attr[i].value);
                        }
                    }
                }
                // Now transfer over the children. Note: IE does not
                // assign an innerHTML property to SVGs, so we need to
                // go node by node.
                while (svg.childNodes.length) {
                    el.appendChild(svg.childNodes[0]);
                }
            }
        }
    };
    return {
        init: process.init
    };
})();

export {
    navLinkActive,
    svgLoader
};
