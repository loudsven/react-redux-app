import React, { useEffect, useState } from "react";
import './main.less';
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../../actions/repos";
import Repo from "./repo/Repo";
import { setCurrentPage } from "../../reducers/reposReducer";
import { createPages } from "../../utils/pagesCreator";

const Main = () => {
    const dispatch = useDispatch();
    const repos = useSelector(state => state.repos.items);
    const currentPage = useSelector(state => state.repos.currentPage);
    const perPage = useSelector(state => state.repos.perPage);
    const isFetchError = useSelector(state => state.repos.isFetchError);
    const totalCount = useSelector(state => state.repos.totalCount);
    const isFetching = useSelector(state => state.repos.isFetching);
    const [searchValue, setSearchValue] = useState('');
    const pagesCount = Math.ceil(totalCount / perPage);

    const pages = [];

    createPages(pages, pagesCount, currentPage);

    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage));
    }, [currentPage]);

    function searchHandler() {
        dispatch(setCurrentPage(1));
        dispatch(getRepos(searchValue, currentPage, perPage));
    }
    return (
        <>
            <div className="search">
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Repo name..." className="search-input" />
                <button onClick={() => searchHandler()} className="search-button">Search</button>
            </div>
            {
                !isFetching
                    ?
                    <div className="list">
                        {repos.map(repo => <Repo key={repo.id} repo={repo} />)}
                    </div>
                    :
                        <div className="fetching"></div>
            }

            <div className="pages">
                {pages.map((page, index) => <span
                    className={currentPage === page ? "current page" : "page"}
                    key={index}
                    onClick={() => dispatch(setCurrentPage(page))}>{page}</span>)}
            </div>
        </>
    )
}

export default Main;