const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    savePassword: (data) => ipcRenderer.send('save-password', data),
    showPrompt: (message) => {
        // Отправляем запрос на отображение диалога и ждём ответа
        return new Promise((resolve) => {
            ipcRenderer.once('prompt-dialog-response', (event, result) => {
                resolve(result);
            });
            ipcRenderer.send('show-prompt-dialog', message);
        });
    }
});