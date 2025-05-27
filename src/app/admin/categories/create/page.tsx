import CategoryForm from "../_components/category-form";
import PageTitle from "../../_components/page-title";

function AdminCategoryCreatePage() {
  return (
    <>
      <PageTitle>Create Category</PageTitle>
      <hr role="presentation" className="mb-8" />
      <CategoryForm />
    </>
  );
}

export default AdminCategoryCreatePage;
