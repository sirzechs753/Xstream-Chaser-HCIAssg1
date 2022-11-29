// Menu Button //
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener('click', function() {
	document.getElementById("myDropdown").classList.toggle("show");
})

window.onclick = function(e) {
	if(!e.target.matches("#menuBtn") && !e.target.matches(".bar1")) {
		var myDropdown = document.getElementById("myDropdown");
		if(myDropdown.classList.contains("show")) {
			myDropdown.classList.remove("show");
		}
	}
}

// Slider //
var slideIndex = 1;

$(".arrow-right").on("click", function() {
	slideIndex += 1;
	if(slideIndex > $(".img-slide").length) slideIndex = 1;
	showImg(slideIndex);
	console.log("test");
});

$(".arrow-left").on("click", function() {
	slideIndex -= 1;
	if(slideIndex < 1) slideIndex = $(".img-slide").length;
	showImg(slideIndex);
	console.log("test");
});

$(".slide-badge").on("click", function() {
	slideIndex = $(".slide-badge").index(this) + 1;
	showImg(slideIndex);
});

function showImg(n) {

	var currActive = $(".img-active");
	currActive.removeClass("img-active");

	currActive = $(".img-slide").eq(n-1);
	currActive.addClass("img-active");

	currActive = $(".bgc-white");
	currActive.removeClass("bgc-white");

	currActive = $(".slide-badge").eq(n-1);
	currActive.addClass("bgc-white");

	slideIndex = n;
}


//Modal Image//
var modal = $("#myModal");
var img = $(".myImg");
var modalImg = $("#img01");
var span = $(".close").eq(0);

function closeModel() {
	modal.css("display", "none");
	$("nav").css("display", "flex");
}

span.on("click", function() {
	closeModel();
})

$(".myImg").on("click", function() {
	modal.css("display", "block");
	modalImg.attr("src", $(this).attr("src"))
	$("nav").css("display", "none");
});

$(window).on("click", function(e) {
	if(e.target.matches("#myModal.modal")) closeModel();
})


//Validation//
var email = $("#email");
var username = $("#username");
var password1 = $("#password");
var password2 = $("#password2");
var gender = $("#gender");
var birthDate = $("#birth-date");
var country = $("#country");
var agreed = $("#agreement");

$("#registerbtn").on("click", function() {
	if(!validateEmail(email)) {
		alert("Email not Valid!");
		return;
	}

	if(!validateUsername(username)) {
		alert("Username must be atleast 5 characters!");
		return;
	}

	if(!validatePassword(password1)) {
		alert("Password must be atleast 8 characters and have both uppercase, lowercase characters!")
		return;
	}

	if(!validatePassword2(password1, password2)) {
		alert("Password does not match!");
		return;
	}

	if(!validateDate(birthDate)) {
		alert("Please input a valid date!");
		return;
	}

	if(!validateAge(birthDate)) {
		alert("You must be 15 or Older to register!")
		return;
	}

	if(!agreed.is(":checked")) {
		alert("You must agreed to our Terms & Privacy!")
		return;
	}

	alert("Congratulations you are now registered, we will notify you as soon as the game ready!")

	$(location).attr("href", "index.html")
})

function validateEmail(e) {
	var splitStr = e.val().split("@");
	if(splitStr.length != 2) return false;
	else {
		if(splitStr[0] == "" || splitStr[1] == "") return false;
		else {
			splitStr = splitStr[1].split(".");
			if(splitStr.length == 2) {
				if(splitStr[0] == "" || splitStr[1] == "") return false;
				else return true;
			}else if(splitStr.length == 3) {
				if(splitStr[0] == "" || splitStr[1] == "" || splitStr[2] == "") return false;
				else return true;
			}
			else return false;
		}
	}
}

function validateUsername(e) {
	if(e.val().length < 5) return false;
	return true;
}

function validatePassword(e) {
	var str = e.val();
	var lower = false, upper = false, digit8 = false;

	if(str.length >= 8) digit8 = true;
	
	for(var i = 0; i < str.length; i++) {
		if(str[i] >= 'A' && str[i] <= 'Z') upper = true;
		else if(str[i] >= 'a' && str[i] <= 'z') lower = true;
	}

	if(lower && upper && digit8) return true;

	return false;
}

function validatePassword2(a, b) {
	if(a.val() != b.val()) return false;

	return true
}

function validateDate(e) {
	var str = e.val();
	if(str == "") return false;

	return true;
}

function validateAge(e) {
	var str = e.val();
	if(str == "") return false;

	var today = new Date();
	var nowDay = today.getDate();
	var nowMonth = today.getMonth();
	var nowYear = today.getFullYear();

	var birth = new Date(str);
	var birthDay = birth.getDate();
	var birthMonth = birth.getMonth();
	var birthYear = birth.getFullYear();


	if(nowDay - birthDay < 0) nowMonth = nowMonth - 1;

	if(nowMonth - birthMonth < 0) nowYear = nowYear - 1;

	if(nowYear - birthYear < 15) return false;

	return true;
}