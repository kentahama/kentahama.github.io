$('#token-form').submit(function(e) {
    var url = "https://slack.com/api/rtm.start";
    $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function(data) {
            info = data;
            if (data.ok) {
                connect(data.url);
            } else {
                $("#token-error").text("Invalid token");
            }
        },
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
});
var info="";
var connection = "";
var connect = function(url) {
    connection = new WebSocket(url);
    // Log messages from the server
    connection.onmessage = function (e) {
        console.log(e);
        putMsg("Server", e.data);
    };
    // Log errors
    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };
    $('#token-error').text("");
    $('#connect-btn').text("Connected").prop("disabled", true);
    $('#output-container').show();
};
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
    connection.send(msg);
    putMsg("You", msg);
    return false;
});
$('#output-container').hide();
