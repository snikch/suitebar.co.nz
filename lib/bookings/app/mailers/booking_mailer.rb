class BookingMailer < ActionMailer::Base
  default from: "suitebot@suitebar.co.nz"

  def request booking
    @booking = booking
    mail to: "bookings@suitebar.co.nz",
      subject: "Website Booking from #{booking.name}"
  end

end
