"use client";
import InputSimple from "@/components/atoms/InputSimple";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlog } from "@/server/blog";
import { useToast } from "@/components/ui/use-toast";
const toolbarOptions = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["link", "image", "video", "formula"], // add's image support
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Prevent rendering during server-side rendering
});
import "react-quill/dist/quill.snow.css";
export default function BlogEdit({ blog, setEdit }) {
  const { id } = useParams();
  const [toEdit, setToEdit] = useState(blog);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const EditBlog = useMutation({
    async mutationFn() {
      const update = toEdit;
      delete update._id;
      const { data, errors } = await updateBlog({ id, update });
      if (errors) throw errors;
      return data;
    },
    onError(errors) {
      console.log(errors);
      toast({
        title: "Error",
        description: "Hubo un error al guardar los cambios",
        variant: "destructive",
      });
    },
    onSuccess() {
      toast({
        title: "Blog actualizado",
        description: "Los cambios se guardaron correctamente",
      });
      setEdit(false);
      queryClient.invalidateQueries(["blog"]);
    },
  });
  return (
    <div>
      <div className="my-4 flex flex-col flex-nowrap gap-2">
        <InputSimple
          name="title"
          label="Title"
          value={toEdit.title}
          onChange={(e) =>
            setToEdit({ ...toEdit, title: e.currentTarget.value })
          }
        />
        <InputSimple
          name="description"
          label="Description"
          value={toEdit.description}
          onChange={(e) =>
            setToEdit({ ...toEdit, description: e.currentTarget.value })
          }
        />
      </div>
      <ReactQuill
        theme="snow"
        value={toEdit.content}
        onChange={(e) => setToEdit({ ...toEdit, content: e })}
        modules={toolbarOptions}
      />
      <Button className="my-4 w-full" onClick={EditBlog.mutate}>
        Save
      </Button>
    </div>
  );
}
