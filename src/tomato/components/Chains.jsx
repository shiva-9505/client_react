import React,{use, useEffect,useState} from 'react'
import { API_URL } from '../api'
import { FaArrowAltCircleLeft } from "react-icons/fa"
import { FaArrowAltCircleRight } from "react-icons/fa"
import { ClipLoader, RingLoader } from 'react-spinners'
import {Link} from 'react-router-dom'

const Chains = () => {

    const [vendorData, setVendorData]= useState([]);
    const [scrollPosition,setScrollPosition]=useState();
    const [loading, setLoading]=useState(true);

    const vendorFirmHandler= async()=>{
        try {
            const response= await fetch(`${API_URL}/vendor/all-vendors`);
            const newData=await response.json();
            setVendorData(newData);
            setLoading(false)
            //console.log("this is api data",newData);


        } catch (error) {
            alert("Failed to fetch data")
            console.log("Failed to fetch data",error)
            setLoading(true)
        }
    }

    useEffect(()=>{
        vendorFirmHandler()
    },[])

    const handleScroll=(direction)=>{
        const gallary=document.getElementById('chainGallery');
        const scrollAmount=300;

        if(direction==="left"){
            gallary.scrollTo({
                left:gallary.scrollLeft-scrollAmount,
                behavior:"smooth"
            })
        }
        else if(direction==="right"){
            gallary.scrollTo({
                left:gallary.scrollLeft+scrollAmount,
                behavior:"smooth"
            })
        }

    }

  return (
    <div className='mediaChainSection'>
    <div className="loaderSection">

    {loading && 
        <>
        <div className="loader">
            Your food🥗🥗 is loading....
        </div>
            <RingLoader color="#36d7b7" height={80} width={80} />
        </>
    }
    </div>
    <div className="btnSection">
        <button onClick={()=>handleScroll("left")}><FaArrowAltCircleLeft  className='btnIcons'/></button>
        <button onClick={()=>handleScroll("right")}><FaArrowAltCircleRight className='btnIcons' /></button>
    </div>
    <h3>Top Reastaurant Chains in Hyderabad</h3>
    <section className="chainSection" id="chainGallery" onScroll={(e)=>setScrollPosition(e.target.scrollLeft)}>
       
        {vendorData.vendors && vendorData.vendors.map((vendor)=>{
            return(
                <>
            <div className="vendorBox">
                {vendor.firm.map((item)=>{
                    return(
                        <>
                        {/* <div>
                            {item.firmName}
                        </div> */}
                         <Link to={`/products/${item._id}/${item.firmName}`} className="link" key={item._id}>
                        <div className="firmImage"> 
                            <img src={item.image}/*{`${API_URL}/uploads/${item.image}`}*/ alt={item.firmName}/>
                        </div>
                        </Link>
                        </>
                    )  
                })}
            </div>
            </>
            )
        })}
    </section>
    </div>
  )
}

export default Chains
