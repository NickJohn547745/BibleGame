
var bible;
var myXML;

var currentLives = 0;
var startingLives = 7;
var currentScore = 0;//Starting score

function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] ||
        document.documentElement;

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);

};
//file:///C:/Users/Nicholas/Desktop/GitHub/NickJohn547745.github.io/BibleGame/nsrv.xml

function windowLoaded() {
	fetch('https://raw.githubusercontent.com/NickJohn547745/NickJohn547745.github.io/master/BibleGame/nsrv.xml')
	.then(function(response) {
		return response.text();
	})
	.then(function(response_text) {
		var parser = new DOMParser();
		myXML = parser.parseFromString(response_text, "text/xml");
	});
		
    document.getElementById("default_active").click();
	$('.overlay').fadeOut();
};

function tabClicked(evt, object_parent) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(object_parent).style.display = "block";
    evt.currentTarget.className += " active";

	currentLives = startingLives;
	currentScore = 0;
	
	if (object_parent == "old_testament")
	{
		getVerse('old_testament');
		document.getElementById("lifeboard").style.display = "block";
		document.getElementById("lifeboard").innerHTML = "Lives Left: " + currentLives;
		document.getElementById("scoreBoard").style.display = "block";
		document.getElementById("scoreBoard").innerHTML = "Score:  " + currentScore;
	}
	else if (object_parent == "new_testament")
	{
		getVerse('new_testament');
		document.getElementById("lifeboard").style.display = "block";
		document.getElementById("lifeboard").innerHTML = "Lives Left: " + currentLives;
		document.getElementById("scoreBoard").style.display = "block";
		document.getElementById("scoreBoard").innerHTML = "Score:  " + currentScore;
	}
	else if (object_parent == "all_testament" || object_parent == "hard_mode")
	{
		getVerse('all_testament');
		document.getElementById("lifeboard").style.display = "block";
		document.getElementById("lifeboard").innerHTML = "Lives Left: " + currentLives;
		document.getElementById("scoreBoard").style.display = "block";
		document.getElementById("scoreBoard").innerHTML = "Score:  " + currentScore;
	}
	else
	{
		document.getElementById("lifeboard").style.display = "none";
		document.getElementById("scoreBoard").style.display = "none";
	}
};

function revealAnswer(object_parent)
{
	var correctVerseNumber = document.getElementById("_testament_verse_number").innerHTML;
    var correctChapterNumber = document.getElementById("_testament_chapter_number").innerHTML;
    var correctBook = document.getElementById("_testament_book").innerHTML;
	alert(correctBook + " " + correctChapterNumber + ":" + correctVerseNumber);
	
	currentLives = currentLives-1;
	if (currentLives > 0 && currentLives <= startingLives)
	{
		document.getElementById("lifeboard").innerHTML = "Lives Left: " + currentLives;
	}
	else if (currentLives == 0)
	{
		alert("You ran out of lives!");
		document.getElementById("default_active").click();
	}
	
	if (object_parent == "old_testament")
		getVerse('old_testament');
	else if (object_parent == "new_testament")
		getVerse('new_testament');
	else if (object_parent == "all_testament" || object_parent == "hard_mode")
		getVerse('all_testament');
}

function getVerse(type) {
    var book_list,
        book_number = 0,
        book_name,
		book_alias;
    if (type == "old_testament") {
        book_list = myXML.getElementsByTagName("book");
        book_number = Math.floor((Math.random() * (38-1 + 1)) + 1);
        book = book_list[book_number];
        book_name = book.getAttribute("name");
		book_alias = book.getAttribute("alias")
		if (document.getElementById("_testament_book").innerHTML == book_name)
			getVerse("old_testament");
    } else if (type == "new_testament") {
        book_list = myXML.getElementsByTagName("book");
        book_number = Math.floor((Math.random() * (66 - 39 + 1)) + 39);
        book = book_list[book_number];
        book_name = book.getAttribute("name");
		book_alias = book.getAttribute("alias")
		if (document.getElementById("_testament_book").innerHTML == book_name)
			getVerse("new_testament");
    } else if (type == "all_testament" || type == "hard_mode") {
        book_list = myXML.getElementsByTagName("book");
        book_number = Math.floor((Math.random() * (66 - 1 + 1)));
        book = book_list[book_number];
        book_name = book.getAttribute("name");
		book_alias = book.getAttribute("alias")
		if (document.getElementById("_testament_book").innerHTML == book_name)
			getVerse("all_testament");
    }
	
    var chapter_list = book.getElementsByTagName("chapter");
    var chapter_count = chapter_list.length;
    var chapter_number = 1;
    if (chapter_count > 1)
        chapter_number = Math.floor((Math.random() * chapter_count) + 1);
    var chapter = chapter_list[chapter_number - 1];
    var chapter_name = chapter.getAttribute("name");

    var verse_list = chapter.getElementsByTagName("verse");
    var verse_count = verse_list.length;
    var verse_number = 1;
    if (verse_count > 1)
        verse_number = Math.floor((Math.random() * verse_count) + 1);
    var verse = verse_list[verse_number - 1];
    var verse_name = verse.getAttribute("name");
	var verse_text = verse.innerHTML;

	document.getElementById("old_testament_verse").innerHTML = verse_text;
	document.getElementById("new_testament_verse").innerHTML = verse_text;
	document.getElementById("all_testament_verse").innerHTML = verse_text;
	document.getElementById("hard_mode_verse").innerHTML = verse_text;
	
	document.getElementById("_testament_book_alias").innerHTML = book_alias;
	document.getElementById("_testament_verse").innerHTML = verse_text;
    document.getElementById("_testament_verse_number").innerHTML = verse_number;
    document.getElementById("_testament_chapter_number").innerHTML = chapter_number;
    document.getElementById("_testament_book").innerHTML = book_name;
};


