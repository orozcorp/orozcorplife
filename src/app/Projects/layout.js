export default function layout({ children }) {
  return (
    <main className="flex flex-col flex-nowrap w-full justify-center items-center">
      <div className="flex flex-row flex-wrap p-4 w-full md:w-3/4 items-center justify-center">
        <div className="flex flex-col flex-nowrap w-full justify-start items-start">
          {children}
        </div>
      </div>
    </main>
  );
}
