export default async function PollPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <>{id}</>;
}
