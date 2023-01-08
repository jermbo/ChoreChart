import { useContext } from "react";
import ChoreListDaily from "../components/ChoreListDaily";
import ChoreListWeekly from "../components/ChoreListWeekly";
import { ChoreContext } from "../context/ChoreContext";

interface Props {}

const Home: React.FC<Props> = ({}) => {
	const { weeklyTimeStamp } = useContext(ChoreContext);

	return (
		<>
			<p>{weeklyTimeStamp}</p>
			<ChoreListDaily />
			<ChoreListWeekly />
		</>
	);
};

export default Home;
