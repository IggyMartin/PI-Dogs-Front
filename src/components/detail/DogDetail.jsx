import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { cleanDetail, getDetail } from '../../redux/actions'
import styles from './dogDetail.module.css'

export default function DogDetail() {
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getDetail(id))
        return (() => {
          dispatch(cleanDetail())
        })
    }, [dispatch, id])

    const dog = useSelector(state => state.detail)


    let temps = ""
    let kg = ""

    if(Array.isArray(dog.temperaments)) {
        dog.temperaments.forEach(t => {
            temps = temps + t.name + " "
        })
        temps = temps.split(" ").join(", ")
        temps = temps.slice(0, -2)
    } else {
      temps = dog.temperaments
    }

    if(dog.weight === "99 ") {
      kg = "Undefined or uncertain weight"
    } else {
      kg = `${dog.weight} kg`
    }

    return (
        <div className={styles.container}>
          <div className={styles.backgroundImage}></div>
          <span className={styles.span}><Link to="/home">HOME</Link></span>
          {Object.entries(dog).length !== 0 ? (
          <div className={styles.cardContainer}>
            <h1 className={styles.h1}>{dog.name} </h1>
                <div className={styles.imgContainer}>
                  <img className={styles.img} src={dog.image} alt={dog.name} />
                </div>
            <div className={styles.text}>
              <p>Weight: {kg}</p>
              <p>Height: {dog.height} cm</p>
              <p>Life Span: {dog.life_span}</p>
              <p>
                Temperaments: {temps ? temps
                                     : "No temperaments defined"}
              </p>
            </div>
          </div>
        ) : <p className={`${styles.loader} ${styles.stringRender}`}>Loading...</p>}
        </div>
    )
}