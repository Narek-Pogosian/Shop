import { getCategories } from "@/server/queries/categories";
import ProductForm from "../_components/product-form";
import PageTitle from "../../_components/page-title";

async function AdminProductCreatePage() {
  const categories = await getCategories();

  return (
    <>
      <PageTitle>Create Product</PageTitle>
      <hr role="presentation" className="mb-8" />
      <ProductForm categories={categories} />
    </>
  );
}

export default AdminProductCreatePage;
