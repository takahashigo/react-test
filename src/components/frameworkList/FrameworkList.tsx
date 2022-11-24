import { FC } from 'react';

export type FrameworkListProps = {
  data: Array<{
    id: number;
    item: string;
  }>;
};

const FrameworkList: FC<FrameworkListProps> = ({ data }) => {
  if (!data || !data.length) {
    return <h1>No data !</h1>;
  }
  return (
    <div>
      <ul>
        {data.map(({ id, item }) => (
          <li key={id}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FrameworkList;
