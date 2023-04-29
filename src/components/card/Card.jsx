import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getContributers, getCurrentRepo } from '../../actions/repos';
import './card.less';

const Card = () => {
    const navigate = useNavigate();
    const {username, reponame} = useParams();
    const [repo, setRepo] = useState({owner: {}});
    const [contributers, setContributers] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        getCurrentRepo(username, reponame, setRepo).then(()=> setIsFetching(false));
        getContributers(username, reponame, setContributers);
    }, []);

    return (
        <>
        {!isFetching
            ?
            <div>
                <button onClick={() => navigate(-1)} className="back-button">Back</button>
                <div className="card">
                    <img className="avatar" src={repo.owner.avatar_url} alt="" />
                    <div className="name">{repo.name}</div>
                    <div className="stars"><i class="bi bi-star"></i> Stars: {repo.stargazers_count}</div>
                </div>
                <ol>Top contributers:
                    {contributers.map((c) =>
                        <li key={c.login}>{c.login}</li>
                    )}
                </ol>
               
            </div>
            :
                <div className="fetching"></div>   

        }
        </>
    )
}

export default Card