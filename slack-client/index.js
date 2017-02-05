'use strict';
// import websocket as WS

$('#token-form').submit(function(e) {
    var postdata = $(this).serialize();
    var btn = $(this).find("button");
    var err_msg = $(this).find("#token-error");
    
    btn.text("Connecting...").prop("disabled", true);
    var rtm_successed = WS.start_rtm(postdata);
    if (rtm_successed) {
        WS.connect();
        WS.connection.onmessage = function (e) {
            console.log(e);
            putMsg("Server", e.data);
        };
        $('#output-container').show();
        btn.text("Connected");
        err_msg.text("");
    } else {
        btn.text("Connect!").prop("disabled", false);
        err_msg.text("Invalid token");
    }
    e.preventDefault(); // avoid to execute the actual submit of the form.
});

var putMsg = function(who, msg) {
    $('#output').append("<p>" + who + ": " + msg + "</p>");
}

$('#msg-input').keydown(function(e) {
    if (e.keyCode == 13) {
        $(this.form).submit();
        return false;
    }
});

$('#msg-form').submit(function(e) {
    var msg = $('#msg-input').val();
    $('#msg-input').val("");
    WS.send(msg);
    putMsg("You", msg);
    return false;
});

$('#output-container').hide();
