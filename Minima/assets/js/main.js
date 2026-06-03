$(document).ready( function() {
	
	$('#openForm').click( function() {
		$('.overlay').css({
			'width': '100%',
			'display': 'block',
			'visibility': 'visible',
			'opacity': 1
		});
	});

	$('#closeForm').click( function() {
		$('.overlay').css({
			'width': 0,
			'display': 'none',
			'visibility': 'hidden',
			'opacity': 0
		});
	});
	
}); /*$(document).ready(function(){*/
