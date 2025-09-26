import React, { useState } from "react";
import PassGenerator from "./PassGenerator";



const PasswordController: React.FC = () => {
    const [isLowerEnglish, setIsLowerEnglish] = useState(false);
    const [isUpperEnglish, setIsUpperEnglish] = useState(false);
    const [isNumbers, setIsNumbers] = useState(false);
    const [isSymbols, setIsSymbols] = useState(false);
    const [length, setLength] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLength(value === "" ? 0 : Number(value));
    }

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCount(value === "" ? 0 : Number(value));
    }

    return (
        <div className="page_center">
            <div className="card">
                <div className="card_top">
                    <div className="card_item">
                        <input
                            type="checkbox"
                            id="includeLowerEnglish"
                            checked={isLowerEnglish}
                            onChange={() => setIsLowerEnglish(prev => !prev)}
                        />
                        <label htmlFor="includeLowerEnglish">Прописные буквы</label>
                    </div>
                    <div className="card_item">
                        <input
                            type="checkbox"
                            id="includeUpperEnglish"
                            checked={isUpperEnglish}
                            onChange={() => setIsUpperEnglish(prev => !prev)}
                        />
                        <label htmlFor="includeUpperEnglish">Заглавные буквы</label>
                    </div>
                    <div className="card_item">
                        <input
                            type="checkbox"
                            id="includeNumbers"
                            checked={isNumbers}
                            onChange={() => setIsNumbers(prev => !prev)}
                        />
                        <label htmlFor="includeNumbers">Цифры</label>
                    </div>
                    <div className="card_item">
                        <input
                            type="checkbox"
                            id="includeSymbols"
                            checked={isSymbols}
                            onChange={() => setIsSymbols(prev => !prev)}
                        />
                        <label htmlFor="includeSymbols">Специальные символы</label>
                    </div>
                    <div className="card_item" style={{ flexBasis: '100%' }}>
                        <input
                            className="card_input"
                            type="number"
                            id="passwordLength"
                            onChange={handleLengthChange}
                            value={length}
                            min={1}
                            placeholder="Длина пароля"
                        />
                    </div>
                    <div className="card_item" style={{ flexBasis: '100%' }}>
                        <input
                            className="card_input"
                            type="number"
                            id="passwordCount"
                            onChange={handleCountChange}
                            value={count}
                            min={1}
                            placeholder="Количество паролей"
                        />
                    </div>
                </div>
                <div className="card_bottom">
                    <PassGenerator
                        includeLowerLetters={isLowerEnglish}
                        includeUpperLetters={isUpperEnglish}
                        includeNumbers={isNumbers}
                        includeSymbols={isSymbols}
                        length={length > 32 ? 32 : length}
                        count={count > 99 ? 99 : count}
                    />
                </div>
            </div>
        </div>
    )
}

export default PasswordController;