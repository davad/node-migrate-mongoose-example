// Setup the logger you're using for your project here
const logging = require('loggin');
logging.logLevel = "DEBUG";
const Log = logging.getLogger("Migration");

module.exports = Log;
