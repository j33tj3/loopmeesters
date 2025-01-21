import { PollById } from "@/components/PollById";

export default async function PollPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PollById id={id} />;
}
