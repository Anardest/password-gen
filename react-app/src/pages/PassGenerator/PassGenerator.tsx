import React from "react";

interface PassGeneratorProps {
    length: number;
    includeLowerLetters: boolean;
    includeUpperLetters: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
}

const PassGenerator: React.FC<PassGeneratorProps> = ({ length, includeNumbers, includeSymbols, includeLowerLetters, includeUpperLetters }) => {
    const [password, setPassword] = React.useState("");

    const generatePassword = () => {
        const lowerEnglish = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const upperEnglish = lowerEnglish.toUpperCase();
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

        let characters = (includeUpperLetters ? upperEnglish : "") + (includeLowerLetters ? lowerEnglish : "")
            + (includeNumbers ? numbers : "") + (includeSymbols ? symbols : "");
        let generatedPassword = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            generatedPassword += characters[randomIndex]
        }
        setPassword(generatedPassword);
    }

    return (
        <div>
            <button onClick={generatePassword}>Сгенерировать пароль</button>
            {password && (
                <div>
                    <strong>Ваш пароль:</strong> {password}
                </div>
            )}
        </div>
    )
}

export default PassGenerator;