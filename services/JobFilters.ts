import { Job } from "../contracts/data";

export default class JobFilters {
  constructor(public jobs: Job[]) {}

  search(query: string) {
    query = query.toLowerCase().trim();

    this.jobs = this.jobs.filter((job) => {
      for (const property of [job.name, job.job_title]) {
        if (property.toLowerCase().match(query)) return true;
      }

      for (const item of job.items) {
        for (const property of [
          item.name,
          item.job_type,
          item.work_schedule,
          item.state,
          item.type,
          item.address,
          item.experience,
          item.city,
          item.description,
          item.county
        ]) {
          if (property.toLowerCase().match(query)) return true;
        }

        for (const skill of item.required_skills) {
          if (skill.toLowerCase().match(query)) return true;
        }

        for (const credential of item.required_credentials) {
          if (credential.toLowerCase().match(query)) return true;
        }

        for (const department of item.department) {
          if (department.toLowerCase().match(query)) return true;
        }
      }

      return false;
    });

    return this.jobs;
  }

  sort(sortBy, sortOrder) {
    const sorterMap = {
      location: () => this.sortByItemString(sortOrder, "city"),
      role: () => this.sortByItemString(sortOrder, "job_title"),
      department: () => this.sortByItemArray(sortOrder, "department"),
      education: () => this.sortByItemArray(sortOrder, "required_credentials"),
      experience: () => this.sortByItemString(sortOrder, "experience")
    };

    return sorterMap[sortBy]();
  }

  sortByItemArray(
    order: "asc" | "desc",
    property: "required_skills" | "department" | "required_credentials"
  ) {
    this.jobs = this.jobs.sort((a, b) => {
      a.items.sort((aA, aB) => {
        aA[property].sort((aAA, aAB) =>
          order == "asc" ? aAA.localeCompare(aAB) : aAB.localeCompare(aAA)
        );
        aB[property].sort((aBA, aBB) =>
          order == "asc" ? aBA.localeCompare(aBB) : aBB.localeCompare(aBA)
        );
        return order == "asc"
          ? aA[property][0].localeCompare(aB[property][0])
          : aB[property][0].localeCompare(aA[property][0]);
      });

      b.items.sort((bA, bB) => {
        bA[property].sort((bAA, aAB) =>
          order == "asc" ? bAA.localeCompare(aAB) : aAB.localeCompare(bAA)
        );
        bB[property].sort((aBA, aBB) =>
          order == "asc" ? aBA.localeCompare(aBB) : aBB.localeCompare(aBA)
        );
        return order == "asc"
          ? bA[property][0].localeCompare(bB[property][0])
          : bB[property][0].localeCompare(bA[property][0]);
      });

      return order == "asc"
        ? a.items[0][property][0].localeCompare(b.items[0][property][0])
        : b.items[0][property][0].localeCompare(a.items[0][property][0]);
    });

    return this.jobs;
  }

  sortByItemString(order: "asc" | "desc", property: string) {
    this.jobs = this.jobs.sort((a, b) => {
      a.items.sort((aA, aB) =>
        order == "asc"
          ? aA[property].localeCompare(aB[property])
          : aB[property].localeCompare(aA[property])
      );
      b.items.sort((bA, bB) =>
        order == "asc"
          ? bA[property].localeCompare(bB[property])
          : bB[property].localeCompare(bA[property])
      );

      return order == "asc"
        ? a.items[0][property].localeCompare(b.items[0][property])
        : b.items[0][property].localeCompare(a.items[0][property]);
    });

    return this.jobs;
  }
}
