import { Link } from "react-router-dom";

interface Props {}

const Header: React.FC<Props> = ({}) => {
  return (
    <header className="main-header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/edit">Edit Chores</Link>
      </nav>
    </header>
  );
};

export default Header;
