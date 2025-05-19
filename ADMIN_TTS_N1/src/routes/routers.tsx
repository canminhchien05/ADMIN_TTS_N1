import { Route, Routes } from "react-router"
import MainLayout from "../components/layouts/MainLayout"

const Routers = ()=>{
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>

            </Route>
        </Routes>
    )
}
export default Routers