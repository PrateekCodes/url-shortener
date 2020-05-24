require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
    fixtures :categories

  test "category should be valid" do
    @category = categories(:one)
    assert @category.valid?
  end

  test "category title should be present" do
    categories(:one).title = " " * 5
    assert_not categories(:one).valid?
    assert_equal "Title can't be blank", categories(:one).errors.full_messages[0]
  end
  
  test "title should be unique" do
    @category = Category.new(title: categories(:one).title, color: "#ffffff")
    assert_not @category.valid?
    assert_equal ["Title has already been taken"], @category.errors.full_messages
  end

  test "color should be vaild hex code" do
    categories(:one).color = "fffffff"
    assert_not categories(:one).valid?
    assert_equal ["Please enter valid color"], categories(:one).errors[:color]
  end

  test "color should be present" do
    categories(:one).color = " " * 8
    assert_not categories(:one).valid?
    assert_equal "Color can't be blank", categories(:one).errors.full_messages[0]
  end

  test "color should have a length of 7" do
    categories(:one).color = "#ffff"
    assert_not categories(:one).valid?
    assert_equal "Color is the wrong length (should be 7 characters)", categories(:one).errors.full_messages[0]
  end
end
