import mongoose from 'mongoose'
import UserSchema from '../schemas/user'

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
