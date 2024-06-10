"use server";

import {
  FindIsochroneStatus,
  formSchema,
} from "@/components/IsochroneForm/IsochroneFormTypings";
import { z } from "zod";

const MAPBOX_ISOCHRONE_URL_BASE = "https://api.mapbox.com/isochrone/v1/mapbox/";
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

const POLYGONS_BOOLEAN = "true";
const DENOISE_FACTOR = "0.1";

const coordinates = [-117.86763, 33.748875].toString();

const findIsochrone = async (
  params: z.infer<typeof formSchema>
): Promise<FindIsochroneStatus> => {
  const validatedFields = formSchema.safeParse(params);
  if (!validatedFields.success) {
    return {
      status: "Error",
      message: "Failed validating fields",
      data: null,
    };
  }
  try {
    const params = new URLSearchParams({
      contours_minutes: "15,30,45,60",
      polygons: POLYGONS_BOOLEAN,
      denoise: DENOISE_FACTOR,
      access_token: MAPBOX_ACCESS_TOKEN,
    }).toString();

    const isochroneRes = await fetch(
      MAPBOX_ISOCHRONE_URL_BASE +
        `${validatedFields.data.commutingMode}/${coordinates}?${params}`
    );

    if (!isochroneRes.ok) {
      throw new Error("Isochrones Failed");
    }

    return {
      status: "Success",
      message: "Isochrones found",
      data: await isochroneRes.json(),
    };
  } catch (err) {
    console.error(err);
    return {
      status: "Error",
      message: "Error finding isochrones",
      data: null,
    };
  }
};

export { findIsochrone };
//export type { COMMUTING_MODES_TYPES };
