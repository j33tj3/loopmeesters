export default async function PollPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <>{id}</>;
}
