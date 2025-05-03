import Koledar from "@/components/Koledar";
import DrawerDemo from "@/components/SelectTarget";
import { SelectDemo } from "@/components/Select";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="text-black text-xl flex justify-center ">
        <div>
          <Koledar />
        </div>
        <div className="flex flex-col xl:flex-row justify-between xl:gap-6 items-right mt-10 relative">
          <div>
            <SelectDemo />
          </div>
          <div>
            <DrawerDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
