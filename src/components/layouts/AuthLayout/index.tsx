type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="dark grid h-screen place-items-center">{children}</main>
  );
};

export default AuthLayout;
