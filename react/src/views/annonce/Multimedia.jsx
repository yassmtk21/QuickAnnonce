import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";




export default function Annonces() {

   const [annonce, setAnnonce] = useState([]);
 
 
   useEffect(() => {
    axiosClient
      .get('/annonceIndex')
      .then((res) => {
        const annonces = res.data.filter((annonce) => annonce.id_categorie === 1);
        setAnnonce(annonces);
        fetchAndSetVilleData(annonces);
      })
      .catch((error) => console.error(error));
  }, []);
  
 
   console.log('annonce:', annonce); // Add this line to check the value of the annonce state
 
   // ... rest of the component
   const fetchAndSetVilleData = (annonces) => {
     const villeIds = Array.from(new Set(annonces.map((u) => u.id_ville))); // Get unique ville IDs
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
 
   return (
     <div>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <h1>Multimedia</h1>
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
             {annonce.map((u, i) => (
               <tr key={i}>
                 <td>
                   {/* Show the image using the img tag */}
                   <img
                     style={{ width: '150px',height:'100px', borderRadius: '10px' }}
                     alt={"#"}
                     src={"http://localhost:8000/images/" + u.photos} // Use the 'image_url' property here
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
 