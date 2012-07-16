class BookingsController < ApplicationController
  def create
    booking = Booking.new \
      name: params[:name],
      guests: params[:guests],
      phone: params[:phone],
      email: params[:email],
      comments: params[:comments],
      booked_at: params[:booked_at] ? DateTime.parse(params[:booked_at]) : nil
    if booking.valid?
      BookingMailer.requesting(booking).deliver
      render nothing: true, status: 200, callback: params[:callback]
    else
      render json: booking.errors, status: 400, callback: params[:callback]
    end
  end
end
