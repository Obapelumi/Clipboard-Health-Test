import Head from "next/head";
import Icon from "../components/ui/icon";
import Link from "next/link";

export default function Default(props: {
  children: JSX.Element | JSX.Element[];
  meta?: { title?: string };
}) {
  return (
    <>
      <Head>
        <title>{props.meta.title}</title>
      </Head>
      <header className="flex items-center justify-between px-3 md:px-6 py-2 border-b fixed w-full h-16 top-0 bg-white z-30">
        <div className="flex items-center">
          <Icon name="align-justify" className="mr-4 lg:hidden" />
          <span className="text-lg text-blue-400 font-extrabold">
            HEALTH EXPLORE
          </span>
        </div>

        <div className="hidden lg:flex items-center font-bold text-sm">
          <Link href="/">
            <a className="mx-4">PROFILE</a>
          </Link>
          <Link href="/">
            <a className="mx-4">JOBS</a>
          </Link>
          <Link href="/">
            <a className="mx-4">PROFESSIONAL NETWORK</a>
          </Link>
          <Link href="/">
            <a className="mx-4">LOUNGE</a>
          </Link>
          <Link href="/">
            <a className="mx-4">SALARY</a>
          </Link>
        </div>

        <div className="flex">
          <button className="border-blue-400 border p-2 rounded-lg text-sm text-blue-400 font-bold hidden lg:inline-block">
            CREATE A JOB
          </button>
          <div className="flex lg:mx-6">
            <div className="rounded-full bg-blue-400 text-white text-center flex justify-center items-center h-10 w-10">
              <span className="text-xl">JO</span>
            </div>
            <span className="rounded-full bg-red-500 text-white -ml-2 h-4 w-4 flex items-center justify-center font-bold text-xs">
              2
            </span>
          </div>

          <button className="font-bold text-sm hidden lg:inline-block">
            LOGOUT
          </button>
        </div>
      </header>
      <main className="overflow-y-auto mt-16 bg-gray-200">
        {props.children}
      </main>
      <footer className="w-full flex z-50">
        <div className=" p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 z-50 bg-white">
          <div className="flex flex-col sm:col-span-2">
            <h1 className="font-bold block text-3xl mb-4">About Us</h1>
            <p className="mb-2">
              We are a team of nurses, doctors, technologists and executives
              dedicated to help nurses find jobs that they have.
            </p>
            <p>All copyrights reserved &copy; 2020 - Health Explore</p>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold block text-3xl mb-4">Sitemap</h1>
            <Link href="/">
              <a className="cursor-pointer mb-2">Nurses</a>
            </Link>
            <Link href="/">
              <a className="cursor-pointer mb-2">Employers</a>
            </Link>
            <Link href="/">
              <a className="cursor-pointer mb-2">Social Networking</a>
            </Link>
            <Link href="/">
              <a className="cursor-pointer mb-2">Jobs</a>
            </Link>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold block text-3xl mb-4">Privacy</h1>
            <Link href="/">
              <a className="cursor-pointer mb-2">Terms of use</a>
            </Link>
            <Link href="/">
              <a className="cursor-pointer mb-2">Privacy Policy</a>
            </Link>
            <Link href="/">
              <a className="cursor-pointer mb-2">Cookie policy</a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
