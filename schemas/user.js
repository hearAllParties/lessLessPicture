import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: Number,
  pwd: String,
  create_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
})

//每次执行保存之前的操作
UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.create_at = this.update_at = Date.now()
  } else {
    this.update_at = Date.now()
  }
  next()
})
//静态方法
UserSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('update_at')
      .exec(cb)
  }
}

export default UserSchema
