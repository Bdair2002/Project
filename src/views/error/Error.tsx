import { useScrollTop } from '../../hooks/index';
import Button from '../../components/Button/Button';
import { ErrorProps } from '../../types';

const Error = ({ history }: ErrorProps) => {
  useScrollTop();

  return (
    <div className="notFound">
      <h1> 😓 An error has occurred. Please try again.</h1>
      <br />
      <Button onClick={() => history.push('/')} type="button">
        Try Again 🔁
      </Button>
    </div>
  );
};

export default Error;
