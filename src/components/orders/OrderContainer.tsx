import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { MY_ORDERS_URL } from '../../constant';
import TimestampFormatter from '../../utils/TimestampFormatter';
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';



export default function OrderContainer() {
    const [orders, setOrders] = useState<any[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const navigate = useNavigate();

    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(MY_ORDERS_URL);
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        const filtered = orders.filter((order) => {
            const referenceMatch = order.reference.toLowerCase().includes(value.toLowerCase());
            const priceMatch = order.total_price.toString().toLowerCase().includes(value.toLowerCase());
    
            // Return true if either reference or total_price matches the search term
            return referenceMatch || priceMatch;
        });
    
        setFilteredOrders(filtered);
    };
    

    const handleViewOrder = (orderId: string) => {
      const order = orders.find(order => order.id === orderId);
      if (order) {
        setSelectedOrder(order);
        openModal();
      }
    };

    const handleDownloadPDF = () => {
        if (selectedOrder) {
            // Capture the modal content and convert it to PDF
            const element = document.getElementById('order-modal-content');
    
            // Using html2pdf to generate a PDF
            if (element) {
                html2pdf()
                    .from(element) // The element to export to PDF
                    .save(`Order_${selectedOrder.reference}.pdf`); // Save the generated PDF
            }
        }
    };

    const handleRedirect = () => {
        navigate('/orders/add');  // Step 3: Redirect to /orders/add
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
        <div className="flex justify-end mb-3">
            <button
                onClick={handleRedirect}  // Use the handleRedirect function
                className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
                Place Order
            </button>
        </div>

       
      <div>
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Orders by Reference or Total Price"
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        {/* Order Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Reference</TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Items</TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Total Price</TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.reference}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.orderitems.length}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">${order.total_price}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"><TimestampFormatter timestamp={order.created_at} /></TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                            size="sm"
                            color={"primary"}
                            >
                            <div
                                onClick={() => handleViewOrder(order.id)}
                                className="cursor-pointer"
                            >
                                View Details
                            </div>
                        </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Modal for Viewing Order Details */}
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
            <div
                id="order-modal-content"
                className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
            >
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Order Details</h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Details of the selected order.</p>
                </div>
                {selectedOrder && (
                    <div>
                        {/* Order Overview */}
                        <div className="mb-6">
                            <h5 className="font-medium text-gray-800 dark:text-white/90">Reference: {selectedOrder.reference}</h5>
                            <p className="text-gray-500 dark:text-gray-400">Total Price: ${selectedOrder.total_price}</p>
                            <p className="text-gray-500 dark:text-gray-400">Order Date: <TimestampFormatter timestamp={selectedOrder.created_at} /></p>
                        </div>

                        {/* Products Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-3 font-medium text-gray-700 dark:text-white">Product ID</th>
                                        <th className="px-4 py-3 font-medium text-gray-700 dark:text-white">Quantity</th>
                                        <th className="px-4 py-3 font-medium text-gray-700 dark:text-white">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrder.orderitems.map((item: any) => (
                                        <tr key={item.id} className="border-t border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-3">{item.product_title}</td>
                                            <td className="px-4 py-3">{item.quantity}</td>
                                            <td className="px-4 py-3">${item.total_price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Close Button */}
                <div className="flex justify-end mt-6 space-x-2">
                    {/* <Button size="sm" onClick={closeModal} className='bg-red-500'>Close</Button> */}
                    <Button size="sm" onClick={handleDownloadPDF}>Download pdf</Button>
                </div>
            </div>
        </Modal>
      </div>
      </>
    );
}
