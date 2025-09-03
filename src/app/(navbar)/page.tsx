'use client'
import MainNewsList from "@/components/MainNewsList";
import PinnedNewsCarousel from "@/components/PinnedNewsCarousel";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center gap-5 md:gap-15 lg:gap-20 p-10 mx-auto">
        <PinnedNewsCarousel />
        <Suspense>
          <MainNewsList />
        </Suspense>
      </div>
    </>
  );
}
