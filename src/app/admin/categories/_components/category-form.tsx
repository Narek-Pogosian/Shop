"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Control, useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createCategorySchema,
  type CreateCategorySchemaType,
} from "@/lib/schemas/category-schemas";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { createCategoryAction } from "@/server/actions/categories";

export default function CategoryForm() {
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      attributes: [{ name: "", values: [" "] }],
    },
  });

  const {
    fields: attributes,
    append: addAtttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  const { executeAsync, isPending } = useAction(createCategoryAction);

  async function onSubmit(vals: CreateCategorySchemaType) {
    if (isPending) return;

    const res = await executeAsync(vals);
    if (res) {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="@container space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-10">
              <div className="space-y-2">
                <FormLabel>Category Name*</FormLabel>
                <FormDescription>
                  Provide a unique name for the category. This will be used to
                  identify and label the category across the platform.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter category name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    form.setValue("slug", slugify(e.target.value));
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-10">
              <div className="space-y-2">
                <FormLabel>Category Slug*</FormLabel>
                <FormDescription>
                  The slug is a URL-friendly version of the category name. It is
                  automatically generated based on the name but can be
                  customized.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter category slug (e.g., my-category)"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-10">
              <div className="space-y-2">
                <FormLabel>Category Description</FormLabel>
                <FormDescription>
                  Provide a detailed description of the category. This will help
                  users understand what the category represents.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Enter a brief description of the category"
                  rows={4}
                  {...field}
                  className="resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        <div>
          <div className="mb-8 space-y-2">
            <FormLabel>Category Attributes*</FormLabel>
            <FormDescription className="text-balance">
              Use this section to define custom category attributes (e.g.,
              &quot;Color&quot;, &quot;Size&quot;) and specify possible values
              for each (e.g., &quot;Red&quot;, &quot;Blue&quot;). You can easily
              add more attributes as needed to organize and filter products more
              effectively.
            </FormDescription>
          </div>
          <ul className="mb-8 space-y-6">
            {attributes.map((attribute, index) => (
              <Attribute
                key={attribute.id}
                control={form.control}
                index={index}
                removeAttribute={removeAttribute}
              />
            ))}
          </ul>

          <Button
            type="button"
            variant="secondary"
            className="-mt-2 block"
            onClick={() => addAtttribute({ name: "", values: [""] })}
          >
            Add Attribute
          </Button>
        </div>

        <Button loading={isPending}>Create Category</Button>
      </form>
    </Form>
  );
}

type AttributeProps = {
  index: number;
  control: Control<CreateCategorySchemaType>;
  removeAttribute: (index: number) => void;
};

function Attribute({ index, control, removeAttribute }: AttributeProps) {
  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
  } = useFieldArray({
    control,
    // @ts-expect-error it works
    name: `attributes[${index}].values`,
  });

  return (
    <li className="border-accent space-y-4 border-b pb-6">
      <FormField
        control={control}
        name={`attributes.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Attribute Name</FormLabel>
            <div className="flex justify-between gap-4">
              <FormControl>
                <Input
                  placeholder="Attribute name"
                  className="w-fit"
                  {...field}
                />
              </FormControl>
              <Button
                type="button"
                variant="danger"
                className="w-fit"
                size="sm"
                onClick={() => removeAttribute(index)}
              >
                <Trash2 className="sm:hidden" />
                <span className="max-sm:sr-only">Remove Attribute</span>
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="max-w-md">
        {valueFields.map((_, valueIndex) => (
          <FormField
            key={valueIndex}
            control={control}
            name={`attributes.${index}.values.${valueIndex}`}
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel className="sr-only">Possible Value</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input placeholder="Enter possible value" {...field} />
                  </FormControl>
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    onClick={() => removeValue(valueIndex)}
                  >
                    <span className="sr-only">Remove Value</span>
                    <Trash2 className="!size-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="button"
          // @ts-expect-error it works
          onClick={() => appendValue("")}
          className="mt-2 block"
          variant="secondary"
          size="sm"
        >
          Add Possible Value
        </Button>
      </div>
    </li>
  );
}
