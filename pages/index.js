const Home = () => {
  return <div>redirect...</div>;
};

export const getServerSideProps = async ({ req, res }) => {
  res.statusCode = 302;
  res.setHeader("Location", `/kiosk`);
  return { props: {} };
};

export default Home;
