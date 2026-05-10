import { AppContext } from "#main.jsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CoinsDetails(){

    const { apiKey, rootURL } = useContext(AppContext);
    const { id } = useParams();
    const [coinDetail, setCoinDetail] = useState([]);
    const [loading, setLoading] = useState(true)

    const loadCoinDataDetails = async () => {

        const response = await fetch(
            `${rootURL}coins/${id}?x_cg_demo_api_key=${apiKey}`)
        return await response.json();
    }
    
    useEffect(() =>{
        setLoading(true) 
        loadCoinDataDetails().then(data =>{
            setCoinDetail(data);
            setLoading(false);
        });

    }, [id]);
    
     if(loading === true){
   return <div>
            Loading Data....
          </div>
  }

    return(

        <>
        {coinDetail.name}
        </>
    )
}