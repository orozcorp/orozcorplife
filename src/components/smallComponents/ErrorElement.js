export default function ErrorElement({ error }) {
  return (
    <div
      className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      <span className="font-medium">Error!</span> {error}
    </div>
  );
}
