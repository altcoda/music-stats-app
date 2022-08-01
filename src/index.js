import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import './App.css';
import { GlobalProvider } from './context/GlobalProvider';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { PasswordReset } from './pages/PasswordReset';
import { ProfilePage } from './pages/ProfilePage';
import { AlbumsPage } from './pages/AlbumsPage';
import { AlbumDetails } from './components/AlbumDetails';
import { Artist } from './components/Artist';
import { AlbumsAdd } from './pages/AlbumsAdd';
import { UserAlbums } from './components/UserAlbums';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <Router>
        <App>
            <Routes>
              <Route index path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/reset-password' element={<PasswordReset />} />
              <Route path='/albums' element={<AlbumsPage />} />
              <Route path='/albums/add' element={<AlbumsAdd />} />
              <Route path='/albums/:mbid' element={<AlbumDetails />} />
              <Route path='/albums/unique' element={<UserAlbums />} />
              <Route path='/artist/:name' element={<Artist />} />
              <Route path='/profile/:id' element={<ProfilePage />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
        </App>
      </Router>
    </GlobalProvider>
  </React.StrictMode>
);