
import React, { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        ...location,
        error: "Geolocation is not supported by your browser."
      });
      return;
    }

    const success = (position) => {
      console.log(position);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null
      });
    };

    const error = (error) => {
      setLocation({ ...location, error: error.message });
    };

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        console.log(permissionStatus);
        if (permissionStatus.state === "granted") {
          console.log("granted");
          navigator.geolocation.getCurrentPosition(success, error);
        } else if (permissionStatus.state === "prompt") {
          console.log("prompt");
          navigator.geolocation.getCurrentPosition(success, error);
        } else if (permissionStatus.state === "denied") {
          console.log("denied");
          setLocation({
            ...location,
            error: "Geolocation access has been denied by the user."
          });
        }
        permissionStatus.onchange = function () {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, error);
          } else if (permissionStatus.state === "denied") {
            setLocation({
              ...location,
              error: "Geolocation access has been denied by the user."
            });
          }
        };
      });
  }, []);

  return (
    <div>
      {location.error ? <div>Error: {location.error}</div> : null}
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
};

export default useGeoLocation;
