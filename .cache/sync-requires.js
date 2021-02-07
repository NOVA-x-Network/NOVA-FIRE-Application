const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("C:\\Users\\Param\\Documents\\GitHub\\NOVA-FIRE-Application\\.cache\\dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("C:\\Users\\Param\\Documents\\GitHub\\NOVA-FIRE-Application\\src\\pages\\404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("C:\\Users\\Param\\Documents\\GitHub\\NOVA-FIRE-Application\\src\\pages\\index.js"))),
  "component---src-pages-login-js": hot(preferDefault(require("C:\\Users\\Param\\Documents\\GitHub\\NOVA-FIRE-Application\\src\\pages\\login.js"))),
  "component---src-pages-signup-js": hot(preferDefault(require("C:\\Users\\Param\\Documents\\GitHub\\NOVA-FIRE-Application\\src\\pages\\signup.js")))
}

