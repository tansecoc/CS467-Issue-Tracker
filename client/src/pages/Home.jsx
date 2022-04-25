import Hero from '../components/Hero';
import NavLoggedOut from '../components/NavLoggedOut';

let Home = () => {
  return (
    <>
      <NavLoggedOut />
      <Hero />
    </>
  );
}

export default Home;