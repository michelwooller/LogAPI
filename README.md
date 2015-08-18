# LogAPI
The main objective is do a enterprise log API to NodeJS.

If you a interested on add your code to mine, please let me know: 
- e-mail: michellucascorrea@gmail.com
- other ways: http://team.berrycode.com.br

#### npm install
npm install log-api

#### Realized wishes
- Config template (did)
- Record (did)
- Level (did)
- Print pattern (did)
- Recursive matchs between logger name and appender name (did)
- Write records like a queue (did)
- Console Appender (did)
- Release app after last record (did)
- Custom print layout (did)
- Better tests (did)
- Better code comments (did)

#### Wish list
- More tests (doing)
- FileAppender with rolling options (doing)
- ProxyAppender (to do)
- MongoDBAppender (to do)

#### How to use
###### Install LogAPI
npm install log-api

###### Import the LogAPI
var LogAPI = require("log-api"); 

###### Make a config  JSON object
var logger_configuration = [{
    {
        "name": "console appender example",
        "level": "trace", // trace, log, info, warn, error
        "pattern" : "[{w} {y}/{M}/{d} {h}:{m}:{s}.{ms}] [{lvl}] [{lg}] {out}",
        "loggers": [ // appender will listen this logger list
            "test.logger"
        ],
        "type": "Console", // Console, File
        "config": { <appender extra configuration> } 
    },
	<more appender configurations>
	...
}]

###### Load the configuration and create the logger object
LogAPI.loadAppenderConfig(logger_configuration);

var logger = LogAPI.createLogger("test.logger.internal.filename");

###### Use it a lot!!!
logger.error(new Error("error message"));
// --
try{
	throw new Error("exception message");
}catch(e){
	logger.error(e);
}
// --
logger.warn("warning message");
logger.info("information message");
logger.log("logging message");
logger.trace("tracing message");


#### Change log
CURRENT VERSION: 0.0.3 [BETA]
STABLE VERSION:

0.0.1: core and console appender coded
0.0.2: core code become stable, added good tests
0.0.3: added more good test
 



 