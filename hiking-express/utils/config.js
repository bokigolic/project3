// const WEBSITE_URL_PREFIX = process.env.PUBLIC_URL;
const config = {};
// config.webisteUrlPrefix = WEBSITE_URL_PREFIX;
config.TOKEN_COOKIE_KEY = 'hiking-token'; // name of the cookie for token
config.TOKEN_HEADER_KEY = 'x-hiking-token'; // name of the token key in http request headers

// export default config;
module.exports = config;