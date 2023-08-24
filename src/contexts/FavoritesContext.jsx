import { useState, createContext, useEffect } from 'react'

//create this context "thing"

export const FavoritesContext = createContext()

export default function FavoritesContextProvider(props){

    //create my global state to hold favorite characters
    const [favorites, setFavorites] = useState([])

    //set up useEffect to run when component loads to check local storage
    useEffect(
    ()=>{
        //get the value from localStorage
        const storedFavorites = localStorage.getItem('favoritesList')

        //check if something was there
        if (storedFavorites){
            //use this value for the state
            setFavorites(JSON.parse(storedFavorites))
        }
    }, []
    )


    //save favorites anytime it changes
    useEffect(
        () => {
            //store the value in localStorage
            localStorage.setItem('favoritesList', JSON.stringify(favorites))
        }, [favorites] //runs whenever the state changes
    )
  

    //create a function to add a character to state
    const addCharacter = (charToAdd) =>{
        //console.log('adding', charToAdd)
        //need to add charToAdd to favorites
        //create new array with old stuff plus this
        let newFavorites = [...favorites, charToAdd]
        //save this to state
        setFavorites(newFavorites)
    }

    //create a function to remove a character
    const removeCharacter = (charId) =>{
        //console.log('removing', charId)
        //remove the character with this id
        //keep all the ones that are NOT this id
        let newFavorites = favorites.filter(item=> item.id != charId)
        //reset our state to this
        setFavorites(newFavorites)

    }

    //anything we need global access to needs to be added to value
    return(
        <FavoritesContext.Provider value={{addCharacter, favorites, removeCharacter}} >
            {props.children}
        </FavoritesContext.Provider>
    )
}