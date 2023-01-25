import React from 'react'
import styles from './pagination.module.css'

export default function Pagination({totalDogs, dogsPerPage, paging}) { 
    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <ul className={styles.ul}>
            {
                pageNumbers.map(p => (

                    <li key={p}>
                        <a href="#" onClick={() => paging(p)}>{p}</a>
                    </li>
                ))
            }
        </ul>
    )
}