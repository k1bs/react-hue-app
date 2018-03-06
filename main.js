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

let client = {}

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL('http://localhost:3000')

  huejayInit(userInit)

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

function huejayInit (callback) {
  huejay.discover()
    .then((bridges) => {
      console.log(bridges[0])
      db.users.find({ bridgeIP: bridges[0].ip }, (err, docs) => {
        if (docs.length > 0) {
          console.log('logging in with existing user')
          client = new huejay.Client({
            host: docs[0].bridgeIP,
            username: docs[0].username
          })
        } else {
          console.log('no existing user')
          client = new huejay.Client({
            host: bridges[0].ip
          })
          client.bridge.get()
            .then(bridge => {
              console.log(`Retrieved bridge ${bridge.name}`)
              console.log('  Id:', bridge.id)
              console.log('  Model Id:', bridge.modelId)
              console.log('  Model Name:', bridge.model.name)
            }).catch(error => {
              console.log(`Could not connect: ${error}`)
            })
        }
        if (err) {
          console.log(err)
        }
      })
    }).catch((err) => {
      console.log(`Error: ${err.message}`)
    })
}

function userInit (bridge) {
  console.log(bridge.ip)
}

// TODO: IPC
