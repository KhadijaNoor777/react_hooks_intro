import React, {useState, useEffect} from 'react';


const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null,
}

function App() {

  const [count, setCount] = useState(0);
  const [light, setLight] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x:null, y:null });
  const [status, setStatus] = useState(navigator.onLine);  //navigator.online returns our network status
  const [location, setLocation] = useState(initialLocationState);
  let mounted = true;

  useEffect(() => {
    document.title = `You have clicked ${count} times`;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeoLocation);    //it only takes a function
    //to watch our current location, it keeps on returning position as the user moves
    const watchId = navigator.geolocation.watchPosition(handleGeoLocation);   


    //clean up, prevents memory leaks
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      mounted = false;
      //stops watch position
      navigator.geolocation.clearWatch(watchId);
    }
  }, [count])

  const handleMouseMove = (e) => {
    setMousePosition({
      x:e.pageX,
      y:e.pageY
    })
  }

  const handleOnline = (e) => {
    setStatus(true);
  }
  
  const handleOffline = (e) => {
    setStatus(false);
  }

  const handleGeoLocation = (e) => {
    if(mounted){
      setLocation({
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
        speed: e.coords.speed
      })  
    }
  }


  //we can also do it using prevCount.... setCount(prevCount => prevCount+1)
  return (
    <div>
      {/* Hello World */}
      <h2>Counter</h2>
      <button onClick={() => setCount(count+1)}>I'm clicked {count} times</button>

      <h2>Toggle light</h2>
      <div
        //src = { light ? './images/lightOn.jpg' : './images/lightOff.jpg'}
        style={{
          width: '100px',
          height: '100px',
          background: light ? 'yellow' : 'gray'
        }} 
        onClick={() => setLight(!light)}>

      </div>

      <h2>Mouse Position</h2>
      <p>x: {mousePosition.x} <br/> y: {mousePosition.y} </p>

      <h2>Network Status</h2>
      <p>You are currently <strong>{status ? 'online' : 'offline'}</strong></p>


      <h2>GeoLocation</h2>
      <p>latitude: {location.latitude}</p>
      <p>longitude: {location.longitude}</p>
      <p>Speed: {location.speed ? location.speed : '0'}</p>

    </div>
  );
}

export default App;
