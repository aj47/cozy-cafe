import Game from './components/Game.tsx';

import { ToastContainer } from 'react-toastify';
import starImg from '../assets/star.svg';
import helpImg from '../assets/help.svg';
// import { UserButton } from '@clerk/clerk-react';
// import LoginButton from './components/buttons/LoginButton.tsx';
import { useState } from 'react';
import ReactModal from 'react-modal';
import MusicButton from './components/buttons/MusicButton.tsx';
import Button from './components/buttons/Button.tsx';
import InteractButton from './components/buttons/InteractButton.tsx';
import FreezeButton from './components/FreezeButton.tsx';
import CharactersView from './components/CharactersView';
import { MAX_HUMAN_PLAYERS } from '../convex/constants.ts';

export default function Home() {
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [charactersModalOpen, setCharactersModalOpen] = useState(false);
  return (
    <main className="relative flex h-screen flex-col items-center justify-between font-body game-background">
      <ReactModal
        isOpen={helpModalOpen}
        onRequestClose={() => setHelpModalOpen(false)}
        style={modalStyles}
        contentLabel="Help modal"
        ariaHideApp={false}
      >
        <div className="font-body">
          <h1 className="text-center text-6xl font-bold font-display game-title">Help</h1>
          <p>
            Welcome to Cozy Cafe. Cozy Cafe supports both anonymous <i>spectators</i> and logged in{' '}
            <i>interactivity</i>.
          </p>
          <h2 className="text-4xl mt-4">Spectating</h2>
          <p>
            Click and drag to move around the town, and scroll in and out to zoom. You can click on
            an individual character to view its chat history.
          </p>
          <h2 className="text-4xl mt-4">Interactivity</h2>
          <p>
            If you log in, you can join the simulation and directly talk to different agents! After
            logging in, click the "Interact" button, and your character will appear somewhere on the
            map with a highlighted circle underneath you.
          </p>
          <p className="text-2xl mt-2">Controls:</p>
          <p className="mt-4">Click to navigate around.</p>
          <p className="mt-4">
            To talk to an agent, click on them and then click "Start conversation," which will ask
            them to start walking towards you. Once they're nearby, the conversation will start, and
            you can speak to each other. You can leave at any time by closing the conversation pane
            or moving away. They may propose a conversation to you - you'll see a button to accept
            in the messages panel.
          </p>
          <p className="mt-4">
            Cozy Cafe only supports {MAX_HUMAN_PLAYERS} humans at a time. If you're idle for five
            minutes, you'll be automatically removed from the simulation.
          </p>
        </div>
      </ReactModal>
      <ReactModal
        isOpen={charactersModalOpen}
        onRequestClose={() => setCharactersModalOpen(false)}
        style={modalStyles}
        contentLabel="Characters modal"
        ariaHideApp={false}
      >
        <CharactersView />
      </ReactModal>
      {/*<div className="p-3 absolute top-0 right-0 z-10 text-2xl">
        <Authenticated>
          <UserButton afterSignOutUrl="/ai-town" />
        </Authenticated>

        <Unauthenticated>
          <LoginButton />
        </Unauthenticated>
      </div> */}

      <div className="absolute inset-0 flex flex-col z-10">
        <h1 className="mx-auto text-2xl p-3 sm:text-4xl lg:text-5xl font-bold font-display leading-none tracking-wide game-title w-full text-left sm:text-center sm:w-auto">
          Cozy Cafe
        </h1>

        <div className="max-w-xs md:max-w-xl lg:max-w-none mx-auto mb-2 text-center text-base sm:text-xl md:text-2xl text-white leading-tight shadow-solid">
          A virtual cafe where AI characters work and socialize.
          {/* <Unauthenticated>
            <div className="my-1.5 sm:my-0" />
            Log in to join the town
            <br className="block sm:hidden" /> and the conversation!
          </Unauthenticated> */}
        </div>

        <div className="flex-grow relative">
          <Game />
          <footer className="absolute justify-end bottom-0 left-0 w-full flex items-center gap-3 p-6 flex-wrap pointer-events-none">
            <div className="flex gap-4 flex-grow pointer-events-none">
              <FreezeButton />
              <MusicButton />
              <Button onClick={() => setCharactersModalOpen(true)} imgUrl={starImg}>
                Characters
              </Button>
              <Button href="https://github.com/a16z-infra/cozy-cafe" imgUrl={starImg}>
                Star
              </Button>
              <InteractButton />
              <Button imgUrl={helpImg} onClick={() => setHelpModalOpen(true)}>
                Help
              </Button>
            </div>
          </footer>
          <ToastContainer position="bottom-right" autoClose={2000} closeOnClick theme="dark" />
        </div>
      </div>
    </main>
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
