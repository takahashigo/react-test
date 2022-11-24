import { render, screen } from '@testing-library/react';
import FrameworkList from './FrameworkList';

describe('Rendering the list with props', () => {
  it('Should render No data ! when empty array data propped', () => {
    render(<FrameworkList data={[]} />);
    // 下記はtoBeInTheDocumentはHTMLの構造にNo data !が含まれるかどうか
    expect(screen.getByText('No data !')).toBeInTheDocument();
  });
  it('Should render list item correctly', () => {
    // dummyDataを用意
    const dummyData = [
      { id: 1, item: 'React dummy' },
      { id: 2, item: 'Angular dummy' },
      { id: 3, item: 'Vue dummy' },
    ];
    render(<FrameworkList data={dummyData} />);
    const frameworkItems = screen
      .getAllByRole('listitem')
      .map((ele) => ele.textContent);
    const dummyItems = dummyData.map((ele) => ele.item);
    // 比較
    expect(frameworkItems).toEqual(dummyItems);
    // ないことを確認するときは、queryByTextで取得するようにする
    expect(screen.queryByText('No data !')).toBeNull();
  });
});
