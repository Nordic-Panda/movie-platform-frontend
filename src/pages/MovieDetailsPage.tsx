import { useParams } from "react-router-dom";

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold">Movie Details</h1>

        <p className="mt-4 text-zinc-400">Movie ID: {id}</p>
      </div>
    </main>
  );
}
