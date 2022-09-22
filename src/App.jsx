import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import CreateNewPlacePage from './pages/CreateNewPlacePage'
import './App.scss'


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/create-new-place" element={<CreateNewPlacePage/>} />
    </Routes>
  )
}

export default App
