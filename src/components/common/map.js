import React, { useRef, useState, useEffect } from 'react';
import { Autocomplete, DrawingManager, GoogleMap, Polygon, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import DeleteIcon from '@mui/icons-material/Delete';
// import deleteIcon from '../assets/images/remove.png';


const libraries = ['places'];
const MapContainer = (props) => {

    const  {formik, updateData} = props
    const mapRef = useRef();
    const autocompleteRef = useRef();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    
 

    const defaultCenter = {
      lat: 37.7749, lng: -122.4194,
    }

    const [center, setCenter] = useState(defaultCenter);

    const containerStyle = {
      width: '100vw', height: '70vh'
    }
    useEffect(()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
          console.log("position", position)
          setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
      })
    },[])


    const autocompleteStyle = {
        boxSizing: 'border-box',
        border: '1px solid transparent',
        width: '240px',
        height: '38px',
        padding: '0 12px',
        borderRadius: '3px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        fontSize: '14px',
        outline: 'none',
        textOverflow: 'ellipses',
        position: 'absolute',
        right: '8%',
        top: '11px',
        marginLeft: '-120px',
    }



    const [map, setMap] = useState()
    const onLoadMap = (map) => {
        mapRef.current = map;
        setMap(map)
    }

    const onLoadAutocomplete = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    }

    const handleMapClick =(e)=>{
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      updateData({lat, lng})
      formik.setFieldValue("treeLat", e.latLng.lat())     
      formik.setFieldValue("treeLong", e.latLng.lng())
      setCenter({lat:e.latLng.lat(), lng:e.latLng.lng()});
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({location:e.latLng},(result, status)=>{
        if(status === "OK" && result[0]){
          formik.setFieldValue("treeAddress", result[0].formatted_address)
        }
      })
    }
    
    const onPlaceChanged = () => {
      const  place  = autocompleteRef.current.getPlace();
      if(place) { 
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()  
        updateData({lat, lng})   
        formik.setFieldValue("treeLat", lat)     
        formik.setFieldValue("treeLong", lng)
        formik.setFieldValue("treeAddress", place.formatted_address)
        setCenter({lat: lat, lng: lng});
      } 
    }

    const mapOptions={
      mapTypeId:"satellite",
      mapTypeControl:false
    }

    return (
      isLoaded
        ?
        <>    
        <GoogleMap
            zoom={17}
            center={center}
            onLoad={onLoadMap}
            onClick={handleMapClick}
            options={mapOptions}
            mapContainerStyle={containerStyle}
        >
      <Marker    
        position={center}
      />                                           
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
      <input
        type='text'
        placeholder='Search Location'
        style={autocompleteStyle}
      />
      </Autocomplete>
  </GoogleMap>
  </>
    :
    null
    );
}

export default MapContainer; 