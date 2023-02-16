import React, { useEffect, useState } from 'react'
import { getProjects } from '../api';
import { Link } from 'react-router-dom';

function ListProjects() {
    const [ projects, setProjects ] = useState([]); 

    useEffect(() => {
        async function getAllProjects() {
            const response = await getProjects();
            setProjects(response.data);
        }
        getAllProjects();
    }, []);

  return (
    <div>
        <h3>Projects</h3>
        <ul>
            {projects.map((project) => {
                return <li key={project._id}>
                <Link to={`/projects/${project._id}`}>
                    <h3>{project.title}</h3>
                </Link>
                {project.imageUrl && <img src={project.imageUrl}/>}
                </li>
            })}
        </ul>
    </div>
  )
}

export default ListProjects