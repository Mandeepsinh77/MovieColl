import React, { useContext } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom";
import { Appstate } from "../App";

const Header = () => {
    const useAppstate = useContext(Appstate);
    return (
        <div className="sticky header z-10 top-0 flex justify-between bg-black text-red-500 font-bold p-3 border-b-2 border-gray-500">
            <Link to="/"><span className="text-3xl">Movie<span className="text-white">Coll</span></span></Link>
            {useAppstate.login ?
                <Link to={'/addmovie'}>
                    <h3 className="text-lg text-white items-center cursor-pointer flex">
                        <Button><AddBoxIcon style={{ color: "red" }} className="mr-1 " /><span className="text-white "> Add New</span></Button>
                    </h3>
                </Link>
                :
                <Link to={'/login'}>
                    <h3 className="text-lg text-white items-center cursor-pointer flex">
                        <Button><LoginIcon style={{ color: "red" }} className="mr-1 " /><span className="text-white ">Login</span></Button>
                    </h3>
                </Link>
            }
        </div>
    )
}
export default Header;