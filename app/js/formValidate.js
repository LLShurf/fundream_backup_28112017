$(function(){

	/* Checking on read rules */
	var check = function(){
		if ($('.chbox').prop('checked') == false) {
			$('.order').attr('disabled', 'disabled');
		}
		else {
			$('.order').removeAttr('disabled');
		}
	};
	setInterval(check, 100);



	/* Validating form's fields */

	var validName = false,
			validMail = false,
			validText = false;

	var patternMail = /[a-zA-Z_\.0-9]+@[a-zA-Z]+\.+\w{2,5}/g;


	$('.name').keyup(function(){

		var name = $('.name').val();

		if (name.length < 2) {
			$(this).css({
				'border-bottom' : '2px solid red',
				'transition' : 'border-bottom .2s ease-in-out'
			});
		}
		else {
			validName = true;
			$(this).css({
				'border-bottom' : '2px solid #34DE00'
			});
		}
	});


	$('.mail').keyup(function(){

		var mail = $('.mail').val(),
		vld_m = mail.match(patternMail);

		if (mail.length < 6 || vld_m == null) {
			$(this).css({
				'border-bottom' : '2px solid red',
				'transition' : 'border-bottom .2s ease-in-out'
			});
		}
		else {
			validMail = true;
			$(this).css({
				'border-bottom' : '2px solid #34DE00'
			});
		}
	});

	$('.text').keyup(function(){

		var text = $('.text').val();

		if (text.length < 10) {
			$(this).css({
				'border-bottom' : '2px solid red',
				'transition' : 'border-bottom .2s ease-in-out'
			});
		}
		else {
			validText = true;
			$(this).css({
				'border-bottom' : '2px solid #34DE00'
			});
		}
	});



	$('.order').click(function(){

		if (validName == true && validMail == true && validText == true) {
			$.ajax({
				type: "POST",
				url: "../mail.php",
				data: $('#mainForm').serialize()
			}).done(function() {
				$('.overlay').css({
					'transform' : 'translateY(0)',
					'background' : 'rgba(0,0,0,.4)'
				});
				$('.overlay-success').css({
					'transform' : 'translateY(0)',
					'opacity' : '.9'
				});
				$('.name').css({
					'border-bottom' : '2px solid #ff9c00'
				});
				$('.mail').css({
					'border-bottom' : '2px solid #ff9c00'
				});
				$('.text').css({
					'border-bottom' : '2px solid #ff9c00'
				});
				$('#mainForm').find('input').val('');
				$('#mainForm').trigger('reset');
			});
			return false;
		}
	});




});