import { SSTConfig } from "sst";
import { API } from "./stacks/stack";

export default {
  config(_input) {
    return {
      name: "free-index-scraper",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
