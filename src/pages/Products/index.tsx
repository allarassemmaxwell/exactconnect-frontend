import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ProductContainer from "../../components/products/ProductContainer";

export default function index() {
  return (
    <>
      <PageMeta
        title="Products | Exact Connect"
        description=""
      />
      <PageBreadcrumb pageTitle="Products" />
      <div className="space-y-6">
        <ComponentCard title="Products">
          <ProductContainer />
        </ComponentCard>
      </div>
    </>
  );
}