function checkVerse(type) {
    if (type == "old_testament") {
        var correctVerseNumber = document.getElementById("_testament_verse_number").innerHTML;
        var correctChapterNumber = document.getElementById("_testament_chapter_number").innerHTML;
        var correctBook = document.getElementById("_testament_book").innerHTML;
		var correctBookAlias = document.getElementById("_testament_book_alias").innerHTML;
        var input = document.getElementById("old_testament_input").value;
		
		if (correctBookAlias == "")
			correctBookAlias = "~~~~~~~~~~~";
		
        if (input.toLowerCase().trim() == correctBook.toLowerCase() || input.toLowerCase().trim() == correctBookAlias) {
            getVerse("old_testament");
            alert("Correct!\r\n" + correctBook + " " + correctChapterNumber + ":" + correctVerseNumber);
            document.getElementById("old_testament_input").value = "";
			currentScore = currentScore+1;
			document.getElementById("scoreBoard").innerHTML = "Score:  " + currentScore;
        } else {
            document.getElementById("old_testament_input").value = "";
            alert("Try Again!");
			currentLives = currentLives-1;
        }
    } else if (type == "new_testament") {
        var correctVerseNumber = document.getElementById("_testament_verse_number").innerHTML;
        var correctChapterNumber = document.getElementById("_testament_chapter_number").innerHTML;
        var correctBook = document.getElementById("_testament_book").innerHTML;
        var input = document.getElementById("new_testament_input").value;
        if (input.toLowerCase().trim() == correctBook.toLowerCase() || input.toLowerCase().trim() == correctBookAlias) {
            getVerse("new_testament");
            alert("Correct!\r\n" + correctBook + " " + correctChapterNumber + ":" + correctVerseNumber);
            document.getElementById("new_testament_input").value = "";
			currentScore = currentScore+1;
			document.getElementById("scoreBoard").innerHTML = "Score:  " + currentScore;
        } else {
            document.getElementById("new_testament_input").value = "";
            alert("Try Again!");
			currentLives = currentLives-1;
			
        }
    }
	else if (type == "all_testament"){
		var correctVerseNumber = document.getElementById("_testament_verse_number").innerHTML;
        var correctChapterNumber = document.getElementById("_testament_chapter_number").innerHTML;
        var correctBook = document.getElementById("_testament_book").innerHTML;
        var input = document.getElementById("all_testament_input").value;
        if (input.toLowerCase().trim() == correctBook.toLowerCase() || input.toLowerCase().trim() == correctBookAlias) {
            getVerse("all_testament");
            alert("Correct!\r\n" + correctBook + " " + correctChapterNumber + ":" + correctVerseNumber);
            document.getElementById("all_testament_input").value = "";
			currentScore = currentScore+1;
			document.getElementById("scoreBoard").innerHTML = "Score:  " + currentScore;
        } else {
            document.getElementById("all_testament_input").value = "";
            alert("Try Again!");
			currentLives = currentLives-1;
        }
	}
	else if (type == "hard_mode"){
		var correctVerseNumber = document.getElementById("_testament_verse_number").innerHTML;
		var correctBookAlias = document.getElementById("_testament_book_alias").innerHTML;
        var correctChapterNumber = document.getElementById("_testament_chapter_number").innerHTML;
        var correctBook = document.getElementById("_testament_book").innerHTML;
        var input_book = document.getElementById("hard_mode_input1").value;
		var input_chapter = document.getElementById("hard_mode_input2").value;
        if ((
		input_book.toLowerCase().trim() == 
		correctBook.toLowerCase() || 
		input_book.toLowerCase().trim() == 
		correctBookAlias.toLowerCase()) && input_chapter == correctChapterNumber) {
            getVerse("all_testament");
            alert("Correct!\r\n" + correctBook + " " + correctChapterNumber + ":" + correctVerseNumber);
            document.getElementById("hard_mode_input1").value = "";
			document.getElementById("hard_mode_input2").value = "";
			currentScore = currentScore+1;
			document.getElementById("scoreBoard").innerHTML = "Score:  " + currentScore;
        } else {
            document.getElementById("hard_mode_input1").value = "";
			document.getElementById("hard_mode_input2").value = "";
            alert("Try Again!");
			currentLives = currentLives-1;
        }
	}
	if (currentLives > 0 && currentLives <= startingLives)
	{
		document.getElementById("lifeboard").innerHTML = "Lives Left: " + currentLives;
	}
	else if (currentLives == 0)
	{
		alert("You ran out of lives!");
		document.getElementById("default_active").click();
	}

};