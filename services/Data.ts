import axios, { AxiosInstance } from "axios";
import { Filters, Job } from "../contracts/data";

export default class Data {
  public $axios: AxiosInstance;
  constructor() {
    this.$axios = axios.create({ baseURL: "/api" });
  }

  async getFilters(): Promise<Filters> {
    const response = await this.$axios.get("filters");

    return response.data;
  }

  async getJobs(params?: {
    search?: string;
    sortBy?: string[];
    sortOrder?: string[];
  }): Promise<Job[]> {
    const response = await this.$axios.get("jobs", { params });

    return response.data;
  }
}
