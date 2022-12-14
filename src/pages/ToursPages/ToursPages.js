import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import ItemTour from "../../components/ItemTour/ItemTour";
import Footer from "../../components/Footer/Footer";


function ToursPages() {

    const [departure_place, setdeparture_place] = useState("");
    const [category, setcategory] = useState("");
    const [value_price, setvalue_price] = useState(0);
    const [name_tour, setname_tour] = useState("");
    const [pages, setpages] = useState(0);
    const [message, setmessage] = useState(false);
    const [dataTours, setDataTours] = useState([])

    const [loading, setloading] = useState(false);


    useEffect(() => {
        window.scrollTo(0, -document.body.scrollHeight);

        setloading(true)
        const url = "https://server-tour-18.herokuapp.com/tour/search/?d="+departure_place+"&c="+category+"&p="+value_price+"&n="+name_tour+"&pages="+pages
        axios({
            method: "get",
            url: url,
            
        }).then(result => {
            const a = result.data.tours
            setDataTours(a)
            setpages(6)
        setloading(false)

        })
        

    }, []);

    const hangdelLoadTour =()=> {

        setloading(true)
        const url = "https://server-tour-18.herokuapp.com/tour/search/?d="+departure_place+"&c="+category+"&p="+value_price+"&n="+name_tour+"&pages="+pages
        axios({
            method: "get",
            url: url
        }).then(result => {
            const a = result.data.tours
            const newData = dataTours.concat(a)
            setDataTours(newData)
            const pagenew = pages + 6
            setpages(pagenew)
            if(a.length < 6){
                setmessage(true)
            }

        setloading(false)

        })
    }

    
    const hangdelSearch = ()=> {
        setpages(0)
        setloading(true) 
        setmessage(false)
        const url = "https://server-tour-18.herokuapp.com/tour/search/?d="+departure_place+"&c="+category+"&p="+value_price+"&n="+name_tour+"&pages=0"  
        axios({
            method: "get",
            url: url
        }).then(result => {
            const a = result.data.tours
            setDataTours(a)

            if(a.length < 6){
                setmessage(true)
            }
            setpages(6)
        setloading(false)

        })
    }


    return (
        <div>
            <Header  liItem="tours"/>
            <div className=" mx-auto mt-2 mb-4 p-4" style={{ width: "90%", borderRadius: "20px", border:  "solid 1px #cfd4d1"}}>
                <h5 style={{height: "20px"}}> 
                <i className="fa fa-filter mr-1 text-muted"></i>
                B??? l???c t??m Ki???m</h5>
                <div className="row ">
                <div className="col-12 mt-2 mx-auto" style={{ height: "1px", background: "#cfd4d1"}}></div>
                <div className="col-10 col-md-10 col-xl-11 my-4">

                        <input type="text" className="form-control bg-light px-4 mt-2" style={{borderRadius: "20px"}} placeholder="Tour ..." value={name_tour} onChange={e => setname_tour(e.target.value)} />
                    </div>
                    <div className="col-2 col-md-2 col-xl-1 my-4 text-center" >
                        <button className="btn btn-outline-info mt-2 btn-search" style={{borderRadius: "20px", width: "110%"}} onClick={hangdelSearch}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                    
                    <div className="col-12 col-md-4 ">
                        <label className="form-label" htmlFor="form6Example133">N??i kh???i h??nh</label>
                        <select className="form-control bg-light" style={{borderRadius: "20px"}} value={departure_place} onChange={e => setdeparture_place(e.target.value)}>
                            <option value="">All</option>
                            <option value="H?? N???i">H?? N???i</option>
                            <option value="???? N???ng">???? N???ng</option>
                            <option value="H??? Ch?? Minh">H??? Ch?? Minh</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-4 ">
                        <label className="form-label" htmlFor="form6Example133">Th??? lo???i</label>
                        <select className="form-control bg-light" style={{borderRadius: "20px"}} value={category} onChange={e => setcategory(e.target.value)} >
                            <option value="">All</option>
                            <option value="Tour Tham Quan">Tour Tham Quan</option>
                            <option value="Tour Ngh??? D?????ng">Tour Ngh??? D?????ng</option>
                            <option value="Tour Bi???n ?????o">Tour Bi???n ?????o</option>
                            <option value="Tour Leo N??i">Tour Leo N??i</option>
                            <option value="Tour N?????c Ngo??i">Tour N?????c Ngo??i</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-4 ">
                        <label className="form-label" htmlFor="form6Example133">Gi??</label>
                        <select className="form-control bg-light" style={{borderRadius: "20px"}} value={value_price} onChange={e => setvalue_price(e.target.value)} >
                            <option value="0">All</option>
                            <option value="3">D?????i 3 tri???u</option>
                            <option value="10">T??? 3 ?????n 10 tri???u</option>
                            <option value="11">Tr??n 10 tri???u</option>
                        </select>
                    </div>
                    

                    

                </div>

            </div>

            {dataTours ?
            <div className="row mx-auto text-center container-fluid px-5" >
                {dataTours.map(tour => <ItemTour key={tour._id} tour={tour} />)}
            </div>:
            <div className="row mx-auto text-center container-fluid px-5" style={{ height: "100px", lineHeight: "100px" }} >
                <div className="spinner-border" style={{ marginLeft: "50%" }} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>}

            {
                !loading?
                !message?
                <button style={{marginLeft:"48%"}} className="btn btn-success btn-lg mb-5" onClick={e =>{hangdelLoadTour()}}>T???i th??m</button>
                :<h5 className="text-center">H???t m???t r???i</h5>:null
            }
            <Footer/>
        </div>
    );
}

export default ToursPages;