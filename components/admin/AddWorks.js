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


    const handleSubmit = async (e) => {
        e.preventDefault();

            const response = await axios.post('/api/admin/addWorks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            }
        );
        console.log(response.data)
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
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}
