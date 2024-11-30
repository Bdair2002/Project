import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Project - FTS';
    }
  }, [title]);
};

export default useDocumentTitle;
