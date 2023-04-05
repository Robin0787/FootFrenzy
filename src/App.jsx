import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Components/Header/Header';
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';
function App() {
  const navigation = useNavigation();
  return (
    <div>
      <Header />
      <div className='min-h-[calc(100vh-60px)]'>
        {
          navigation.state === 'loading' ? <LoadingSpinner /> : <Outlet />
        }
      </div>
    </div>
  )
}

export default App;
