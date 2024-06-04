import IsochroneForm from "@/components/IsochroneForm";
import MapWrapper from "@/components/MapWrapper";
import SideNav from "./SideNav";

export default function Home() {
  return (
    <main className="relative h-screen w-screen">
      <SideNav>
        <IsochroneForm />
      </SideNav>
      <MapWrapper />
    </main>
  );
}
