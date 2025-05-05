import { notFound } from "next/navigation";
import Image from "next/image";
import icon from "@/public/icon.png";

export default function SharedPage({ searchParams }) {
  const { activity, time, from, to } = searchParams;

  if (!activity || !time || !from || !to) {
    return notFound();
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (isNaN(fromDate) || isNaN(toDate)) {
    return notFound();
  }

  return (
    <div className="p-4 border py-8 xl:py-14 rounded-lg shadow-sm mb-6 max-w-[600px] mx-auto">
      <div className="flex flex-col xl:flex-row justify-evenly items-center gap-6">
        {/* LEFT COLUMN */}
        <div className="flex flex-col space-y-4 text-left">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-bold">Commitment</h3>
          </div>

          <div>
            <p className="text-sm text-gray-600">I will do:</p>
            <p className="text-base font-medium">{activity}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">For:</p>
            <p className="text-base font-medium">{time} mins daily</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Date range:</p>
            <div className="flex gap-4">
              <div>
                <p className="text-xs text-gray-500">From</p>
                <p className="text-sm font-medium">
                  {fromDate ? fromDate.toLocaleDateString() : "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">To</p>
                <p className="text-sm font-medium">
                  {toDate ? toDate.toLocaleDateString() : "-"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Stakes:</p>
            <p className="text-sm">
              If I miss a day, I owe you <span className="font-bold">$5</span>
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h3 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
            <div className="flex flex-col">
              <span className="text-gray-500">Challenge</span>
              <span className="text-gray-500">
                Yourself<span className="text-yellow-500">.</span>
              </span>
            </div>
          </h3>

          <Image src={icon} width={100} height={100} alt="Challenge Icon" />
        </div>
      </div>
    </div>
  );
}
