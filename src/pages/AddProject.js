import {React, useState} from 'react'
import { createProject, uploadImage } from '../api';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid green;
  color: green;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

function AddProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    function handleTitleChange(event) {
        setTitle(event.target.value)
    };

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    };

    function handleImageSelect(event) {
        setImage(event.target.files[0]);
    }

    async function handleSubmitForm(event) {
        event.preventDefault();
        console.log({title, description})
        // 1. Upload the Image through the backend
        const uploadData = new FormData();
        uploadData.append("filename", image);

        const response = await uploadImage(uploadData)

        console.log("response from BE with image url", response.data)

        // 2. Once we get the imageUrl -> create a Project
        // with title, description and imageUrl
        await createProject({title, description, imageUrl: response.data.fileUrl})
        
        toast.success("project created")

        navigate("/")
    };

  return (
    <form onSubmit={handleSubmitForm}>
        <label htmlFor="title">Title</label>
        <input onChange={handleTitleChange} type="text" id='title' value={title}/>

        <label htmlFor="description">Description</label>
        <input onChange={handleDescriptionChange} type="text" id='description' value={description}/>

        <label htmlFor="image">Image</label>
        <input onChange={handleImageSelect} type="file" id='image' value={image}/>

        <Button className='button' type='submit'>
            Create Project
        </Button>
    </form>
  ) 
}

export default AddProject;