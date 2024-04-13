import { load } from "cheerio";
import { LambdaError, wrapWithErrorHandling } from "../libs/errorHandling";
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler((event) =>
  wrapWithErrorHandling(async () => {
    const profile = event.queryStringParameters?.profile;

    if (!profile) {
      throw new LambdaError({
        message: "Profile not found",
        statusCode: 404,
      });
    }

    const url = `https://www.freeindex.co.uk/${profile}`;

    const response = await fetch(url);
    const data = await response.text();

    const $ = load(data);
    const reviewsText = $("h2#reviewsTop").text();

    console.log({ reviewsText });

    if (!reviewsText) {
      throw new LambdaError({
        message: "Could not find reviews",
        statusCode: 404,
      });
    }

    const numberOfReviews =
      reviewsText.split(" ")[0]?.replaceAll(",", "") ?? null;

    if (numberOfReviews === null) {
      throw new LambdaError({
        message: "Could not find number of reviews",
        statusCode: 404,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        numberOfReviews,
      }),
    };
  }),
);
