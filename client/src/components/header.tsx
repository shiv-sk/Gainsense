import Link from "next/link"

export default function Header(){
    return(
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link href={"/"} className="btn btn-ghost text-lg md:text-2xl">GainSense</Link>
                </div>
                <div className="flex-none md:hidden">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost">
                            ☰
                        </label>
                        <ul 
                        tabIndex={0} 
                        className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
                            <Link href="/overview" className="font-semibold">Overview</Link>
                            <Link href="/distributionbytype" className="font-semibold">Distribution By Type</Link>
                            <Link href="/trends" className="font-semibold">Trends</Link>
                        </ul>
                    </div>
                </div>
                <div className="flex-none hidden md:block">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/overview" className="font-semibold">Overview</Link></li>
                        <li><Link href="/distributionbytype" className="font-semibold">Distribution By Type</Link></li>
                        <li><Link href="/trends" className="font-semibold">Trends</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}