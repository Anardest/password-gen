const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');


const ENCRYPTION_KEY = 'your-very-strong-32-char-secret-key!'; // Must be 256 bits (32 characters) TODO: Change this key
const IV = '1234567890123456'; // Must be 128 bits (16 characters)

const passwordFilePath = path.join(app.getPath('userData'), 'password.encrypted');

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(IV));
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(IV));
  let decrypted = decipher.update(text);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function readPasswordsFromFile() {
  if (!fs.existsSync(passwordFilePath)) {
    return [];
  }
  try {
    const encryptedData = fs.readFileSync(passwordFilePath);
    const decryptedData = decrypt(encryptedData);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Ошибка при чтении/расшифровке файла:', error);
    return [];
  }
}

function writePasswordsToFile(passwords) {
    const encryptedData = encrypt(JSON.stringify(passwords));
    fs.writeFileSync(passwordFilePath, encryptedData);
}


/**==============================================
 * LISTENERS
   ==============================================*/
// Слушатель для сохранения пароля
ipcMain.on('save-password', (event, data) => {
    const passwords = readPasswordsFromFile();
    passwords.push(data);
    writePasswordsToFile(passwords);
});

// Слушатель для получения паролей
ipcMain.on('get-passwords', (event) => {
    const passwords = readPasswordsFromFile();
    event.reply('passwords-response', passwords);
});

ipcMain.on('show-prompt-dialog', (event) => {
    // Если окно уже открыто, не создаем новое
    if (promptWindow) {
        promptWindow.focus();
        return;
    }

    promptWindow = new BrowserWindow({
        width: 400,
        height: 200,
        parent: BrowserWindow.getFocusedWindow(), // Делаем его дочерним окном
        modal: true, // Делаем его модальным
        show: false, // Скрываем, пока не будет готово
        webPreferences: {
            nodeIntegration: true, // Включаем Node.js для этого окна
            contextIsolation: false
        }
    });

    promptWindow.loadFile(path.join(__dirname, 'pages/prompt.html'));

    promptWindow.once('ready-to-show', () => {
        promptWindow.show();
    });

    // Когда окно закрывается, очищаем ссылку
    promptWindow.on('closed', () => {
        promptWindow = null;
    });

    // Слушаем ответ из окна диалога
    ipcMain.once('prompt-response', (event, result) => {
        event.reply('prompt-dialog-response', result);
    });
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile('src/pages/index.html');

  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
