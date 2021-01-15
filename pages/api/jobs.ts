// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import jobs from "../../data/jobs.json";
import JobFilters from "../../services/JobFilters";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  // @todo: implement filters and search
  // @todo: implement automated tests
  const {
    search,
    "sortBy[]": sortBy,
    "sortOrder[]": sortOrder
  } = request.query;
  const filter = new JobFilters(jobs);
  if (typeof search == "string") filter.search(search);

  if (typeof sortBy !== "string" && typeof sortOrder !== "string")
    for (const index in sortBy) filter.sort(sortBy[index], sortOrder[index]);

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order

  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));

  response.status(200).json(filter.jobs);
};
