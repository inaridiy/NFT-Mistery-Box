import { ThemeBox } from "../Elements";

export const HomeLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className=" overflow-hidden">
      <ThemeBox className="min-h-[100dvh] bg-base-100 flex flex-col">
        {children}
      </ThemeBox>
    </div>
  );
};
