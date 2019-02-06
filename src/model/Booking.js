const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookingSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{ timestamps: true }
)

module.exports = mongoose.model('Booking', BookingSchema)
