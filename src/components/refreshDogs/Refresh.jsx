import React from 'react'
import { useDispatch } from 'react-redux'
import { getDogs } from '../../redux/actions'


export default function RefreshDogs({ setActualPage }) {
    const dispatch = useDispatch()
    const handleClick = e => {
        e.preventDefault()
        dispatch(getDogs())
        setActualPage(1)
    }
    return (
        <button type="submit" onClick={e => handleClick(e)}>
            Reload Dogs
        </button>
    )
}