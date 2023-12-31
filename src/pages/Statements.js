import React, { useEffect, useState } from 'react'
import '../components/Card.css'
// import { statements } from '../data/Data'
import Badge from '../components/small-img/badge.svg'
import './css/Statements.css'
import '../components/Card.css'
import { Model } from '../components/Model'
import { PageTitle } from '../components/PageTitle'

//route
import { GET_STATEMENT_API } from "../services/CONSTANTS";

//data
import { getApiDataService } from '../services/apiServices'
export const Statements = () => {
  const [scrollableModal, setScrollableModal] = useState(false)
  const [model, setModel] = useState(false)
  const [tempdata, setTempData] = useState([])
  const getData = (img) => {
    let tempData = [img]
    setTempData(item => [1,...tempData]);
    return setModel(true)
  }

  const [statements, setStatements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getApiDataService(GET_STATEMENT_API(10))
      .then((res) => {
        console.log("statement component data =", res);
        setStatements(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("axios err=", err);
        setIsLoading(false);
        setStatements([]);
      });
    return () => {
      console.log("axios cleanup.");
    };
  }, []);


  return (
    <div>
        <PageTitle pageTitle="Statements"/>
        <div className='d-flex flex-wrap justify-content-center align-items-center mt-3 gap-2'>
            {statements.map(statement => 
                <>
                    <div key={statement?.id} onClick={() => getData(statement?.photo)} className='d-flex flex-wrap statement col-lg-5 col-md-5 col-11 p-1'>
                        <div className='col-lg-4 col-12 pt-1'>
                            <div className='position-relative'>
                                <img className='col-12' src={statement?.photo}/>
                                <img className='position-absolute top-0 end-0' src={Badge} />
                            </div>
                        </div>
                        <div className='align-self-center pe-2 col-lg-7 ms-3'>
                            <h5 className='stm-text'>Statements</h5>
                            <p className='fw-semibold text-wrap'>{statement?.title}</p>
                            <p className='text-primary'>{statement?.date}</p>
                        </div>
                    </div>
                    {
                        model === true? <Model img={tempdata[1]} hide={() => setModel(false)}/> : ''
                    }
                </>
            )}
        </div>
    </div>
  )
}
