$(document).ready(function(){
	$('.form-close i').click(function(){
		$('.form-overlay').css('transform', 'translateY(110%)');
	});

	$('.pop-close i').click(function(){
		$('.popup-overlay, .popup-overlay-bond, .popup-overlay-opt').css('transform', 'translateY(110%)');
	});

	$('.item-card button').click(function(){
		$('.form-overlay').css('transform', 'translateY(0)');
	});

	$('.callback button').click(function(){
		$('.form-overlay').css('transform', 'translateY(0)');
	});

	$('.pop-btn-block button').click(function(){
		$('.form-overlay').css('transform', 'translateY(0)');
		$('.popup-overlay, .popup-overlay-bond, .popup-overlay-opt').css('transform', 'translateY(110%)');
	});

	$('nav a').click(function(e){
		e.preventDefault();
		let link = $(this).attr('href'),
				off_top = $(link).offset().top;

		$('body, html').stop().animate({scrollTop: off_top}, 800);
	});

	$('.phone').mask('+7 (999) 999-99-99');

	$(".feed-slide-win").slick({
		autoplay: true,
		prevArrow: '<button class="sld-arr__prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button class="sld-arr__next"><i class="fa fa-angle-right"></i></button>',
	});

	$('#store .item-card img').click(function(){
		$('.popup-overlay').css('transform', 'translateY(0)');
		$('.picture img').attr('src',$(this).attr('data-pic'));
		$('.new-price').text($(this).attr('data-price'));
		$('.pop-title').text($(this).attr('data-title'));
	});

	$('.bondmobile .item-card img').click(function(){
		$('.popup-overlay-bond').css('transform', 'translateY(0)');
		$('.picture img').attr('src',$(this).attr('data-pic'));
		$('.new-price').text($(this).attr('data-price'));
		$('.pop-title').text($(this).attr('data-title'));
	});

	$('.options .item-card img').click(function(){
		$('.popup-overlay-opt').css('transform', 'translateY(0)');
		$('.picture img').attr('src',$(this).attr('data-pic'));
		$('.new-price').text($(this).attr('data-price'));
		$('.popup-overlay-opt .pop-desc').html($(this).attr('data-desc'));
		$('.pop-title').text($(this).attr('data-title'));
	});


	$('#store .item-card .more-info').click(function(){
		$('.popup-overlay').css('transform', 'translateY(0)');
		$('.picture img').attr('src',$(this).attr('data-pic'));
		$('.new-price').text($(this).attr('data-price'));
		$('.pop-title').text($(this).attr('data-title'));
	});

	$('.bondmobile .item-card .more-info').click(function(){
		$('.popup-overlay-bond').css('transform', 'translateY(0)');
		$('.picture img').attr('src',$(this).attr('data-pic'));
		$('.new-price').text($(this).attr('data-price'));
		$('.pop-title').text($(this).attr('data-title'));
	});

	$('.options .item-card .more-info').click(function(){
		$('.popup-overlay-opt').css('transform', 'translateY(0)');
		$('.picture img').attr('src',$(this).attr('data-pic'));
		$('.new-price').text($(this).attr('data-price'));
		$('.popup-overlay-opt .pop-desc').html($(this).attr('data-desc'));
		$('.pop-title').text($(this).attr('data-title'));
	});


	let arr = $('.item-card');

	$(arr).on('mouseenter', function(){
		let num = $(this).attr('data-num'),
		th = arr[num];

		$(th).children('.more-info').css('opacity', '1');
	});

	$(arr).on('mouseleave', function(){
		let num = $(this).attr('data-num'),
		th = arr[num];

		$(th).children('.more-info').css('opacity', '0');
	});

	
});