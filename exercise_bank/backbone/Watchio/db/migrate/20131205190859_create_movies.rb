class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.text :poster
      t.integer :rating
      t.boolean :seen, default: false
      t.text :plot

      t.timestamps
    end
  end
end
