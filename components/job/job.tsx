import { useState } from "react";
import { Job } from "../../contracts/data";
import JobItemComponent from "./job-item";

export default function JobComponent(props: { job: Job }) {
  const [itemsOpen, setItemsOpen] = useState(false);

  return (
    <div className="mb-3">
      <button
        className="flex w-full items-center focus:outline-none"
        onClick={() => setItemsOpen(!itemsOpen)}
      >
        <div className="bg-gray-400 text-white rounded-md py-1 w-10">
          <span className="text-2xl font-bold uppercase">{props.job.name.substring(0, 2)}</span>
        </div>
        <span className="ml-5 font-semibold text-left">
          {props.job.total_jobs_in_hospital} jobs for {props.job.name}
        </span>
      </button>

      {!itemsOpen ? null : (
        <div className="mt-3">
          {props.job.items.map((item) => (
            <JobItemComponent item={item} key={item.job_id} />
          ))}
        </div>
      )}
    </div>
  );
}
