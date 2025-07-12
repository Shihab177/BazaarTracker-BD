import React from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../../hook/useAuth';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const ViewMyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

   const { data: products = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user.email}`);
            return res.data;
        }
    })

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/product/${productId}`)
         toast.success("Product deleted successfully");
         refetch();
      } catch {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="p-4 md:p-10 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#00B795]"> My Submitted Products</h2>

      <div className="overflow-x-auto rounded-md shadow border border-gray-100">
        <table className="min-w-full text-sm text-left ">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Item Name</th>
              <th className="px-4 py-3">Price/Unit</th>
              <th className="px-4 py-3">Market</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className=" even:bg-gray-50 odd:bg-white">
                <td className="px-4 py-3 font-medium">{product.itemName}</td>
                <td className="px-4 py-3">৳{product.pricePerUnit}</td>
                <td className="px-4 py-3">{product.marketName}</td>
                <td className="px-4 py-3">{product.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    product.status === 'approved' ? 'bg-green-100 text-green-700' :
                    product.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'}`}>{product.status}</span>
                </td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <Link to={`/dashboard/update-product/${product._id}`}>
                    <button className="bg-[#00B795] hover:bg-[#22A587] px-4 py-1 font-bold text-white rounded-md">Update</button>
                  </Link>
                  <button
                    className="rounded-md bg-red-500  hover:bg-red-600 px-4 py-1 font-bold text-white"
                    onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMyProducts;
