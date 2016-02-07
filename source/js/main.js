$(document).ready(function() {
  $("#inputUsername").focus();
  $("#mainForm").on('submit', function() {
    $("#loader").show();
    $("#results").hide();
    var username = $("#inputUsername").val();
    //this weird way is need, because jagax hasn't set their CSP headers and therefore your browser will block a normal ajax call :()
    $.getJSON("https://query.yahooapis.com/v1/public/yql", {
      q: 'select * from html where url="http://hiscore.runescape.com/index_lite.ws?player=' + username + '"',
      format: "json",
    }, function(data) {
      $("#loader").hide();
      var runescapeData = data.query.results.body;
      //loop over data:
      runescapeData.split("\n").forEach(function(row, index) {
        var colls = row.split(",");
        var labelText = "Never trained";
        if (colls[0] != "-1" && colls.length > 1) {
          labelText = "<b>Lvl " + colls[1] + "</b> " + colls[2] + " xp";
        }
        $("span[data-index=" + index.toString() + "]").html(labelText);
      });
      $("#results").attr("style", "display: flex");
    });
  });
});
