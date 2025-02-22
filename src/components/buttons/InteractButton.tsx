import Button from './Button';
import { toast } from 'react-toastify';
import interactImg from '../../../assets/interact.svg';
import { useJoinOrLeaveGame } from '../../hooks/useJoinOrLeaveGame';

export default function InteractButton() {
  const { joinOrLeaveGame, isPlaying } = useJoinOrLeaveGame();
  // if (!isAuthenticated || game === undefined) {
  //   return (
  //     <SignInButton>
  //       <Button imgUrl={interactImg}>Interact</Button>
  //     </SignInButton>
  //   );
  // }
  return (
    <Button imgUrl={interactImg} onClick={joinOrLeaveGame}>
      {isPlaying ? 'Leave' : 'Interact'}
    </Button>
  );
}
