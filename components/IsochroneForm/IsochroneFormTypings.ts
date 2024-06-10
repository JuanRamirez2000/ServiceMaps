import { z } from "zod";

const COMMUTING_MODES = ["driving", "driving-traffic", "walking", "cycling"];
type COMMUTING_MODES_TYPES =
  | "driving"
  | "driving-traffic"
  | "walking"
  | "cycling";

type FindIsochroneStatus = {
  status: "Error" | "Success";
  message: string;
  data: any;
};

const formSchema = z.object({
  location: z.number(),
  commutingMode: z.string(),
  firstCutoff: z.number().nullable(),
  secondCutoff: z.number().nullable(),
  thirdCutoff: z.number().nullable(),
  fourthCutoff: z.number().nullable(),
});

export { COMMUTING_MODES, formSchema };
export type { COMMUTING_MODES_TYPES, FindIsochroneStatus };
