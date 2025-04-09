import { BrowserRouter as Router, Routes, Route } from "react-router";
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore'; 
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Products from "./pages/Products/";
import Orders from "./pages/Orders";
import OrderAdd from "./pages/Orders/add";
import ProtectedRoutes from "./context/ProtectedRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

interface IUserData {
    name: string;
    email: string;
}
  
const store = createStore<IUserData>({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
});

export default function App() {

    return (
        <>
            <ToastContainer />
            <AuthProvider store={store}>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        
                    {/* Dashboard Layout */}
                    <Route element={<AppLayout />}>

                        <Route element={<ProtectedRoutes/>}>
                            <Route index path="/" element={<Orders />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/orders/add" element={<OrderAdd />} />
                            <Route path="/products" element={<Products />} />
                            <Route index path="/profile" element={<UserProfiles />} />
                            <Route index path="/change-password" element={<UserProfiles />} />
                        </Route>	
                    </Route>

                    {/* Auth Layout */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </>
    );
}
