export async function getData({ query, variables }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const { data } = await res.json();
  return data;
}
