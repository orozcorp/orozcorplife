export async function getData({ query, variables }, refetch = false) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
      refetch,
    }),
    cache: "no-store",
  });
  const { data } = await res.json();
  return data;
}

export async function postData({ query, variables }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/graphql`, {
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
