import InviteCodeDetails from './InviteCodeDetails';

export function InviteCodeModal({ closeModalHandler }) {
  return (
    <div onClick={closeModalHandler} style={{position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(203, 213, 224, 0.3)'}}>
      <InviteCodeDetails closeModalHandler={closeModalHandler} />
    </div>
  );
}