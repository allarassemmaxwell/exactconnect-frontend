import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import OrderAddContainer from "../../components/orders/OrderAddContainer";


export default function add() {
  return (
    <>
      <PageMeta
        title="Orders | Exact Connect"
        description=""
      />
      <PageBreadcrumb pageTitle="Orders/ Add" />
      <div className="space-y-6">
        <ComponentCard title="Orders/ Add">
          <OrderAddContainer />
        </ComponentCard>
      </div>
    </>
  );
}
