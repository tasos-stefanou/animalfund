const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full flex justify-center items-center bg-primary'>
      {children}
    </div>
  );
};

export default AuthLayout;
