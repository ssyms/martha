const test = require(`ava`);
const sinon = require(`sinon`);
const martha = require('..').martha_v1;
const superagent = require('superagent');
const Supertest = require(`supertest`);
const supertest = Supertest(process.env.BASE_URL);
var getRequest;

var withGS = '{"data_object": {"checksums": [{"checksum": "64573c6a0c75993c16e313f819fa71b8571b86de75b7523ae8677a92172ea2ba", "type": "sha256"}, {"checksum": "594f5f1a316e9ccfb38d02a345c86597-293", "type": "etag"}, {"checksum": "9976538e92c4f12aebfea277ecaef9fc5b54c732", "type": "sha1"}, {"checksum": "41a4b033", "type": "crc32c"}], "version": "2018-01-31T142539.590521Z", "id": "ed703a5d-4705-49a8-9429-5169d9225bbd", "urls": [{"url": "https://commons-dss.ucsc-cgp-dev.org/v1/files/ed703a5d-4705-49a8-9429-5169d9225bbd?replica=aws"}, {"url": "https://commons-dss.ucsc-cgp-dev.org/v1/files/ed703a5d-4705-49a8-9429-5169d9225bbd?replica=azure"}, {"url": "https://commons-dss.ucsc-cgp-dev.org/v1/files/ed703a5d-4705-49a8-9429-5169d9225bbd?replica=gcp"}, {"url": "s3://commons-dss-commons/blobs/64573c6a0c75993c16e313f819fa71b8571b86de75b7523ae8677a92172ea2ba.9976538e92c4f12aebfea277ecaef9fc5b54c732.594f5f1a316e9ccfb38d02a345c86597-293.41a4b033"}, {"url": "gs://commons-dss-commons/blobs/64573c6a0c75993c16e313f819fa71b8571b86de75b7523ae8677a92172ea2ba.9976538e92c4f12aebfea277ecaef9fc5b54c732.594f5f1a316e9ccfb38d02a345c86597-293.41a4b033"}]}}';

var withNoGS = '{"data_object": {"updated": "2018-02-27T17:32:34.534544", "name": null, "created": "2018-02-27T17:32:34.534532", "version": "fe63407f", "urls": [{"url": "some/test/location", "system_metadata": {"updated_date": "2018-02-27T17:32:34.534544", "baseid": "68e8d0a7-0c5d-48cc-8f8b-690b941d55e9", "form": "object", "did": "c9b4f486-40b4-40a9-8736-d0e3891c440f", "file_name": null, "rev": "fe63407f", "version": null, "urls": ["some/test/location", "some/test/location/2", "some/test/location/3", "some/test/location/4", "some/test/location/5", "some/test/location/6"], "created_date": "2018-02-27T17:32:34.534532", "hashes": {"md5": "49aec1877b65b6c15c26eff0c3900009"}, "size": 1, "metadata": {"acls": "None,test"}}, "user_metadata": {"acls": "None,test"}}, {"url": "some/test/location/2", "system_metadata": {"updated_date": "2018-02-27T17:32:34.534544", "baseid": "68e8d0a7-0c5d-48cc-8f8b-690b941d55e9", "form": "object", "did": "c9b4f486-40b4-40a9-8736-d0e3891c440f", "file_name": null, "rev": "fe63407f", "version": null, "urls": ["some/test/location", "some/test/location/2", "some/test/location/3", "some/test/location/4", "some/test/location/5", "some/test/location/6"], "created_date": "2018-02-27T17:32:34.534532", "hashes": {"md5": "49aec1877b65b6c15c26eff0c3900009"}, "size": 1, "metadata": {"acls": "None,test"}}, "user_metadata": {"acls": "None,test"}}, {"url": "some/test/location/3", "system_metadata": {"updated_date": "2018-02-27T17:32:34.534544", "baseid": "68e8d0a7-0c5d-48cc-8f8b-690b941d55e9", "form": "object", "did": "c9b4f486-40b4-40a9-8736-d0e3891c440f", "file_name": null, "rev": "fe63407f", "version": null, "urls": ["some/test/location", "some/test/location/2", "some/test/location/3", "some/test/location/4", "some/test/location/5", "some/test/location/6"], "created_date": "2018-02-27T17:32:34.534532", "hashes": {"md5": "49aec1877b65b6c15c26eff0c3900009"}, "size": 1, "metadata": {"acls": "None,test"}}, "user_metadata": {"acls": "None,test"}}, {"url": "some/test/location/4", "system_metadata": {"updated_date": "2018-02-27T17:32:34.534544", "baseid": "68e8d0a7-0c5d-48cc-8f8b-690b941d55e9", "form": "object", "did": "c9b4f486-40b4-40a9-8736-d0e3891c440f", "file_name": null, "rev": "fe63407f", "version": null, "urls": ["some/test/location", "some/test/location/2", "some/test/location/3", "some/test/location/4", "some/test/location/5", "some/test/location/6"], "created_date": "2018-02-27T17:32:34.534532", "hashes": {"md5": "49aec1877b65b6c15c26eff0c3900009"}, "size": 1, "metadata": {"acls": "None,test"}}, "user_metadata": {"acls": "None,test"}}, {"url": "some/test/location/5", "system_metadata": {"updated_date": "2018-02-27T17:32:34.534544", "baseid": "68e8d0a7-0c5d-48cc-8f8b-690b941d55e9", "form": "object", "did": "c9b4f486-40b4-40a9-8736-d0e3891c440f", "file_name": null, "rev": "fe63407f", "version": null, "urls": ["some/test/location", "some/test/location/2", "some/test/location/3", "some/test/location/4", "some/test/location/5", "some/test/location/6"], "created_date": "2018-02-27T17:32:34.534532", "hashes": {"md5": "49aec1877b65b6c15c26eff0c3900009"}, "size": 1, "metadata": {"acls": "None,test"}}, "user_metadata": {"acls": "None,test"}}, {"url": "some/test/location/6", "system_metadata": {"updated_date": "2018-02-27T17:32:34.534544", "baseid": "68e8d0a7-0c5d-48cc-8f8b-690b941d55e9", "form": "object", "did": "c9b4f486-40b4-40a9-8736-d0e3891c440f", "file_name": null, "rev": "fe63407f", "version": null, "urls": ["some/test/location", "some/test/location/2", "some/test/location/3", "some/test/location/4", "some/test/location/5", "some/test/location/6"], "created_date": "2018-02-27T17:32:34.534532", "hashes": {"md5": "49aec1877b65b6c15c26eff0c3900009"}, "size": 1, "metadata": {"acls": "None,test"}}, "user_metadata": {"acls": "None,test"}}], "checksums": [{"checksum": "49aec1877b65b6c15c26eff0c3900009", "type": "md5"}], "id": "c9b4f486-40b4-40a9-8736-d0e3891c440f", "size": 1}}';

