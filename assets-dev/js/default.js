// default.js
// widely used functions or codes goes here.

/**
 * Detect and apply active menu class
 * @param {string} elClass css class name
 */
let navLinkActive = (elClass) => {
    document.querySelector('nav a[href^="/' + location.pathname.split("/")[1] + '"]')
        .parentElement
        .classList.add(elClass);
};

export { navLinkActive };
