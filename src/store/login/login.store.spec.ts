import { AppInitialState } from "../AppInitialState";
import { recoverePassword, recoverePasswordFail, recoverePasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducer";
import { LoginState } from "./LoginState";

describe("Login store" , () =>{

    it('recoverPassword', () => {
        const initialState : LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoverePassword());
        expect(newState).toEqual({
            ...initialState,
            error : null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        });
    }),

    it('recoverPasswordSuccess', () => {
        const initialState : LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoverePasswordSuccess());
        expect(newState).toEqual({
            ...initialState,
            error:null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        });
    }),

    it('recoverPasswordFail', () => {
        const initialState : LoginState = AppInitialState.login;

        const error = {error: 'error'};
        const newState = loginReducer(initialState, recoverePasswordFail({error}));
        expect(newState).toEqual({
            ...initialState,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        });
    })
})