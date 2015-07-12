class CreateOrders < ActiveRecord::Migration
  def change
    create_table :orders do |t|
      t.string :orderId
      t.integer :user_id
      t.string :type
      t.double :amount
      t.string :description

      t.timestamps
    end
  end
end
