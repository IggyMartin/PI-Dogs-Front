import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createDog, getTemperaments } from '../../redux/actions'
import validator from './validatorFunction'
import styles from './create.module.css'

export default function CreateDog() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])
    const temperaments = useSelector(state => state.temperaments)

    const [temps, setTemps] = useState([])
    const [input, setInput] = useState({
        name: "",
        weightMin: 0,
        weightMax: 0,
        heightMin: 0,
        heightMax: 0,
        life_span: 0,
        temperament: []
    })

    const warnings = validator(input)

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }

    const handleSelect = e => {
        if(!temps.includes(e.target.value)) {
            if(temps.length) {
                setTemps([...temps, e.target.value])
            } else {
                setTemps([e.target.value]) 
            }
        }
    }

    const handleTempDelete = e => {
        e.preventDefault()
        setTemps(temps.filter(t => t !== e.target.value))
    }

    const handleSubmit = e => {
        e.preventDefault()
        const newDog = {
            name: input.name,
            weight: input.weightMin + " - " + input.weightMax,
            height: input.heightMin + " - " + input.heightMax,
            life_span: input.life_span + " years",
            temperament: temps
        }
        dispatch(createDog(newDog))
        alert("Dog created succesfully")
        setInput({
            name: "",
            weightMin: 0,
            weightMax: 0,
            heightMin: 0,
            heightMax: 0,
            life_span: 0,
            temperament: []
        })
        setTemps([])
    }

    return (
        <div className={styles.container}>
            <div className={styles.backgroundImage}></div>
            <span className={styles.span}><Link to="/home">HOME</Link></span>
            <h1>Create your Dog!</h1>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
                <label>Name: 
                    <input type="text" name="name" value={input.name} placeholder="name..." onChange={e => handleChange(e)}/>
                </label>
                <label>Minimum Weight: 
                    <input type="number" min="0" name="weightMin" value={input.weightMin} placeholder="Minimum Weight..." onChange={e => handleChange(e)}/>
                </label>
                <label>Maximum Weight: 
                    <input type="number" max="99" name="weightMax" value={input.weightMax} placeholder="Maximum Weight..." onChange={e => handleChange(e)}/>
                </label>
                <label>Minimum Height:
                    <input type="number" min="0" name="heightMin" value={input.heightMin} placeholder="Minimum Height..." onChange={e => handleChange(e)}/>
                </label>
                <label>Maximum Height:
                    <input type="number" max="120" name="heightMax" value={input.heightMax} placeholder="Maximum Height..." onChange={e => handleChange(e)}/>
                </label>
                <label>Life Span:
                    <input type="number" max="30" name="life_span" value={input.life_span} placeholder="Life span..." onChange={e => handleChange(e)}/>
                </label>
                <select name="temperament" onChange={e => handleSelect(e)}>
                    {temperaments.length ? temperaments.map((t, id) => {
                        if(t.name.length) {
                            return (
                            <option key={id}>
                                {t.name}
                            </option>
                            )
                        }
                    }) : <option>Loading temperaments...</option>}
                </select>
                <div className={styles.deleteTemps}>
                {
                    temps.map(t => {
                        return (
                            <div className={styles.tempsContainer}>
                            <button className={styles.buttonStyle} value={t} onClick={e => handleTempDelete(e)} >X</button>
                            <p>{t}</p>
                            </div>
                        )
                    })
                }
                </div>
                <p className={styles.warnings}>{warnings}</p>
                <button className={styles.submitDog} type="submit" disabled={warnings}>Create dog</button>
            </form>
            

        </div>
    )
}