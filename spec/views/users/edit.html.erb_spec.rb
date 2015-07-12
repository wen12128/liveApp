require 'spec_helper'

describe "users/edit" do
  before(:each) do
    @user = assign(:user, stub_model(User,
      :name => "MyString",
      :telphone => "MyString",
      :address => "MyString",
      :email => "MyString"
    ))
  end

  it "renders the edit user form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", user_path(@user), "post" do
      assert_select "input#user_name[name=?]", "user[name]"
      assert_select "input#user_telphone[name=?]", "user[telphone]"
      assert_select "input#user_address[name=?]", "user[address]"
      assert_select "input#user_email[name=?]", "user[email]"
    end
  end
end
