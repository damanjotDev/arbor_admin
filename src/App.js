import './App.css';
import { BrowserRouter } from "react-router-dom"
import AppRoute from './routes';
import { useSelector } from 'react-redux';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Dashboard from './components/admin/sideNav';

function App() {
  const { isLoggedIn } = useSelector(({adminLogin})=>adminLogin)
  return (
     <>        
    <BrowserRouter>                   
    {isLoggedIn ? <Dashboard /> : <AppRoute />}      
      <NotificationContainer />             
      </BrowserRouter>                                         
</>
  );
}

export default App;
