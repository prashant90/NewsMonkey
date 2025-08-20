import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


const App = () =>{
  const apiKey=process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

    return (
      <>
      <Router>
        <Navbar />
        <LoadingBar
          color="#f11946"
          height={3}
          progress={progress}
        />
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" page={5} country="in" category="sports" max="5"/>}/>
          <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey}  key="general" page={5} country="in" category="general" max="5"/>}/>
          <Route exact path='/world' element={<News setProgress={setProgress} apiKey={apiKey}  key="world" page={5} country="in" category="world" max="5"/>}/>
          <Route exact path='/nation' element={<News setProgress={setProgress} apiKey={apiKey}  key="nation" page={5} country="in" category="nation" max="5"/>}/>
          <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey}  key="business" page={5} country="in" category="business" max="5"/>}/>
          <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" page={5} country="in" category="technology" max="5"/>}/>
          <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" page={5} country="in" category="entertainment" max="5"/>}/>
          <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" page={5} country="in" category="sports" max="5"/>}/>
          <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey}  key="science" page={5} country="in" category="science" max="5"/>}/>
          <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey}  key="health" page={5} country="in" category="health" max="5"/>}/>
        </Routes>
      </Router>
      </>
    )
}
export default App
