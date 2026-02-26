
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export const useProducts = () => {
  const products = ref<Product[]>([
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://placehold.co/600x600?text=Backpack",
      rating: { rate: 3.9, count: 120 }
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image: "https://placehold.co/600x600?text=T-Shirt",
      rating: { rate: 4.1, count: 259 }
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://placehold.co/600x600?text=Jacket",
      rating: { rate: 4.7, count: 500 }
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "men's clothing",
      image: "https://placehold.co/600x600?text=Slim+Fit",
      rating: { rate: 2.1, count: 430 }
    },
    {
      id: 5,
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: "jewelery",
      image: "https://placehold.co/600x600?text=Bracelet",
      rating: { rate: 4.6, count: 400 }
    },
    {
      id: 6,
      title: "Solid Gold Petite Micropave ",
      price: 168,
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
      category: "jewelery",
      image: "https://placehold.co/600x600?text=Gold+Ring",
      rating: { rate: 3.9, count: 70 }
    },
    {
      id: 7,
      title: "White Gold Plated Princess",
      price: 9.99,
      description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
      category: "jewelery",
      image: "https://placehold.co/600x600?text=Plated+Ring",
      rating: { rate: 3, count: 400 }
    },
    {
      id: 8,
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: 10.99,
      description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
      category: "jewelery",
      image: "https://placehold.co/600x600?text=Earrings",
      rating: { rate: 1.9, count: 100 }
    }
  ])

  const getProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.value)
      }, 800)
    })
  }

  const getProductById = async (id: number): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.value.find(p => p.id === id))
      }, 500)
    })
  }

  return {
    products,
    getProducts,
    getProductById
  }
}
