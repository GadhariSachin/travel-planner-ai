import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Header from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${styles.heroContainer}`}>
        <Header />
        <div
          className={`text-center flex flex-col items-center justify-center h-full w-full -mt-[86px]`}
          style={{ minHeight: "calc(100vh - 80px)" }}
        >
          <h1 className={`text-4xl md:text-7xl font-bold mb-4 !leading-[1.3]`}>
            <div className="text-white sm:text-zinc-900">
              <div
                className={`inline-block ${styles.animateSvelte} ${styles.svelte}`}
              >
                An AI Powered Travel Planner
              </div>
            </div>
          </h1>
          <p className="sm:leading-9 text-[21px] mb-8 sm:mb-12 whitespace-break-spaces text-white sm:text-zinc-900 text-center font-medium">
            AI-powered travel planner that creates personalized itineraries
            based on your interests and budget.
          </p>
          <Link
            href="/plan"
            className={`bg-[#000] text-[#fff] border-2 text-[18px] font-medium px-[2rem] py-[1rem] inline-block hover:bg-transparent transition tracking-wider heroCta`}
          >
            Plan Now to Travel
          </Link>
        </div>
      </main>
    </>
  );
}
