module.exports = function(format) {
	if(format == undefined){
		format = "[{y}/{M}/{d} {w} {h}:{m}:{s}.{ms}] [{lvl}] [{lg}] {out}";
	}
	
	var patterns = {
		"day": /{d}/g, //getDate() 1-31
		"week_day": /{w}/g, //getDay() 0-6
		"mounth": /{M}/g, //getMonth() 0-11
		"year": /{y}/g, //getFullYear() 
		"hours": /{h}/g, //getHours() 0-23
		"minutes": /{m}/g, //getMinutes()
		"seconds": /{s}/g, //getSeconds()
		"milliseconds": /{ms}/g, //getMilliseconds() 
		"level": /{lvl}/g,
		"logger": /{lg}/g,
		"message": /{out}/g
	}
	
	var level_names = new Array("TRC", "LOG", "INF", "WRN", "ERR");
	var week_names = new Array("sun", "mon", "tue", "wed", "thu", "fri", "sat");
	
	var parse = function(record){
		var out = format;
		
		out = out.replace(patterns.day, record.time.getDate());
		out = out.replace(patterns.week_day, week_names[record.time.getDay()]);
		out = out.replace(patterns.mounth, record.time.getMonth());
		out = out.replace(patterns.year, record.time.getFullYear());
		out = out.replace(patterns.hours, record.time.getHours());
		out = out.replace(patterns.minutes, record.time.getMinutes());
		out = out.replace(patterns.seconds, record.time.getSeconds());
		out = out.replace(patterns.milliseconds, record.time.getMilliseconds());
		out = out.replace(patterns.level, level_names[record.level - 1]);
		out = out.replace(patterns.logger, record.logger);
		if(record.isError) {
			out = out.replace(patterns.message, record.message.stack);
		} else {
			out = out.replace(patterns.message, record.message);
		}
//		record.isError
		return out;
	}
	
	return {"parse" : parse};
}
