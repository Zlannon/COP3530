import React, { Component, useState, useEffect, useRef } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import Switch from './components/Switch';
import { Slider } from '@material-ui/core';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { CSSTransition } from 'react-transition-group';
import { IoPersonCircle } from "react-icons/io5";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi"; 
import { Search } from '@material-ui/icons';
import CountryData from './countries.json';
import Data from './info.json'
import Graph from './graph.js';
//import Country from './country.js';
import Disaster from './disaster.js';


 
import './App.css';
import disaster from './disaster.js';
 
// Remember to put a header at the top of the google maps. With a title or something. Will make it more aesthetically pleasing



var states = ["Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Idaho", "Indiana",
"Illinois", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
"Montana", "Nebraska", "Nevada", "New_Hampshire", "New_Jersey", "New_Mexico", "New_York", "North_Carolina", "North_Dakota", "Ohio", "Oklahoma",
"Oregon", "Pennsylvania", "Rhode_Island", "South_Carolina", "South_Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
"West_Virginia", "Wisconsin", "Wyoming"
]

var from = ["Alabama", 'Alabama', 'Alabama', 'Alabama', 'Arizona', 'Arizona', 'Arizona', 'Arizona', 'Arkansas', 'Arkansas', 'Arkansas', 'Arkansas', 'Arkansas', 'Arkansas', 'California', 'California', 'California',
  'Colorado', 'Colorado', 'Colorado', 'Colorado', 'Colorado', 'Colorado', 'Connecticut', 'Connecticut', 'Connecticut', 'Delaware', 'Delaware', 'Florida', 'Florida', 'Georgia', 'Georgia', 'Georgia', 'Georgia', 'Georgia',
  'Idaho', 'Idaho', 'Idaho', 'Idaho', 'Idaho', 'Idaho', 'Indiana', 'Indiana', 'Indiana', 'Indiana', 'Illinois', 'Illinois', 'Illinois', 'Illinois', 'Iowa', 'Iowa', 'Iowa', 'Iowa', 'Iowa',
  'Kansas', 'Kansas', 'Kansas', 'Kansas', 'Kentucky', 'Kentucky', 'Kentucky', 'Kentucky', 'Kentucky', 'Kentucky', 'Kentucky', 'Louisiana', 'Louisiana', 'Louisiana', 'Maine', 'Maryland', 'Maryland', 'Maryland', 'Maryland',
  'Massachusetts', 'Massachusetts', 'Massachusetts', 'Massachusetts', 'Massachusetts', 'Michigan', 'Michigan', 'Michigan', 'Minnesota', 'Minnesota', 'Minnesota', 'Minnesota', 'Mississippi', 'Mississippi', 'Mississippi', 'Mississippi',
  'Missouri', 'Missouri', 'Missouri', 'Missouri', 'Missouri', 'Missouri', 'Missouri', 'Montana', 'Montana', 'Montana', 'Montana', 'Nebraska', 'Nebraska', 'Nebraska', 'Nebraska', 'Nebraska', 'Nebraska', 'Nebraska',
  'Nevada', 'Nevada', 'Nevada', 'Nevada', 'Nevada', 'New_Hampshire', 'New_Hampshire', 'New_Hampshire', 'New_Jersey', 'New_Jersey', 'New_Jersey', 'New_Mexico', 'New_Mexico', 'New_Mexico', 'New_Mexico', 'New_York', 'New_York', 'New_York', 'New_York', 'New_York',
  'North_Carolina', 'North_Carolina', 'North_Carolina', 'North_Carolina', 'North_Dakota', 'North_Dakota', 'North_Dakota', 'Ohio', 'Ohio', 'Ohio', 'Ohio', 'Ohio', 'Oklahoma', 'Oklahoma', 'Oklahoma', 'Oklahoma', 'Oklahoma', 'Oklahoma', 
  'Oregon', 'Oregon', 'Oregon', 'Oregon', 'Pennsylvania', 'Pennsylvania', 'Pennsylvania', 'Pennsylvania', 'Pennsylvania', 'Rhode_Island', 'Rhode_Island', 'South_Carolina', 'South_Carolina', 'South_Carolina',
  'South_Dakota', 'South_Dakota', 'South_Dakota', 'South_Dakota', 'South_Dakota', 'South_Dakota', 'Tennessee', 'Tennessee', 'Tennessee', 'Tennessee', 'Tennessee', 'Tennessee', 'Tennessee', 'Tennessee', 'Tennessee',
  'Texas', 'Texas', 'Texas', 'Texas', 'Utah', 'Utah', 'Utah', 'Utah', 'Utah', 'Vermont', 'Vermont', 'Vermont', 'Virginia', 'Virginia', 'Virginia', 'Virginia', 'Virginia', 'Washington', 'Washington',
  'West_Virginia', 'West_Virginia', 'West_Virginia', 'West_Virginia', 'West_Virginia', 'Wisconsin', 'Wisconsin', 'Wisconsin', 'Wisconsin', 'Wyoming', 'Wyoming', 'Wyoming', 'Wyoming', 'Wyoming', 'Wyoming'
]
var to = ['Florida', 'Georgia', 'Tennessee', 'Mississippi', 'New_Mexico', 'Utah', 'Nevada', 'California', 'Mississippi', 'Louisiana', 'Missouri', 'Texas', 'Oklahoma', 'Tennessee',
  'Nevada', 'Oregon', 'Arizona', 'Kansas', 'New_Mexico', 'Utah', 'Wyoming', 'Nebraska', 'Oklahoma', 'New_York', 'Massachusetts', 'Rhode_Island', 'New_Jersey', 'Maryland', 'Georgia', 'Alabama', 'Florida', 'Alabama', 'Tennessee', 'South_Carolina', 'North_Carolina',
  'Wyoming', 'Montana', 'Washington', 'Oregon', 'Utah', 'Nevada', 'Ohio', 'Kentucky', 'Illinois', 'Michigan', 'Wisconsin', 'Iowa', 'Missouri', 'Kentucky', 'Illinois', 'Minnesota', 'Wisconsin', 'Nebraska', 'South_Dakota',
  'Nebraska', 'Missouri', 'Oklahoma', 'Colorado', 'Tennessee', 'Virginia', 'West_Virginia', 'Ohio', 'Indiana', 'Illinois', 'Missouri', 'Mississippi', 'Arkansas', 'Texas', 'New_Hampshire', 'Delaware', 'Pennsylvania', 'West_Virginia', 'Virginia',
  'Connecticut', 'New_Hampshire', 'Vermont', 'Rhode_Island', 'New_York', 'Indiana', 'Wisconsin', 'Ohio', 'Wisconsin', 'Iowa', 'North_Dakota', 'South_Dakota', 'Alabama', 'Louisiana', 'Kansas', 'Tennessee',
  'Illinois', 'Kentucky', 'Tennessee', 'Arkansas', 'Kansas', 'Iowa', 'Nebraska', 'Wyoming', 'North_Dakota', 'South_Dakota', 'Idaho', 'Iowa', 'Kansas', 'South_Dakota', 'North_Dakota', 'Wyoming', 'Colorado', 'Missouri',
  'Utah', 'Arizona', 'California', 'Idaho', 'Oregon', 'Maine', 'Vermont', 'Massachusetts', 'Pennsylvania', 'New_York', 'Delaware', 'Texas', 'Arizona', 'Colorado', 'Oklahoma', 'New_Jersey', 'Vermont', 'Pennsylvania', 'Connecticut', 'Massachusetts',
  'South_Carolina', 'Virginia', 'Georgia', 'Tennessee', 'South_Dakota', 'Minnesota', 'Montana', 'Pennsylvania', 'West_Virginia', 'Indiana', 'Michigan', 'Kentucky', 'Kansas', 'Texas', 'Arkansas', 'Missouri', 'Colorado', 'New_Mexico', 
  'Washington', 'California', 'Idaho', 'Nevada', 'New_York', 'Maryland', 'New_Jersey', 'Ohio', 'West_Virginia', 'Massachusetts', 'Connecticut', 'North_Carolina', 'Georgia', 'Tennessee', 
  'North_Dakota', 'Minnesota', 'Iowa', 'Nebraska', 'Wyoming', 'Montana', 'Georgia', 'Alabama', 'Mississippi', 'Arkansas', 'Missouri', 'Kentucky', 'North_Carolina', 'South_Carolina', 'Virginia', 
  'Oklahoma', 'Louisiana', 'Arkansas', 'New_Mexico', 'Colorado', 'Wyoming', 'Arizona', 'Nevada', 'Idaho', 'New_York', 'New_Hampshire', 'Massachusetts', 'West_Virginia', 'Maryland', 'North_Carolina', 'Kentucky', 'Tennessee', 'Idaho', 'Oregon', 
  'Virginia', 'Kentucky', 'Ohio', 'Pennsylvania', 'Maryland', 'Michigan', 'Illinois', 'Minnesota', 'Iowa', 'Nebraska', 'Montana', 'Idaho', 'Utah', 'Colorado', 'South_Dakota'
]
var aloneFrom = ['Alaska', 'Hawaii']





