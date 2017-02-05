'use strict';
// module WS where
var WS = WS || {};              // for namespace
WS.start_rtm = function(postdata) {
    var url = "https://slack.com/api/rtm.start";
    $.ajax({
        type: "POST",
        url: url,
        async: false,
        data: postdata,
        success: function(data) {
            WS.rtmdata = data;
        },
    });
    return WS.rtmdata.ok;
};
WS.connect = function() {
    WS.connection = new WebSocket(WS.rtmdata.url);
    // Log messages from the server
    WS.connection.onmessage = undefined;
    // Log errors
    WS.connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };
};
WS.send = function(msg) {
    WS.connection.send(msg);
};
WS.findUser = function(id) {
    return WS.rtmdata.users.find(function(e) {
        return e.id == id;
    });
};
