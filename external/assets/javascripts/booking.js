var Booking = function(){
	var _this = this,
		date_picker = $('#booking_date_picker'),
		time_picker = $('#booking_time_picker'),
		date = $('#booking_date'),
		time = $('#booking_time'),
		guests = $('#booking_guests'),
		name = $('#booking_name'),
		phone = $('#booking_phone'),
		email = $('#booking_email'),
		form = $('#booking_form'),
		confirmation_container = $('.booking_confirmation'),
		comments = $('#booking_comments'),
		empty,
		show_error,
		booking_url = 'http://0.0.0.0:3001/v1/bookings/create';
		booking_url = 'http://suite-bookings.herokuapp.com/v1/bookings/create';

	this.init = function(){
		date_picker.kalendae({
			weekStart: 1,
			direction: "today-future",
			disableNextYear: true,
			blackout: function (date) {return [0,1,1,1,0,0,0][Kalendae.moment(date).day()];},
			subscribe: { change: this.change_date }
		});
		guests.change(function(){
			var num = parseInt($(this).val());
			$('.guests_counter').html(num);
			if(num == 10)
				$('.guests').addClass('large');
			else
				$('.guests').removeClass('large');
		});
		$('li', time_picker).click(this.change_time)
		form.submit(this.validate)
		$('.y', confirmation_container).click(this.submit_booking);
		$('.n', confirmation_container).click(this.change_booking);
	}
	this.change_date = function(){
		date.val(this.getSelected());
		_this.update_date_display();
	}
	this.change_time = function(){
		time.val($(this).html());
		_this.update_date_display();
	}
	this.date_display = function(){
		var display = '';
		if(date.val())
			display += Kalendae.moment(date.val(), "YYYY-MM-DD").format("MMM Do");
		if(time.val())
			display += date.val() ? ", " + time.val() : time.val()
		return display;
	}
	this.update_date_display = function(){
		$('#booking_date_display').val(_this.date_display())
	}
	this.validate = function(e){
		e.preventDefault();
		var values = {
			name: name.val(),
			phone: phone.val(),
			email: email.val(),
			date: date.val(),
			time: time.val(),
			guests: guests.val()
		}, attention = new Array()

		$('.error', form).removeClass('error');

		if(empty(values.name))
			attention.push(name)
		if(empty(values.phone))
			attention.push(phone)
		if(empty(values.date))
			attention.push(date)
		if(empty(values.time))
			attention.push(time)
		if(empty(values.guests))
			attention.push(guests)

		if(attention.length == 0) return _this.show_confirmation();

		$.each(attention, function(k,v){
			show_error(v, k == 0)
		});
	}

	this.show_confirmation = function(){
		_this.update_confirmation_details();
		_this.show_confirmation_dialog();
	}
	this.update_confirmation_details = function(){
		$('.name .value', confirmation_container).html(name.val());
		$('.phone .value', confirmation_container).html(phone.val());
		$('.email .value', confirmation_container).html(email.val() == "" ? "not given" : email.val());
		$('.date .value', confirmation_container).html(_this.date_display());
		$('.guests .number', confirmation_container).html(guests.val());
		$('.guests .word', confirmation_container).html(
			'guest' + (parseInt(guests.val()) == 1 ? '' : 's')
		);
		var comments_html, comments_value = comments.val();
		if(comments_value){
			$('.comments', confirmation_container).
				removeClass('statement disabled').
				html('').
				append($('<div />').addClass('title').text('Comments:')).
				append($('<div />').addClass('value dotted').text(comments_value));
		}else{
			$('.comments', confirmation_container).
				html('').
				addClass('statement disabled').
				text('No Comments');
		}
	}
	this.change_booking = function(e){
		e.preventDefault();
		_this.hide_confirmation_dialog();
		$('html, body').animate({
			scrollTop: form.offset().top - 140
		});
	}

	this.submit_booking = function(e){
		e.preventDefault();
		$yes = $('.y', confirmation_container);
		if($yes.attr('disabled') == 'disabled'){
			console.log("Ignoring disabled submit");
			return;
		}
		$yes.attr('disabled', true).css('opacity', 0.5);

		$.ajax({ url: booking_url, data: form.serialize(), type: "get", dataType: 'jsonp' })
			.done(_this.booking_succeeded)
	}

	this.booking_succeeded = function(data){
		if(data["status"] != "success"){
			return _this.booking_failed(data);
		}
		console.log("succeeded")
		console.log(data);
		$('.modal', confirmation_container).html("<h1>Booking Request</h1><h2>Your request has been sent!</h2><h2>Thank you for making a booking request. We review requests regularly and will be in touch to confirm soon.</h2><div class='options'><a class='btn n'>Close</a></div>")
		$('.n', confirmation_container).click(_this.change_booking);
	}
	this.booking_failed = function(data){
		console.log("failed")
		console.log(data)
		if(data["status"] == "error"){
			$('.modal', confirmation_container).html("<h1>Booking Request</h1><h2>Sorry, an error occured!</h2><h2>Looks like things didn’t go as planned on our end… please contact Suite directly to make your booking.</h2><div class='options'><a class='btn n'>Close</a></div>");
			setTimeout(_this.hide_confirmation_dialog, 10000);
			$('.n', confirmation_container).click(_this.change_booking);
			return;
		}
		$yes = $('.y', confirmation_container);
		$yes.attr('disabled', false).css('opacity', 1);
		alert("Please fix the following: \n" + data["errors"].join("\n"))
		_this.change_booking();
	}

	this.show_confirmation_dialog = function(){
		confirmation_container.removeClass('disappear');
	}
	this.hide_confirmation_dialog = function(){
		confirmation_container.addClass('disappear');
	}

	show_error = function(element, scroll){
		element.parents('.input').addClass('error')
		if(!scroll) return;
		$('html, body').animate({
			scrollTop: $(element).offset().top - 140
		});
	}
	empty = function(input){
		return !input || input == ""
	}
}

