const { app, BrowserWindow } = require('electron')
const huejay = require('huejay')
// const path = require('path')
// const url = require('url')
const Datastore = require('nedb')

const db = {}

db.users = new Datastore('./db/users.db')
db.commands = new Datastore('./db/commands.db')

db.users.loadDatabase()
db.commands.loadDatabase()

let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL('http://localhost:3000')

  huejay.discover()
    .then((bridges) => {
      bridges.map((bridge) => {
        console.log(bridge)
      })
    }).catch((err) => {
      console.log(`Error: ${err.message}`)
    })

  win.on('closed', () => {
    win = null
  })

  // TODO: Insert window
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

// TODO: IPC
