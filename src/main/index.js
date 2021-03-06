import { app, BrowserWindow } from "electron"
import * as path from "path"
import { format as formatUrl } from "url"
import windowStateKeeper from "electron-window-state"

const isDev = process.env.NODE_ENV !== "production"

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  })

  const window = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height
  })
  mainWindowState.manage(window)

  if (isDev) {
    window.webContents.openDevTools()

    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require("electron-devtools-installer")

    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      .then(name => console.log(`Added Extensions`))
      .catch(err => console.log("An error occurred: ", err))
  }

  if (isDev) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    )
  }

  window.on("closed", () => {
    mainWindow = null
  })

  window.webContents.on("devtools-opened", () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow()
})
