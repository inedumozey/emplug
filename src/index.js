import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { PersistGate } from 'redux-persist/es/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import reportWebVitals from './reportWebVitals'
import SimpleReactLightbox from 'simple-react-lightbox'
import ThemeContext from './context/ThemeContext'
import 'react-form-builder2/dist/app.css'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SimpleReactLightbox>
          <BrowserRouter>
            <ThemeContext>
              <App />
            </ThemeContext>
          </BrowserRouter>
        </SimpleReactLightbox>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals()
