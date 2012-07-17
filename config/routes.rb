Bookings::Application.routes.draw do
  scope :v1, path: :v1 do
    resource :bookings, only: [ :create ] do
      get "/create"
    end
  end
end
