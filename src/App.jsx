import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import SignupPage from './pages/SignupPage'
import NotFound from './pages/NotFound'
import CreateNewRestaurantPage from './pages/CreateNewRestaurantPage'
import UpdateRestaurantPage from './pages/UpdateRestaurantPage'
import '../src/assets/scss/App.scss'
import CreateTipsPage from './pages/CreateTipsPage'
import TipsPage from './pages/TipsPage'
import UserListPage from './pages/UserListPage'
import RestaurantsListPage from './pages/RestaurantsListPage'
import { ReactQueryDevtools } from 'react-query/devtools'
import RequireAuth from './components/RequireAuth'

function App() {
	return (
		<>
			<Navigation />
			
			<Routes>
			{/* Guest Routes */}
			<Route path="/" element={<HomePage/>} />
			<Route path="*" element={<NotFound/>} />
			<Route path="/login" element={<LoginPage/>} />
			<Route path="/logout" element={<LogoutPage/>} />
			<Route path="/signup" element={<SignupPage/>} />
			<Route path="/send-tips" element={<CreateTipsPage/>} />

			{/* Protected Routes */}
			<Route path="/create-new-restaurant" element={
				<RequireAuth>
					<CreateNewRestaurantPage/>
				</RequireAuth>
			} />

			<Route path="/update-restaurant" element={
				<RequireAuth>
				<UpdateRestaurantPage/>
				</RequireAuth>
			} />

			<Route path="/restaurantlist" element={
				<RequireAuth>
				<RestaurantsListPage/>
				</RequireAuth>
			} />

			<Route path="/tips" element={
				<RequireAuth>
				<TipsPage/>
				</RequireAuth>
			} />

			<Route path="/userlist" element={
				<RequireAuth>
				<UserListPage/>
				</RequireAuth>
			} />
			</Routes>

			<ReactQueryDevtools />
		</>
	)
}

export default App
