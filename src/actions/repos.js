import axios from "axios";
import { setIsFetching, setRepos } from "../reducers/reposReducer";

export const getRepos = (searchQuery = "stars:%3E1", currentPage, perPage) => {
    if (searchQuery === "") {
        searchQuery = "stars:%3E1";
    }
    return  async (dispatch) => {
        dispatch(setIsFetching(true));
        const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`);
        dispatch(setRepos(response.data))
    }
}

export const getCurrentRepo = async (username, repoName, setRepo) => {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
    setRepo(response.data);
}
export const getContributers = async (username, repoName, setContributers) => {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contributors?per_page=10`);
    setContributers(response.data);
}