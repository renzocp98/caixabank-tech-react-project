import { Link, Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <main className="bg-cg-bg text-white min-h-screen">
            <nav className=" gap-1 p-1 ">
                <Link to="/" className="hover:text-blue-400 transition-colors p-4" >Home Page</Link>
                <Link to="/coins" className="hover:text-blue-400 transition-colors p-4">Coins</Link>
                <Link to="/nfts" className="hover:text-blue-400 transition-colors p-4">NFTs</Link>
                <Link to="/derivatives" className="hover:text-blue-400 transition-colors p-4">Derivatives</Link>
            </nav>
            <Outlet/>
        </main>
    )
}