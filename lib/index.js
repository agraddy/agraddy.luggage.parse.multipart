var mod = {};

mod.luggage = function(req, res, lug, cb) {
	var body = '';

	req.on('data', function (data) {
		body += data;
	});

	req.on('end', function () {
		var boundary = req.headers['content-type'].slice(req.headers['content-type'].indexOf('boundary=') + 9);
		var parts = body.split('--' + boundary);

		// Remove first empy element
		parts = parts.slice(1);
		// Remove last element (--)
		parts = parts.slice(0, -1);

		lug.post = {};
		parts.forEach(function(item) {
			var name;
			var value;
			// Remove beginning and ending newlines
			item = item.slice(2, -2);

			name = item.match('name="([^"]*)"')[1];
			value = item.split('\r\n\r\n')[1];

			if(name.indexOf('[]') !== -1) {
				if(!Array.isArray(lug.post[name])) {
					lug.post[name] = [];
				}
				lug.post[name].push(value);
			} else {
				lug.post[name] = value;
			}
		});

		// Strip off [] from end of array names
		Object.keys(lug.post).forEach(function(item) {
			if(item.indexOf('[]') !== -1) {
				lug.post[item.slice(0, -2)] = lug.post[item];
				delete lug.post[item];
			}
		});
		cb();
	});
}

module.exports = mod;
