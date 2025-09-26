import React, { useState } from "react";

interface PassGeneratorProps {
    length: number;
    count: number;
    includeLowerLetters: boolean;
    includeUpperLetters: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;

}

const PassGenerator: React.FC<PassGeneratorProps> = ({ length, includeNumbers, includeSymbols, includeLowerLetters, includeUpperLetters, count }) => {
    const [passwords, setPasswords] = useState<string[]>([]);

    const generatePassword = () => {
        const lowerEnglish = "abcdefghijklmnopqrstuvwxyz";
        const upperEnglish = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

        let characters = (includeUpperLetters ? upperEnglish : "")
            + (includeLowerLetters ? lowerEnglish : "")
            + (includeNumbers ? numbers : "")
            + (includeSymbols ? symbols : "");


        if (characters.length === 0) return;
        const makePassword = () => {
            let generatedPassword = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                generatedPassword += characters[randomIndex]
            }
            return generatedPassword;
        }

        const newPasswords = [];
        for (let i = 0; i < count; i++) {
            newPasswords.push(makePassword());
        }
        setPasswords(newPasswords);
    }

    return (
        <div>
            <button className="btn" onClick={generatePassword}>Сгенерировать пароль</button>
            <div className="passwords_list" style={{ marginTop: '12px', overflowY: 'auto' }}>
                {passwords.length === 0 ? (
                    <p>Пароли появятся здесь...</p>
                ) : (
                    passwords.map((p, i) => (
                        <div key={i} className="password_item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong>Пароль {i + 1}:</strong> <span style={{ fontFamily: 'monospace', userSelect: 'all' }}>{p}</span>
                            <button
                                className="btn btn-copy"
                                onClick={() => {
                                    navigator.clipboard.writeText(p);
                                }}
                                title="Скопировать"
                            >
                                📋
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default PassGenerator;