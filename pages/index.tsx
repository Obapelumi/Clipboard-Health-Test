import debounce from "debounce";
import { useEffect, useState } from "react";
import Pulse from "../components/ui/pulse";
import Icon from "../components/ui/icon";
import JobComponent from "../components/job/job";
import { Filters, Job } from "../contracts/data";
import Default from "../layouts/default";
import Data from "../services/Data";
import Filter from "../components/filter/filter";

export default function HomePage() {
  //interfaces
  interface SortState {
    key: string;
    asc: Boolean;
  }

  // state
  const [filters, setFilters] = useState<Filters>();
  const [jobs, setJobs] = useState<Job[]>();
  const [jobsLoading, setJobsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKeys] = useState([
    "Location",
    "Role",
    "Department",
    "Education",
    "Experience"
  ]);
  const [sorts, setSorts] = useState<SortState[]>([]);

  // methods
  const findSort = (key: string) =>
    sorts.find((s) => s.key == key.toLowerCase());

  const getFilters = async () => setFilters(await new Data().getFilters());

  const getJobs = async (params?) => {
    setJobsLoading(true);
    try {
      setJobs(await new Data().getJobs(params));
      setJobsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchInput = debounce((e) => {
    getJobs({ search: e.target.value });
    setSearch(e.target.value);
  }, 500);

  const sort = (key: string) => {
    key = key.toLowerCase();
    var newSort = true;
    for (const sort of sorts) {
      if (sort.key == key) {
        sort.asc = !sort.asc;
        newSort = false;
        break;
      }
    }
    const newSorts = [...sorts, { key, asc: true }];
    if (newSort) setSorts(newSorts);

    getJobs({
      search,
      sortBy: newSorts.map((sort) => sort.key),
      sortOrder: newSorts.map((sort) => (sort.asc ? "asc" : "desc"))
    });
  };

  const jobPostingsCount = (jobs: Job[]) =>
    !jobs ? 0 : jobs.reduce((total, job) => total + job.items.length, 0);

  // watchers
  useEffect(() => {
    getFilters();
    getJobs();
  }, []);

  return (
    <div className="py-4 md:px-2 sm:px-4">
      <div className="w-full bg-white flex items-center text-gray-600 h-12 fixed">
        <Icon name="search" className="mx-2 md:mx-4" />
        <input
          type="text"
          placeholder="Search for any job, title, key words, or company"
          className="w-full p-3 text-gray-500 focus:outline-none"
          onInput={(e) => onSearchInput(e)}
        />
      </div>

      <div className="mt-12 flex">
        <div className="lg:w-64 fixed hidden lg:flex flex-col h-after-search overflow-y-auto px-1 mt-4">
          {!filters ? (
            <div className="bg-white border p-4 max-w-sm w-full mx-auto">
              <Pulse />
              <Pulse />
              <Pulse />
            </div>
          ) : (
            Object.keys(filters).map((key) => (
              <Filter key={key} title={key} data={filters[key]} />
            ))
          )}
        </div>

        <div className="lg:ml-64 w-full mt-4">
          <div className="bg-white min-h-96 py-5 md:ml-4">
            <div className="flex justify-between mx-3">
              <div className="text-sm">
                <span className="font-semibold">
                  {Intl.NumberFormat().format(jobPostingsCount(jobs))}
                </span>
                <span className="ml-2">job postings</span>
              </div>
              <div className="hidden md:flex space-x-3 text-sm">
                <span className="text-gray-500">Sort by</span>
                {sortKeys.map((key) => (
                  <button
                    className="font-semibold flex items-center focus:outline-none"
                    key={key}
                    onClick={() => sort(key)}
                  >
                    {key}{" "}
                    {!findSort(key) ? (
                      ""
                    ) : (
                      <Icon
                        name={findSort(key).asc ? "arrow-up" : "arrow-down"}
                        className="ml-1 h-4 text-gray-600"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mx-4 mt-8">
              {jobsLoading ? (
                <div className="lg:w-3/5">
                  <Pulse />
                  <Pulse />
                  <Pulse />
                </div>
              ) : jobs.length < 1 ? (
                <h3 className="font-bold text-lg">No job postings</h3>
              ) : (
                jobs.map((job) => <JobComponent key={job.name} job={job} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HomePage.layout = Default;
HomePage.meta = { title: "Clipboard Health Test" };
