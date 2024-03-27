"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import parseFormData from "@/config/parseFormData";
import contactus from "../actions/contactus";
import InputSimple from "@/components/atoms/InputSimple";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import TextArea from "@/components/atoms/TextArea";
export default function Contacto() {
  const [alert, setAlert] = useState("");
  const ContactUs = useMutation({
    async mutationFn(form) {
      const { data, errors } = await contactus(form);
      if (errors) {
        throw new Error(errors);
      }
      return data;
    },
    onSucces() {
      setAlert("Mensaje recibido correctamente");
    },
  });
  return (
    <section className="flex flex-col flex-nowrap md:flex-row md:flex-wrap p-8 gap-8 justify-center items-center">
      <div className="flex flex-col flex-nowrap gap-4 justify-start flex-1">
        <h2 className="font-bold text-2xl">Contact Me</h2>
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            ContactUs.mutate(parseFormData(e.target));
          }}
        >
          <InputSimple type="text" name="name" label="Name" required />
          <InputSimple type="email" name="email" label="Email" required />
          <InputSimple type="text" name="phone" label="Phone" required />
          <TextArea name="message" label="Message" required />
          <Button
            type="submit"
            loading={ContactUs.isPending.toString() || "false"}
          >
            Send
          </Button>
        </form>
        {alert && (
          <Alert>
            <AlertTitle>
              Thank you for your message, we will get in touch soone
            </AlertTitle>
            <AlertDescription>{alert}</AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  );
}
