import { useEffect, useState } from "react";

interface Props {
  cursive?: string;
  block?: string;
}

const Heading: React.FC<Props> = ({ cursive = "weekly", block = "chores" }) => {
  const [blockyText, setBlockyText] = useState<string[]>([]);

  useEffect(() => {
    setBlockyText(block.split(""));
  }, []);

  return (
    <div className="headline">
      <p className="cursive">{cursive}</p>
      <p className="block">
        {blockyText.map((text, i) => {
          return (
            <span key={`${text}-${i}`} data-heading={text}>
              {text}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default Heading;
