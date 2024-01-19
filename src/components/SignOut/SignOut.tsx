import { signOut } from 'firebase/auth';
import { auth } from './../../utils/firebase';
import { useDispatch } from 'react-redux';
import { removeUser } from '@/store/reducers/userSlice';

interface IProps {
  title: string;
}

export default function SignOut({ title }: IProps) {
  const dispatch = useDispatch();
  const handleClick = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        throw Error(error);
      });
  };

  return (
    <button className="link" onClick={handleClick}>
      {title}
    </button>
  );
}
