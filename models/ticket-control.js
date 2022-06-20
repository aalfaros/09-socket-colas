const path = require('path')
const fs = require('fs')

class TicketControl {
  constructor() {
    this.ultimo = 0
    this.hoy = new Date().getDate() // 31
    this.tickets = []
    this.ultimos4 = []

    this.init()
  }

  get toJson() {
    return {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    }
  }

  init() {
    const data = require('../db/data.json')

    if (data.hoy === this.hoy) {
      this.tickets = data.tickets
      this.ultimo = data.ultimo
      this.ultimos4 = data.ultimos4
    } else {
      this.guardarDB()
    }
  }

  guardarDB() {
    const dbPath = path.join(__dirname, '../db/data.json')
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
  }
}

module.exports = TicketControl
