import { DataState } from "../enum/data-state.enum";

// this letter is generic and any letter can be used instead of this letter. But whatver the letter, inide this interface we myust also use this letter
// we will need to pass some datatype whenever we are making an object of type "AppState". because of <T>
export interface AppState<T> {
    dataState: DataState;
    appData?: T;
    error?: string;
}
// the last two vars are optional because either we will have data in our aplication state 
// or we will have an error. so we put both of them as optional