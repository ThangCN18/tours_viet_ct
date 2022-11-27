import { useState, useEffect } from "react";
import ItemTourSea from "../ItemTourSea/ItemTourSea";
import axios from "axios";


function ListTourSea() {

    const [toursea, settoursea] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://server-tour-18.herokuapp.com/tour/sea"
    }).then(result=>{
      const a = result.data.tours
      settoursea(a)
    })
  }, []);
    return ( 
        toursea? 
        <div className="row mx-auto text-center container-fluid px-5" >
        {toursea.map(tour =><ItemTourSea key={tour._id} tour={tour}/>)}

        </div>:
        <div className="row mx-auto text-center container-fluid px-5" style={{height: "100px", lineHeight: "100px"}} >
        <div className="spinner-border" style={{marginLeft: "50%"}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
        </div>
     );
}

export default ListTourSea;