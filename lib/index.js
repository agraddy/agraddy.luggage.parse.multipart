var mod = {};

mod.luggage = function(req, res, lug, cb) {
	var body = '';

	req.on('data', function (data) {
		body += data;
	});

	req.on('end', function () {
		var boundary = req.headers['content-type'].slice(req.headers['content-type'].indexOf('boundary=') + 9);
		var i;
		var item;
		var name;
		var value;
		var parts = body.split('--' + boundary);

		// Remove first empy element
		parts = parts.slice(1);
		// Remove last element (--)
		parts = parts.slice(0, -1);

		lug.post = {};
		lug.post_original = body;

		for(i = 0; i < parts.length; i++) {
			item = parts[i];

			// Remove beginning and ending newlines
			item = item.slice(2, -2);

			name = item.match('name="([^"]*)"')[1];
			value = item.split('\r\n\r\n')[1];

			names = name.split('.');

			function dive(path, parts, value) {
				var stripped;
				if(!parts.length) {
					return path;
				}

				// Handle objects and arrays
				if(parts[0].indexOf('[]') == -1) {
					if(typeof path[parts[0]] == 'undefined') {
						if(parts.length == 1) {
							path[parts[0]] = value;
						} else {
							path[parts[0]] = {};
							dive(path[parts[0]], parts.slice(1), value);
						}
					} else {
						if(parts.length == 1) {
							path[parts[0]] = value;
						} else {
							dive(path[parts[0]], parts.slice(1), value);
						}
					}
				} else {
					stripped = parts[0].slice(0, -2);
					if(typeof path[stripped] == 'undefined') {
						if(parts.length == 1) {
							path[stripped] = [value];
						} else {
							path[stripped] = [{}];
							dive(path[stripped][0], parts.slice(1), value);
						}
					} else {
						if(parts.length == 1) {
							path[stripped].push(value);
						} else {
							function exists(base, remain) {
								if(remain.length) {
									if(typeof base[remain[0]] !== 'undefined') {
										if(remain.length == 1) {
											return true;
										} else {
											return exists(base[remain[0]], remain.slice(1));
										}
									} else {
										return false;
									}
								} else {
									return false;
								}
							}

							// Check ahead to see if object already exists
							// If so, push a new object to the array
							if(exists(path[stripped][path[stripped].length - 1], parts.slice(1))) {
								path[stripped].push({});
							}

							dive(path[stripped][path[stripped].length - 1], parts.slice(1), value);

						}
					}
				}
			}

			dive(lug.post, names, value);

			/*
			if(name.indexOf('[]') !== -1) {
				if(!Array.isArray(lug.post[name])) {
					lug.post[name] = [];
				}
				lug.post[name].push(value);
			} else {
				lug.post[name] = value;
			}
			*/
		}

		/*
		// Strip off [] from end of array names
		Object.keys(lug.post).forEach(function(item) {
			if(item.indexOf('[]') !== -1) {
				lug.post[item.slice(0, -2)] = lug.post[item];
				delete lug.post[item];
			}
		});
		*/
		cb();
	});
}

module.exports = mod;
