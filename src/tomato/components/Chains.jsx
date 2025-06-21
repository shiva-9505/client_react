import React,{useEffect,useState} from 'react'
import { API_URL } from '../api'

const Chains = () => {

    const [vendorData, setVendorData]= useState([]);
    const [scrollPosition,setScrollPosition]=useState();

    const vendorFirmHandler= async()=>{
        try {
            const response= await fetch(`${API_URL}/vendor/all-vendors`);
            const newData=await response.json();
            setVendorData(newData);
            //console.log("this is api data",newData);


        } catch (error) {
            alert("Failed to fetch data")
            console.log("Failed to fetch data")
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
    <>
    <div className="btnSection">
        <button onClick={()=>handleScroll("left")}>Left</button>
        <button onClick={()=>handleScroll("right")}>Right</button>
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
                        <div>
                            {item.firmName}
                        </div>
                        <div className="firmImage">
                            <img src={item.image}/*{`${API_URL}/uploads/${item.image}`}*/ alt={item.firmName}/>
                        </div>
                        </>
                    )  
                })}
            </div>
            </>
            )
        })}
    </section>
    </>
  )
}

export default Chains
