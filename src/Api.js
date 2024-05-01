import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://job-board-backend-654d65b9a6e8.herokuapp.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class Api {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${Api.token}` };
    const params = method === "get" ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async searchCompany(nameLike) {
    let res = await this.request(`companies?name=${nameLike}`);
    return res;
  }

  static async getAllCompanies() {
    let res = await this.request("companies");
    return res.companies;
  }

  static async getAllJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  static async logIn(formData) {
    let res = await this.request("auth/token", formData, "post");
    this.token = res.token;
    return res.token;
  }

  static async registerUser(formData) {
    let res = await this.request("auth/register", formData, "post");
    this.token = res.token;
    return res.token;
  }

  static async getUser(token) {
    if (token === "") return {};
    const decode = jwt_decode(token);
    const { user } = await this.request(`users/${decode.username}`);

    return user;
  }

  static async updateUser(formData) {
    const { username } = jwt_decode(this.token);
    const { user } = await this.request(`users/${username}`, formData, "patch");
    return user;
  }

  static async applyForJob(username, jobId) {
    console.log("here");
    const res = await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      "post"
    );
    return res;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default Api;
