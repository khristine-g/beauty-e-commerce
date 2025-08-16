// "use client";

// import { useCart } from "../context/CartContext";
// import { products } from "../data/products"; 
// import { useSearchParams } from "next/navigation";

// export default function Productinfo() {
//   const { addToCart } = useCart();
//   const searchParams = useSearchParams();
//   const productId = searchParams.get("id");

//   const product = products.find((p) => p.id.toString() === productId);

//   if (!product) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-500">
//         Product not found
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">
//       <div className="grid md:grid-cols-2 gap-12 items-start">
//         {/* Product Image */}
//         <div className="w-full rounded-3xl overflow-hidden shadow-lg">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-cover rounded-3xl"
//           />
//         </div>

//         {/* Product Details */}
//         <div className="flex flex-col justify-between">
//           <div className="space-y-4">
//             <h1 className="text-5xl font-extrabold text-gray-900">{product.name}</h1>
//             <p className="text-3xl font-bold text-black">KES {product.price.toLocaleString()}</p>
//             {product.description && (
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             )}
//           </div>

//           <button
//             onClick={() => addToCart(product)}
//             className="mt-8 w-full sm:w-auto bg-black text-white py-4 px-8 rounded-2xl font-semibold shadow-lg hover:bg-gray-800 transition"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
