$(document).ready(function() {
  $("#mainForm").on('submit', function() {
    $("#loader").show();
    $("#results").hide();
    var username = $("#inputUsername").val();
    //this weird way is need, because jagax hasn't set their CSP headers and therefore your browser will block a normal ajax call :()
    $.getJSON("https://query.yahooapis.com/v1/public/yql", {
      q: 'select * from html where url="http://hiscore.runescape.com/index_lite.ws?player='+username+'"',
      format: "json",
    }, function(data) {
      $("#loader").hide();
      $("#results").attr("style","display: flex");
      var runescapeData = data.query.results.body;
      console.log(runescapeData);
    });
  });
});
