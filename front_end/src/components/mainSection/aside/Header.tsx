import Profile from "@/components/shared/Profile";
import { ModeToggle } from "../../ui/mode-toggle";
export default function Header() {
  return (
    <header className="w-full flex flex-col p-2 gap-2">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-xl">
          Chat <span className="text-primary">Mingle</span>
        </h1>
        <div className="flex items-center gap-5">
          <Profile />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
