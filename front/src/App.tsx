import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'

import HomePage from './pages/HomePage'
import FavouritesPage from './pages/FavouritesPage'

import { AppRoute } from './const'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path={AppRoute.Home} element={<HomePage />} />
          <Route path={AppRoute.Favourites} element={<FavouritesPage />} />
          <Route path="*" element={<NotFoundPage/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
