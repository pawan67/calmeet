import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";
import { ModeToggle } from "@/components/shared/mode-toggle";
import Link from "next/link"
export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <div className=" flex items-center gap-2 mt-2">
        <Link href="/dashboard/event-types">

        <img className="w-10" src="/images/logo.png" alt="logo"/>
        </Link>
      <ModeToggle />
      </div>
      <ReactSwagger spec={spec} />
    </section>
  );
}
