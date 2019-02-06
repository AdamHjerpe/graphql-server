const bcrypt = require('bcryptjs')

const Event = require('../../model/Event')
const User = require('../../model/User')
const Booking = require('../../model/Booking')

const { transformBooking, transformEvent } = require('./merge')

module.exports = {

  bookings: async () => {
    try {
      const bookings = await Booking.find()
      return bookings.map(booking => transformBooking(booking))
    } catch (err) {
      throw err
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email })
      if (existingUser) {
        throw new Error('User exists already.')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      })
      const result = await user.save()
      return { ...result._doc, password: null, _id: result.id }
    } catch (err) {
      throw err
    }
  },
  bookEvent: async args => {
    const fetchedEvent = await Event.findOne({ _id: args.eventId })
    const booking = new Booking({
      user: '5c59ba5bfe111e570c3ae11b',
      event: fetchedEvent
    })
    const result = await booking.save()
    return transformBooking(result)
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event')
      const event = transformEvent(booking.event)
      await Booking.deleteOne({ _id: args.bookingId })
      return event
    } catch (err) {
      throw err
    }
  }
}
