import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/mainStyles.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import savedLocationReducer from './reducers/savedLocationReducer.js'
import messageReducer from './reducers/messageReducer.js'

const loadState = () => {
  try {
      const serializedState = localStorage.getItem('savedLocations')
      if (serializedState === null) {
          return undefined
      }
      return JSON.parse(serializedState);
  } catch (err) {
      console.error("Could not load state", err)
      return undefined
  }
}

const saveState = (state) => {
  try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem('savedLocations', serializedState)
  } catch (err) {
      console.error("Could not save state", err)
  }
}

const store = configureStore({
  reducer: {
      savedLocations: savedLocationReducer,
      message: messageReducer
  },
  preloadedState: {
      savedLocations: loadState() || [], 
  }
})

store.subscribe(() => {
  saveState(store.getState().savedLocations)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
