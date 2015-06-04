class CreateHouses < ActiveRecord::Migration
  def change
    create_table :houses do |t|
      t.string :name, null: false
      t.string :img_url, null: false

      t.timestamps
    end
  end
end
