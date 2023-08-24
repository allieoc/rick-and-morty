import React, {useContext} from 'react'
import './MyFavorites.css'
import { FavoritesContext } from '../../contexts/FavoritesContext';
import CharacterCard from '../../components/CharacterCard/CharacterCard';

function MyFavorites() {
  //access the global state
  //Note {} NOT ()
  const {addCharacter, favorites} = useContext(FavoritesContext)
  
  return (
    <div className="favorites-container">
      <h1>My Favorite Characters</h1>
      <div className="favorite-characters">
        {
          favorites?.length > 0? 
          favorites?.map(item=><CharacterCard character={item}
            key={item.id} />)
            :
          <p>You have no favorite characters yet</p>
        }
      </div>
    </div>
  )
}

export default MyFavorites