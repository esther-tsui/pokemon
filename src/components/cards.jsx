import * as React from "react"; 
import { useState, useEffect } from "react";
import {useQuery, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


import bug from '../icons/bug.svg';
import dark from '../icons/dark.svg';
import dragon from '../icons/dragon.svg';
import electric from '../icons/electric.svg';
import fairy from '../icons/fairy.svg';
import fighting from '../icons/fighting.svg';
import fire from '../icons/fire.svg';
import flying from '../icons/flying.svg';
import ghost from '../icons/ghost.svg';
import grass from '../icons/grass.svg';
import ground from '../icons/ground.svg';
import ice from '../icons/ice.svg';
import normal from '../icons/normal.svg';
import poison from '../icons/fire.svg';
import psychic from '../icons/psychic.svg';
import rock from '../icons/rock.svg';
import steel from '../icons/steel.svg';
import water from '../icons/water.svg';

const getType = (pokeType) => {
    switch(pokeType) {
        case 'bug': return bug;
        case 'dark': return dark;
        case 'dragon': return dragon;
        case 'electric': return electric;
        case 'fairy': return fairy;
        case 'fighting': return fighting;
        case 'fire': return fire;
        case 'flying': return flying;
        case 'ghost': return ghost;
        case 'grass': return grass;
        case 'ground': return ground;
        case 'ice': return ice;
        case 'normal': return normal;
        case 'poison': return poison;
        case 'psychic': return psychic;
        case 'rock': return rock;
        case 'steel': return steel;
        case 'water': return water;
        default: return normal;
    }
}
const Cards = () => {
    const getApis = async () => {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + text);
        return res.json();
    };

    const {data, isFetching, error, refetch} = useQuery({queryKey: ["pokemon"], queryFn: getApis, refetchOnWindowFocus: false, enabled: false});
      
    const [pokeType, setType] =  React.useState(null)
    React.useEffect(()=> { setType(data?.types[0]?.type?.name)}, [data])
    const [text, setText] = useState("");
        
        
    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleClick = () => {
        refetch();
    }

    useEffect(()=>{
        if (pokeType === "grass"){
            setCardColor("#99dc5f")
        } else if (pokeType === "water") {
            setCardColor("#7dcdf0")
        } else if (pokeType === "poison") {
            setCardColor("#a06d93")
        } else if (pokeType === "fire") {
            setCardColor("#f85838")
        }
    },[pokeType])

    const [pokeMove, setPokeMove] = React.useState({})
    useEffect(() => {
        if (data) {
            const twoMoves = data.moves.slice(0, 2)
            setPokeMove({})
            for (let i = 0; i < twoMoves.length; i++) {
                const url = twoMoves[i].move.url
                fetch(url).then((res) => res.json())
                .then((data) => {
                    const effect = data.effect_entries[0].effect
                    const moveName = data.name
                    setPokeMove(prev => {
                        return {
                            ...prev, 
                            [moveName]: effect
                        }
                    })
                })
            }
        
        }
    }, [data]);

    useEffect(()=> {
        console.log(JSON.stringify(pokeMove))
    }, [pokeMove])

    const [cardColor, setCardColor] = React.useState("white")
  

    if (isFetching) { return <p>Loading</p>; }
    if (error) { return <p>Failed</p>; }
    return (
        <>
    	<input onChange={handleChange}/>
        {data ? 
            <div >
            <Card border="waring" style={{backgroundColor: cardColor}} className="card-container">
            <div>
            <Table >
                <tr className="basic-pokemon">
                    <th style={{fontFamily: "Gill Sans"}}>{`BASIC POKEMON`}</th>
                </tr>
                <tr>
                    
                    <td className="three-element">{data ? data.name : null}</td>
                    <td className="three-element">{data ? data.stats.filter((x) => x.stat.name === 'hp')[0].base_stat : null}</td>
                    <td className="three-element">
                        {data ?
                        <div className={`icon ${pokeType}`}>
                            
                         <img className={`${pokeType}`}
                        src={getType(
                            pokeType
                            
                        )} alt="kk"/>

</div>
                        : null}
                    </td>
                </tr>
            </Table>
            </div>

            <div className="main-image">{

                <img id="image" style={{height:"25vh"}} src={data.sprites.other["official-artwork"].front_default} />
            
            }</div>

            <Table style={{marginTop: "5px"}}>
                <tr>
                    <td style={{textAlign: "center", fontFamily:"Gill Sans"}}>{data ? `Id is: ${data.id}` : null}</td>
                </tr>
            </Table>

           
            <Table style={{marginTop: "5px"}}>
            {
               Object.keys(pokeMove).map((x) =>{
                    return (
                        <>
                        <tr className="basic-pokemon">
                            <td className="three-element">
                            {x.charAt().toUpperCase() + x.slice(1).replace("-", " ")}
                            </td>
                            <td className="three-element">
                            {pokeMove[x]}
                            </td>
                        </tr></>
                    )
                }
                ) 
            }
        </Table>
            <hr></hr>

            <Table>
                
                <tr className="basic-pokemon">    
                    <td style={{textAlign: "center"}} className="three-element">{`BASE EXPERIENCE`}</td>
                    <td style={{textAlign: "center"}} className="three-element">{`ORDER`}</td>
                    <td style={{textAlign: "center"}} className="three-element">{`WEIGHT`}</td>
                </tr>
                <tr className="basic-pokemon">    
                    <td style={{textAlign: "center"}}className="three-element">{data ? data.base_experience : null}</td>
                    <td style={{textAlign: "center"}}className="three-element">{data ? data.order : null}</td>
                    <td style={{textAlign: "center"}}className="three-element">{data ? data.weight : null}</td>
                </tr>
            </Table>

            <Table>
                <tr className="basic-pokemon">
                     <td style={{textAlign: "center"}}>{`description`}</td>
                </tr>
                <tr>
                    <td style={{textAlign: "center"}}> 
                        {
                        /*.abilities.filter((x) => x.ability.name === 'cute-charm')[0].ability.name
                       */ }
                    </td>
                </tr>
            </Table>

            </Card>
                
                </div>
        : null }
        <Button onClick={handleClick}>Search</Button>
        </>
    );
};

export {Cards};