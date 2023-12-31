import React,{ useEffect,useState} from 'react'
import { Associations } from '../components/Associations'
import { clubs } from '../data/Club'
import { BsCalendarWeek } from 'react-icons/bs'
import '../components/Card.css'


//component
import { Component } from '../components/AssociationComponent'
//data
import { GET_STUDENT_CLUB_API } from "../services/CONSTANTS";
import { getApiDataService } from '../services/apiServices'

export const StudentsClubs = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getApiDataService(GET_STUDENT_CLUB_API(10))
      .then((res) => {
        console.log("st-club component data =", res);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("axios err=", err);
        setIsLoading(false);
        setData([]);
      });
    return () => {
      console.log("axios cleanup.");
    };
  }, []);

  
  return (
    <div>
        <Associations 
          associationName="Students' Clubs" 
          component={<Component associations={data}/>} 
        />
    </div>
  )
}
