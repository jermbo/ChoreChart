import ChoreList from "../components/ChoreList";
import Heading from "../components/Heading";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return (
    <>
      <Heading />
      <ChoreList />
    </>
  );
};

export default Home;
