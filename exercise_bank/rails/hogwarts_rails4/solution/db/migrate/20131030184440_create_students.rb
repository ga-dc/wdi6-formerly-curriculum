class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :name, null: false
      t.string :img_url, null: false
      t.references :house, null:false, index:true

      t.timestamps
    end

    reversible do |dir|
      dir.up do
        execute <<-SQL  
        ALTER TABLE students
        ADD CONSTRAINT fk_students_houses
        FOREIGN KEY (house_id)
        REFERENCES houses(id)
        SQL
      end
      dir.down do
        execute <<-SQL
          ALTER TABLE students
            DROP FOREIGN KEY fk_students_houses
        SQL
      end
    end

  end
end
