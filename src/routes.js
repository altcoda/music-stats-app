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


export const routes = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/about',
        element: <AboutPage />
    },
    {
        path: 'register',
        element: <RegisterPage />
    },
    {
        path: 'login',
        element: <LoginPage />
    },
    {
        path: '/reset-password',
        element: <PasswordReset />
    },
    {
        path: 'albums',
        element: <AlbumsPage />
    },
    {
        path: '/albums/:id',
        element: <AlbumDetails />
    },
    {
        path: '/artist/:artistName',
        element: <Artist />
    }
];

export const privateRoutes = [
    {
        path: '/useralbums',
        element: <UserAlbums />
    },
    {
        path: '/useralbums/add',
        element: <AddAlbumPage />
    },
    {
        path: '/useralbums/edit/:id',
        element: <EditAlbumPage />
    },
    {
        path: '/profile/:id',
        element: <ProfilePage />
    }
]
