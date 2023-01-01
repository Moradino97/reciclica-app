import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { recoverePassword, recoverePasswordFail, recoverePasswordSuccess } from "./login.actions";
import { LoginState } from "./LoginState";


const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState, 
    on(recoverePassword, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        };
    }),
    on(recoverePasswordSuccess, currentState => {
        return  {
            ...currentState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        };
    }),
    on(recoverePasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        };;
    })
);

export function loginReducer(state: LoginState, action ){
    return reducer(state, action);
}