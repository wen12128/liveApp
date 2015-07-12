# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
# LiveWebapp::Application.config.secret_key_base = 'aafefe4a31e24a090a7f7fb82eceb381fe9a7707d568728f16ee0aa00789121fa350512527aced1046a687b0e2ab8bc486e3fdb382179df5fba1596c6be62cdb'
require 'securerandom'

def secure_token
  token_file = Rails.root.join('.secret')
  if File.exist?(token_file)
    # Use the existing token.
    File.read(token_file).chomp
  else
    # Generate a new token and store it in token_file.
    token = SecureRandom.hex(64)
    File.write(token_file, token)
    token
  end
end
LiveWebapp::Application.config.secret_key_base = secure_token