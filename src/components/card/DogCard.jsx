import React from 'react'
import styles from './dogCard.module.css'

const DogCard = ({name, image, weight, temperaments}) => {
    let kg = ""
    let temps = ""

    if(weight === "99 ") {
        kg = "Undefined or uncertain weight"
    } else {
        kg = `${weight} kg`
    }

    if(Array.isArray(temperaments)) {
        temperaments.forEach(t => {
            temps = temps + t.name + " "
        })
        temps = temps.split(" ").join(", ")
        temps = temps.slice(0, -2)
    } else {
        temps = temperaments
    }

    return (
        <div className={styles.card}>
            <div>
                <h3>{name}</h3>
                <img className={styles.img} src={image} alt={name}/>
                <h5>Weight: {kg}</h5>
                <h5>Temperaments: {temps ? temps
                                         : "No temperaments defined"}</h5>
            </div>
        </div>
    )
}

export default DogCard