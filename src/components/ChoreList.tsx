import { CHORES } from "../TEMP_DATA";

interface Props {}

const ChoreList: React.FC<Props> = ({}) => {
  return (
    <table className="chores">
      {CHORES.map(({ id, name, price }) => {
        return (
          <tr className="chore" key={id}>
            <td className="chore-name">{name}</td>
            <td>
              <input type="check" id={`${name}-sunday`} />
              <label htmlFor={`${name}-sunday`}>{name}</label>
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default ChoreList;
