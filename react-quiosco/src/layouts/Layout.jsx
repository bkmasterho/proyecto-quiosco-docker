import { Outlet } from "react-router-dom"


export default function Layout() {   
  return (
    <div className="text-6xl">
        Layout

        <Outlet />
    </div>
  )
}
