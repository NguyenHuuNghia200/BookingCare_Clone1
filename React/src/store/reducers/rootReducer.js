import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";

import userReducer from "./userReducer";
import adminReducer from "./adminReducer"
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const adminPersistConfig = {
    ...persistCommonConfig,
    key: 'admin',
    whitelist: ['isLoggedIn', 'adminInfo']
};

const appPersistconfig={
    ...persistCommonConfig,
    key:'app',
    whitelist:['language']
}
const UserPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (history) => combineReducers({
    router: connectRouter(history),
    //admin: persistReducer(adminPersistConfig, adminReducer),
    user: persistReducer(UserPersistConfig, userReducer),
    app: persistReducer(appPersistconfig,appReducer),
    admin:adminReducer
})