import { createAction, props } from "@ngrx/store";

export const recoverePassword = createAction("[Recover password]");
export const recoverePasswordSuccess = createAction("[Recover password] success");
export const recoverePasswordFail = createAction("[Recover password] fail", props<{error :any}>());