var noData = '{}';

var badData = '{"somethingelse": {"oops": not good json"}';

test.before(t => {
    getRequest = sinon.stub(superagent, 'get');
});

test.after(t => {
    getRequest.restore();
})

test(`should return gs link if it is present and no pattern param passed`, t => {
    var getResponse = getRequest.returns({end: (cb) => {cb(null, {text : withGS})}});
    const res = {send: getResponse, status: function(s) {this.statusCode = s; return this;}};
    martha({body: {"url" : "https://example.com/validGS"}}, res);
    t.true(res.send.lastCall.args[0].startsWith(`gs://`));
    t.is(res.statusCode, 200);
});

test(`should return descriptive error when no gs link is present and no pattern param passed`, t => {
    var getResponse = getRequest.returns({end: (cb) => {cb(null, {text : withNoGS})}});
    const res = {send: getResponse, status: function(s) {this.statusCode = s; return this;}};
    martha({body: {"url" : "https://example.com/noGSlink"}}, res);
    t.is(res.send.lastCall.args[0], "No gs:// link found");
    t.is(res.statusCode, 417);
});

test(`should return no data found if returned data object is empty and no pattern param passed`, t => {
    var getResponse = getRequest.returns({end: (cb) => {cb(null, {text : noData })}});
    const res = {send: getResponse, status: function(s) {this.statusCode = s; return this;}};
    martha({body: {"url" : "https://example.com/noData"}}, res);
    t.is(res.send.lastCall.args[0], "No data received from https://example.com/noData");
    t.is(res.statusCode, 404);
});

test(`should return error if data object is bad and no pattern param passed`, t => {
    var getResponse = getRequest.returns({end: (cb) => {cb(null, {text : badData})}});
    const res = {send: getResponse, status: function(s) {this.statusCode = s; return this;}};
    martha({body: {"url" : "https://example.com/badData"}}, res);
    t.is(res.send.lastCall.args[0], "Data returned not in correct format");
    t.is(res.statusCode, 400);
});

test.cb(`should return error if url passed is not good`, t => {
    supertest
        .get(`/martha_v1`)
        .send({"url" : "somethingNotValidURL"})
        .expect(response => {
            t.is(response.statusCode, 400);
        })
        .end(t.end);

});

test(`should return appropriate link if it is present and pattern param passed`, t => {
    var getResponse = getRequest.returns({end: (cb) => {cb(null, {text : withGS})}});
    var res = {send: getResponse, status: function(s) {this.statusCode = s; return this;}};
    martha({body: {"url" : "https://example.com/validGS", "pattern" : "s3://"}}, res);
    t.true(res.send.lastCall.args[0].startsWith(`s3://`));
    t.is(res.statusCode, 200);
});

test(`should return descriptive error when no link matching pattern is present`, t => {
    var getResponse = getRequest.returns({end: (cb) => {cb(null, {text : withNoGS})}});
    var res = {send: getResponse, status: function(s) {this.statusCode = s; return this;}};
    martha({body: {"url" : "https://example.com/noGSlink", "pattern" : "s3://"}}, res);
    t.is(res.send.lastCall.args[0], "No s3:// link found");
    t.is(res.statusCode, 417);
});

test(`should return no data found if returned data object is empty`, t => {
    var getResponse = getRequest.returns({end: (cb) => {cb(null, {text : noData })}});
    const res = {send: getResponse, status: function(s) {this.statusCode = s; return this;}};
    martha({body: {"url" : "https://example.com/noData", "pattern" : "s3://"}}, res);
    t.is(res.send.lastCall.args[0], "No data received from https://example.com/noData");
    t.is(res.statusCode, 404);
});

test(`should return error if data object is bad`, t => {
    var getResponse = getRequest.returns({end: (cb) => {cb(null, {text : badData})}});
    const res = {send: getResponse, status: function(s) {this.statusCode = s; return this;}};
    martha({body: {"url" : "https://example.com/badData", "pattern" : "s3://"}}, res);
    t.is(res.send.lastCall.args[0], "Data returned not in correct format");
    t.is(res.statusCode, 400);
});

test(`should return appropriate link if it is present and pattern param (all) passed`, t => {
    var getResponse = getRequest.returns({end: (cb) => {cb(null, {text : withGS})}});
    var res = {send: getResponse, status: function(s) {this.statusCode = s; return this;}};
    martha({body: {"url" : "https://example.com/validGS", "pattern" : "all"}}, res);
    t.deepEqual(res.send.lastCall.args[0], JSON.parse(withGS)["data_object"]);
    t.is(res.statusCode, 200);
});
