// Styles
import './index.css'

// REACT STUFF
import { createContext, useContext, useReducer } from 'react'

// We handle the reducer on other file to simplify the app component.
import reducer from './state_management/reducer'


// We need a context for dispatch because we will use it on deeply nested components
// Therefore it will be easier using it with context
const dispatchContext = createContext()

// And we create this hook to make it user to use the dispatch function on the components.
export function useDispatch(){
  return useContext(dispatchContext)
}

function App() {

  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage())

  function loadStateFromLocalStorage(){
    
  }
  return (
    <dispatchContext.Provider value={dispatch}>
    </dispatchContext.Provider>
  )
}

export default App
