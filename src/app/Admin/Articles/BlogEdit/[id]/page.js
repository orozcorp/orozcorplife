"use client";
import { getBlog } from "@/server/blog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/simpleFunctions/CopyButton";
import BlogPost from "./Blog";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createImagesBulk } from "@/components/atoms/actions/createImage";
export default function Blog({ params }) {
  const { id } = params;
  const { toast } = useToast();
  const { data: blog } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => await getBlog({ id }),
    staleTime: 0,
    intialData: {},
  });
  const { mutate, isPending } = useMutation({
    async mutationFn() {
      const { data, errors } = await createImagesBulk();
      if (errors) {
        throw new Error(errors);
      }
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
    <div className="flex flex-row flex-wrap gap-3 justify-between">
      <Button onClick={mutate} disabled={isPending}>
        {isPending ? "Running" : "ALL IMAGES"}
      </Button>
      <div className="max-w-xl flex flex-col flex-nowrap gap-4">
        <div className="flex flex-row flex-wrap gap-2">
          {blog?.image && (
            <Image
              src={blog.image}
              alt="Blog Image"
              width={200}
              height={200}
              className="rounded shadow-lg"
            />
          )}
          <div className="flex flex-row flex-wrap gap-2 flex-1">
            {blog?.tags?.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="border p-3 shadow-lg rounded text-justify">
          <h2 className="text-2xl font-bold mb-4">Facebook Personal</h2>
          <p id="fbPersonal">{blog?.facebookPersonal}</p>
          <CopyButton
            elementId="fbPersonal"
            buttonText="Copy Fb Personal"
            className="my-4"
          />
        </div>
        <div className="border p-3 shadow-lg rounded text-justify">
          <h2 className="text-2xl font-bold mb-4">Facebook Business</h2>
          <p id="fbBusiness">{blog?.facebookBusiness}</p>
          <CopyButton
            elementId="fbBusiness"
            buttonText="Copy Fb Business"
            className="my-4"
          />
        </div>
      </div>
      <BlogPost blog={blog} />
      <div className="flex flex-row flex-wrap gap-2">
        <div className="max-w-2xl text-justify border p-3 shadow-lg rounded ">
          <h2 className="text-2xl font-bold mb-4">Instagram</h2>
          <p id="insta">{blog?.instagramPost}</p>
          <CopyButton
            elementId="insta"
            buttonText="Copy Insta"
            className="my-4"
          />
        </div>
        <div className="max-w-2xl text-justify border p-3 shadow-lg rounded ">
          <h2 className="text-2xl font-bold mb-4">Linked In</h2>
          <p id="linkedIn">{blog?.linkedInPost}</p>
          <CopyButton
            elementId="linkedIn"
            buttonText="Copy LinkedIn"
            className="my-4"
          />
        </div>
      </div>
    </div>
  );
}
