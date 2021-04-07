import React, { useState } from 'react';
import { useScrollPosition } from '../@utils/useScrollPosition';
import { LAST_SECTION_OFFSET } from '../@constants';

export const CurrentPageView = React.createContext(
  {
    currentPage: '',
    setCurrentPage: (newPage: string) => { }
  }
)

const CurrentPageViewProvider: React.FC = (props) => {

  const [currentPage, setCurrentPage] = useState<string>('');

  useScrollPosition(({ currPos }: any) => {
    if (currPos.y + LAST_SECTION_OFFSET > document.body.clientHeight) setCurrentPage('Contact');
  });

  return (
    <CurrentPageView.Provider
      value={{
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
      }}
    >
      {props.children}
    </CurrentPageView.Provider>
  );
};

export default CurrentPageViewProvider;