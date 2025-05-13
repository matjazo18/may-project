"use client";
import Image from "next/image";
import icon from "@/public/icon.png";
import motion from "framer-motion";

export default function Header() {
  return (
    <header className="container mx-auto py-6 px-4">
      {" "}
      {/* Added px-4 for mobile padding */}
      <motion.div
        className="flex flex-col items-center justify-center gap-2 mb-10"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        {/* Medal icon with adjusted positioning */}
        <motion.div>
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
        </motion.div>

        {/* Text container with proper line-height */}
        <div className="text-center">
          <h3 className="text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 pb-2 xl:pt-2 bg-clip-text text-transparent leading-tight flex flex-col">
            {" "}
            {/* Added leading-tight */}
            <span>
              Challenge Yourself
              <span className="text-yellow-500 text-6xl">.</span>
            </span>
            {/* Wrapped g in span */}
          </h3>
        </div>

        {/* Decorative elements */}
        <div className="flex items-center gap-4 ">
          {" "}
          {/* Increased mt-3 */}
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300"></div>
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Earn Your Medal
          </span>{" "}
          {/* Smaller text */}
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300"></div>
        </div>
      </motion.div>
    </header>
  );
}
