"use server";

type COMMUTING_MODES_TYPES =
  | "driving"
  | "driving-traffic"
  | "walking"
  | "cycling";
type ISOCHRONE_PARAMETERS = {};

const COMMUTING_MODES = ["driving", "driving-traffic", "walking", "cycling"];
const MAPBOX_ISOCHRONE_URL_BASE = "https://api.mapbox.com/isochrone/v1/mapbox/";
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

const POLYGONS_BOOLEAN = "true";
const DENOISE_FACTOR = "0.1";

const profile: COMMUTING_MODES_TYPES = "driving-traffic";
const coordinates = [-117.86763, 33.748875].toString();

const findIsochrone = async ({}: ISOCHRONE_PARAMETERS) => {
  try {
    const params = new URLSearchParams({
      contours_minutes: "15,30,45,60",
      polygons: POLYGONS_BOOLEAN,
      denoise: DENOISE_FACTOR,
      access_token: MAPBOX_ACCESS_TOKEN,
    }).toString();

    const isochroneRes = await fetch(
      MAPBOX_ISOCHRONE_URL_BASE + `${profile}/${coordinates}?${params}`
    );

    if (!isochroneRes.ok) {
      throw new Error("Isochrones Failed");
    }

    console.log("test");
    return await isochroneRes.json();
  } catch (err) {
    console.error(err);
  }
};

export { findIsochrone };
//export type { COMMUTING_MODES_TYPES };
