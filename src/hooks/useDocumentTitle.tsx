import { useLayoutEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Project - FTS';
    }
  }, [title]);
};

export default useDocumentTitle;
