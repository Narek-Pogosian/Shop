"use client";

import { type getCategories } from "@/server/queries/categories";
import { useFieldArray, useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createProductSchema,
  type CreateProductsSchemaType,
} from "@/lib/schemas/product-schemas";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProductAction } from "@/server/actions/products";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ProductFormProps {
  categories: Awaited<ReturnType<typeof getCategories>>;
}

export default function ProductForm({ categories }: ProductFormProps) {
  const form = useForm<CreateProductsSchemaType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      price: "" as unknown as number,
      poster: "",
      description: "",
      categorySlug: "" as unknown as string,
      productAttributes: [{ name: "", values: [] }],
      tags: [{ name: "" }],
    },
  });

  const {
    fields: tagFields,
    append: addTag,
    remove: removeTag,
  } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const { executeAsync, isPending } = useAction(createProductAction);

  async function onSubmit(vals: CreateProductsSchemaType) {
    if (isPending) return;

    const res = await executeAsync(vals);

    if (res) {
      form.reset({ productAttributes: [{ name: "", values: [] }] });
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
                <FormLabel>Product Name*</FormLabel>
                <FormDescription>
                  Provide a unique name for the product. This will be used to
                  identify and label the product across the platform.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter product name"
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
                <FormLabel>Product Slug*</FormLabel>
                <FormDescription>
                  The slug is a URL-friendly version of the product name. It is
                  automatically generated based on the name but can be
                  customized.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  placeholder="Enter product slug (e.g., my-product)"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-10">
              <div className="space-y-2">
                <FormLabel>Product Price*</FormLabel>
                <FormDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum, est.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Enter product price" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <hr />
        <FormField
          control={form.control}
          name="poster"
          render={({ field }) => (
            <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-10">
              <div className="space-y-2">
                <FormLabel>Poster Image</FormLabel>
                <FormDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet, perferendis.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
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
                <FormLabel>Product Description</FormLabel>
                <FormDescription>
                  Provide a detailed description of the product. This will help
                  users understand what the product is.
                </FormDescription>
                <FormMessage />
              </div>
              <FormControl>
                <Textarea
                  placeholder="Enter a brief description of the product"
                  rows={4}
                  {...field}
                  className="resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <hr />
        <CategoryAndAttributes categories={categories} form={form} />
        <hr />

        <div className="max-w-md space-y-2">
          <Label className="block text-sm font-medium">Tags</Label>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name={`tags.${index}.name`}
                render={({ field }) => (
                  <FormControl>
                    <Input placeholder="Tag" {...field} />
                  </FormControl>
                )}
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => removeTag(index)}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={() => addTag({ name: "" })}
          >
            Add Tag
          </Button>
        </div>

        <LoadingButton loading={isPending}>Create Product</LoadingButton>
      </form>
    </Form>
  );
}

function CategoryAndAttributes({
  categories,
  form,
}: {
  categories: ProductFormProps["categories"];
  form: UseFormReturn<CreateProductsSchemaType>;
}) {
  const [, setForceRender] = useState(0);
  const selectedCategorySlug = form.watch("categorySlug");

  const handleCategoryChange = (val: string) => {
    const categoryAttributes =
      categories.find((c) => c.slug === val)?.categoryAttributes ?? [];

    form.setValue(
      "productAttributes",
      categoryAttributes.map((attr) => ({ name: attr.name, values: [] })),
    );
    form.setValue("categorySlug", val);
  };

  const handleAttributeChange = (attributeName: string, value: string) => {
    const updatedAttributes = form
      .getValues("productAttributes")
      .map((attr) => {
        if (attr.name === attributeName) {
          const isChecked = attr.values.includes(value);
          const newValues = isChecked
            ? attr.values.filter((v) => v !== value)
            : [...attr.values, value];
          return { ...attr, values: newValues };
        }
        return attr;
      });

    form.setValue("productAttributes", updatedAttributes);
    setForceRender((v) => v + 1);
  };

  const categoryAttributes =
    categories.find((c) => c.slug == selectedCategorySlug)
      ?.categoryAttributes ?? [];

  return (
    <>
      <FormField
        control={form.control}
        name="categorySlug"
        render={({ field }) => (
          <FormItem className="grid gap-1 @xl:grid-cols-2 @xl:gap-8">
            <div className="space-y-2">
              <FormLabel>Category</FormLabel>
              <FormDescription>
                Select a category to assign the product.
              </FormDescription>
              <FormMessage />
            </div>
            <Select
              onValueChange={(value) => {
                handleCategoryChange(value);
                field.onChange(value);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {selectedCategorySlug && categoryAttributes.length > 0 && (
        <>
          <hr />
          <div>
            <p className="mb-4 text-sm leading-none font-medium">
              Choose the available attributes for this product:
            </p>
            {form.formState.errors &&
              form.getFieldState("productAttributes").error && (
                <p className="text-destructive-text -mt-2 mb-2 text-xs">
                  Pick atleast 1 option for each attribute
                </p>
              )}
            <div className="space-y-6">
              {categoryAttributes.map((attr) => (
                <div key={attr.id}>
                  <p className="mb-2 text-sm leading-none font-medium">
                    {attr.name}
                  </p>
                  <ul className="flex gap-6">
                    {attr.values.map((val) => {
                      const isChecked = form
                        .getValues("productAttributes")
                        .find((attribute) => attribute.name === attr.name)
                        ?.values.includes(val);

                      return (
                        <Label
                          key={val}
                          className="flex cursor-pointer items-center gap-1"
                        >
                          <input
                            type="checkbox"
                            className="size-4"
                            checked={isChecked}
                            onChange={() =>
                              handleAttributeChange(attr.name, val)
                            }
                          />
                          {val}
                        </Label>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
