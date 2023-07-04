import i18n from "i18next";
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from "./languageActions";

export interface LanguageState {
    language: "en" | "zh";
    languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
    language: "zh",
    languageList: [
        { name: "中文", code: "zh" },
        { name: "English", code: "en" }
    ]
}

// 对于多action type可以用来区分的情况，可以使用switch语句
export default (state = defaultState, action: LanguageActionTypes) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload);
            return { ... state, language: action.payload }
        case ADD_LANGUAGE:
            return {
                ...state,
                languageList: [...state.languageList, action.payload]
            }
        default:
            return state
    }
    /** 
        if(action.type === 'change_language') {
            const newState = { ... state, language: action.payload };
            return newState;
        }
        if(action.type === 'add_language') {
            const newState = {
                ...state,
                languageList: [...state.languageList, action.payload]
            }
            return newState;
        }
        return state;
    */
}