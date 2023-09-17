import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/accueil">Accueil</Link>
        <Link to="/immobilier">Immobilier</Link>
        <Link to="/multimedia">Multimedia</Link>
        <Link to="/maison">Maison</Link>
        <Link to="/vehicules">Vehicules</Link>
        <Link to="/accueil">Emploi et services</Link>
        <Link to="/accueil">Objets Personnels</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>

          <div>
            <Link className="btn-add" to="/annonce">deposer votre annoce &nbsp; &nbsp;</Link>
            &nbsp; &nbsp; {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
            <Link className="btn-add" to="/membre">signup &nbsp; &nbsp;</Link>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
