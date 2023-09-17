import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";

export default function Annonces() {
  const [annonce, setAnnonce] = useState([]);
  const [ville, setVille] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [selectedVilleId, setSelectedVilleId] = useState(""); // New state for selected ville ID
  const [selectedCategorieId, setSelectedCategorieId] = useState("");

  useEffect(() => {
    axiosClient.get("/ville").then((res) => setVille(res.data));
  }, []);

  useEffect(() => {
    axiosClient.get("/categorie").then((res) => setCategorie(res.data));
  }, []);

  useEffect(() => {
    axiosClient
      .get("/annonceIndex")
      .then((res) => {
        setAnnonce(res.data);
        fetchAndSetVilleData(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const fetchAndSetVilleData = (annonces) => {
    const villeIds = Array.from(new Set(annonces.map((u) => u.id_ville)));
    Promise.all(villeIds.map((id) => axiosClient.get(`/ville/${id}`)))
      .then((responses) => {
        const villes = responses.map((res) => res.data);
        const updatedAnnonce = annonces.map((annonce) => {
          const ville = villes.find((v) => v.id === annonce.id_ville);
          if (ville) {
            return { ...annonce, nom: ville.nom };
          }
          return annonce;
        });
        setAnnonce(updatedAnnonce);
      })
      .catch((error) => console.error(error));
  };

  // New event handler to handle the change in selected ville
  const handleVilleChange = (e) => {
    setSelectedVilleId(e.target.value);
  };
  // New event handler to handle the change in selected category
  const handleCategorieChange = (e) => {
    setSelectedCategorieId(e.target.value);
  };

  // Filter the annonces based on both selected ville and categorie IDs
  const filteredAnnonces = annonce.filter((a) => {
    const villeMatch = selectedVilleId ? a.id_ville === parseInt(selectedVilleId) : true;
    const categorieMatch = selectedCategorieId ? a.id_categorie === parseInt(selectedCategorieId) : true;
    return villeMatch && categorieMatch;
  });
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Acceuil</h1>
      </div>
      <div className="box">
        <select
          type="numbre"
          value={selectedVilleId}
          onChange={handleVilleChange} // Use the event handler for ville select
        >
          <option value="">Tous les Villes</option>
          {ville.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nom}
            </option>
          ))}
        </select>
        &nbsp; &nbsp;
        <select
          type="numbre"
          id=""
          value={selectedCategorieId}
          onChange={handleCategorieChange} // Use the event handler for categorie select
        >
          <option value="">Toutes les Categories</option>
          {categorie.map((category) => (
            <option key={category.id} value={category.id}>
              {category.libelle}
            </option>
          ))}
        </select>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>titre</th>
              <th>prix</th>
              <th>ville</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnnonces.map((u, i) => (
              <tr key={i}>
                <td>
                  {/* Show the image using the img tag */}
                  <img
                    style={{ width: '150px', height: '100px', borderRadius: '10px' }}
                    alt={"#"}
                    src={"http://localhost:8000/images/" + u.photos}
                  />
                </td>
                <td>{u.titre}</td> {/* Assuming the 'titre' property holds the title */}
                <td>{u.prix}</td>
                <td>{u.nom}</td>
                <td>{u.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}




// import {useEffect, useState} from "react";
// import axiosClient from "../axios-client.js";
// import {Link} from "react-router-dom";
// import {useStateContext} from "../context/ContextProvider.jsx";

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const {setNotification} = useStateContext()

//   useEffect(() => {
//     getUsers();
//   }, [])

//   const onDeleteClick = user => {
//     if (!window.confirm("Are you sure you want to delete this user?")) {
//       return
//     }
//     axiosClient.delete(`/users/${user.id}`)
//       .then(() => {
//         setNotification('User was successfully deleted')
//         getUsers()
//       })
//   }

//   const getUsers = () => {
//     setLoading(true)
//     axiosClient.get('/users')
//       .then(({ data }) => {
//         setLoading(false)
//         setUsers(data.data)
//       })
//       .catch(() => {
//         setLoading(false)
//       })
//   }

//   return (
//     <div>
//       <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
//         <h1>Users</h1>
//         <Link className="btn-add" to="/users/new">Add new</Link>
//       </div>
//       <div className="card animated fadeInDown">
//         <table>
//           <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Create Date</th>
//             <th>Actions</th>
//           </tr>
//           </thead>
//           {loading &&
//             <tbody>
//             <tr>
//               <td colSpan="5" className="text-center">
//                 Loading...
//               </td>
//             </tr>
//             </tbody>
//           }
//           {!loading &&
//             <tbody>
//             {users.map(u => (
//               <tr key={u.id}>
//                 <td>{u.id}</td>
//                 <td>{u.name}</td>
//                 <td>{u.email}</td>
//                 <td>{u.created_at}</td>
//                 <td>
//                   <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
//                   &nbsp;
//                   <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//             </tbody>
//           }
//         </table>
//       </div>
//     </div>
//   )
// }
