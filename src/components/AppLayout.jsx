import { Outlet } from "react-router-dom"
import { AppFooter } from "./AppFooter"
import { AppHeader } from "./AppHeader"

export const AppLayout = () => {
    return <>
    <AppHeader/>
    <Outlet/>
    <AppFooter/>
    </>
}