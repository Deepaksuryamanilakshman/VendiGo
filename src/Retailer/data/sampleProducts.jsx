export const categories = {
  'Food & Beverages': [
    'Rice & Grains',
    'Pulses & Lentils',
    'Oil & Ghee',
    'Spices & Masalas',
    'Tea & Coffee',
    'Snacks & Namkeen',
    'Beverages',
    'Dairy Products',
    'Frozen Foods',
    'Canned Foods'
  ],
  'Personal Care': [
    'Soaps & Body Wash',
    'Shampoo & Hair Care',
    'Oral Care',
    'Skin Care',
    'Men\'s Grooming',
    'Baby Care',
    'Feminine Hygiene'
  ],
  'Household': [
    'Detergents',
    'Cleaning Supplies',
    'Kitchen Utensils',
    'Storage Containers',
    'Home Decor',
    'Electrical Items'
  ],
  'Clothing & Fashion': [
    'Men\'s Wear',
    'Women\'s Wear',
    'Kids Wear',
    'Footwear',
    'Accessories',
    'Traditional Wear'
  ],
  'Electronics': [
    'Mobile Accessories',
    'Home Appliances',
    'Kitchen Appliances',
    'Audio & Video',
    'Computer Accessories'
  ],
  'Health & Wellness': [
    'Medicines',
    'Health Supplements',
    'First Aid',
    'Ayurvedic Products',
    'Fitness Equipment'
  ],
  'Stationery & Books': [
    'Office Supplies',
    'School Supplies',
    'Books & Magazines',
    'Art & Craft'
  ],
  'Baby & Kids': [
    'Baby Food',
    'Toys & Games',
    'Baby Care',
    'Kids Clothing',
    'Educational Items'
  ]
};

export const businessTypes = {
  'Kirana Shop': ['Food & Beverages', 'Personal Care', 'Household', 'Health & Wellness'],
  'Supermarket': ['Food & Beverages', 'Personal Care', 'Household', 'Electronics', 'Clothing & Fashion'],
  'Restaurant': ['Food & Beverages', 'Kitchen Appliances', 'Cleaning Supplies'],
  'Hotel/PG': ['Personal Care', 'Household', 'Food & Beverages', 'Electronics'],
  'Bakery': ['Food & Beverages', 'Kitchen Appliances'],
  'Medical Store': ['Health & Wellness', 'Personal Care', 'Baby Care'],
  'Electronics Shop': ['Electronics', 'Mobile Accessories'],
  'Clothing Store': ['Clothing & Fashion', 'Footwear', 'Accessories'],
  'Stationery Shop': ['Stationery & Books', 'Office Supplies'],
  'Vegetable Shop': ['Food & Beverages'],
  'Oil Trader': ['Food & Beverages'],
  'General Store': ['Food & Beverages', 'Personal Care', 'Household', 'Stationery & Books']
};

