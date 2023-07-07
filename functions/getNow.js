'use strict'

const moment = require('moment-timezone')

const getNow = (format) => {
  const dateFormat = format || 'YYYY-MM-DD HH:mm:ss'

  return moment().tz('singapore').format(dateFormat)
}

module.exports = { getNow }
