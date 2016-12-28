var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');
var pack = require('../package.json');
var stream = require('stream');

var mod = require('../');

var req = new stream.Readable();
req.headers = {};
req.headers['content-type'] = 'multipart/form-data; boundary=---------------------------10566316601954411116451223245';
req._read = function(size) {
	var output = '';

	//output += '-----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="one" 1 -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="two" 2 -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="three" 3 -----------------------------10566316601954411116451223245--';

	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="one"';
	output += '\r\n';
	output += '\r\n';
	output += '1';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="two"';
	output += '\r\n';
	output += '\r\n';
	output += '2';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="three"';
	output += '\r\n';
	output += '\r\n';
	output += '3';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '--';
	output += '\r\n';

	this.push(output);
	this.push(null);
};
var res = response();
var lug = {};
mod.luggage(req, res, lug, function() {
	tap.assert.deepEqual(lug.post, {"one": "1", "two": "2", "three": "3"}, 'Should set post.');
});

tap.assert.equal(pack.luggage, true, 'The luggage item needs to be set in the package.json file.');

var req2 = new stream.Readable();
req2.headers = {};
req2.headers['content-type'] = 'multipart/form-data; boundary=---------------------------10566316601954411116451223245';
req2._read = function(size) {
	var output = '';
	//output += '-----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="id" 1 -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="from[]" TX -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="to[]" AL -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="from[]" -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="to[]" -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="from[]" -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="to[]" -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="from[]" -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="to[]" -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="from[]" -----------------------------10566316601954411116451223245 Content-Disposition: form-data; name="to[]" -----------------------------10566316601954411116451223245--';
	
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="id"';
	output += '\r\n';
	output += '\r\n';
	output += '1';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="from[]"';
	output += '\r\n';
	output += '\r\n';
	output += 'TX';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="to[]"';
	output += '\r\n';
	output += '\r\n';
	output += 'AL';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="from[]"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="to[]"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="from[]"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="to[]"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="from[]"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="to[]"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="from[]"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="to[]"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '--';
	output += '\r\n';

	this.push(output);
	this.push(null);
};
var res2 = response();
var lug2 = {};
mod.luggage(req2, res2, lug2, function() {
	console.log(lug2.post);
	tap.assert.deepEqual(lug2.post, {"from": ["TX", "", "", "", ""], "id": "1", "to": ["AL", "", "", "", ""]}, 'Should set post with arrays.');
});



