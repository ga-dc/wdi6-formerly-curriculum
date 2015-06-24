class CreateSkus < ActiveRecord::Migration
  def change
    create_table :skus do |t|
      t.string :code
      t.string :name
      t.integer :price
      t.integer :quantity

      t.timestamps
    end
  end
end
