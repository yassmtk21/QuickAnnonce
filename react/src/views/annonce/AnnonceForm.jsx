import React, { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios-client.js";

export default function AnnonceForm() {
  const navigate=useNavigate();
  const [categorie,setCategorie]=useState([]);
  const [ville,setVille]=useState([]);
  const [annonce , setAnnonce]=useState({
    id:null,
    votre_nom:'',
    email:'',
    tele:'',
    id_categorie:'',
    id_ville:'',
    titre:'',
    description:'',
    date_publication:'',
    prix:'',
    photos:null,
    status:null
  })



//categorie api
  useEffect(() => {
    axiosClient.get('/categorie')
    .then(res=>setCategorie(res.data))
  }, [])

//ville api
  useEffect(() => {
    axiosClient.get('/ville')
    .then(res=>setVille(res.data))
  }, [])

  const [errors, setErrors] = useState(null)
  const {setNotification}=useStateContext()



  // const onSubmit = e =>{
  //   e.preventDefault()
  //   axiosClient.post('/annonceStore',annonce)
  //       .then(() => {
  //         setNotification('annonce was successfully created')
  //         navigate('/annonce')
  //       })
  //       .catch(err => {
  //         const response = err.response;
  //         if (response && response.status === 422) {
  //           setErrors(response.data.errors)
  //         }
  //       })
  // }
  const onFileInputChange = (e) => {
    
    const selectedFile = e.target.files[0];
    setAnnonce({ ...annonce, photos: selectedFile });

  
    const reader = new FileReader();
    reader.onloadend = () => {
     
      const previewImage = document.getElementById("preview-image");
      previewImage.src = reader.result;
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("votre_nom", annonce.votre_nom);
    formData.append("email", annonce.email);
    formData.append("tele", annonce.tele);
    formData.append("id_categorie", annonce.id_categorie);
    formData.append("id_ville", annonce.id_ville);
    formData.append("titre", annonce.titre);
    formData.append("description", annonce.description);
    formData.append("date_publication", annonce.date_publication);
    formData.append("prix", annonce.prix);
    formData.append("status", annonce.status);
  
    // Append the selected file to the form data
    formData.append("photos", annonce.photos);
  
    axiosClient
      .post("/annonceStore", formData)
      .then(() => {
        setNotification("Annonce was successfully created");
        navigate("/annonce");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };
  
  
  
  

  useEffect(() => {
    console.log("annonce details", annonce)
  }, [annonce])


  return (
    <>
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <input value={annonce.votre_nom}  placeholder="Votre Nom" onChange={e => setAnnonce({ ...annonce, votre_nom: e.target.value })}/>
            <input value={annonce.email}  placeholder="Email" onChange={e => setAnnonce({ ...annonce, email: e.target.value })}/>
            <input value={annonce.tele} placeholder="Tel" onChange={e => setAnnonce({ ...annonce, tele: e.target.value })}/>
            <div className="box">
               <select type='numbre' id="" value={annonce.id_categorie} onChange={e => {setAnnonce({ ...annonce, id_categorie: e.target.value })}}>
                <option>Categorie</option>
                {
                  categorie.map(category => (<option key={category.id} value={category.id}>{category.libelle}</option>))
                } 
            </select>
            </div>
           
            <br />
            <br />
            <div className="box">
              <select type='numbre'  value={annonce.id_ville} onChange={e => {setAnnonce({ ...annonce, id_ville: e.target.value })}}>
                <option>choisissez votre ville</option>
                {
                  ville.map(v => (<option key={v.id} value={v.id} >{v.nom}</option>))
                }
            </select>
            </div>
            
            <br /><br />
            
            <input value={annonce.titre} type="text" placeholder="Titre de l'nnonce" onChange={e => setAnnonce({ ...annonce, titre: e.target.value })}/>
            <textarea value={annonce.description} placeholder="description de l'annonce" id="" cols="30" rows="10" onChange={e => setAnnonce({ ...annonce, description: e.target.value })}></textarea><br />
            <input value={annonce.date_publication} type="date"  onChange={e => setAnnonce({ ...annonce, date_publication: e.target.value })}/>
            <input value={annonce.prix} type='numbre' placeholder="prix de l'nnonce" onChange={e => setAnnonce({ ...annonce, prix: e.target.value })}/>
            <input accept=".jpg, .jpeg, .png, .gif"  type="file" onChange={onFileInputChange}/>
            <br />
            {/* Add the image element for preview */}
            <img
              id="preview-image"
              src=""
              alt="Preview"
              style={{ maxWidth: "200px" }}
            />
            <br />
            <button className="btn">Save</button>
        </form>
    </>
  )
}
