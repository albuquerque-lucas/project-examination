import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutProvider from './context/Layout/LayoutProvider';
import AuthProvider from './context/Authentication/AuthContext';
import Router from './Router';

function App() {
  return (
    <>
      <AuthProvider>
        <LayoutProvider>
            <Router />
          <ToastContainer />
        </LayoutProvider>
    </AuthProvider>
    </>
  );
}

export default App;
