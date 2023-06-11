const LoginSubmitted = ({ submitted }) => {
  return (
    <div className='space-y-4'>
      <h1 className='text-6xl font-bold'>Link sent</h1>
      <p className='text-lg'>
        Check your email ({submitted}) to finish logging in.
      </p>
    </div>
  );
};

export default LoginSubmitted;
