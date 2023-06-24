import {useState} from 'react';
import axios from 'axios';

export default function AddWorks() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        setImage(file);
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image || '');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/admin/addWorks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); // Affiche la réponse du serveur
            // Redirige l'utilisateur vers la page du portfolio ou effectue une autre action
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h1>Ajouter un travail</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                ></textarea>
                <input type="file" onChange={handleImageChange} />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}
