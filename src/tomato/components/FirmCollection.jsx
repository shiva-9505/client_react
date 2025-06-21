import React,{useEffect,useState} from 'react'
import { API_URL } from '../api';
import { Link } from 'react-router-dom';

const FirmCollection = () => {

    const [firmData,setFirmData]=useState([])
    const [selectedRegion,setSelectedRegion]=useState('All')

    const firmDataHandler=async()=>{
        try {
            const response=await fetch(`${API_URL}/vendor/all-vendors`)
            const newFirmData=await response.json();
            setFirmData(newFirmData.vendors);

            console.log("firmdata", newFirmData);
        } catch (error) {
            alert("Firm data not fetched");
            console.error("Firm data not fetched", error)
        }
    }
    useEffect(()=>{
        firmDataHandler()
    },[])

    const filterHandler=(region)=>{
        setSelectedRegion(region)
    }

  return (
    <>
    <h3>Restaurants with online food delivery in Hyderabad</h3>
    <div className="filterButton">
        <button onClick={()=>filterHandler('All')}>All</button>
        <button onClick={()=>filterHandler('South-Indian')}>South-Indian</button>
        <button onClick={()=>filterHandler('North-Indian')}>North-Indian</button>
        <button onClick={()=>filterHandler('Chinese')}>Chinese</button>
        <button onClick={()=>filterHandler('Bakery')}>Bakery</button>
    </div>
    <section className="firmSection">
        {firmData.map((apple)=>{
                return(
                    <>
                    {apple.firm.map((item)=>{
                        return(
                            <Link to={`/products/${item._id}/${item.firmName}`} className='link'>
                                <div className='firmGroupBox'>
                                <div className='firmGroup'>
                                    <img src={item.image} alt={item.firmName} />
                                    <div className="firmOffer">
                                        {item.offer}
                                    </div>
                                </div>
                                <div className='firmDetails'>
                                            <strong>{item.firmName}</strong>
                                            <div  className='firmArea'>{item.region.join(', ')}</div>
                                            <div className='firmArea'>{item.area}</div>
                                </div>
                            </div>
                            </Link>
                        )
                    })}
                    </>
                )
        }) }
    </section>
    </>

  )
}

export default FirmCollection
