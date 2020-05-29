class AddForeignKeyToUrls < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :urls, :categories
  end
end
