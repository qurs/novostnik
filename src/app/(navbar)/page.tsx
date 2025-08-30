'use client'
import PinnedNewsCarousel from "@/components/PinnedNewsCarousel";

export default function Home() {
  return (
    <>
      <div className="flex justify-center p-10 mx-auto">
        <PinnedNewsCarousel />
      </div>
    </>
  );
}
