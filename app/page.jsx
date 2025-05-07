import Koledar from "@/components/Koledar";
import DrawerDemo from "@/components/SelectTarget";
import SelectDemo from "@/components/Select";
import All from "@/components/All";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="">
        <All />
        <LoginButton />
      </div>
    </div>
  );
}
