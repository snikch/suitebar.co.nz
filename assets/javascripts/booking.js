var Booking = function(){
	var _this = this, date_picker = $('#booking_date_picker'), time_picker = $('#booking_time_picker'), date = $('#booking_date'), time = $('#booking_time'), guests = $('#booking_guests'), name = $('#booking_name'), contact = $('#booking_contact'), form = $('#booking_form'), empty, show_error;

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
			if(num == 12)
				$('.guests').addClass('large');
			else
				$('.guests').removeClass('large');
		});
		$('li', time_picker).click(this.change_time)
		form.submit(this.validate)
	}
	this.change_date = function(){
		date.val(this.getSelected());
		_this.update_date_display();
	}
	this.change_time = function(){
		time.val($(this).html());
		_this.update_date_display();
	}
	this.update_date_display = function(){
		var display = "Date: ";
		if(date.val())
			display += Kalendae.moment(date.val(), "YYYY-MM-DD").format("MMM Do");
		if(time.val())
			display += date.val() ? ", " + time.val() : time.val()
		$('.booking_date_display').html(display)
	}
	this.validate = function(e){
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

		if(attention.length == 0) return true;

		e.preventDefault();
		$.each(attention, function(k,v){
			show_error(v, k == 0)	
		});
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

