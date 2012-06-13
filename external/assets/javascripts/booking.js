var Booking = function(){
	var _this = this, date_picker = $('#booking_date_picker'), time_picker = $('#booking_time_picker'), date = $('#booking_date'), time = $('#booking_time'), guests = $('#booking_guests'), name = $('#booking_name'), contact = $('#booking_contact'), form = $('#booking_form'), confirmation_container = $('.booking_confirmation'), comments = $('#booking_comments'), empty, show_error;

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
			contact: contact.val(),
			date: date.val(),
			time: time.val(),
			guests: guests.val()
		}, attention = new Array()

		$('.error', form).removeClass('error');

		if(empty(values.name))
			attention.push(name)
		if(empty(values.contact))
			attention.push(contact)
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
		$('.contact .value', confirmation_container).html(contact.val());
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

