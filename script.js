//This is the main greentext container
var gtHtml = "<div class=\"gtFrame yotsuba\">\
	<div class=\"gtTitle\">Title</div>\
	<div class=\"post\">\
		<span class=\"gtAuthor\">Author</span> \
		Last updated <span class=\"gtDate\">date</span>\
		<div class=\"right\">\
			[<a href=\"javascript:void();\" id=\"toggleGTHide\">Hide</a>] \
			<select id=\"gtStyle\">\
				<option value=\"yotsuba\">Yotsuba</option>\
				<option value=\"yotsubab\">Yotsuba B</option>\
				<option value=\"tomorrow\">Tomorrow</option>\
			</select>\
		</div><br>\
		<div class=\"hidden\" id=\"hidden\"></div>\
		<blockquote id=\"gtContent\">Loading content...</blockquote>\
	</div>\
</div>";

$( document ).ready(function() {
	//Append required HTML
    $(".go_right").prepend( "<a href=\"javascript:void();\" class=\"buttonsm\" id=\"toggleGTShow\">>Greentext</a>" );
    $("body").prepend(gtHtml);
    
    //Check if style prefrence exists on local storage
	if (localStorage.getItem("gtStyle") != null) {
		var sysStyle = localStorage.getItem("gtStyle");
		$(".gtFrame").attr("class", "gtFrame " + sysStyle);
	}
    
    //Grab raw paste
    var text = $('#paste_code').text();
	
	//Regex strings
	var find = [
		/\<(.*?)\>/g,
		/\[spoiler\](.*?)\[\/spoiler\]/g,
		/>((?!^>$)[^\r\n]+)/gi,
		/\n(\s*\n)+/g,
		/\n/g
	];
	
	//Regex string replacements
	var replace = [
		'',
		'<font class="spoiler">$1</font>',
		' <font class="implying">&gt;$1</font>',
		'</p><p>',
		'<br>'
	];
	
	//Perform all regex replacements
	for (var i =0; i < find.length; i++) {
		text = text.replace(find[i], replace[i]);
	}
	
	//Return content
	$('#gtContent').html('<p>' + text + '</p>');
	
	//Set title, author, and last updated in the Greentext window
	var title = $(".paste_box_line1").attr("title");
	var author = $(".paste_box_line2").children('a').first().text();
	var date = $(".paste_box_line2").children('span').first().text();
	
	$('.gtTitle').text(title);
	$('.gtAuthor').text(author);
	$('.gtDate').text(date);
	
	//Function for toggling greentext window
	$( "#toggleGTShow, #toggleGTHide" ).click(function() {
		$(".gtFrame").fadeToggle();
		$("#content_frame").fadeToggle();
	});
	
	//Function for selecting style
	$("#gtStyle").change(function() {
		var style = $(this).find(":selected").attr("value");
		
		$(".gtFrame").attr("class", "gtFrame " + style);
		localStorage.setItem("gtStyle", style);
	});
});
