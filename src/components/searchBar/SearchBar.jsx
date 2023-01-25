import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../redux/actions'

export default function SearchBar({ setActualPage }) {
    const [name, setName] = useState("")
    const dispatch = useDispatch()

    const handleChange = e => {
        setName(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(searchByName(name))
        setActualPage(1)
    }

    return (
        <>
        <input type="text" placeholder="Name..." onChange={e => handleChange(e)} />
        <button type="submit" onClick={e => handleSubmit(e)} >Search</button>
        </>
    )
}