import { PropsWithChildren } from "react";
import Heading from "../components/Heading";

interface Props {}

const Dashboard: React.FC<Props> = ({}) => {
  return (
    <>
      <Heading cursive="the" block="dashboard" />
    </>
  );
};

export default Dashboard;
