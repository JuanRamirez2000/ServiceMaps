"use client";
import MapWrapper from "@/components/MapWrapper";
import SideNav from "./SideNav";

import { findIsochrone } from "@/actions/findIsochrones";
import {
  Label,
  Input,
  Field,
  Fieldset,
  RadioGroup,
  Radio,
  Listbox,
  Button,
  Legend,
} from "@headlessui/react";
import { useState } from "react";

import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import DeckGLOverlay from "@/components/DeckGLOverlay";
import { GeoJsonLayer } from "deck.gl";
import { Controller, useForm } from "react-hook-form";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const COMMUTING_MODES = ["driving", "driving-traffic", "walking", "cycling"];
type COMMUTING_MODES_TYPES =
  | "driving"
  | "driving-traffic"
  | "walking"
  | "cycling";

export default function Home() {
  const { register, handleSubmit, control } = useForm();

  const [isochrones, setIsochrones] = useState();

  const handleFindIsochrones = async (data) => {
    console.log(data);
    //try {
    //  const retrievedIsochrones = await findIsochrone({});
    //  setIsochrones(retrievedIsochrones.features);
    //} catch (err) {
    //  console.error(err);
    //}
  };

  const isochroneLayer = new GeoJsonLayer({
    id: "Isochrones",
    data: isochrones as any,
    stroked: true,
    filled: true,
    getFillColor: [160, 160, 180, 50],
    getLineWidth: 40,
    getPointRadius: 4,
  });

  return (
    <main className="relative h-screen w-screen">
      <SideNav>
        <form
          className="h-full space-y-8"
          onSubmit={handleSubmit(handleFindIsochrones)}
        >
          <Field className="flex flex-col gap-1">
            <Label> Zip Code </Label>
            <Input
              type="number"
              className="rounded-lg px-3.5 py-1.5 w-20 bg-slate-500 text-slate-50"
              defaultValue={92707}
              {...register("location")}
            />
          </Field>
          <Controller
            control={control}
            defaultValue="driving-traffic"
            name="commuting_mode"
            render={({ field }) => (
              <RadioGroup className="space-y-2" {...field}>
                <Label>Commuting Mode</Label>
                {COMMUTING_MODES.map((mode) => (
                  <Radio
                    value={mode}
                    key={mode}
                    className="group relative flex cursor-pointer rounded-lg bg-slate-500 py-4 px-5 text-slate-50 transition data-[checked]:bg-slate-600 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-slate-50"
                    {...register("commuting_mode")}
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
                {...register("first_cutoff")}
              />
            </Field>
            <Field className="flex flex-row justify-between">
              <Label className="text-lg font-semibold"> Second Cutoff </Label>
              <Input
                type="number"
                className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                defaultValue={30}
                {...register("second_cutoff")}
              />
            </Field>
            <Field className="flex flex-row justify-between">
              <Label className="text-lg font-semibold"> Third Cutoff </Label>
              <Input
                type="number"
                className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                defaultValue={45}
                {...register("third_cutoff")}
              />
            </Field>
            <Field className="flex flex-row justify-between">
              <Label className="text-lg font-semibold"> Fourth Cutoff </Label>
              <Input
                type="number"
                className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                defaultValue={60}
                {...register("fourth_cutoff")}
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
          mapStyle="mapbox://styles/mapbox/light-v11"
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
