export const Header: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <header className="flex justify-between p-2 bg-base-100 items-center w-full max-w-screen-lg mx-auto">
      <div className="text-3xl font-bold"> {title}</div>
      {children}
    </header>
  );
};
