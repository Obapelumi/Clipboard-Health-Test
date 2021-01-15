import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useState } from "react";
import { JobItem } from "../../contracts/data";

export default function JobItemComponent(props: { item: JobItem }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [itemDetails] = useState([
    { title: "Department", data: props.item.department.join(", ") },
    {
      title: "Hours/Shift",
      data: `${props.item.hours.map(
        (hour) => ` ${hour} hour${hour > 1 ? "s" : ""}`
      )} / ${props.item.work_schedule}`
    },
    { title: "Summary", data: props.item.description }
  ]);

  return (
    <div>
      <button
        className="border-t w-full flex flex-col md:flex-row md:justify-between md:items-center py-3"
        onClick={() => setDetailsOpen(!detailsOpen)}
      >
        <div className="flex flex-col items-start">
          <span className="font-semibold">{props.item.job_title}</span>
          <span className="text-sm">
            {props.item.job_type} |{" "}
            {props.item.salary_range.map(
              (range, index) => `${index > 0 ? " - " : ""}$${range}`
            )}{" "}
            an hour | {props.item.city}
          </span>
        </div>
        <span className="text-xs font-semibold">
          {dayjs(props.item.created).fromNow()}
        </span>
      </button>

      {!detailsOpen ? null : (
        <div className="my-3 flex flex-col lg:flex-row justify-between lg:items-center">
          <table className="font-bold max-w-2xl 2xl:max-w-5xl mb-4">
            <tbody>
              {itemDetails.map((detail) => (
                <tr>
                  <td className="w-full lg:w-1/2">
                    <span className="font-semibold block">{detail.title}</span>{" "}
                    <span className="font-normal text-sm lg:hidden">{detail.data}</span>
                  </td>
                  <td className="w-1/2 font-normal text-sm hidden lg:table-cell">
                    {detail.data}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex lg:flex-col items-center lg:space-y-2">
            <button className="bg-blue-400 border p-2 rounded-lg text-sm text-white w-24">
              Job Details
            </button>
            <button className="border-blue-400 border p-2 rounded-lg text-sm text-blue-400 ml-2 w-24">
              Show Job
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
