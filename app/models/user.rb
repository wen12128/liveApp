class User < ActiveRecord::Base
	validates :telphone, length: { maximum: 11 }
	has_many : orders
end