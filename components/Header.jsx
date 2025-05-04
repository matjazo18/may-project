import Image from "next/image";
import icon from "@/public/icon.png";
export default function Header() {
  return (
    <header className="container mx-auto py-6 px-4">
      {" "}
      {/* Added px-4 for mobile padding */}
      <div className="flex flex-col items-center justify-center gap-2">
        {/* Medal icon with adjusted positioning */}
        <div className="relative animate-float mb-2">
          {" "}
          {/* Added mb-2 for spacing */}
          <Image
            src={icon}
            width={80}
            height={80}
            className="drop-shadow-lg hover:scale-110 transition-transform duration-300"
            alt="Achievement medal"
            priority // Ensures image loads quickly
          />
        </div>

        {/* Text container with proper line-height */}
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
            {" "}
            {/* Added leading-tight */}
            Challen<span className="relative text-gray-700">g</span>e Yourself{" "}
            {/* Wrapped g in span */}
            <span className="text-yellow-500">.</span>
          </h3>
        </div>

        {/* Decorative elements */}
        <div className="flex items-center gap-4 mt-3">
          {" "}
          {/* Increased mt-3 */}
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300"></div>
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Earn Your Medal
          </span>{" "}
          {/* Smaller text */}
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300"></div>
        </div>
      </div>
    </header>
  );
}
