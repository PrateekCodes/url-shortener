class AddUniqueContraintToUrlIndex < ActiveRecord::Migration[6.0]
  def change
    add_index :urls, [:original, :short], unique: true
  end
end
