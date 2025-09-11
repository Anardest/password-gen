const { contexBridge, ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    savePassword: (data) => ipcRenderer.send('save-password', data)
});