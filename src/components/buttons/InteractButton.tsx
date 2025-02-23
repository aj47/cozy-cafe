import Button from './Button';
import { toast } from 'react-toastify';
import interactImg from '../../../assets/interact.svg';
import { useConvex, useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
// import { SignInButton } from '@clerk/clerk-react';
import { ConvexError } from 'convex/values';
import { Id } from '../../../convex/_generated/dataModel';
import { useCallback, useState } from 'react';
import ReactModal from 'react-modal';
import { waitForInput } from '../../hooks/sendInput';
import { useServerGame } from '../../hooks/serverGame';

export default function InteractButton() {
  const [identityModalOpen, setIdentityModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [identityInput, setIdentityInput] = useState('');
  const [planInput, setPlanInput] = useState('');
  // const { isAuthenticated } = useConvexAuth();
  const worldStatus = useQuery(api.world.defaultWorldStatus);
  const worldId = worldStatus?.worldId;
  const game = useServerGame(worldId);
  const humanTokenIdentifier = useQuery(api.world.userStatus, worldId ? { worldId } : 'skip');
  const userPlayerId =
    game && [...game.world.players.values()].find((p) => p.human === humanTokenIdentifier)?.id;
  const join = useMutation(api.world.joinWorld);
  const leave = useMutation(api.world.leaveWorld);
  const isPlaying = !!userPlayerId;

  const convex = useConvex();
  const joinInput = useCallback(
    async (worldId: Id<'worlds'>, userName: string, userIdentity: string, userPlan: string) => {
      let inputId;
      try {
        inputId = await join({ worldId, userName, userIdentity, userPlan });
      } catch (e: any) {
        if (e instanceof ConvexError) {
          toast.error(e.data);
          return;
        }
        throw e;
      }
      try {
        await waitForInput(convex, inputId);
      } catch (e: any) {
        toast.error(e.message);
      }
    },
    [convex],
  );

  const handleIdentitySubmit = () => {
    if (identityInput.trim()) {
      setIdentityModalOpen(false);
      setPlanModalOpen(true);
    }
  };

  const handlePlanSubmit = () => {
    if (planInput.trim()) {
      setPlanModalOpen(false);
      if (worldId) {
        joinInput(worldId, 'Me', identityInput, planInput);
      }
      setIdentityInput('');
      setPlanInput('');
    }
  };

  const joinOrLeaveGame = () => {
    if (
      !worldId ||
      // || !isAuthenticated
      game === undefined
    ) {
      return;
    }
    if (isPlaying) {
      console.log(`Leaving game for player ${userPlayerId}`);
      void leave({ worldId });
    } else {
      setIdentityModalOpen(true);
    }
  };
  // if (!isAuthenticated || game === undefined) {
  //   return (
  //     <SignInButton>
  //       <Button imgUrl={interactImg}>Interact</Button>
  //     </SignInButton>
  //   );
  // }
  return (
    <>
      <Button imgUrl={interactImg} onClick={joinOrLeaveGame}>
        {isPlaying ? 'Leave' : 'Create Agent'}
      </Button>

      <ReactModal
        isOpen={identityModalOpen}
        onRequestClose={() => setIdentityModalOpen(false)}
        style={modalStyles}
        contentLabel="Identity modal"
        ariaHideApp={false}
      >
        <div className="font-body">
          <h2 className="text-4xl mb-4">Describe your agent</h2>
          <input
            type="text"
            className="w-full p-2 mb-4 bg-clay-700 text-white"
            placeholder="Who is this character?"
            value={identityInput}
            onChange={(e) => setIdentityInput(e.target.value)}
          />
          <div className="flex gap-4 justify-end">
            <button className="button" onClick={() => setIdentityModalOpen(false)}>Cancel</button>
            <button className="button bg-clay-700" onClick={handleIdentitySubmit}>Next</button>
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={planModalOpen}
        onRequestClose={() => setPlanModalOpen(false)}
        style={modalStyles}
        contentLabel="Plan modal"
        ariaHideApp={false}
      >
        <div className="font-body">
          <h2 className="text-4xl mb-4">Set agent goals</h2>
          <input
            type="text"
            className="w-full p-2 mb-4 bg-clay-700 text-white"
            placeholder="What should they try to achieve?"
            value={planInput}
            onChange={(e) => setPlanInput(e.target.value)}
          />
          <div className="flex gap-4 justify-end">
            <button className="button" onClick={() => setPlanModalOpen(false)}>Back</button>
            <button className="button bg-clay-700" onClick={handlePlanSubmit}>Create</button>
          </div>
        </div>
      </ReactModal>
    </>
  );
}

const modalStyles = {
  overlay: {
    backgroundColor: 'rgb(0, 0, 0, 75%)',
    zIndex: 12,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '50%',
    border: '10px solid rgb(23, 20, 33)',
    borderRadius: '0',
    background: 'rgb(35, 38, 58)',
    color: 'white',
    fontFamily: '"Upheaval Pro", "sans-serif"',
  },
};
