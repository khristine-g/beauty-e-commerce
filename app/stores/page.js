// app/stores/page.js
"use client";



const stores = [
  {
    id: 1,
    name: "True Beauty - Kahawa Sukari",
    address: "123 Sukari Ave, Kahawa Sukari, Nairobi",
    phone: "+254 712 345 678",
    image: "./images/beauty11.jpg",
  },
  {
    id: 2,
    name: "True Beauty - Kahawa Wendani",
    address: "45 Wendani Plaza, Kahawa Wendani, Nairobi",
    phone: "+254 798 654 321",
    image: "./images/beauty12.jpg",
  },
];

export default function Stores() {
  return (
    <main className="px-6 py-24">
          {/* Stores Section */}
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10">Find Our Stores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              {/* Store Image */}
              <div className="relative w-full h-[60vh]">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Store Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
                <p className="text-gray-600">{store.address}</p>
                <p className="text-gray-600 mt-2">📞 {store.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
     

      {/* Info Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h4 className="font-semibold text-xl mb-2">Interest-free payments</h4>
          <p className="text-gray-600">
            Shop now. Pay later. Available for orders over $35.
          </p>
        </div>
        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h4 className="font-semibold text-xl mb-2">Premium customer care</h4>
          <p className="text-gray-600">
            Our beauty experts and pharmacists are here to guide and support you
            anytime.
          </p>
        </div>
        <div className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h4 className="font-semibold text-xl mb-2">Authentic products</h4>
          <p className="text-gray-600">
            We only stock genuine items sourced directly from trusted
            manufacturers.
          </p>
        </div>
      </section>

    
    </main>
  );
}
