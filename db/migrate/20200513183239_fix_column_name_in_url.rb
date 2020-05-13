class FixColumnNameInUrl < ActiveRecord::Migration[6.0]
  def change
    rename_column :urls, :url, :original_url
  end
end
