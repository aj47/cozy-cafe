import { useCallback } from 'react';
import { useMutation, useQuery, useConvex } from 'convex/react';
import { toast } from 'react-toastify';
import { api } from '../../convex/_generated/api';
import { ConvexError } from 'convex/values';
import { waitForInput } from './sendInput';
import { useServerGame } from './serverGame';

export function useJoinOrLeaveGame() {
  const worldStatus = useQuery(api.world.defaultWorldStatus);
  const worldId = worldStatus?.worldId;
  const game = useServerGame(worldId);
  const humanTokenIdentifier = useQuery(api.world.userStatus, worldId ? { worldId } : 'skip');
  const userPlayerId = game && [...game.world.players.values()].find(p => p.human === humanTokenIdentifier)?.id;

  const join = useMutation(api.world.joinWorld);
  const leave = useMutation(api.world.leaveWorld);
  const convex = useConvex();

  const joinOrLeaveGame = useCallback(() => {
    if (!worldId || !game) {
      return;
    }
    if (userPlayerId) {
      console.log(`Leaving game for player ${userPlayerId}`);
      void leave({ worldId });
    } else {
      console.log(`Joining game`);
      (async () => {
        let inputId;
        try {
          inputId = await join({ worldId });
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
      })();
    }
  }, [worldId, game, userPlayerId, join, leave, convex]);

  return { joinOrLeaveGame, isPlaying: !!userPlayerId };
}
