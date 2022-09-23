import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthContextProvider from './contexts/AuthContext'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		}
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<QueryClientProvider client={queryClient}>
    	<BrowserRouter>
      		<AuthContextProvider>
      			<App />
        	</AuthContextProvider>
      	</BrowserRouter>
    	</QueryClientProvider>
  </React.StrictMode>
)
