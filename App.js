import React, { Component, useState, useEffect, useRef } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
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
import countryData from './countries.json';
 
import './App.css';
 
// Remember to put a header at the top of the google maps. With a title or something. Will make it more aesthetically pleasing
function Map() {
 return (<GoogleMap
   defaultZoom={10}
   defaultCenter={{lat: 12, lng: 10}}
   mapContainerClassName="map-container"
   />
 );
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

  
const WrappedMap = withScriptjs(withGoogleMap(Map));
const App = () => {
var [activeButton, setButtonClicked] = useState("");
var [searchButton, setSearchButton] = useState("");
var [dropBar, setDropBar] = useState(false);


function SearchCountryBar({data}) {
  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchingForWord = event.target.value
    const newFilter = data.filter((value) => {
      return value.title.includes(searchingForWord);
    });
    setFilteredData(newFilter);
  }
  return (
    <div style={{display: 'inline-flex', flexDirection: 'row'}}>
       <div style={{marginRight: '5%'}} className='filterTypes'> Location: </div> 
            <div style={{marginBottom: '5%'}} className="search"> 
              <div className="searchInputs">
                <input type="text" placeholder="Search" onChange={handleFilter}/> 
                <div className="searchIcon">
                  <Search/> 
                </div>
              
{ filteredData.length != 0 && (
              <div className="dataResult">
                {filteredData.map((value, key) => {
                  return <div> {value.name} </div>
                })}
              </div> 
)}
                </div>
            </div>
     </div>
  );
}

const [selected, setSelected] = useState(false)

 
 const [locations, setLocations] = useState(false); 
 const [isToggled, setIsToggled] = useState(false);
 const [range, setRange] = useState('50%')
 const [sliding, setSliding] = useState('Inactive')
   
   return (
       <div className='container'>
           <div className={isToggled ? 'controls' : 'controlsDos'}>
                     <div className='filterWrap'>  
                     <p> <p style={{color: 'chartreuse', textAlign: 'center', fontSize: '22px', fontWeight: 'bold', marginBottom: '2px'}}> Natural Disaster Type </p>
                            <div style={isToggled ? {borderTop: "2px solid green", width: '80%', position: 'relative', left: '10%'} : {borderTop: "2px solid navy", width: '80%', position: 'relative', left: '10%'}}></div>

                            <div style={{display: 'inline-flex', flexDirection: 'row'}}>                                                                                                        
                                  <p style={{marginLeft: '11%'}}> <button className={activeButton === "Button1" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Button1")}> Lightning </button> </p>
                                  <p style={{marginLeft: '11%'}}> <button className={activeButton === "Button2" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Button2")}> Earthquake </button> </p>                                
                                  <p style={{marginLeft: '11%'}}> <button className={activeButton === "Button3" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Button3")}> Flood </button> </p>  
                            </div>  
                            <div style={{display: 'inline-flex', flexDirection: 'row'}}>                                                                                                        
                                  <p style={{marginLeft: '11%'}}> <button className={activeButton === "Button1" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Button1")}> Tornadoes </button> </p>
                                  <p style={{marginLeft: '5%'}}> <button className={activeButton === "Button2" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Button2")}> Hurricanes </button> </p>                                
                                  <p style={{marginLeft: '5%'}}> <button className={activeButton === "Button3" ? "searchClicked" : "searchButton"}  onClick={() => setButtonClicked(activeButton = "Button3")}> Wildfire </button> </p>  
                            </div>      
                 
                                  
                              <div style={isToggled ? {borderTop: "2px solid green", width: '80%', position: 'relative', left: '10%'} : {borderTop: "2px solid navy", width: '80%', position: 'relative', left: '10%'}}></div>
                              <p style={{color: 'chartreuse', textAlign: 'center', fontSize: '22px', fontWeight: 'bold', marginBottom: '2px'}}> Filters </p>
                              <div style={isToggled ? {borderTop: "2px solid green", width: '80%', position: 'relative', left: '10%'} : {borderTop: "2px solid navy", width: '80%', position: 'relative', left: '10%'}}></div>
                              <p className='filterTypes'> Year: <select style={{backgroundColor: 'chartreuse'}}>
                                <option> ----</option> <option> 1990 </option> <option> 1991 </option> <option> 1992 </option> <option> 1993 </option><option> 1994 </option> <option> 1995 </option> <option> 1996 </option> <option> 1997 </option> <option> 1998 </option> <option> 1999 </option> <option> 2000 </option> <option> 2001 </option> <option> 2002 </option> <option> 2003 </option> <option> 2004 </option> <option> 2005 </option> <option> 2006 </option> <option> 2007 </option> <option> 2008 </option> <option> 2009 </option> <option> 2010 </option> <option> 2011 </option> <option> 2012 </option> <option> 2013 </option> <option> 2014 </option> <option> 2015 </option> <option> 2016 </option> <option> 2017 </option> <option> 2018 </option> <option> 2019 </option> <option> 2020 </option ><option> 2021 </option> <option> 2022 </option>
                              </select></p>
                                          <div style={{display: 'inline-flex', flexDirection: 'row'}}>   
                                            <div style={{marginRight: '5%'}} className='filterTypes'> Damage Range: 
                                                <div className="searchInputs">
                                                      <Slider
                                                        style={isToggled ? {width: '100',color: 'green'} : {width: '100', color: 'navy'}}
                                                      />
                                                </div>
                                              </div>
                                          </div>   


                                          {/*
                                          <div style={{display: 'inline-flex', flexDirection: 'row'}}>
                                              <div style={{marginRight: '5%'}} className='filterTypes'> Location: </div> 
                                                    <div style={{marginBottom: '5%'}} className="search"> 
                                                      <div className="searchInputs">
                                                        <input type="text" placeholder="Search" onChange={handleFilter}/> 
                                                        <div className="searchIcon">
                                                          <Search/> 
                                                        </div>
                                                                                  
                                          */}
                             <div>   <SearchCountryBar data={countryData}/> </div>
                              <div className='wrapped'> 
                                  <div className='accordian'>
                                      <div className='item'>
                                        <div className='title' onClick={() => setSelected(!selected)}>
                                              Natural Disaster Specific Filters 
                                               <span>{selected ? <AiOutlineMinus/> : <AiOutlinePlus/>}</span> 
                                        </div>
                                        <div className={selected ? 'content show' : 'content'}> meiei mie inren n inei nenine nie nfi en en neini nsnsr emime in iskn unr nw nionsnjso n ru su son snjenoue sj osjne jsoj djos ;el erbfrybf bue </div> 
                                      </div>
                                  </div>
                              </div>

                          </p>
                    </div> 
                           
                          <div className="algos"> 
                            <div className="searchTexts"> Search Algorithms </div>
                            <div style={isToggled ? {borderTop: "2px solid green", marginTop: 15, width: '80%', position: 'relative', left: '10%'} : {borderTop: "2px solid navy", width: '80%', position: 'relative', left: '10%'}}></div>
                            <span style={{display: 'inline-flex', flexDirection: 'row'}}>
                                <div style={{marginLeft: '11.5%'}}> <button className={searchButton === "Depth" ? "searchClicked" : "searchButton"}  onClick={() => setSearchButton(searchButton = "Depth")}> Breadth First Search </button> </div>
                                <div style={{marginLeft: '9px'}}> <button className={searchButton === "Breadth" ? "searchClicked" : "searchButton"}  onClick={() => setSearchButton(searchButton = "Breadth")}> Depth First Search </button> </div>
                            </span>
                                  <div>
                                    <button className="activateAlgo"> 
                                          Conduct Search 
                                    </button>
                                  </div>
                          </div> 
                
              
            </div> 
                <div className="rightSide">
                  <div className={isToggled ? "heading" : "headingDos"}>
                        <span style={{display: 'inline-flex', flexDirection: 'row'}}>
                          {/*  <img src={require('./images/Lightning_Type.jpg')} style={{width: '3%', height: '75%', borderRadius: '50%', position: 'relative', top: '11%', marginLeft: '1%', marginTop: 5}}/>
                            <img src={require('./images/Ground_Type.png')} style={{width: '3%', height: '75%', borderRadius: '50%', position: 'relative', top: '11%', marginLeft: '1%', marginTop: 5}}/>
   <img src={require('./images/Water_Type.jpeg')} style={{width: '3%', height: '75%', borderRadius: '50%', position: 'relative', top: '11%', marginLeft: '1%', marginTop: 5}}/> */}
                              <span style={{fontSize: 22, marginLeft: '35%', fontWeight: 'bold', display:'inline-block!important', marginTop: 8, color: 'chartreuse', fontFamily: 'PT-Serif'}}> Natural  </span>
                              <span style={{fontSize: 22, marginLeft: 5, fontWeight: 'bold', display:'inline-block!important', marginTop: 8, color: 'chartreuse', fontFamily: 'PT-Serif'}}> Disaster  </span>
                              <span style={{fontSize: 22, marginLeft: 5, fontWeight: 'bold', display:'inline-block!important', marginTop: 8, color: 'chartreuse', fontFamily: 'PT-Serif', marginRight: '220px'}}> Map  </span>
                            <span style={{marginTop: 5, marginLeft:225, marginRight: 20}}>
                                {<Switch rounded={true}    isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />}
                            </span>
                                  <span style={{height: '75%', marginTop: 2.5, marginRight: 15}}>
                                  <NavItem icon={< CaretIcon /> }>
                                      <DropdownMenu></DropdownMenu>
                                  </NavItem>
                                  </span>
                            <div>
                                    <div className={dropBar ? "DBarExtended" : "DBar"} onClick={() => setDropBar(!dropBar)}>
                                          <GiHamburgerMenu size={30}/>
                                    </div>
                            </div> 
                            
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
  const handleClick = () => {
    console.log('hello, ninjas');
  }
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
 
 

