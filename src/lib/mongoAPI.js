export async function fetchFromMongo(collection, operation, { ...props } = {}) {
  if (props.filter && props.filter._id) {
    // Assume props.filter._id is a string that represents the ObjectId
    props.filter._id = { $oid: props.filter._id };
  }
  const body = JSON.stringify({
    collection,
    database: process.env.MONGODB_DB,
    dataSource: "OrozcoServerLess",
    ...props,
  });
  const url = `${process.env.MONGODB_DATAV}/action/${operation}`;
  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.MONGODB_API,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error with ${operation}:`, error);
    throw error; // rethrow the error for further handling if necessary
  }
}
