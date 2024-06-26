{
  /* 
"use client";
import SideNav from "./SideNav";

import {
  Label,
  Input,
  Field,
  Fieldset,
  RadioGroup,
  Radio,
  Button,
  Legend,
} from "@headlessui/react";
import { useRef, useState } from "react";

import Map, {
  FullscreenControl,
  GeolocateControl,
  MapRef,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import DeckGLOverlay from "@/components/DeckGLOverlay";
import { GeoJsonLayer } from "deck.gl";
import { Controller, Resolver, useForm } from "react-hook-form";
import {
  COMMUTING_MODES,
  formSchema,
} from "@/components/IsochroneForm/IsochroneFormTypings";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { findIsochrone } from "@/actions/findIsochrones";
import { toast } from "sonner";
import hexRgb from "hex-rgb";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  const mapRef = useRef<MapRef | null>(null);

  const { register, handleSubmit, control } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: 92707,
      commutingMode: "driving-traffic",
      firstCutoff: 15,
      secondCutoff: 30,
      thirdCutoff: 45,
      fourthCutoff: 60,
    },
  });

  const [isochrones, setIsochrones] = useState();

  const handleFindIsochrones = async (data: z.infer<typeof formSchema>) => {
    const retrievedIsochrones = await findIsochrone(data);
    if (retrievedIsochrones.status === "Success") {
      toast.success("Created your distances!");
      setIsochrones(retrievedIsochrones.data.features);
    }
    if (retrievedIsochrones.status === "Error") {
      toast.error("Failed creating distances :(");
    }
  };

  const isochroneLayer = new GeoJsonLayer({
    id: "isochrones",
    data: isochrones as any,
    stroked: true,
    filled: true,
    getFillColor: (d: any) => {
      return hexRgb(d.properties.fillColor, {
        format: "array",
        alpha: 255,
      });
    },
    opacity: 0.15,
    getLineWidth: 20,
  });

  if (!mapRef) return <h1>Loading...</h1>;

  return (
    <main className="relative h-screen w-screen">
      <SideNav>
        <form
          className="h-full space-y-8"
          onSubmit={handleSubmit(handleFindIsochrones)}
        >
          <Field className="flex flex-col gap-1">
            <Label> Location </Label>
            <SearchBox
              accessToken={MAPBOX_ACCESS_TOKEN as string}
              options={{
                proximity: "ip",
              }}
              placeholder="Enter your location"
              map={mapRef.current?.getMap()}
              mapboxgl={mapboxgl}
              marker
            />
          </Field>
          <Controller
            control={control}
            defaultValue="driving-traffic"
            name="commutingMode"
            render={({ field }) => (
              <RadioGroup className="space-y-2" {...field}>
                <Label>Commuting Mode</Label>
                {COMMUTING_MODES.map((mode) => (
                  <Radio
                    value={mode}
                    key={mode}
                    className="group relative flex cursor-pointer rounded-lg bg-slate-500 py-4 px-5 text-slate-50 transition data-[checked]:bg-slate-600 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-slate-50"
                    {...register("commutingMode")}
                  >
                    <div className="flex ">
                      <span>{mode}</span>
                    </div>
                  </Radio>
                ))}
              </RadioGroup>
            )}
          ></Controller>
          <Fieldset className="space-y-2">
            <Legend className="text-sm">
              Cutoff Time (Minutes) <br />
              Max 60 Minutes
            </Legend>
            <Field className="flex flex-row justify-between">
              <Label className="text-lg font-semibold"> First Cutoff </Label>
              <Input
                type="number"
                className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                defaultValue={15}
                {...register("firstCutoff", {
                  min: 0,
                  max: 60,
                  valueAsNumber: true,
                })}
              />
            </Field>
            <Field className="flex flex-row justify-between">
              <Label className="text-lg font-semibold"> Second Cutoff </Label>
              <Input
                type="number"
                className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                defaultValue={30}
                {...register("secondCutoff", {
                  min: 0,
                  max: 60,
                  valueAsNumber: true,
                })}
              />
            </Field>
            <Field className="flex flex-row justify-between">
              <Label className="text-lg font-semibold"> Third Cutoff </Label>
              <Input
                type="number"
                className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                defaultValue={45}
                {...register("thirdCutoff", {
                  min: 0,
                  max: 60,
                  valueAsNumber: true,
                })}
              />
            </Field>
            <Field className="flex flex-row justify-between">
              <Label className="text-lg font-semibold"> Fourth Cutoff </Label>
              <Input
                type="number"
                className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                defaultValue={60}
                {...register("fourthCutoff", {
                  min: 0,
                  max: 60,
                  valueAsNumber: true,
                })}
              />
            </Field>
          </Fieldset>
          <Button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-slate-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-slate-600 data-[open]:bg-slate-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Run
          </Button>
        </form>
      </SideNav>
      <section className="h-full w-full">
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
          style={{ width: "width: 100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          ref={mapRef}
        >
          <DeckGLOverlay layers={[isochroneLayer]} />
          <FullscreenControl />
          <GeolocateControl />
          <NavigationControl />
          <ScaleControl />
        </Map>
      </section>
    </main>
  );
}
*/
}
