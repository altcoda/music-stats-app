import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import './App.css';
import { GlobalProvider } from './context/GlobalProvider';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { PasswordReset } from './pages/PasswordReset';
import { ProfilePage } from './pages/ProfilePage';
import { AlbumsPage } from './pages/AlbumsPage';
import { AlbumDetails } from './components/AlbumDetails';
import { Artist } from './components/Artist';
import { UserAlbums } from './components/UserAlbums';
import { AddAlbumPage } from './pages/AddAlbumPage';
import { EditAlbumPage } from './pages/EditAlbumPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <Router>
        <App>
            <Routes>
              <Route index path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/reset-password' element={<PasswordReset />} />
              <Route path='/profile/:id' element={<ProfilePage />} />
              <Route path='/albums' element={<AlbumsPage />} />
              <Route path='/albums/:id' element={<AlbumDetails />} />
              <Route path='/useralbums' element={<UserAlbums />} />
              <Route path='/useralbums/add' element={<AddAlbumPage />} />
              <Route path='/useralbums/edit/:id' element={<EditAlbumPage />} />
              <Route path='/artist/:artistName' element={<Artist />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
        </App>
      </Router>
    </GlobalProvider>
  </React.StrictMode>
);
