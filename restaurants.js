// Default image for fallback
const DEFAULT_IMAGE = 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg';

// Restaurant data
const restaurants = [
    {
        id: 1,
        name: "La Piazza",
        cuisine: "Italian",
        rating: 4.5,
        deliveryTime: "30-40 min",
        image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
        isOpen: true,
        menu: [
            {
                id: "1-1",
                name: "Margherita Pizza",
                description: "Classic tomato sauce, fresh mozzarella, basil",
                price: 14.99,
                image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
                isVeg: true,
                dietTypes: ["vegetarian"],
                nutrition: {
                    calories: 850,
                    protein: 15,
                    carbs: 90,
                    fat: 12,
                },
                allergens: ["gluten", "dairy"]
            },
            {
                id: "1-2",
                name: "Pasta Carbonara",
                description: "Spaghetti with creamy egg sauce, pancetta, parmesan",
                price: 16.99,
                image: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg",
                isVeg: false,
                nutrition: {
                    calories: 950,
                    protein: 25,
                    carbs: 85,
                    fat: 18,
                },
                allergens: ["gluten", "dairy", "egg"]
            }
        ]
    },
    {
        id: 2,
        name: "Taj Mahal",
        cuisine: "Indian",
        rating: 4.3,
        deliveryTime: "40-50 min",
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
        isOpen: true,
        menu: [
            {
                id: "2-1",
                name: "Butter Chicken",
                description: "Tender chicken in rich tomato-butter sauce",
                price: 18.99,
                image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
                isVeg: false,
                nutrition: {
                    calories: 750,
                    protein: 32,
                    carbs: 45,
                    fat: 22,
                },
                allergens: ["dairy"]
            },
            {
                id: "2-2",
                name: "Palak Paneer",
                description: "Cottage cheese cubes in spinach gravy",
                price: 15.99,
                image: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg",
                isVeg: true,
                dietTypes: ["vegetarian"],
                nutrition: {
                    calories: 550,
                    protein: 18,
                    carbs: 35,
                    fat: 16,
                },
                allergens: ["dairy"]
            }
        ]
    },
    {
        id: 3,
        name: "Dragon Wok",
        cuisine: "Chinese",
        rating: 4.4,
        deliveryTime: "25-35 min",
        image: "https://images.pexels.com/photos/1058714/pexels-photo-1058714.jpeg",
        isOpen: true,
        menu: [
            {
                id: "3-1",
                name: "Kung Pao Chicken",
                description: "Spicy diced chicken with peanuts and vegetables",
                price: 16.99,
                image: "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg",
                isVeg: false,
                nutrition: {
                    calories: 650,
                    protein: 28,
                    carbs: 42,
                    fat: 14,
                },
                allergens: ["peanuts"]
            },
            {
                id: "3-2",
                name: "Vegetable Spring Rolls",
                description: "Crispy rolls filled with mixed vegetables",
                price: 8.99,
                image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg",
                isVeg: true,
                dietTypes: ["vegetarian", "vegan"],
                nutrition: {
                    calories: 350,
                    protein: 8,
                    carbs: 45,
                    fat: 12,
                },
                allergens: ["gluten"]
            }
        ]
    },
    {
        id: 4,
        name: "Sushi Master",
        cuisine: "Japanese",
        rating: 4.7,
        deliveryTime: "35-45 min",
        image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
        isOpen: true,
        menu: [
            {
                id: "4-1",
                name: "Rainbow Roll",
                description: "California roll topped with assorted sashimi",
                price: 19.99,
                image: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg",
                isVeg: false,
                nutrition: {
                    calories: 450,
                    protein: 24,
                    carbs: 55,
                    fat: 10,
                },
                allergens: ["fish", "shellfish"]
            },
            {
                id: "4-2",
                name: "Vegetable Tempura",
                description: "Assorted vegetables in crispy batter",
                price: 12.99,
                image: "https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg",
                isVeg: true,
                dietTypes: ["vegetarian"],
                nutrition: {
                    calories: 400,
                    protein: 6,
                    carbs: 48,
                    fat: 15,
                },
                allergens: ["gluten"]
            }
        ]
    },
    {
        id: 5,
        name: "El Taco Loco",
        cuisine: "Mexican",
        rating: 4.2,
        deliveryTime: "25-35 min",
        image: "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg",
        isOpen: true,
        menu: [
            {
                id: "5-1",
                name: "Carne Asada Tacos",
                description: "Grilled steak tacos with onions and cilantro",
                price: 13.99,
                image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
                isVeg: false,
                nutrition: {
                    calories: 550,
                    protein: 28,
                    carbs: 35,
                    fat: 16,
                },
                allergens: []
            },
            {
                id: "5-2",
                name: "Veggie Burrito Bowl",
                description: "Rice, beans, vegetables, guacamole, and salsa",
                price: 14.99,
                image: "https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg",
                isVeg: true,
                dietTypes: ["vegetarian", "vegan"],
                nutrition: {
                    calories: 650,
                    protein: 15,
                    carbs: 85,
                    fat: 18,
                },
                allergens: []
            }
        ]
    }
];
