# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150712065648) do

  create_table "tts_products", force: true do |t|
    t.string    "title",   limit: 500
    t.binary    "content", limit: 2147483647
    t.timestamp "time",                                       null: false
    t.boolean   "status",                     default: false
    t.integer   "level",                      default: 0
  end

  create_table "tts_task", force: true do |t|
    t.string  "title",       limit: 128, null: false
    t.string  "description"
    t.integer "user_id",     limit: 8,   null: false
  end

  create_table "tts_user", force: true do |t|
    t.string    "login_name",    limit: 64,  null: false
    t.string    "name",          limit: 64,  null: false
    t.string    "password",                  null: false
    t.string    "salt",          limit: 64,  null: false
    t.string    "roles",                     null: false
    t.timestamp "register_date",             null: false
    t.string    "email",         limit: 128
    t.string    "status",        limit: 32
    t.integer   "team_id",       limit: 8
  end

  add_index "tts_user", ["login_name"], name: "login_name", unique: true, using: :btree

  create_table "tts_user_role", id: false, force: true do |t|
    t.integer "user_id", limit: 8, null: false
    t.integer "role_id", limit: 8, null: false
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "telphone"
    t.string   "address"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
