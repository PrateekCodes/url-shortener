require 'test_helper'

class UrlTest < ActiveSupport::TestCase
  fixtures :urls

  test "should be valid" do
    @url = urls(:one)
    assert @url.valid?
  end

  test "original url should be present" do
    urls(:one).original = " " * 5
    assert_not urls(:one).valid?
    assert_equal "Original can't be blank", urls(:one).errors.full_messages[0]
  end

  test "original url should be vaild url" do
    urls(:one).original = "altcampus.com"
    assert_not urls(:one).valid?
    assert_equal ["Please enter valid URL"], urls(:one).errors[:original]
  end

  test "original url should be unique" do
    @url = Url.new(original: urls(:one).original, short: "AaBbCcDd")
    assert_not @url.valid?
    assert_equal ["Original has already been taken"], @url.errors.full_messages
  end

  test "short url should be present" do
    urls(:one).short = " " * 8
    assert_not urls(:one).valid?
    assert_equal ["Short can't be blank"], urls(:one).errors.full_messages
  end

  test "short Url should have a length of 8" do
    urls(:one).short = "AbCd"
    assert_not urls(:one).valid?
    assert_equal ["Short is the wrong length (should be 8 characters)"], urls(:one).errors.full_messages
  end

  test "short url should be unique" do
    @url = Url.new(original: "https://bigbinary.com", short: urls(:one).short)
    assert_not @url.valid?
    assert_equal ["Short has already been taken"], @url.errors.full_messages
  end
end
