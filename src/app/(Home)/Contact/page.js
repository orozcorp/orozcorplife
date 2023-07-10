"use client";
import { header } from "@/components/smallComponents/TextComponents";
import { useState } from "react";
import Alert from "@/components/smallComponents/Alert";
import { postData } from "@/lib/helpers/getData";
const MUTATION = `
  mutation Mutation($input: ContactInput!) {
    addContact(input: $input) {
      code
      data
      message
      success
    }
  }
`;
export default function Contact() {
  const initial = {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  };
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const save = await postData({
        query: MUTATION,
        variables: {
          input: form,
        },
      });
      if (save.addResume.success) {
        setValues(initial);
        setSuccess(true);
      } else {
        setError(save.addResume.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div
      className="my-10 flex flex-col flex-nowrap justify-center items-center w-full"
      id="contact"
    >
      <h2 className={`${header({ size: "h1", color: "primary" })} mb-8`}>
        CONTACT ME
      </h2>
      {!success && (
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
              placeholder=" "
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
                placeholder=" "
                required
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
                placeholder=" "
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
                placeholder=" "
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (123-456-7890)
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_company"
                id="floating_company"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
                placeholder=" "
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Company (Ex. Google)
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
          >
            Submit
          </button>
        </form>
      )}
      {error && <Alert color="red" type="Error" description={error} />}
    </div>
  );
}
