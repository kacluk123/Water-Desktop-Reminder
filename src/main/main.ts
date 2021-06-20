import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
import path from 'path' 
import { user } from './db/user'
import { days } from './db/days'
import notifier from 'node-notifier'

let isQuiting: boolean = false;

app.on('before-quit', function () {
  isQuiting = true;
});

let tray: Tray

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, '../../web/preload.js')
    }
  })
  
  win.loadFile(path.resolve(__dirname, '../../web/index.html'))

  tray = new Tray(path.resolve(__dirname, '../../web/test.png'));

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        win.show();
      }
    },
    {
      label: 'Quit', click: function () {
        app.quit();
      }
    }
  ]));
  
  win.on('close', function (event) {
    if (!isQuiting) {
      event.preventDefault();
      win.hide();
      event.returnValue = false;
    }
  });

}

app.whenReady().then(async () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

ipcMain.handle('create-user', async (event, userData) => {
  const result = await user.create(userData)
  return result
})

ipcMain.handle('get-user', async (event) => {
  const result = await user.getUser()
  return result
})

ipcMain.handle('edit-user', async (event, id, userData) => {
  const result = await user.editUser(id, userData)

  return result
})

ipcMain.handle('get-days', async (event) => {
  const result = await days.getDays()

  return result
})

ipcMain.handle('create-day', async (event, userData) => {
  const result = await days.create(userData)

  return result
})

ipcMain.handle('update-day', async (event, id, userData) => {
  const result = await days.edit(userData, id)
  return result
})

ipcMain.handle('show-notification', async (event, cb: () => void) => {
  notifier.notify({
    title: 'My notification',
    message: 'Hello, there!',
    actions: [
      'test',
      'test1'
    ]
  }, function (error, response, metadata) {
    console.log(response, metadata);
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})