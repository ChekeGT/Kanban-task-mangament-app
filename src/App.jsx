// Styles
import './index.css'

// Themes
import { THEMES } from './state_management/themes'

// Data to test the components
import data from './data/data.json'

// REACT STUFF
import { createContext, useContext, useEffect, useReducer } from 'react'

// We handle the reducer on other file to simplify the app component.
import reducer from './state_management/reducer'
import BoardTable from './components/BoardTable/BoardTable'
import BoardBar from './components/BoardBar/BoardBar'
import NavBar from './components/NavBar/NavBar'

// We need a context for dispatch because we will use it on deeply nested components
// Therefore it will be easier using it with context
const dispatchContext = createContext()

const boardsContext = createContext()

// And we create this hook to make it user to use the dispatch function on the components.
export function useDispatch(){
  return useContext(dispatchContext)
}

export function useBoardsContext(){
  return useContext(boardsContext)
}

function App() {

  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage())

  function loadStateFromLocalStorage(){
    
    if (localStorage.state == undefined){
      localStorage.state = JSON.stringify({
        boards: [],
        currentBoard: null,
        theme: THEMES.light
      })
    }
    let state = JSON.parse(localStorage.state)
    return state
  }
  useEffect(() => {
    if (state.theme == THEMES.dark){
      document.documentElement.classList.add('dark')
    }
  },[])
  return (
    <dispatchContext.Provider value={dispatch}>
      <boardsContext.Provider value={state.boards}>
        <div className='flex flex-row w-full'>
          <NavBar boards={state.boards} theme={state.theme} currentBoard={state.currentBoard}/>
          <div className='w-full dark:bg-veryDarkGrey'>
            <BoardBar boards={state.boards} theme={state.theme} board={state.currentBoard} numberOfBoards={state.boards.length}/>
            <BoardTable board={state.currentBoard}/>
          </div>
        </div>
      </boardsContext.Provider>
    </dispatchContext.Provider>
  )
}

export default App
