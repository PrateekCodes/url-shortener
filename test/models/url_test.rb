require 'test_helper'

class UrlTest < ActiveSupport::TestCase
  fixtures :urls

  test "should be valid" do
    @url = urls(:one)
    assert @url.valid?
  end

  test "original url should be present" do
    urls(:one).original_url = " " * 5
    assert_not urls(:one).valid?
    assert_equal "Original url can't be blank", urls(:one).errors.full_messages[0]
  end

  test "original url should be vaild url" do
    urls(:one).original_url = "altcampus.com"
    assert_not urls(:one).valid?
    assert_equal ["Please enter valid URL"], urls(:one).errors[:original_url]
  end

  test "original url should be unique" do
    @url = Url.new(original_url: urls(:one).original_url, short_url: "AaBbCcDd")
    assert_not @url.valid?
    assert_equal ["Original url has already been taken"], @url.errors.full_messages
  end

  test "short url should be present" do
    urls(:one).short_url = " " * 8
    assert_not urls(:one).valid?
    assert_equal ["Short url can't be blank"], urls(:one).errors.full_messages
  end

  test "short Url should have a length of 8" do
    urls(:one).short_url = "AbCd"
    assert_not urls(:one).valid?
    assert_equal ["Short url is the wrong length (should be 8 characters)"], urls(:one).errors.full_messages
  end

  test "short url should be unique" do
    @url = Url.new(original_url: "https://bigbinary.com", short_url: urls(:one).short_url)
    assert_not @url.valid?
    assert_equal ["Short url has already been taken"], @url.errors.full_messages
  end
end
