import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import AnnonceForm from "./views/annonce/AnnonceForm";
import Accueil from "./views/annonce/Accueil";
import MembreForm from "./views/membres/Membre.jsx";
import Multimedia from "./views/annonce/Multimedia.jsx";
import Immobilier from "./views/annonce/Immobilier.jsx";
import Vehicules from "./views/annonce/Vehicules.jsx";
import Maison from "./views/annonce/Maison.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/membre',
        element: <MembreForm key="membreCreate" />
      },
      {
        path:'/annonce',
        element:<AnnonceForm key="annonceCreate"/>
      },
      {
        path:'/accueil',
        element:<Accueil />
      },
      {
        path:'/multimedia',
        element:<Multimedia />
      },
      {
        path:'/immobilier',
        element:<Immobilier />
      },
      {
        path:'/vehicules',
        element:<Vehicules />
      },
      {
        path:'/maison',
        element:<Maison />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
