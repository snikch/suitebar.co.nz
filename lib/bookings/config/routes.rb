Bookings::Application.routes.draw do
  scope :v1 do
    resource :booking, only: [ :create ]
    get "booking", to: "bookings#create"
  end
end
