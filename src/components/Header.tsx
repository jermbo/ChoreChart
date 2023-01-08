import { Link } from "react-router-dom";
import WeekSwitcher from "./WeekSwitcher";

interface Props {}

const Header: React.FC<Props> = ({}) => {
  return (
    <header className="main-header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/edit">Edit Chores</Link>
      </nav>
      <WeekSwitcher />
    </header>
  );
};

export default Header;
