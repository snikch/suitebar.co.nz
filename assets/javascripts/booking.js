var Booking = function(){
	var _this = this;
	this.init = function(){
		$('#booking_date').kalendae({
			weekStart: 1,
			direction: "today-future",
			disableNextYear: true,
			blackout: function (date) {return [0,1,1,1,0,0,0][Kalendae.moment(date).day()];}
		})
	}
}

