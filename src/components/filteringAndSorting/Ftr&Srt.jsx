import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterByTemps, filterDbOrCreated, orderAlphabeticaly, orderByWeight } from '../../redux/actions'
import styles from './ftrAndsrt.module.css'

export default function FilteringAndSorting({ setActualPage, temperaments }) {
    const dispatch = useDispatch()

    const handleTempsFiltering = e => {
        e.preventDefault()
        dispatch(filterByTemps(e.target.value))
        setActualPage(1)
    }

    const handleApiCreated = e => {
        e.preventDefault()
        dispatch(filterDbOrCreated(e.target.value))
        setActualPage(1)
    }

    const [order, setOrder] = useState("")

    const handleAlphabeticalOrder = e => {
        e.preventDefault()
        dispatch(orderAlphabeticaly(e.target.value))
        setOrder(`Ordered ${e.target.value}`)
        setTimeout(function(){
            setActualPage(1)
        }, 1);
        setActualPage(2)
    }

    const handleWeightOrder = e => {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setOrder(`Ordered ${e.target.value}`)
        setTimeout(function(){
            setActualPage(1)
        }, 1);
        setActualPage(2)
    }

    return(
        <>
        <select className={styles.select} onChange={e => handleTempsFiltering(e)}>
            <option hidden>Filter by Temperament</option>
            {temperaments?.map(t => {
                if(t.name.length) {
                    return (
                        <option key={t.id} value={t.name}>
                            {t.name}
                        </option>
                    )
                }
            })}
        </select>

        <select className={styles.select} onChange={e => handleApiCreated(e)}>
            <option hidden>Filter Created or Existant</option>
            <option value="created">Created</option>
            <option value="existant">Existant</option>
        </select>

        <select className={styles.select} onChange={e => handleAlphabeticalOrder(e)}>
            <option hidden>Filter Alphabetically</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
        </select>

        <select className={styles.select} onChange={e => handleWeightOrder(e)}>
            <option hidden>Filter by Weight</option>
            <option value="minWeight">Lower Weighted</option>
            <option value="maxWeight">Higher Weighted</option>
        </select>   
        </>
    )
}