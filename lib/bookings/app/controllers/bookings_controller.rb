class BookingsController < ApplicationController
  def create
    booking = Booking.new \
      name: params[:name],
      guests: params[:guests],
      phone: params[:phone],
      booked_at: DateTime.parse(params[:booked_at])
    if booking.valid?
      BookingMailer.request(booking).deliver
      render status: 200
    else
      render json: booking.errors, status: 400
    end
  end
end
