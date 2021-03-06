import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Pages/Common/Header/Header";
import NotFound from "./Pages/Common/NotFound/NotFound";
import Footer from "./Pages/Common/Footer/Footer";
import Login from "./Pages/Login/Login/Login";
import Register from "./Pages/Login/Register/Register";
import {ToastContainer} from "react-toastify";
import RequireAuth from "./Pages/Login/RequireAuth/RequireAuth";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import ManageInventory from "./Pages/ManageInventory/ManageInventory";
import EditProduct from "./Pages/EditProduct/EditProduct";
import AddProduct from "./Pages/AddProduct/AddProduct";
import MyProducts from "./Pages/MyProducts/MyProducts";
import Blogs from "./Pages/Blogs/Blogs";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/product/:id' element={
                    <RequireAuth>
                        <ProductDetails/>
                    </RequireAuth>
                }/>
                <Route path='/manage-inventories' element={
                    <RequireAuth>
                        <ManageInventory/>
                    </RequireAuth>
                }/>
                <Route path='/product/edit/:id' element={
                    <RequireAuth>
                        <EditProduct/>
                    </RequireAuth>
                }/>
                <Route path='/product/add' element={
                    <RequireAuth>
                        <AddProduct/>
                    </RequireAuth>
                }/>
                <Route path='/my-products' element={
                    <RequireAuth>
                        <MyProducts/>
                    </RequireAuth>
                }/>
                <Route path='/blogs' element={<Blogs/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <Footer/>
            <ToastContainer/>
        </>
    );
}

export default App;