export const sampleProducts = [
  // Food & Beverages
  {
    id: 1,
    name: 'Basmati Rice Premium',
    category: 'Food & Beverages',
    subcategory: 'Rice & Grains',
    price: 180,
    originalPrice: 200,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    description: 'Premium quality basmati rice, aged for perfect aroma and taste',
    unit: '5kg bag',
    inStock: true,
    rating: 4.5,
    reviews: 245,
    brand: 'India Gate',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Restaurant', 'Hotel/PG']
  },
  {
    id: 2,
    name: 'Toor Dal',
    category: 'Food & Beverages',
    subcategory: 'Pulses & Lentils',
    price: 120,
    originalPrice: 130,
    discount: 8,
    image: 'https://images.unsplash.com/photo-1599909421460-eaf6eeb6ac81?w=400',
    description: 'Fresh and high-quality toor dal, rich in protein',
    unit: '1kg pack',
    inStock: true,
    rating: 4.2,
    reviews: 156,
    brand: 'Organic India',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Restaurant', 'Hotel/PG']
  },
  {
    id: 3,
    name: 'Sunflower Oil',
    category: 'Food & Beverages',
    subcategory: 'Oil & Ghee',
    price: 160,
    originalPrice: 180,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    description: 'Pure sunflower oil, perfect for cooking and frying',
    unit: '1L bottle',
    inStock: true,
    rating: 4.3,
    reviews: 198,
    brand: 'Fortune',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Restaurant', 'Hotel/PG', 'Oil Trader']
  },

  // Personal Care
  {
    id: 4,
    name: 'Dove Soap',
    category: 'Personal Care',
    subcategory: 'Soaps & Body Wash',
    price: 45,
    originalPrice: 50,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    description: '1/4th moisturizing cream for soft and smooth skin',
    unit: '75g bar',
    inStock: true,
    rating: 4.6,
    reviews: 89,
    brand: 'Dove',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Hotel/PG', 'Medical Store']
  },
  {
    id: 5,
    name: 'Head & Shoulders Shampoo',
    category: 'Personal Care',
    subcategory: 'Shampoo & Hair Care',
    price: 285,
    originalPrice: 320,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400',
    description: 'Anti-dandruff shampoo for healthy, flake-free hair',
    unit: '400ml bottle',
    inStock: true,
    rating: 4.4,
    reviews: 167,
    brand: 'Head & Shoulders',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Hotel/PG', 'Medical Store']
  },

  // Electronics
  {
    id: 6,
    name: 'Mobile Phone Charger',
    category: 'Electronics',
    subcategory: 'Mobile Accessories',
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
    description: 'Fast charging USB-C charger compatible with all devices',
    unit: '1 piece',
    inStock: true,
    rating: 4.1,
    reviews: 234,
    brand: 'Samsung',
    businessTypes: ['Electronics Shop', 'Supermarket']
  },

  // Clothing & Fashion
  {
    id: 7,
    name: 'Cotton Casual Shirt',
    category: 'Clothing & Fashion',
    subcategory: 'Men\'s Wear',
    price: 799,
    originalPrice: 1200,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400',
    description: '100% cotton comfortable casual shirt for daily wear',
    unit: '1 piece',
    inStock: true,
    rating: 4.3,
    reviews: 67,
    brand: 'Allen Solly',
    businessTypes: ['Clothing Store', 'Supermarket']
  },
  {
    id: 8,
    name: 'Women Kurti',
    category: 'Clothing & Fashion',
    subcategory: 'Women\'s Wear',
    price: 599,
    originalPrice: 999,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
    description: 'Beautiful printed kurti perfect for casual and festive wear',
    unit: '1 piece',
    inStock: true,
    rating: 4.5,
    reviews: 143,
    brand: 'W',
    businessTypes: ['Clothing Store', 'Supermarket']
  },

  // Health & Wellness
  {
    id: 9,
    name: 'Paracetamol 500mg',
    category: 'Health & Wellness',
    subcategory: 'Medicines',
    price: 15,
    originalPrice: 18,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    description: 'Pain relief and fever reducer tablets',
    unit: '10 tablets',
    inStock: true,
    rating: 4.2,
    reviews: 89,
    brand: 'Crocin',
    businessTypes: ['Medical Store']
  },

  // Baby & Kids
  {
    id: 10,
    name: 'Baby Diaper',
    category: 'Baby & Kids',
    subcategory: 'Baby Care',
    price: 699,
    originalPrice: 799,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    description: 'Soft and comfortable diapers with 12-hour protection',
    unit: '64 pieces',
    inStock: true,
    rating: 4.7,
    reviews: 324,
    brand: 'Pampers',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Medical Store']
  },

  // More products for variety
  {
    id: 11,
    name: 'Atta (Wheat Flour)',
    category: 'Food & Beverages',
    subcategory: 'Rice & Grains',
    price: 320,
    originalPrice: 350,
    discount: 9,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    description: 'Fresh ground wheat flour for making rotis and bread',
    unit: '10kg bag',
    inStock: true,
    rating: 4.4,
    reviews: 278,
    brand: 'Aashirvaad',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Restaurant', 'Hotel/PG', 'Bakery']
  },
  {
    id: 12,
    name: 'Green Tea',
    category: 'Food & Beverages',
    subcategory: 'Tea & Coffee',
    price: 280,
    originalPrice: 320,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
    description: 'Premium green tea leaves with natural antioxidants',
    unit: '100g pack',
    inStock: true,
    rating: 4.6,
    reviews: 156,
    brand: 'Twinings',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Restaurant', 'Hotel/PG']
  },
  {
    id: 13,
    name: 'Surf Excel Detergent',
    category: 'Household',
    subcategory: 'Detergents',
    price: 199,
    originalPrice: 220,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    description: 'Powerful stain removal detergent powder',
    unit: '1kg pack',
    inStock: true,
    rating: 4.3,
    reviews: 445,
    brand: 'Surf Excel',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Hotel/PG']
  },
  {
    id: 14,
    name: 'Kitchen Knife Set',
    category: 'Household',
    subcategory: 'Kitchen Utensils',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400',
    description: 'Stainless steel knife set for all kitchen needs',
    unit: '5 pieces set',
    inStock: true,
    rating: 4.2,
    reviews: 123,
    brand: 'Pigeon',
    businessTypes: ['Supermarket', 'Restaurant', 'Hotel/PG']
  },
  {
    id: 15,
    name: 'LED Bulb 9W',
    category: 'Household',
    subcategory: 'Electrical Items',
    price: 149,
    originalPrice: 199,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400',
    description: 'Energy efficient LED bulb with warm white light',
    unit: '1 piece',
    inStock: true,
    rating: 4.4,
    reviews: 567,
    brand: 'Philips',
    businessTypes: ['Kirana Shop', 'Supermarket', 'Electronics Shop']
  }
];

export const festivalOffers = [
  {
    id: 'fest1',
    title: 'Diwali Special Bundle',
    description: 'Complete festive essentials pack',
    originalPrice: 2500,
    offerPrice: 1999,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1605979399843-5f7223e46b52?w=400',
    products: [1, 2, 3, 11], // Rice, Dal, Oil, Atta
    validTill: '2024-11-15',
    active: false // Will be set to true during festival season
  },
  {
    id: 'fest2',
    title: 'New Year Health Pack',
    description: 'Start your year with healthy choices',
    originalPrice: 1200,
    offerPrice: 999,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    products: [12, 9], // Green Tea, Paracetamol
    validTill: '2025-01-31',
    active: false
  }
];

// Helper function to get products by business type
export const getProductsByBusinessType = (businessType) => {
  const allowedCategories = businessTypes[businessType] || [];
  return sampleProducts.filter(product => 
    product.businessTypes.includes(businessType) ||
    allowedCategories.includes(product.category)
  );
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return sampleProducts.filter(product => product.category === category);
};

// Helper function to search products
export const searchProducts = (query, businessType = null) => {
  let products = businessType ? getProductsByBusinessType(businessType) : sampleProducts;
  
  if (!query) return products;
  
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.subcategory.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );
};