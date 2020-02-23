const Event = require('../../model/Event')
const User = require('../../model/User')

const { dateToString } = require('../../helpers/date')

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    events.map(event => {
      return transformEvent(event)
    })
    return events
  } catch (err) {
    throw err
  }
}

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId)
    return transformEvent(event)
  } catch (err) {
    throw err
  }
}

const user = async userId => {
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc,
      _id: user.id,
      password: null, // Mute password from response
      createdEvents: events.bind(this, user._doc.createdEvents) // Populate createdEvents with data
    }
  } catch (err) {
    throw err
  }
}

// Transform data to match event type in schema
const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator) // Populate creator with data
  }
}

// Transform data to match booking type in schema
const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event), // Populate booking.event with associated event data
    createdAt: dateToString(booking.createdAt),
    updatedAt: dateToString(booking.updatedAt)
  }
}

exports.transformEvent = transformEvent
exports.transformBooking = transformBooking
