process.chdir('test');
var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');
var pack = require('../package.json');
var stream = require('stream');

var util = require('util');

var mod = require('../');

var saved = '';

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

	saved = output;

	this.push(output);
	this.push(null);
};
var res = response();
var lug = {};
mod.luggage(req, res, lug, function() {
	console.log(util.inspect(lug.post, false, null));
	tap.assert.deepEqual(lug.post, {"one": "1", "two": "2", "three": "3"}, 'Should set post.');

	// Have some concerns about adding this - size and streaming issues.
	// Reconsider this in the future (maybe set as an option).
	tap.assert.equal(lug.post_original, saved, 'Should match the original data sent.');
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
	//console.log(lug2.post);
	tap.assert.deepEqual(lug2.post, {"from": ["TX", "", "", "", ""], "id": "1", "to": ["AL", "", "", "", ""]}, 'Should set post with arrays.');
});



var req3 = new stream.Readable();
req3.headers = {};
req3.headers['content-type'] = 'multipart/form-data; boundary=---------------------------10566316601954411116451223245';
req3._read = function(size) {
	var output = '';
	
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="deep.down.obj"';
	output += '\r\n';
	output += '\r\n';
	output += 'test';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="deep.down.another"';
	output += '\r\n';
	output += '\r\n';
	output += 'second';
	output += '\r\n';
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
	output += 'Content-Disposition: form-data; name="filter_json[].from"';
	output += '\r\n';
	output += '\r\n';
	output += 'TX';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="filter_json[].to"';
	output += '\r\n';
	output += '\r\n';
	output += 'AL';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="filter_json[].from"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="filter_json[].to"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="filter_json[].from"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="filter_json[].to"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="filter_json[].from"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="filter_json[].to"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="filter_json[].from"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="filter_json[].to"';
	output += '\r\n';
	output += '\r\n';
	output += '';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="arr[].with.extra.depth"';
	output += '\r\n';
	output += '\r\n';
	output += 'one';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="arr[].with.extra.width"';
	output += '\r\n';
	output += '\r\n';
	output += 'one.five';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="arr[].with.extra.depth"';
	output += '\r\n';
	output += '\r\n';
	output += 'two';
	output += '\r\n';
	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '\r\n';
	output += 'Content-Disposition: form-data; name="arr[].with.extra.width"';
	output += '\r\n';
	output += '\r\n';
	output += 'two.five';
	output += '\r\n';


	output += '--';
	output += '---------------------------10566316601954411116451223245';
	output += '--';
	output += '\r\n';

	this.push(output);
	this.push(null);
};
var res3 = response();
var lug3 = {};
mod.luggage(req3, res3, lug3, function() {
	//console.log(util.inspect(lug3.post, false, null));
	tap.assert.deepEqual(lug3.post, {"arr": [{"with": {"extra": {"depth": "one", "width": "one.five"}}}, {"with": {"extra": {"depth": "two", "width": "two.five"}}}], "deep": {"down": {"another": "second", "obj": "test"}}, "filter_json": [{"from": "TX", "to": "AL"}, {"from": "", "to": ""}, {"from": "", "to": ""}, {"from": "", "to": ""}, {"from": "", "to": ""}], "id": "1"}, 'Should handle arrays with nested values.');
	next();
});



function next() {
	var req = require('./fixtures/double_multipart.req');
	var res = response();
	var lug = {};
	var expect = require('./fixtures/double_multipart.js');
	mod.luggage(req, res, lug, function() {
		//console.log(util.inspect(lug.post, false, null));
		tap.assert.deepEqual(lug.post, expect, 'Should handle multipart inside of multipart.');
		next();
	});
}

