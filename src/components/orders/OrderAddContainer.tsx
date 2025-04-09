import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { SAVE_ORDERS_URL, PRODUCTS_URL, LOADING } from '../../constant';
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";



export default function OrderAddContainer() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [orderItems, setOrderItems] = useState<{ product: number, quantity: number }[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(PRODUCTS_URL);
            setProducts(response.data);
        } catch (err) {
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectChange = (productId: string) => {
        setSelectedProduct(Number(productId)); // Convert to number
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddItem = () => {
        setLoading(true);
        if (selectedProduct && quantity > 0) {
            setOrderItems(prevItems => {
                const existingItem = prevItems.find(item => item.product === selectedProduct);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.product === selectedProduct ? { ...item, quantity: quantity } : item
                    );
                } else {
                    return [...prevItems, { product: selectedProduct, quantity }];
                }
            });
            setSelectedProduct(0);
            setQuantity(1);
        }
        setLoading(false);
    };

    const handleRemoveItem = (productId: number) => {
        setLoading(true);
        setOrderItems(prevItems => prevItems.filter(item => item.product !== productId));
        setLoading(false);
    };

    const handleSave = async () => {
        setLoading(true);
        if (orderItems.length > 0) {
            const formattedData = {
                orderitems: orderItems.map(item => ({
                    product: item.product,
                    quantity: item.quantity,
                }))
            };

            try {
                await axiosInstance.post(SAVE_ORDERS_URL, formattedData);
                setOrderItems([]);
                setSelectedProduct(0);
                setQuantity(1);
                navigate("/orders");
                toast.success("Order saved successfully!");
            } catch (error) {
                toast.error("Error saving order");
            }finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">Add Products to Order</h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Select products and quantities to add to the order.</p>
                </div>
                <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div className="mt-7">
                            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">Select Products</h5>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2 items-center">
                                <div className="col-span-2 lg:col-span-1 flex items-center gap-2">
                                    <Label>Products</Label>
                                    <Select
                                        options={products.map((product) => ({
                                            value: product.id.toString(),
                                            label: product.title,
                                        }))}
                                        onChange={handleSelectChange}
                                        placeholder="Select a product"
                                    />
                                </div>

                                <div className="mb-4 flex items-center gap-2">
                                    <Label>Quantity</Label>
                                    <Input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                    />

                                    <Button size="sm" onClick={handleAddItem} disabled={loading}>
                                        {loading ? LOADING : "Add"}
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">List of Products</h5>
                                <ul>
                                    {orderItems.map((item) => (
                                        <li key={item.product} className="flex justify-between items-center mb-4"> {/* Added mb-4 to add margin between items */}
                                            <span>{products.find(p => p.id === item.product)?.title}</span>
                                            <span>Qty: {item.quantity}</span>
                                            <Button size="sm" onClick={() => handleRemoveItem(item.product)}>
                                                Remove
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" onClick={handleSave} disabled={loading}>
                            {loading ? LOADING : "Save Order"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
