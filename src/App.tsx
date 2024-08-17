import { Outlet } from "react-router-dom";
import Navbar from "./component/common/Navbar";
import Footer from "./component/common/Footer";

const App = () => {
    return (
        <div>
          <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default App;