function findCountry(theState, theYear, theDisaster) { 
let i = 0; 
console.log('findcountry activated')
  while (Data[i]["STATE"].toLowerCase() != theState.toLowerCase() && Data[i]["YEAR"] != theYear && Data[i]["EVENT_TYPE"].toLowerCase() != theDisaster.toLowerCase()) {
    i++; 
  }
  return Data[i];
}



function Navbar(props) {
 return (
     <nav>
         <ul>
         { props.children }
         </ul>
     </nav>
 );
}

function NavItem(props) {
 const [open, setOpen] = useState(false);
 return (
  <li className="nav-item">
    <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
      {props.icon}
    </a>
    {open && props.children}
  </li>
 );
}
const runner = new Graph();


// may want WrappedMap here!!!!

const App = () => {
  var [TheNaturalDisaster, setTheNaturalDisaster] = useState("");
  var [theYearOf, setTheYearOf] = useState("");
  var [conductedSearch, setConductedSearch] = useState("false")
  var [arr, setArr] = useState([])
  var [countriesBool, setCountriesBool] = useState(new Map());
  var [first, setFirst] = useState("");
  var [second, setSecond] = useState("");
  var [third, setThird] = useState("");
  var [fourth, setFourth] = useState("");
  var [fifth, setFifth] = useState("");
  var [sixth, setSixth] = useState("");
  var [seventh, setSeventh] = useState("");
  var [eighth, setEighth] = useState("");
  var [ninth, setNinth] = useState("");
  var [ten, setTen] = useState("");
  
  var [eleven, setEleven] = useState("");
  var [twelve, setTwelve] = useState("");
  var [thirteen, setThirteen] = useState("");
  var [fourteen, setFourteen] = useState("");
  var [fifteen, setFifteen] = useState("");
  var [sixteen, setSixteen] = useState("");
  var [seventeen, setSeventeen] = useState("");
  var [eighteen, setEighteen] = useState("");
  var [nineteen, setNineteen] = useState("");
  
  var [twenty, setTwenty] = useState("");
  var [twentyOne, setTwentyOne] = useState("");
  var [twentyTwo, setTwentyTwo] = useState("");
  var [twentyThree, setTwentyThree] = useState("");
  var [twentyFour, setTwentyFour] = useState("");
  var [twentyFive, setTwentyFive] = useState("");
  var [twentySix, setTwentySix] = useState("");
  var [twentySeven, setTwentySeven] = useState("");
  var [twentyEight, setTwentyEight] = useState("");
  var [twentyNine, setTwentyNine] = useState("");
  
  var [thirty, setThirty] = useState("");
  var [thirtyOne, setThirtyOne] = useState("");
  var [thirtyTwo, setThirtyTwo] = useState("");
  var [thirtyThree, setThirtyThree] = useState("");
  var [thirtyFour, setThirtyFour] = useState("");
  var [thirtyFive, setThirtyFive] = useState("");
  var [thirtySix, setThirtySix] = useState("");
  var [thirtySeven, setThirtySeven] = useState("");
  var [thirtyEight, setThirtyEight] = useState("");
  var [thirtyNine, setThirtyNine] = useState("");
  
  var [fourty, setFourty] = useState("");
  var [fourtyOne, setFourtyOne] = useState("");
  var [fourtyTwo, setFourtyTwo] = useState("");
  var [fourtyThree, setFourtyThree] = useState("");
  var [fourtyFour, setFourtyFour] = useState("");
  var [fourtyFive, setFourtyFive] = useState("");
  var [fourtySix, setFourtySix] = useState("");
  var [fourtySeven, setFourtySeven] = useState("");
  var [fourtyEight, setFourtyEight] = useState("");

  function BFS(startLocation) {
     arr = runner.breadthFirstCountries(startLocation);
     setFirst(first = arr[0])
     setSecond(second = arr[1])
     setThird(third = arr[2])
     setFourth(fourth = arr[3])
     setFifth(fifth = arr[4])
     setSixth(sixth = arr[5])
     setSeventh(seventh = arr[6])
     setEighth(eighth = arr[7])
     setNinth(ninth = arr[8])
     setTen(ten = arr[9])
     setEleven(eleven = arr[10])
     setTwelve(twelve = arr[11])
     setThirteen(thirteen = arr[12])
     setFourteen(fourteen = arr[13])
     setFifteen(fifteen = arr[14])
     setSixteen(sixteen = arr[15])
     setSeventeen(seventeen = arr[16])
     setEighteen(eighteen = arr[17])
     setNineteen(nineteen = arr[18])
     setTwenty(twenty = arr[19])
     setTwentyOne(twentyOne = arr[20])
     setTwentyTwo(twentyTwo = arr[21])
     setTwentyThree(twentyThree = arr[22])
     setTwentyFour(twentyFour = arr[23])
     setTwentyFive(twentyFive = arr[24])
     setTwentySix(twentySix = arr[25])
     setTwentySeven(twentySeven = arr[26])
     setTwentyEight(twentyEight = arr[27])
     setTwentyNine(twentyNine = arr[28])
     setThirty(thirty = arr[29])
     setThirtyOne(thirtyOne = arr[30])
     setThirtyTwo(thirtyTwo = arr[31])
     setThirtyThree(thirtyThree = arr[32])
     setThirtyFour(thirtyFour = arr[33])
     setThirtyFive(thirtyFive = arr[34])
     setThirtySix(thirtySix = arr[35])
     setThirtySeven(thirtySeven = arr[36])
     setThirtyEight(thirtyEight = arr[37])
     setThirtyNine(thirtyNine = arr[38])
     setFourty(fourty = arr[39])
     setFourtyOne(fourtyOne = arr[40])
     setFourtyTwo(fourtyTwo = arr[41])
     setFourtyThree(fourtyThree = arr[42])
     setFourtyFour(fourtyFour = arr[43])
     setFourtyFive(fourtyFive = arr[44])
     setFourtySix(fourtySix = arr[45])
     setFourtySeven(fourtySeven = arr[46])
     setFourtyEight(fourtyEight = arr[47])



      for (let i = 0; i < arr.length; i++ ) {
          setCountriesBool(countriesBool.set(arr[i],i+1))
      }
      console.log("The size of the map: " + countriesBool.size)
  }

  function DFS(startLocation) {
    arr = runner.depthFirstCountries(startLocation);
    setFirst(first = arr[0])
    setSecond(second = arr[1])
    setThird(third = arr[2])
    setFourth(fourth = arr[3])
    setFifth(fifth = arr[4])
    setSixth(sixth = arr[5])
    setSeventh(seventh = arr[6])
    setEighth(eighth = arr[7])
    setNinth(ninth = arr[8])
    setTen(ten = arr[9])
    setEleven(eleven = arr[10])
    setTwelve(twelve = arr[11])
    setThirteen(thirteen = arr[12])
    setFourteen(fourteen = arr[13])
    setFifteen(fifteen = arr[14])
    setSixteen(sixteen = arr[15])
    setSeventeen(seventeen = arr[16])
    setEighteen(eighteen = arr[17])
    setNineteen(nineteen = arr[18])
    setTwenty(twenty = arr[19])
    setTwentyOne(twentyOne = arr[20])
    setTwentyTwo(twentyTwo = arr[21])
    setTwentyThree(twentyThree = arr[22])
    setTwentyFour(twentyFour = arr[23])
    setTwentyFive(twentyFive = arr[24])
    setTwentySix(twentySix = arr[25])
    setTwentySeven(twentySeven = arr[26])
    setTwentyEight(twentyEight = arr[27])
    setTwentyNine(twentyNine = arr[28])
    setThirty(thirty = arr[29])
    setThirtyOne(thirtyOne = arr[30])
    setThirtyTwo(thirtyTwo = arr[31])
    setThirtyThree(thirtyThree = arr[32])
    setThirtyFour(thirtyFour = arr[33])
    setThirtyFive(thirtyFive = arr[34])
    setThirtySix(thirtySix = arr[35])
    setThirtySeven(thirtySeven = arr[36])
    setThirtyEight(thirtyEight = arr[37])
    setThirtyNine(thirtyNine = arr[38])
    setFourty(fourty = arr[39])
    setFourtyOne(fourtyOne = arr[40])
    setFourtyTwo(fourtyTwo = arr[41])
    setFourtyThree(fourtyThree = arr[42])
    setFourtyFour(fourtyFour = arr[43])
    setFourtyFive(fourtyFive = arr[44])
    setFourtySix(fourtySix = arr[45])
    setFourtySeven(fourtySeven = arr[46])
    setFourtyEight(fourtyEight = arr[47])



     for (let i = 0; i < arr.length; i++ ) {
         setCountriesBool(countriesBool.set(arr[i],i+1))
     }
     console.log("The size of the map: " + countriesBool.size)
 }



  function Mapper() {
    const [selectedMarker, setSelectedMarker] = useState(null);
    return (<GoogleMap
      defaultZoom={4} // 3.5
      defaultCenter={{lat: 37, lng: 270}}
      mapContainerClassName="map-container"
       >
         {CountryData.map((stata) => (
         
         <Marker
             //visible = {countriesBool[stata["name"].toLowerCase()] ? true : false}
             position = {{
               lat: parseFloat(stata["lat"]),
               lng: parseFloat(stata["long"]) 
             }}
             onClick={() => {
               setSelectedMarker(stata)
             }}
           />
         ))}
   
                {selectedMarker && <InfoWindow
                    position = {{
                      lat: parseFloat(selectedMarker["lat"]),
                      lng: parseFloat(selectedMarker["long"])
                    }}
                    onCloseClick={() => {
                      setSelectedMarker(null); 
                    }}
                    >
                      <div>
                        <div> Name: { conductedSearch == 'true' ? selectedMarker["name"] : ""} </div>
                        <div> Year: { conductedSearch == 'true' ? theYearOf : "" }</div>
                        <div> Month: { conductedSearch == 'true' ? findCountry(selectedMarker["name"], theYearOf, TheNaturalDisaster)["MONTH_NAME"] : "" }</div>
                        <div> Natural Disaster Type: { conductedSearch == 'true' ? TheNaturalDisaster : "" }</div>
                        <div> Damage Cost: {conductedSearch == 'true' ? findCountry(selectedMarker["name"], theYearOf, TheNaturalDisaster)["DAMAGE_PROPERTY"] : "" }</div>
                        <div> County: {conductedSearch == 'true' ? findCountry(selectedMarker["name"], theYearOf, TheNaturalDisaster)["CZ_NAME"] : "" }</div>
                      </div>
                  </InfoWindow>
        }
       </GoogleMap>
    );
   }
  const WrappedMap = withScriptjs(withGoogleMap(Mapper));
  useEffect(() => {

    for (let i = 0; i < states.length; i++) { 
        console.log(states[i]);
        runner.insertV(states[i]);
    } // to.length
    for (let i = 0; i < from.length; i++) {
        console.log(from[i] + " " + to[i]); 
        runner.insert(from[i], to[i]);
    }
    
  })

var [activeButton, setButtonClicked] = useState("");
var [searchButton, setSearchButton] = useState("");
var [dropBar, setDropBar] = useState(false);
var [location, setLocation] = useState("");
var [year, setYear] = useState("")



function SearchCountryBar({data}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value
    setWordEntered(wordEntered);
    const newFilter = data.filter((value) => {
      if (value.name.toLowerCase() == searchWord.toLowerCase()) {
          setLocation(location = value.name)
          return '';
      } 
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }; 

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div style={{display: 'inline-flex', flexDirection: 'row'}}>
       <div style={isToggled ? {marginRight: '10%', marginTop: '5px', color: 'chartreuse'} : {marginRight: '10%', marginTop: '5px', color:'navy'}} className='filterTypes'> Location: </div> 
            <div style={{marginBottom: '5%'}} className="search"> 
              <div className="searchInputs">
                <input type="text" placeholder="Search" onChange={handleFilter}/> 
                <div className="searchIcon">
                  <Search/> 
                </div>
              </div>
              
 {filteredData.length != 0 && ( 
              <div className="dataResult">
                {filteredData.map((value, key) => {
                  return (<div className="dataItem"> <p> {value.name} </p> </div>);
                })}  
              </div> 
 )}
         
            </div>
     </div>
  );
}

const [selected, setSelected] = useState(false)

 
 const [locations, setLocations] = useState(false); 
 const [isToggled, setIsToggled] = useState(false);
 const [range, setRange] = useState('50%')
 const [sliding, setSliding] = useState('Inactive')
 
 const handleClick = () => {
  console.log([activeButton] + " " + [year] + " " + [location] + " " + [searchButton]);
}

const handleChange = (event) => {
  this.setState({value: event.target.value});
}

const handleSubmit = (event) => {
  alert('Your favorite flavor is: ' + this.state.value);
  event.preventDefault();
}

const changeState = () => {
  setTheYearOf(theYearOf = year);
  setTheNaturalDisaster(TheNaturalDisaster = activeButton);
  setConductedSearch(conductedSearch = "true");
  if (searchButton == "Breadth") {
      BFS(location);
  } 
  if (searchButton == "Depth") {
      DFS(location);
  }
}

   return (
       <div className='container'>
           <div className={isToggled ? 'controls' : 'controlsDos'}>
                     <div styles={isToggled ? {backgroundColor: '#20232a'} : {backgroundColor: 'white'}}className={isToggled ? 'filterWrap' : 'filterWrapTwo' }>  
                     <p> <p className="NatTitle" style={isToggled ? {color:'chartreuse'} : {color: 'navy'}}> Natural Disaster Type </p>
                            <div style={isToggled ? {borderTop: "2px solid green", width: '80%', position: 'relative', left: '10%'} : {borderTop: "2px solid navy", width: '80%', position: 'relative', left: '10%'}}></div>

                            <div style={{display: 'inline-flex', flexDirection: 'row'}}>                                                                                                        
                                  <p style={{marginLeft: '11%'}}> <button className={activeButton === "Lightning" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Lightning")}> Lightning </button> </p>
                                  <p style={{marginLeft: '11%'}}> <button className={activeButton === "Earthquake" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Earthquake")}> Earthquake </button> </p>                                
                                  <p style={{marginLeft: '11%'}}> <button className={activeButton === "Flood" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Flood")}> Flood </button> </p>  
                            </div>  
                            <div style={{display: 'inline-flex', flexDirection: 'row'}}>                                                                                                        
                                  <p style={{marginLeft: '11%'}}> <button className={activeButton === "Tornadoes" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Tornadoes")}> Tornadoes </button> </p>
                                  <p style={{marginLeft: '5%'}}> <button className={activeButton === "Hurricanes" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Hurricanes")}> Hurricanes </button> </p>                                
                                  <p style={{marginLeft: '5%'}}> <button className={activeButton === "Wildfire" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Wildfire")}> Wildfire </button> </p>  
                            </div>      
                            <div style={{display: 'inline-flex', flexDirection: 'row'}}>
                            <p style={{marginLeft: '11%', whiteSpace: 'nowrap'}}> <button className={activeButton === "Heavy Rain" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Heavy Rain")}> Heavy Rain </button> </p>
                            <p style={{marginLeft: '11%', whiteSpace: 'nowrap'}}> <button className={activeButton === "Hail" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Hail")}> Hail </button> </p>
                            <p style={{marginLeft: '11%', whiteSpace: 'nowrap'}}> <button className={activeButton === "High Wind" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "High Wind")}> High Wind </button> </p>
                            </div>
                                  
                              <div style={isToggled ? {borderTop: "2px solid green", width: '80%', position: 'relative', left: '10%'} : {borderTop: "2px solid navy", width: '80%', position: 'relative', left: '10%'}}></div>
                              <p className="theFilters" style={isToggled ? {color: 'chartreuse'} : {color: 'navy'}}> Filters </p>
                              <div style={isToggled ? {borderTop: "2px solid green", width: '80%', position: 'relative', left: '10%'} : {borderTop: "2px solid navy", width: '80%', position: 'relative', left: '10%'}}></div>
                              <p className='filterTypes' style={isToggled ? {color:'chartreuse'} : {color:'navy'}}> Year: 
                                  
                                      <select style={isToggled ? {backgroundColor: 'white'} : {backgroundColor: 'navy'}}
                                        onChange={(e) => {
                                          const selectedYear = e.target.value;
                                          setYear(year = selectedYear);
                                        }}
                                      >
                                        <option> ----</option> {/*<option> 1990 </option> <option> 1991 </option> <option> 1992 </option> <option> 1993 </option><option> 1994 </option> <option> 1995 </option> <option> 1996 </option> <option> 1997 </option> <option> 1998 </option> <option> 1999 </option> <option> 2000 </option> <option> 2001 </option> <option> 2002 </option> <option> 2003 </option> <option> 2004 </option> */} {/*} <option> 2012 </option> <option> 2013 </option> <option> 2014 </option> <option> 2015 </option> <option> 2016 </option> <option> 2017 </option> <option> 2018 </option> <option> 2019 </option> <option> 2020 </option ><option> 2021 </option> <option> 2022 </option> */}
                                        <option value="All"> All </option> 
                                        <option value="2006"> 2006 </option> 
                                        <option value="2007"> 2007 </option> 
                                        <option value="2008"> 2008 </option>
                                        <option value="2009"> 2009 </option>
                                        <option value="2010"> 2010 </option>
                                        <option value="2011"> 2011 </option> 
                                      </select>
                              </p>
                                          <div style={{justifyContent: 'space-between', flexDirection: 'row'}}>   
                                       {/*}     <div style={isToggled ? {marginRight: '5%', color: 'chartreuse'} : {marginRight: '5%', color: 'navy'}} className='filterTypes'> Damage Range: 
                                                      <Slider 
                                                        style={isToggled ? {width: '130px',color: 'green', position: 'absolute', top: '35%', left: '10%', marginTop: '20px', marginLeft: '20px'} : {width: '100px', color: 'navy'}}
                                                      />
                                              </div> */}
                                          </div>   
                                                
                             <div>   <SearchCountryBar data={CountryData}/> </div>
                              <div className='wrapped'> 
                                  <div className='accordian'>
                                      <div className={isToggled ? 'item' : 'itemTwo'}>
                                        <div className='title' styles={isToggled ? {color:'chartreuse'} : {color:'navy'}} onClick={() => setSelected(!selected)}>
                                              Natural Disaster Search Order
                                               <span>{selected ? <AiOutlineMinus/> : <AiOutlinePlus/>}</span> 
                                        </div>
                                        <div className={selected ? 'content show' : 'content'}> 
                                               
                                               <select>
                                                     <option>  ---- </option> 
                                                    <option>  {first} </option> 
                                                    <option>  {second} </option>
                                                   <option>  {third} </option>
                                                   <option>    {fourth}</option>
                                                   <option>    {fifth} </option>
                                                   <option>    {sixth}</option>
                                                      <option>    {seventh} </option>
                                                      <option>    {eighth} </option>
                                                      <option>     {ninth}</option>
                                                      <option>    {ten} </option>
                                                      <option>     {eleven} </option>
                                                      <option>      {twelve} </option>
                                                      <option>      {thirteen} </option>
                                                      <option>      {fourteen} </option>
                                                      <option>      {fifteen} </option>
                                                      <option>      {sixteen} </option>
                                                      <option>      {seventeen} </option>
                                                      <option>        {eighteen} </option>
                                                      <option>     {nineteen}</option>
                                                      <option>             {twenty} </option>
                                                      <option>                 {twentyOne} </option>
                                                      <option>                 {twentyTwo} </option>
                                                      <option>            {twentyThree}</option>
                                                      <option>            {twentyFour} </option>
                                                      <option>                {twentyFive} </option>
                                                      <option>            {twentySix} </option>
                                                      <option>            {twentySeven} </option>
                                                      <option>        {twentyEight} </option>
                                                      <option>       {twentyNine}</option>
                                                      <option>         {thirty} </option>
                                                      <option>        {thirtyOne} </option>
                                                      <option>       {thirtyTwo} </option>
                                                      <option>       {thirtyThree} </option>
                                                      <option>       {thirtyThree} </option>
                                                      <option>       {thirtyFour} </option>
                                                      <option>       {thirtyFive} </option>
                                                      <option>       {thirtySix} </option>
                                                      <option>    {thirtySeven} </option>
                                                      <option>       {thirtyEight} </option>
                                                      <option>    {thirtyNine}</option>
                                                      <option>     {fourty} </option>
                                                      <option>      {fourtyOne} </option>
                                                      <option>     {fourtyTwo} </option>
                                                      <option>        {fourtyThree} </option>
                                                      <option>      {fourtyFour} </option>
                                                      <option>      {fourtyFive} </option>
                                                      <option>      {fourtySix} </option>
                                                      <option>      {fourtySeven} </option>
                                                      <option>      {fourtyEight}</option>
                                                </select>
                                                

                                         </div> 
                                      </div>
                                  </div>
                              </div>

                          </p>
                    </div> 
                           
                          <div style={isToggled ? {backgroundColor: '#20232a'} : {backgroundColor: 'white'}} className={isToggled ? "algos" : "algosTwo"}> 
                            <div className={isToggled ? "searchTexts" : "searchTextsTwo"}> Search Algorithms </div>
                            <div style={isToggled ? {borderTop: "2px solid green", marginTop: 15, width: '80%', position: 'relative', left: '10%'} : {borderTop: "2px solid navy", width: '80%', position: 'relative', left: '10%'}}></div>
                            <span style={{display: 'inline-flex', flexDirection: 'row'}}>
                                <div style={{marginLeft: '11.5%', marginTop: '5px'}}> <button className={searchButton === "Breadth" ? "searchClicked" : "searchButton"}  onClick={() => setSearchButton(searchButton = "Breadth")}> Breadth First Search </button> </div>
                                <div style={{marginLeft: '9px', marginTop: '5px'}}> <button className={searchButton === "Depth" ? "searchClicked" : "searchButton"}  onClick={() => setSearchButton(searchButton = "Depth")}> Depth First Search </button> </div>
                            </span>
                                  <div>
                                    <button className={isToggled ? "unactivateAlgo" : "activateAlgo"} onClick={() =>  changeState() }> 
                                          Conduct Search 
                                    </button>
                                  </div>
                          </div> 
                
                       {/*}   setTheYearOf(theYearOf = year)    setTheNaturalDisaster(TheNaturalDisaster = activeButton) */}
            </div> 
                <div className="rightSide">
                  <div className={isToggled ? "heading" : "headingDos"}>
                        <span style={{display: 'inline-flex', flexDirection: 'row'}}>
                          {/*  <img src={require('./images/Lightning_Type.jpg')} style={{width: '3%', height: '75%', borderRadius: '50%', position: 'relative', top: '11%', marginLeft: '1%', marginTop: 5}}/>
                            <img src={require('./images/Ground_Type.png')} style={{width: '3%', height: '75%', borderRadius: '50%', position: 'relative', top: '11%', marginLeft: '1%', marginTop: 5}}/>
   <img src={require('./images/Water_Type.jpeg')} style={{width: '3%', height: '75%', borderRadius: '50%', position: 'relative', top: '11%', marginLeft: '1%', marginTop: 5}}/> */}
                             
                              <div style={isToggled ? { whiteSpace: 'nowrap', fontSize: 22, marginLeft: '80%', fontWeight: 'bold', display:'inline-block', marginTop: 8, color: 'chartreuse', fontFamily: 'PT-Serif'} : {whiteSpace: 'nowrap', fontSize: 22, marginLeft: '80%', fontWeight: 'bold', display:'inline-block', marginTop: 8, color: 'navy', fontFamily: 'PT-Serif'}}> Natural Disaster Map </div>
                            <span style={{marginTop: 5, marginLeft:295, marginRight: 20}}>
                                {<Switch rounded={true}    isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />}
                            </span>
                                  <span style={{height: '75%', marginTop: 2.5, marginRight: 15}}>
                                  <NavItem icon={<CaretIcon/> }>
                                      <DropdownMenu></DropdownMenu>
                                  </NavItem>
                                  </span>
                            {/*<div>
                                    <div className={dropBar ? "DBarExtended" : "DBar"} onClick={() => setDropBar(!dropBar)}>
                                          <GiHamburgerMenu size={30}/>
                                    </div>
                            </div> */}
                            
                        </span>
                  </div>
                  <div className="map">
                        <WrappedMap
                          googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC4lJ-nr15VrGJyAtoD_3jm2E9YvOwYuW4'
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{ height: `100%` }} />}
                          mapElement={<div style={{ height: `100%` }} />}
                        />
                  </div> 
   </div>  
       </div>
   );
 }
 function DropdownMenu() {
   const [activeMenu, setActiveMenu] = useState('main');
   const [menuHeight, setMenuHeight] = useState(null);
   const dropdownRef = useRef(null);
    useEffect(() => {
     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
   }, [])
    function calcHeight(el) {
     const height = el.offsetHeight;
     setMenuHeight(height);
   }
    function DropdownItem(props) {
     return (
       <a href={props.Link} className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
         <span className="icon-button">{props.leftIcon}</span>
         {props.children}
         <span className="icon-right">{props.rightIcon}</span>
       </a>
     );
   }
    return (
     <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
        <CSSTransition
         in={activeMenu === 'main'}
         timeout={500}
         classNames="menu-primary"
         unmountOnExit
         onEnter={calcHeight}>
         <div className="menu">
          
           <DropdownItem
             Link="#"
             leftIcon={<CogIcon />}
             goToMenu="settings">

           </DropdownItem>
          
          </div>
       </CSSTransition>
        <CSSTransition
         in={activeMenu === 'settings'}
         timeout={500}
         classNames="menu-secondary"
         unmountOnExit
         onEnter={calcHeight}>
         <div className="menu">
           <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />} >
            
           </DropdownItem>
           
                 <DropdownItem Link="https://github.com/CamSanti16" leftIcon={< AiOutlineGithub />} >   </DropdownItem>

           <DropdownItem leftIcon={< IoPersonCircle />} > </DropdownItem>
 
         </div>
       </CSSTransition>
        <CSSTransition
         in={activeMenu === 'animals'}
         timeout={500}
         classNames="menu-secondary"
         unmountOnExit
         onEnter={calcHeight}>
         
       </CSSTransition>
     </div>
   );
 }
 
export default App;
 
 




