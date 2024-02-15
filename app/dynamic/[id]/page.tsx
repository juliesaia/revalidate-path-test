import Link from "next/link";

export default async function PostPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const time = new Date().getTime();
    const req = await fetch(
        "http://worldtimeapi.org/api/timezone/America/New_York"
    );
    const { unixtime } = await req.json();

    const synced = Math.abs(time / 1000 - unixtime) < 2;

    return (
        <div className="m-8">
            <div>Server Time: {time}</div>
            <div>Fetched time: {unixtime}</div>
            <div className={synced ? "text-green-500" : "text-red-500"}>
                {synced ? "Synced" : "Not synced"}
            </div>
            <Link href="/">Go back home</Link>
        </div>
    );
}
