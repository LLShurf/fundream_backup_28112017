$(function(){


	$(".frst-f").submit(function(e) { //Change
		e.preventDefault();
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			document.location.href = "http://www.bocharnikov.space/_dev/thanks.html"
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$(".scnd-f").submit(function(e) { //Change
		e.preventDefault();
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			 document.location.href = "http://www.bocharnikov.space/_dev/thanks.html"
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$(".thr-f").submit(function(e) { //Change
		e.preventDefault();
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			 document.location.href = "http://www.bocharnikov.space/_dev/thanks.html"
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$(".frth-f").submit(function(e) { //Change
		e.preventDefault();
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			 document.location.href = "http://www.bocharnikov.space/_dev/thanks.html"
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});


});