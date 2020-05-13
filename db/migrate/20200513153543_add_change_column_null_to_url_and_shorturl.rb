class AddChangeColumnNullToUrlAndShorturl < ActiveRecord::Migration[6.0]
  def change
    change_column_null :urls, :url, false
    change_column_null :urls, :short_url, false
  end
end
