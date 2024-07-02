import Image from "next/image";
import "./naveBar.css";
import Link from "next/link";

const Logo = "/assets/stripeLogo.png";

const NaveBar = () => {
  return (
    <nav className="navbar">
      <div className="stripeLogo">
        <Image width={150} height={50} src={Logo} alt="Stripe Logo" className="image" />
      </div>
      <ul className="navigatinItem">
        <li><Link href="#" className="link">Payments</Link></li>
        <li><Link href="#" className="link">Payroll</Link></li>
        <li><Link href="#" className="link">Resources</Link></li>
        <li><Link href="#" className="link">Products</Link></li>
        <li><Link href="#" className="link">Pricing</Link></li>
        <li><Link href="#" className="signUpLink">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default NaveBar;
