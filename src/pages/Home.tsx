import ChoreListDaily from "../components/ChoreListDaily";
import ChoreListWeekly from "../components/ChoreListWeekly";

interface Props {}

const Home: React.FC<Props> = ({}) => {
  return (
    <>
      <ChoreListDaily />
      <ChoreListWeekly />
    </>
  );
};

export default Home;
