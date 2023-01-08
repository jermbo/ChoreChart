import { WeeklyChoreTrack, DailyChore, ChoreGroup } from "../interfaces";

interface BuildLocalDataParams {
  weekTimeStamp: string;
  weekly: WeeklyChoreTrack[];
  daily: DailyChore[];
}

const buildLocalData = ({
  weekTimeStamp,
  daily,
  weekly,
}: BuildLocalDataParams): ChoreGroup => {
  const data: ChoreGroup = {};
  data[weekTimeStamp] = {
    weekTimeStamp,
    daily,
    weekly,
  };
  return data;
};

export default buildLocalData;
