class CreateVisits < ActiveRecord::Migration[6.0]
  def change
    create_table :visits do |t|
      t.references :url, null: false, foreign_key: true
      t.datetime "visited_at", precision: 6, null: false
    end
  end
end
