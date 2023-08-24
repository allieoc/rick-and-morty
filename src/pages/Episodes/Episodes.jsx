import React, {useEffect, useContext} from 'react'
import "./Episodes.css"
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import { ThemeContext } from '../../contexts/ThemeContext'

function Episodes() {

   //change to use global state
    //NOTE {} NOT []
    const {darkMode, setDarkMode} = useContext(ThemeContext)


  //when the user selects an episode, this
  //page shows the characters from
  //that episode

  //create state for the optoins
  const [options, setOptions] = React.useState([])
  //create state for selected option
  const [selectedOption, setSelectedOption] = React.useState(1)
  //create state for episode data
  const [selectedEpisode, setSelectedEpisode] = React.useState('')
  //create state for characters
  const [characterList, setCharacterList] = React.useState([])

  //i need to know how many episodes there
  //are to create dropdown
  //https://rickandmortyapi.com/api/episode

  useEffect(
    ()=>{
      //call api to get number of episodes
      axios.get('https://rickandmortyapi.com/api/episode')
      .then(res=>{
        //console.log(res.data.info.count)
        //create array of numbers to map the options
        const nums = []
        for(let i = 1; i <= res.data.info.count; i++){
          nums.push(i)
        }
        //console.log(nums)
        //store in state
        setOptions(nums)
      })
      .catch(err => console.log(err))

      //get episode 1 data here
      //fetchEpisodeData()

  }, []
)

const handleSelectChange = (e) => {
  //console.log('episode selected')
  //I need to know which episode number was selected
  //console.log(e.target.value)
  //store in state
  setSelectedOption(e.target.value)
  //make api call to get data
  //fetchEpisodeData()
}

useEffect(()=>{
  //console.log('you selected', selectedOption)
  //fetch the data for this episode
  fetchEpisodeData()

}, [selectedOption] //runs anytime this state changes
)

//https://rickandmortyapi.com/api/episode/28
const fetchEpisodeData = async () =>{
  //console.log('get data for episode', selectedOption)
  try{
    //make api call
     const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)
    //console.log(res.data)
    //store this in state
    setSelectedEpisode(res.data)
    //now we need to make api call for each character
    //console.log(res.data.characters)

    const episodeCharacters = await Promise.all(
      res.data.characters.map(url => {
        return axios.get(url).then(res => res.data)
      })
    )

    //console.log(episodeCharacters)
    //store in state
    setCharacterList(episodeCharacters)

  }
  catch(err){
    console.log(err)
  }
}

  return (
    <div className={darkMode?"episodes-container episodes-dark":"episodes-container"}>
      <div>
        <label htmlFor='select-episode'>Select an episode</label>
        <select id='select-episode' onChange={handleSelectChange}>
          {
            options.map(num => <option key={num} value={num}>{`Episode ${num}`}</option>)
          }
        </select>
      </div>

      <div>
          <div className="episode-info">
            <p>Episode Name: {selectedEpisode?.name}</p>
            <p>Air Date: {selectedEpisode?.air_date}</p>
          </div>
          <div className="character-container">
            {
              characterList.map(item=><CharacterCard character={item}
                key={item.id} />)
            }
          </div>
      </div>
    </div>
  )
}

export default Episodes