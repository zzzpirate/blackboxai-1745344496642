// Diet Types
const DIET_TYPES = {
    KETO: 'keto',
    VEGAN: 'vegan',
    VEGETARIAN: 'vegetarian',
    DIABETIC_FRIENDLY: 'diabetic-friendly',
    GLUTEN_FREE: 'gluten-free',
    LOW_CARB: 'low-carb'
};

// Allergens
const ALLERGENS = {
    NUTS: 'nuts',
    DAIRY: 'dairy',
    GLUTEN: 'gluten',
    SHELLFISH: 'shellfish',
    EGGS: 'eggs',
    SOY: 'soy'
};

const restaurants = [
    {
        id: "r1",
        name: "La Piazza",
        cuisine: "Italian",
        rating: 4.5,
        deliveryTime: "30-40 min",
        image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
        menu: [
            {
                id: "d1",
                name: "Margherita Pizza",
                price: 14.99,
                description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
                image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
                category: "Pizza",
                isVeg: true,
                nutrition: {
                    calories: 266,
                    protein: 11,
                    carbs: 33,
                    fat: 10,
                    fiber: 2
                },
                dietTypes: [DIET_TYPES.VEGETARIAN],
                allergens: [ALLERGENS.DAIRY, ALLERGENS.GLUTEN],
                healthTags: ['High Protein', 'Fresh Ingredients']
            },
            {
                id: "d2",
                name: "Pasta Carbonara",
                price: 16.99,
                description: "Creamy pasta with pancetta and parmesan",
                image: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg",
                category: "Pasta",
                isVeg: false,
                nutrition: {
                    calories: 380,
                    protein: 15,
                    carbs: 45,
                    fat: 18,
                    fiber: 2
                },
                dietTypes: [],
                allergens: [ALLERGENS.DAIRY, ALLERGENS.GLUTEN, ALLERGENS.EGGS],
                healthTags: ['High Protein', 'Rich in Vitamin B']
            }
        ]
    },
    {
        id: "r2",
        name: "Taj Mahal",
        cuisine: "Indian",
        rating: 4.3,
        deliveryTime: "35-45 min",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
        menu: [
            {
                id: "d3",
                name: "Butter Chicken",
                price: 18.99,
                description: "Creamy tomato curry with tender chicken",
                image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
                category: "Main Course",
                isVeg: false,
                nutrition: {
                    calories: 490,
                    protein: 32,
                    carbs: 12,
                    fat: 35,
                    fiber: 3
                },
                dietTypes: [DIET_TYPES.LOW_CARB],
                allergens: [ALLERGENS.DAIRY],
                healthTags: ['High Protein', 'Rich in Vitamin B12']
            },
            {
                id: "d4",
                name: "Paneer Tikka",
                price: 15.99,
                description: "Grilled cottage cheese with spices",
                image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg",
                category: "Appetizer",
                isVeg: true,
                nutrition: {
                    calories: 320,
                    protein: 18,
                    carbs: 8,
                    fat: 24,
                    fiber: 2
                },
                dietTypes: [DIET_TYPES.VEGETARIAN, DIET_TYPES.LOW_CARB],
                allergens: [ALLERGENS.DAIRY],
                healthTags: ['High Protein', 'Good Source of Calcium']
            }
        ]
    },
    {
        id: "r3",
        name: "Dragon Wok",
        cuisine: "Chinese",
        rating: 4.4,
        deliveryTime: "25-35 min",
        image: "https://images.pexels.com/photos/1058714/pexels-photo-1058714.jpeg",
        menu: [
            {
                id: "d5",
                name: "Kung Pao Chicken",
                price: 16.99,
                description: "Spicy diced chicken with peanuts and vegetables",
                image: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg",
                category: "Main Course",
                isVeg: false,
                nutrition: {
                    calories: 420,
                    protein: 28,
                    carbs: 20,
                    fat: 26,
                    fiber: 4
                },
                dietTypes: [DIET_TYPES.LOW_CARB],
                allergens: [ALLERGENS.NUTS, ALLERGENS.SOY],
                healthTags: ['High Protein', 'Contains Healthy Fats']
            },
            {
                id: "d6",
                name: "Vegetable Spring Rolls",
                price: 8.99,
                description: "Crispy rolls filled with mixed vegetables",
                image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg",
                category: "Appetizer",
                isVeg: true,
                nutrition: {
                    calories: 180,
                    protein: 4,
                    carbs: 28,
                    fat: 8,
                    fiber: 3
                },
                dietTypes: [DIET_TYPES.VEGAN, DIET_TYPES.VEGETARIAN],
                allergens: [ALLERGENS.GLUTEN],
                healthTags: ['Low Calorie', 'Rich in Vegetables']
            }
        ]
    },
    {
        id: "r4",
        name: "El Mariachi",
        cuisine: "Mexican",
        rating: 4.6,
        deliveryTime: "30-40 min",
        image: "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg",
        menu: [
            {
                id: "d7",
                name: "Beef Tacos",
                price: 12.99,
                description: "Three soft tacos with seasoned beef and toppings",
                image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
                category: "Main Course",
                isVeg: false,
                nutrition: {
                    calories: 450,
                    protein: 28,
                    carbs: 35,
                    fat: 22,
                    fiber: 5
                },
                dietTypes: [],
                allergens: [ALLERGENS.GLUTEN],
                healthTags: ['High Protein', 'Contains Fresh Vegetables']
            },
            {
                id: "d8",
                name: "Guacamole & Chips",
                price: 9.99,
                description: "Fresh avocado dip with tortilla chips",
                image: "https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg",
                category: "Appetizer",
                isVeg: true,
                nutrition: {
                    calories: 380,
                    protein: 6,
                    carbs: 42,
                    fat: 28,
                    fiber: 8
                },
                dietTypes: [DIET_TYPES.VEGAN, DIET_TYPES.VEGETARIAN, DIET_TYPES.GLUTEN_FREE],
                allergens: [],
                healthTags: ['Heart Healthy Fats', 'Good Source of Fiber']
            }
        ]
    },
    {
        id: "r5",
        name: "Sakura",
        cuisine: "Japanese",
        rating: 4.7,
        deliveryTime: "35-45 min",
        image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
        menu: [
            {
                id: "d9",
                name: "Salmon Sushi Roll",
                price: 19.99,
                description: "Fresh salmon roll with avocado",
                image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
                category: "Sushi",
                isVeg: false,
                nutrition: {
                    calories: 320,
                    protein: 18,
                    carbs: 38,
                    fat: 12,
                    fiber: 2
                },
                dietTypes: [DIET_TYPES.GLUTEN_FREE],
                allergens: [ALLERGENS.FISH],
                healthTags: ['Rich in Omega-3', 'High Protein']
            },
            {
                id: "d10",
                name: "Vegetable Tempura",
                price: 13.99,
                description: "Crispy battered mixed vegetables",
                image: "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg",
                category: "Appetizer",
                isVeg: true,
                nutrition: {
                    calories: 280,
                    protein: 6,
                    carbs: 32,
                    fat: 16,
                    fiber: 4
                },
                dietTypes: [DIET_TYPES.VEGETARIAN],
                allergens: [ALLERGENS.GLUTEN],
                healthTags: ['Variety of Vegetables', 'Light and Crispy']
            }
        ]
    },
    {
        id: "r6",
        name: "Thai Orchid",
        cuisine: "Thai",
        rating: 4.5,
        deliveryTime: "40-50 min",
        image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
        menu: [
            {
                id: "d11",
                name: "Pad Thai",
                price: 15.99,
                description: "Classic Thai stir-fried rice noodles with shrimp",
                image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
                category: "Main Course",
                isVeg: false
            },
            {
                id: "d12",
                name: "Green Curry",
                price: 16.99,
                description: "Spicy coconut curry with vegetables",
                image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
                category: "Main Course",
                isVeg: true
            }
        ]
    },
    {
        id: "r7",
        name: "Mediterranean Delight",
        cuisine: "Mediterranean",
        rating: 4.6,
        deliveryTime: "35-45 min",
        image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
        menu: [
            {
                id: "d13",
                name: "Falafel Plate",
                price: 14.99,
                description: "Crispy falafel with hummus and pita",
                image: "https://images.pexels.com/photos/1618898/pexels-photo-1618898.jpeg",
                category: "Main Course",
                isVeg: true
            },
            {
                id: "d14",
                name: "Shawarma Wrap",
                price: 12.99,
                description: "Grilled chicken with garlic sauce",
                image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
                category: "Main Course",
                isVeg: false
            }
        ]
    },
    {
        id: "r8",
        name: "American Diner",
        cuisine: "American",
        rating: 4.3,
        deliveryTime: "25-35 min",
        image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
        menu: [
            {
                id: "d15",
                name: "Classic Burger",
                price: 13.99,
                description: "Angus beef patty with cheese and fries",
                image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
                category: "Main Course",
                isVeg: false
            },
            {
                id: "d16",
                name: "Caesar Salad",
                price: 10.99,
                description: "Fresh romaine with parmesan and croutons",
                image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg",
                category: "Salads",
                isVeg: true
            }
        ]
    },
    {
        id: "r9",
        name: "Le Bistro",
        cuisine: "French",
        rating: 4.8,
        deliveryTime: "45-55 min",
        image: "https://images.pexels.com/photos/299410/pexels-photo-299410.jpeg",
        menu: [
            {
                id: "d17",
                name: "Coq au Vin",
                price: 24.99,
                description: "Braised chicken in red wine sauce",
                image: "https://images.pexels.com/photos/299410/pexels-photo-299410.jpeg",
                category: "Main Course",
                isVeg: false
            },
            {
                id: "d18",
                name: "Ratatouille",
                price: 18.99,
                description: "Classic Provençal vegetable stew",
                image: "https://images.pexels.com/photos/5908226/pexels-photo-5908226.jpeg",
                category: "Main Course",
                isVeg: true
            }
        ]
    },
    {
        id: "r10",
        name: "Seoul Kitchen",
        cuisine: "Korean",
        rating: 4.6,
        deliveryTime: "35-45 min",
        image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg",
        menu: [
            {
                id: "d19",
                name: "Bibimbap",
                price: 16.99,
                description: "Mixed rice bowl with vegetables and egg",
                image: "https://images.pexels.com/photos/5339079/pexels-photo-5339079.jpeg",
                category: "Main Course",
                isVeg: false
            },
            {
                id: "d20",
                name: "Kimchi Fried Rice",
                price: 14.99,
                description: "Spicy fried rice with kimchi and vegetables",
                image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg",
                category: "Main Course",
                isVeg: true
            }
        ]
    }
];

// Default cutlery icon for failed image loads
const DEFAULT_IMAGE = "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg";
