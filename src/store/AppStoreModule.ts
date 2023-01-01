import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./loading/loading.reducer";
import { loginReducer } from "./login/login.reducer";

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading",loadingReducer),
    StoreModule.forFeature("login",loginReducer)

]
