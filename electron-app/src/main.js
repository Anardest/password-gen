const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 520,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  if (app.isPackaged) {
    win.loadFile(path.join(process.resourcesPath, 'build', 'index.html'));
  } else {
    win.loadURL('http://localhost:3000');
  }

}

app.whenReady().then(createWindow);
