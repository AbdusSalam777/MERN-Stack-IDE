import './index.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import EditorComp from './pages/Editor';
function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path='/signin' Component={SignInPage}></Route>
        <Route path='/' Component={HomePage}></Route>
        <Route path='/editor' Component={EditorComp}></Route>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
