import { getData } from "@/lib/helpers/getData";
import Messages from "./(messages)/Messages";
const QUERY = `
  query ChatGetById($id: ID!) {
    chatGetById(_id: $id) {
      _id
      active
      date
      messages {
        blogCreated
        content
        createdAt
        dateBlogTransform
        id
        role
        transformedToBlog
      }
      prompt
      title
    }
  }
`;

export default async function ChatGen({ params }) {
  const { id } = params;
  const data = await getData({ query: QUERY, variables: { id } });
  const chat = data?.chatGetById;
  if (!chat) return <div>Chat not found</div>;
  return (
    <>
      <h1 className="text-2xl font-extrabold my-4">{chat.title}</h1>
      <div className="drop-shadow-md shadow-slate-800 w-full border rounded h-[80vh] overflow-y-auto">
        <Messages
          id={id}
          prompt={chat?.prompt}
          title={chat?.title}
          messages={chat?.messages || []}
        />
      </div>
    </>
  );
}
