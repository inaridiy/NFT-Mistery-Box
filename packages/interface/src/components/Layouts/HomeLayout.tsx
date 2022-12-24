import { ThemeBox } from "../Elements";

export const HomeLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeBox className="min-h-[100dvh] bg-base-100 flex flex-col max-w-screen-lg mx-auto">
      {children}
    </ThemeBox>
  );
};
