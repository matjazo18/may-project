import Koledar from "@/components/Koledar";
import DrawerDemo from "@/components/SelectTarget";
import SelectDemo from "@/components/Select";
import All from "@/components/All";
import LoginButton from "@/components/LoginButton";
import NameField from "@/components/NameField";

//MAIN PAGE
//dont want to lose my streak
export default function Home() {
  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="">
          <All />
        </div>
      </div>
      <footer className="footer text-center bg-gradient-to-br from-[#e926e9] to-orange-400 text-slate-100 py-2">
        © 2025 matjazo. All rights reserved.
      </footer>
    </>
  );
}
