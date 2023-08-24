import React, {useContext, useEffect} from 'react'
import "./CharacterCard.css";
import {Link} from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { FavoritesContext } from '../../contexts/FavoritesContext';

function CharacterCard({character}) {
  //access the global state
  //Note {} NOT ()
  const {addCharacter, favorites, removeCharacter} = useContext(FavoritesContext)

  //start with a variable to test UI
  //const isFavorite = false;
  //change to state
  const [isFavorite, setIsFavorite] = React.useState(false)

  useEffect(
    ()=>{
      //console.log(favorites)
      //is this character in favorites?
      setIsFavorite(favorites?.find(item => item.id === character.id))

    }, [favorites] //runs whenever favorites changes
  )

  return (
    <div className="character-card">
        <img src={character.image} />
        <p>{character.name}</p>
        <Link to={`/details/${character.id}`}>See Details</Link>
        {
          isFavorite?
          <FaHeart onClick={()=>removeCharacter(character.id)}
          className='heart-icon'/>
          :
          <FaRegHeart onClick={()=>addCharacter(character)}
          className='heart-icon'/>
        }
    </div>
  )
}

export default CharacterCard