import { FC, useState } from 'react';

type RenderInputProps = {
  outputConsole: (text: string) => void;
};

const RenderInput: FC<RenderInputProps> = ({ outputConsole }) => {
  const [input, setInput] = useState('');
  const outputValue = () => {
    if (input) {
      outputConsole(input);
    }
  };
  //console.log(outputConsole);
  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter"
        value={input}
        onChange={updateValue}
      />
      <button onClick={outputValue}>Console</button>
    </div>
  );
};

export default RenderInput;
