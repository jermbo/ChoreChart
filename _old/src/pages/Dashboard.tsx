import { PropsWithChildren } from "react";
import Heading from "../components/Heading";

interface Props { }

const Dashboard = ({ }: Props) => {
	return (
		<>
			<Heading cursive="the" block="dashboard" />
		</>
	);
};

export default Dashboard;
