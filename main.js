const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
// const Datastore = require('nedb')

// const user = new Datastore({
//   filename: './assets/db/user.nedb',
//   autoload: true
// })

// const commands = new Datastore({
//   filename: './assets/db/user.nedb',
//   autoload: true
// })

let win

// const startUrl = process.env.ELECTRON_START_URL || url.format({
//   pathname: path.join(__dirname, './build/index.html'),
//   protocol: 'file:',
//   slashes: true
// })

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadURL('http://localhost:3000')

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
