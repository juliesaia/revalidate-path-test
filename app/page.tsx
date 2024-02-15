import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    async function revalidate(path: string, type?: "layout" | "page") {
        "use server";

        revalidatePath(path, type);
    }

    const dynamicRoute = "/dynamic/1";
    const staticRoute = "/static";

    return (
        <div className="flex flex-col gap-4 m-8">
            <Link href={staticRoute}>Link to static route</Link>
            <form action={revalidate.bind(null, staticRoute, "layout")}>
                <button type="submit">Revalidate static route (works)</button>
            </form>
            <Link href={dynamicRoute} className="mt-12">
                Link to dynamic route
            </Link>
            <form action={revalidate.bind(null, dynamicRoute, undefined)}>
                <button type="submit">
                    Revalidate dynamic route (type undefined, works)
                </button>
            </form>
            <form action={revalidate.bind(null, dynamicRoute, "page")}>
                <button type="submit">
                    Revalidate dynamic route (page, broken)
                </button>
            </form>
            <form action={revalidate.bind(null, dynamicRoute, "layout")}>
                <button type="submit">
                    Revalidate dynamic route (layout, broken)
                </button>
            </form>
        </div>
    );
}
