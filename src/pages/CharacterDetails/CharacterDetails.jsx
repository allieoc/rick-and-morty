import React, { useEffect } from 'react'
import "./CharacterDetails.css"
import {useParams} from 'react-router-dom'
import axios from 'axios'

function CharacterDetails() {
    //this page shows details of a specific character
    //when the page loads
    //which character??
    //the id is in the url
    //retrieve id with useParams
    const {characterId} = useParams()

    //create state
    const [character, setCharacter] = React.useState('')

    //https://rickandmortyapi.com/api/character/2

    useEffect(
        ()=>{
            console.log('show details', characterId)
            //make api call to get details for this character
            axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
            .then(res =>{
                console.log(res.data)
                //I have the data, where do I store it?
                //store it in state
                setCharacter(res.data)
            })
            .catch(err => console.log(err))
        }, [] //runs once when the page loads
    )

  return (
    <div className="details-container">
        <img src={character?.image} />
        <div className="container-info">
            <p>Name: {character?.name}</p>
            <p>Gender: {character?.gender}</p>
            <p>Location: {character?.location?.name}</p>
        </div>
    </div>
  )
}
//if you get the error 
//@react-refresh:278 Uncaught TypeError: Cannot read properties of undefined (reading 'name')
//add ?
//get in the habit of adding ? when you're getting data from an object


export default CharacterDetails