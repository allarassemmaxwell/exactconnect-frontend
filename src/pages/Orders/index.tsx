import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import OrderContainer from "../../components/orders/OrderContainer";


export default function index() {
  return (
    <>
      <PageMeta
        title="Orders | Exact Connect"
        description=""
      />
      <PageBreadcrumb pageTitle="Orders" />
      <div className="space-y-6">
        <ComponentCard title="Orders">
          <OrderContainer />
        </ComponentCard>
      </div>
    </>
  );
}
