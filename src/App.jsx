import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LogInPage'
import LogoutPage from './pages/LogoutPage'
import NotFound from './pages/NotFound'
import CreateNewRestaurantPage from './pages/CreateNewRestaurantPage'
import UpdateRestaurantPage from './pages/UpdateRestaurantPage'
import '../src/assets/scss/App.scss'
import CreateTipsPage from './pages/CreateTipsPage'
import TipsPage from './pages/TipsPage'


function App() {
  return (
    <>
      <Navigation />
      
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/logout" element={<LogoutPage/>} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/create-new-restaurant" element={<CreateNewRestaurantPage/>} />
      <Route path="/update-restaurant" element={<UpdateRestaurantPage/>} />
      <Route path="/send-tips" element={<CreateTipsPage/>} />
      <Route path="/tips" element={<TipsPage/>} />
    </Routes>
    </>
  )
}

export default App
