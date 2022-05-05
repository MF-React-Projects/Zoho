import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {Route, Routes} from "react-router-dom";
import Header from "./Pages/Common/Header/Header";
import Home from "./Pages/Home/Home/Home";
import NotFound from "./Pages/Common/NotFound/NotFound";
import Footer from "./Pages/Common/Footer/Footer";

function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
