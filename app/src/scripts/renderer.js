document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate');
    const result = document.getElementById('result');

    generateBtn.addEventListener('click', () => {
        const passwordOptions = {
            length: parseInt(document.getElementById('length').value, 10),
            count: parseInt(document.getElementById('count').value, 10),
            includeUppercase: document.getElementById('uppercase').checked,
            includeLowercase: document.getElementById('lowercase').checked,
            includeNumbers: document.getElementById('numbers').checked,
            includeSymbols: document.getElementById('symbols').checked,
        }

        // Вызов функции генерации паролей
        generatePasswords(passwordOptions);
    });
    function generatePasswords(options) {
        result.innerHTML = '';
        const { length, count, includeLowercase, includeNumbers, includeSymbols, includeUppercase } = options;
        if (!(includeLowercase || includeNumbers || includeSymbols || includeUppercase)) {
            result.innerText = 'Выберите хотя бы один тип символов!';
            return;
        }

        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let allChars = '';
        if (includeLowercase) allChars += lowercaseChars;
        if (includeUppercase) allChars += uppercaseChars;
        if (includeNumbers) allChars += numberChars;
        if (includeSymbols) allChars += symbolChars;

        for (let i = 0; i < count; i++) {
            let password = '';
            for (let j = 0; j < length; j++) {
                const randomIndex = Math.floor(Math.random() * allChars.length);
                password += allChars[randomIndex];
            }
            const passwordItem = document.createElement('div');
            passwordItem.className = 'password-item';

            const passwordText = document.createElement('span');
            passwordText.className = 'password-text';
            passwordText.innerText = password;

            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-btn';
            saveBtn.innerText = 'Сохранить';

            saveBtn.addEventListener('click', async () => {
                const label = await window.electronAPI.showPrompt('Введите подпись для этого пароля:');

                if (label !== null && label.trim() !== '') {
                    window.electronAPI.savePassword({
                        label: label.trim(),
                        password: password,
                        timestamp: new Date().toISOString()
                    });
                    alert(`Пароль "${password}" сохранён с подписью: "${label}"`);
                }
            });

            passwordItem.appendChild(passwordText);
            passwordItem.appendChild(saveBtn);
            result.appendChild(passwordItem);
        }
    }
});
