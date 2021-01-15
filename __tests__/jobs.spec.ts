import { createMocks } from "node-mocks-http";
import handleJobs from "../pages/api/jobs";
import jobs from "../data/jobs.json";
import { Job } from "../contracts/data";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const getRandomJob = () => jobs[getRandomInt(0, jobs.length)];

describe("/api/jobs", () => {
  test("jobs api works", async () => {
    const { req, res } = createMocks({
      method: "GET"
    });

    await handleJobs(req, res);

    expect(res._getStatusCode()).toBe(200);
  });

  describe("search jobs api works", () => {
    var randomJob: Job;

    async function searchApi(search: string): Promise<Job[]> {
      const { req, res } = createMocks({
        method: "GET",
        query: { search }
      });

      await handleJobs(req, res);

      expect(res._getStatusCode()).toBe(200);

      return Object.values(JSON.parse(res._getData()));
    }

    for (const property of ["name", "job_title"]) {
      randomJob = getRandomJob();
      test(`searches by ${property}`, async () => {
        const randomSubString = randomJob[property].substr(
          0,
          getRandomInt(0, randomJob[property].length)
        );

        const data = await searchApi(randomSubString);

        const allMatches = data.map((dataJob) => dataJob[property]);

        expect(allMatches).toEqual(
          expect.arrayContaining([expect.stringMatching(randomSubString)])
        );
      });
    }

    for (const property of [
      "name",
      "job_type",
      "work_schedule",
      "state",
      "type",
      "address",
      "experience",
      "city",
      "description",
      "county"
    ]) {
      randomJob = getRandomJob();
      const randomItem =
        randomJob.items[getRandomInt(0, randomJob.items.length)];

      test(`searches by item ${property}`, async () => {
        const randomSubString = randomItem[property].substr(
          0,
          getRandomInt(0, randomItem[property].length)
        );

        const data = await searchApi(randomSubString);

        const allMatches = data.reduce(
          (all, job) => all.concat(job.items.map((item) => item[property])),
          []
        );

        expect(allMatches).toEqual(
          expect.arrayContaining([expect.stringMatching(randomSubString)])
        );
      });
    }

    for (const property of [
      "required_skills",
      "required_credentials",
      "department"
    ]) {
      randomJob = getRandomJob();
      const randomItem =
        randomJob.items[getRandomInt(0, randomJob.items.length)];

      test(`searches by ${property}`, async () => {
        const randomString =
          randomItem[property][getRandomInt(0, randomItem[property].length)];

        const randomSubString = randomString.substr(
          0,
          getRandomInt(0, randomString.length)
        );

        const data = await searchApi(randomSubString);

        const allMatches = data.reduce(
          (all, job) =>
            all.concat(
              job.items.reduce(
                (allItems, item) => allItems.concat(item[property]),
                []
              )
            ),
          []
        );

        expect(allMatches).toEqual(
          expect.arrayContaining([expect.stringMatching(randomSubString)])
        );
      });
    }
  });

  test("sort jobs api works", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        sortBy: ["location", "role", "department", "education", "experience"],
        sortOrder: ["asc", "des", "desc", "asc", "desc"]
      }
    });

    await handleJobs(req, res);

    expect(res._getStatusCode()).toBe(200);
  });
});
