json.array!(@users) do |user|
  json.extract! user, :name, :telphone, :address, :email
  json.url user_url(user, format: :json)
end