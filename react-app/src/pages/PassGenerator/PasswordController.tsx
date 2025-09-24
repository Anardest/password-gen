import React from "react";
import PassGenerator from "./PassGenerator";



const PasswordController: React.FC = () => {
    

    return (
        <div>
            <input type="checkbox" id="includeLowerLetters"></input>
            <label htmlFor="includeLowerLetters">Прописные символы</label>

            <input type="checkbox" id="includeLowerLetters"></input>
            <label htmlFor="includeSymbols">Прописные символы</label>

            <input type="checkbox" id="includeSymbols"></input>
            <label htmlFor="includeSymbols">Специальные символы</label>

            <input type="checkbox" id="includeNumbers"></input>
            <label htmlFor="includeNumbers">Цифры</label>
        </div>
    )
}