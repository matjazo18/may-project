import { notFound } from "next/navigation";
import Image from "next/image";
import icon from "@/public/icon.png";
import { Progress } from "@radix-ui/react-progress";
import ProgresBar from "@/components/ProgresBar";

export default async function SharedPage({ searchParams }) {
  const { activity, time, from, to } = await searchParams;

  if (!activity || !time || !from || !to) {
    return notFound();
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);
  const days = toDate - fromDate;
  const finalDays = days / (1000 * 60 * 60 * 24);
  console.log(finalDays);

  if (isNaN(fromDate) || isNaN(toDate)) {
    return notFound();
  }

  return (
    <div className="p-4 border py-8 xl:py-14 rounded-lg shadow-sm mb-6 max-w-[600px] mx-auto">
      <div className="flex flex-col xl:flex-row justify-evenly items-center gap-6 ">
        {/* LEFT COLUMN */}
        <div className="flex flex-col space-y-4 text-left order-2 xl:order-1">
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
        <div className="flex flex-col items-center justify-center text-center space-y-4 order-1 xl:order-2">
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
      <div className="flex flex-col justify-center items-center mt-10">
        <span className="">Progress bar</span>
        <span className="mb-2">Day 1 of {finalDays} Days</span>
        <div className="flex gap-6 items-center">
          <ProgresBar finalDays={finalDays} />

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`size-10 ${final}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
