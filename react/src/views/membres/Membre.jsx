import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client.js";
//


export default function MembreForm() {

  const navigate = useNavigate();
  const [membre, setMembre] = useState({
    id: null,
    username: '',
    name: '',
    prenom: '',
    email: '',
    password: '',
    tele: '',
    genre: 'homme',
    date_inscription: ''
  })
  const [errors, setErrors] = useState(null)
  const { setNotification } = useStateContext()




  const onSubmit = e => {
    e.preventDefault()
    axiosClient.post('/membreStore', membre)
      .then(() => {
        setNotification('membre was successfully created')
        navigate('/membre')
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  useEffect(() => {
    console.log("membre details", membre)
  }, [membre])


  return (
    <>
      {errors &&
        <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      }
      <form onSubmit={onSubmit}>
        <h1>Inscription</h1>
        <input value={membre.username} onChange={e => setMembre({ ...membre, username: e.target.value })} type="text" placeholder="Nom d'utilisateur" required />
        <input value={membre.name} onChange={e => setMembre({ ...membre, name: e.target.value })} type="text" placeholder="Nom" required />
        <input value={membre.prenom} onChange={e => setMembre({ ...membre, prenom: e.target.value })} type="text" placeholder="Prenom" required />
        <input value={membre.email} onChange={e => setMembre({ ...membre, email: e.target.value })} type="email" placeholder="email" required />
        <input value={membre.password} onChange={e => setMembre({ ...membre, password: e.target.value })} type="password" placeholder="Mot de passe" required />
        <input value={membre.tele} onChange={e => setMembre({ ...membre, tele: e.target.value })} type="text" placeholder="Telephone" required />
        {/* <input value={membre.genre} onChange={e => setMembre({...membre, genre: e.target.value})} type="text" placeholder="genre" required/> */}
        <div className="box">
          <select value={membre.genre}  onChange={e => {
            // console.log('value', e.target.value)

            setMembre({ ...membre, genre: e.target.value })
          }}>
            <option value="homme">homme</option>
            <option value="femme">femme</option>
          </select>
        </div>
        <br />
        <input value={membre.date_inscription} onChange={e => setMembre({ ...membre, date_inscription: e.target.value })} type="date" placeholder="genre" required />
        <button className="btn">sign up</button>
      </form>
    </>
  )
}
