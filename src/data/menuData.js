export const RESTAURANT_INFO = {
  name: 'Zaiqa Palace & Grill',
  tagline: 'Authentic Royal Flavors & Modern Desi Culinary Excellence',
  phone: '+92 300 1234567',
  address: 'ASF Skyview Commercial, Airport Road, Karachi, Pakistan',
  timings: '12:00 PM – 1:00 AM (Mon - Sun)',
  rating: '4.9',
  reviewsCount: '1,840+ reviews',
};

export const MENU_CATEGORIES = [
  'All',
  'Chef Specials',
  'Biryani & Rice',
  'Karahi & Handi',
  'BBQ & Grill',
  'Fast Food & Breads',
  'Desserts & Drinks'
];

export const DISHES = [
  {
    id: 'dish-1',
    name: 'Special Sindhi Dum Biryani',
    category: 'Biryani & Rice',
    price: 550,
    rating: 4.9,
    prepTime: '20-25 min',
    spicyLevel: 'Medium-Spicy',
    badge: "Chef's Special",
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    description: 'Fragrant long-grain aged basmati rice slow-cooked on dum with tender spiced chicken, golden potatoes, dried plum, and fresh mint.'
  },
  {
    id: 'dish-2',
    name: 'Mutton Shinwari Karahi',
    category: 'Karahi & Handi',
    price: 1850,
    rating: 5.0,
    prepTime: '30-35 min',
    spicyLevel: 'Mild',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    description: 'Tender fresh mutton cooked in traditional iron wok with organic ripe tomatoes, crushed ginger, green chilies, and black pepper.'
  },
  {
    id: 'dish-3',
    name: 'Boneless Chicken Makhni Handi',
    category: 'Karahi & Handi',
    price: 950,
    rating: 4.8,
    prepTime: '20-25 min',
    spicyLevel: 'Mild-Sweet',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
    description: 'Succulent boneless chicken simmered in clay handi with rich velvet butter gravy, dairy cream, cashews, and aromatic kasuri methi.'
  },
  {
    id: 'dish-4',
    name: 'Charcoal Seekh Kabab Platter',
    category: 'BBQ & Grill',
    price: 750,
    rating: 4.9,
    prepTime: '15-20 min',
    spicyLevel: 'Medium',
    badge: 'BBQ Flame',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    description: '4 skewers of melt-in-mouth minced beef infused with raw papaya, roasted cumin, and coriander, grilled over open glowing coals.'
  },
  {
    id: 'dish-5',
    name: 'Chicken Reshmi Malai Boti',
    category: 'BBQ & Grill',
    price: 850,
    rating: 4.8,
    prepTime: '20-25 min',
    spicyLevel: 'Mild',
    badge: 'Kids Friendly',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    description: 'Boneless chicken cubes marinated overnight in heavy cream, green cardamom, white pepper, and mild melted cheese.'
  },
  {
    id: 'dish-6',
    name: 'Double Gourmet Smashed Burger',
    category: 'Fast Food & Breads',
    price: 650,
    rating: 4.7,
    prepTime: '15 min',
    spicyLevel: 'Medium',
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description: 'Double 100% prime beef patties crisped on flat griddle, double American cheddar cheese, caramelized onions, and house burger sauce.'
  },
  {
    id: 'dish-7',
    name: 'Tandoori Garlic Butter Naan (2 pcs)',
    category: 'Fast Food & Breads',
    price: 180,
    rating: 4.9,
    prepTime: '10 min',
    spicyLevel: 'Non-Spicy',
    badge: 'Tandoor Fresh',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    description: 'Clay-oven baked fluffy naan bread brushed generously with pure butter, roasted crushed garlic, and fresh coriander leaves.'
  },
  {
    id: 'dish-8',
    name: 'Shahi Gulab Jamun & Rabri (2 pcs)',
    category: 'Desserts & Drinks',
    price: 350,
    rating: 4.9,
    prepTime: '5-10 min',
    spicyLevel: 'Sweet',
    badge: 'Dessert King',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    description: 'Warm golden milk-solid dumplings soaked in saffron-rose cardamom syrup, garnished with silver leaf and crushed pistachios.'
  },
  {
    id: 'dish-9',
    name: 'Royal Mint Lemonade & Lassi',
    category: 'Desserts & Drinks',
    price: 220,
    rating: 4.8,
    prepTime: '5 min',
    spicyLevel: 'Refreshing',
    badge: 'Chilled',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    description: 'Crushed garden mint, freshly squeezed lemon juice, black rock salt, chilled sparkling soda and crushed mountain ice.'
  }
];

export const getAllDishes = () => {
  try {
    const custom = localStorage.getItem('restaurant_custom_menu_items');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return [...DISHES, ...parsed];
      }
    }
  } catch (e) {
    // fallback to default
  }
  return DISHES;
};
