$(document).ready( function(){
	
	/*SMOOTH SCROLL FOR IE/ EDGE/ SAFARI*/
	$("a").on("click", function(e){
		if (this.hash !== "") {
			e.preventDefault();

			var hash = this.hash;

			$("html, body").animate({
				scrollTop: $(hash).offset().top
				}, 700, function(){
				window.location.hash = hash;
			});
		}
	});

	/*ACTIVE CLASS*/
	var mainNav = document.getElementsByClassName("main-nav")[0];
	var liItems = mainNav.getElementsByTagName("li");
	for (var i = 0; i < liItems.length; i++) {

		$(liItems[i]).on("click", function() {
			var current = document.getElementsByClassName("active");
			current[0].className = current[0].className.replace("active", "");
			this.className += " active";
		});
	}

	/*WAYPOINTS (STICKY MENU)*/
	$(".js--waypoints").waypoint(function(direction){
		if (direction == "down") {
			$("nav").addClass("sticky");
		} else {
			$("nav").removeClass("sticky");
		}
	});
	
	/*MIXITUP PLUGIN (PORTFOLIO SECTION)*/
	/*var mixer = mixitup(".mixitup");*/
	var mixitUp = mixitup(".mixitUp");
	

});


function openNav() {
	document.getElementById("mobileNav").style.width = "100%";
}

function closeNav() {
	document.getElementById("mobileNav").style.width = "0%";
}
