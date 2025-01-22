import { Link } from "react-router-dom";
// import Logo from "../components/Logo";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { MdFacebook, MdOutlineSlowMotionVideo } from "react-icons/md";
import { ImPinterest, ImTwitter, ImWhatsapp, ImYoutube } from "react-icons/im";

const NavLinkItem = ({ to, text }) => (
  <Link to={to} className="flex items-center gap-2  font-medium text-sm">
    <HiOutlineArrowNarrowRight className="text-primary text-xl" />
    {text}
  </Link>
);

const socialMediaLinks = [
  { Icon: MdFacebook, color: "text-blue-500", text: "Facebook" },
  { Icon: ImYoutube, color: "text-red-500", text: "Youtube" },
  { Icon: ImPinterest, color: "text-red-700", text: "Pinterest" },
  { Icon: ImTwitter, color: "text-sky-400", text: "Twitter" },
  { Icon: ImWhatsapp, color: "text-green-500", text: "Whatsapp" },
];

const navLinks = [
  { to: "/", text: "Home" },
  { to: "/allMeals", text: "Meals" },
  { to: "/upComingMealsCard", text: "Upcoming Meals" },
];

const Footer = () => {
  return (
    <div className=" px-5 md:px-44 lg:px-52 mt-8 shadow-xl shadow-slate-100 border-t-2">
      <div className="pt-16 lg:pt-24 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-7 ">
        <div className="flex justify-start">
          <div>
            <div className="text-sm font-medium mt-3">
              <a className="text-xl flex text-center items-center font-bold">
                Lodge Ease
              </a>
            </div>
            @ {new Date().getFullYear()} Lodge Ease.dev
          </div>
        </div>
        <div>
          <h1 className="font-semibold ">Page</h1>
          <div className="my-3 space-y-2">
            {navLinks.map((link, index) => (
              <NavLinkItem key={index} to={link.to} text={link.text} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Legal</h1>
          <div className="my-3 space-y-2">
            <NavLinkItem to="/" text="Terms & Conditions" />
            <NavLinkItem to="/" text="License" />
            <NavLinkItem to="/" text="Contact" />
          </div>
        </div>
        <div>
          <h1 className="font-semibold">Social</h1>
          <div className="my-3 space-y-2">
            {socialMediaLinks.map(({ Icon, color, text }, index) => (
              <div key={index} className="flex items-center gap-1">
                <Icon className={`${color} text-xl`} />
                <p className=" font-medium text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm font-medium text-center mt-5 pb-6 lg:pt-4 lg:pb-10">
        © theLodge Ease. {new Date().getFullYear()}, Bangladesh. All rights
        reserved
      </p>
    </div>
  );
};

export default Footer;
