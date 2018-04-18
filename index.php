<html>
<head>
<!--<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-3833290146425998",
    enable_page_level_ads: truerawgit
  });
</script>-->
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://rawgit.com/NickJohn547745/bibleGame/master/js/main.js"></script>

<link rel="stylesheet" type="text/css" href="https://rawgit.com/NickJohn547745/bibleGame/master/css/style.css">
</head>

<body onload="windowLoaded()">
<div class="overlay"><div>Now Loading...</div></div>
<p hidden id="_testament_verse"></p>
<p hidden id="_testament_book_alias"></p>
<p hidden id="_testament_verse_number"></p>
<p hidden id="_testament_chapter_number"></p>
<p hidden id="_testament_book"></p>
  
<div class="tab">
  <button class="tablinks main_menu" id="default_active" onclick="tabClicked(event, 'main_menu')">Home</button>
  <button class="tablinks whole_bible" onclick="tabClicked(event, 'all_testament')">Whole Bible Mode</button>
  <button class="tablinks old_testament" onclick="tabClicked(event, 'old_testament')">Old Testament Mode</button>
  <button class="tablinks new_testament" onclick="tabClicked(event, 'new_testament')">New Testament Mode</button>
  <button class="tablinks hard_mode" onclick="tabClicked(event, 'hard_mode')">Hard Mode</button>
  <b><p id="lifeboard" style="display:none;float:right; margin-right: 25px;">Lives Left:</p></b>
  <b><p id="scoreBoard" style="display:none;float:right; margin-right: 25px;">Current Score:</p></b>
</div>

<div id="main_menu" class="tabcontent">
  <h3>Home</h3>
  <p id="test">This website serves a purpose as a game/study tool that can be used to recite the different verses of the bible. It currently comes stock with four different modes: Whole Bible, Old Testament, New Testament, and a Hard Mode.</p>
</div>

<div id="all_testament" class="tabcontent">
  <p id="all_testament_verse"></p>
  <div id="all_testament_input_field">
	<input placeholder="Input Book Name" id="all_testament_input"></input>
	<button onclick="checkVerse('all_testament')">Check Answer</button>
	<button onclick="revealAnswer('all_testament');">Reveal Answer</button>
  </div>
</div>

<div id="old_testament" class="tabcontent">
  <p id="old_testament_verse"></p>
  <div id="old_testament_input_field">
	<input placeholder="Input Book Name" id="old_testament_input"></input>
	<button onclick="checkVerse('old_testament')">Check Answer</button>
	<button onclick="revealAnswer('old_testament');">Reveal Answer</button>
  </div>
</div>

<div id="new_testament" class="tabcontent">
  <p id="new_testament_verse"></p>
  <div id="new_testament_input_field">
	<input placeholder="Input Book Name" id="new_testament_input"></input>
	<button onclick="checkVerse('new_testament')">Check Answer</button>
	<button onclick="revealAnswer('new_testament');">Reveal Answer</button>
  </div>
</div>

<div id="hard_mode" class="tabcontent">
  <p id="hard_mode_verse"></p>
  <div id="hard_mode_input_field">
	<input placeholder="Input Book Name" id="hard_mode_input1"></input>
	<input placeholder="Input Chapter Number" id="hard_mode_input2"></input>
	<button onclick="checkVerse('hard_mode')">Check Answer</button>
	<button onclick="revealAnswer('hard_mode');">Reveal Answer</button>
  </div>
</div>

<h1 id="_testament_feedback" style="display:none" align="center"></h1>

<?php
$servername = "den1.mysql2.gear.host";
$username = "bibledatabase";
$password = "Se9v0vy9!_tN";

$conn = new mysqli($servername, $username, $password, 'BibleDatabase');
$ip = $_SERVER['REMOTE_ADDR'];

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	echo "<script>console.log(\"Connection failed: " . $conn->connect_error . "\");</script>";
} 
echo "<script>console.log(\"Connected successfully\");</script>";

$whitelisted_ips = $conn->query("SELECT id FROM ipwhitelist WHERE ip = \'" . $ip . "\'");
if ($whitelisted_ips->num_rows != 0) {
	$sql = "INSERT INTO visitors (ip_address) VALUES (\"" . $ip . "\")";
	if ($conn->query($sql) === TRUE) {
		echo "<script>console.log(\"Successfully logged new ip address: " . $ip . "\");</script>";
	}
	else {
		echo "<script>console.log(\"Error creating table: " . $conn->error . "\");</script>";
	}
}
else {
	echo "<script>console.log(\"Ip on the whitelist\");</script>";
}

//echo $conn->query("SELECT COUNT(*) FROM visitors");
	
$conn->close();
echo "<script>console.log(\"Database closed\");</script>";

?>
     
</body>
</html> 
