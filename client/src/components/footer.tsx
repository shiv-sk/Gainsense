export default function Footer(){
    return(
        <div>
            <footer className="footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by GainSense pvt. Ltd</p>
                </aside>
            </footer>
        </div>
    )
}