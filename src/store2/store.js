import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducers from './reducers/rootReducers'

const middlewares = [thunk]

const persistConfig = {
  key: 'root',
  storage
}

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const middleware = applyMiddleware(...middlewares)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = createStore(persistedReducer, composeEnhancers(middleware))
export const persistor = persistStore(store);