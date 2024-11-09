import { useScrollTop } from '../../hooks/index';
import { ErrorProps } from '../../types';
import Button from '../../components/Button/Button';
const PageNotFound = ({ history }: ErrorProps) => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1> 😓 Page you are looking for doesn&apos;t exists.</h1>
      <br />
      <Button onClick={history.back} type="button">
        Go Back 👈
      </Button>
    </div>
  );
};

export default PageNotFound;
