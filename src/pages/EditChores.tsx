import { PropsWithChildren } from "react";
import Heading from "../components/Heading";

interface Props {}

const EditChores: React.FC<Props> = ({}) => {
	return (
		<>
			<Heading cursive="edit" block="chores" />
		</>
	);
};

export default EditChores;
