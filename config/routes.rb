Bookings::Application.routes.draw do
  scope "/v1" do
    resource :bookings, only: [ :create ] do
      get "/create", to: "bookings#create"
    end
  end
end
