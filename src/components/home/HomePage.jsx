import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDogs, getTemperaments } from "../../redux/actions"
import DogCard from "../card/DogCard"
import FilteringAndSorting from "../filteringAndSorting/Ftr&Srt";
import Pagination from "../paging/Pagination";
import RefreshDogs from "../refreshDogs/Refresh";
import SearchBar from "../searchBar/SearchBar";
import styles from './homePage.module.css'

export default function Home() {
    let dogsToRender = []
    let totalDogs = 0
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [dispatch])

    let dogs = useSelector(state => state.dogs)
    const temperaments = useSelector(state => state.temperaments)

    const [actualPage, setActualPage] = useState(1)
    const [dogsPerPage] = useState(8)
    const indexOfLastDog = actualPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage

    if(Array.isArray(dogs)) {
       totalDogs = dogs.length
       dogsToRender = dogs.slice(indexOfFirstDog, indexOfLastDog)
    }

    const changePage = pageNum => setActualPage(pageNum)

    return (
        <div className={styles.container}>
            <div className={styles.backgroundImage}></div>
            <div>
                <h1 className={styles.h1}>Search and Create dogs as you wish!</h1>
            </div>
            <Link to="/create"><p className={styles.create}>Create Dog</p></Link>
            <Pagination totalDogs={totalDogs} dogsPerPage={dogsPerPage} paging={changePage}/>
            <div className={styles.searchReload}>
                <SearchBar setActualPage={setActualPage}/>
                <RefreshDogs setActualPage={setActualPage}/>
            </div>
            <div className={styles.filterSelect}>
                <FilteringAndSorting temperaments={temperaments} setActualPage={setActualPage} />
            </div>
            <div className={styles.cardContainer}>
            {dogsToRender.length ? (
            dogsToRender.map(breed => {
                return (
                    <Link to={"/home/" + breed.id}>
                        <DogCard 
                        key={breed.id}
                        name={breed.name}
                        image={breed.image}
                        weight={breed.weight}
                        temperaments={breed.temperaments ? breed.temperaments
                                                         : breed.temperament} />
                    </Link>
                )
            })
            ) : typeof(dogs) === 'string' ? <p className={styles.stringRender}>{dogs}</p>
              : <p className={`${styles.stringRender} ${styles.loader}`}>Loading...</p>
            }
            </div>
        </div>
    )
}