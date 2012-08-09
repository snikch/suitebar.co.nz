class BookingsController < ApplicationController
  def create
    booking = Booking.new \
      name: params[:name],
      guests: params[:guests],
      phone: params[:phone],
      email: params[:email],
      comments: params[:comments],
      booked_at: params[:booking_date] ? DateTime.parse(params[:booking_date] + " " + params[:booking_time]) : nil

    if booking.valid?
      BookingMailer.requesting(booking).deliver
      render json: { status: "success" }, status: 200, callback: params[:callback]
    else
      render json: {status: "fail", errors: booking.errors.map{|k,v| "#{k} #{v}" }}, status: 200, callback: params[:callback]
    end
  rescue
    render json: {status: "error", errors: $!.message }, status: 200, callback: params[:callback]
  end
end
