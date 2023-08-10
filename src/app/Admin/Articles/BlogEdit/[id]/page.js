import Blog from "./(components)/Blog";
export default async function page({ params }) {
  const { id } = params;
  return (
    <>
      <Blog id={id} />
    </>
  );
}
