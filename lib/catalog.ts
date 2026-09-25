export type StockStatus = "in-stock" | "low-stock" | "sold-out";
export type MenuBadge = "new" | "popular" | "signature";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  eyebrow: string;
  blurb: string;
  glow: string;
  active: boolean;
  featured: boolean;
  /** Optional so existing Firestore products continue to work without a migration. */
  availability?: StockStatus;
  menuBadge?: MenuBadge;
  sortOrder: number;
};

export type Flavour = {
  id: string;
  name: string;
  image: string;
  accent: string;
  description: string;
  active: boolean;
  sortOrder: number;
};

export type GalleryItem = {
  id: string;
  title: string;
  tag: string;
  image: string;
  active: boolean;
  sortOrder: number;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  cta: string;
  promoCode?: string;
  ctaUrl?: string;
  badge?: string;
  offerText?: string;
  startDate?: string;
  endDate?: string;
  terms?: string;
  active: boolean;
  sortOrder: number;
};

export type LocationItem = {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  mapUrl: string;
  active: boolean;
  sortOrder: number;
};

export type StoreSettings = {
  id: string;
  status: "open" | "limited" | "closed";
  message: string;
  hours: string;
  orderPhone: string;
  orderEnabled: boolean;
  active: boolean;
  sortOrder: number;
};

export const defaultProducts: Product[] = [
  { id:"ice-chock", name:"Ice Chock", price:120, image:"/products/ice-chock.webp", eyebrow:"COLD · CRISP · CHOCOLATE", blurb:"A chilled JIC favourite with a chocolate-forward finish.", glow:"#4aa7ff", active:true, featured:true, menuBadge:"popular", sortOrder:1 },
  { id:"ice-cream-cup", name:"Ice Cream Cup", price:150, image:"/products/ice-cream-cup.webp", eyebrow:"CREAMY · CLASSIC · EASY", blurb:"A familiar JIC cup made for an easy scoop-and-enjoy moment.", glow:"#ff7dad", active:true, featured:true, menuBadge:"new", sortOrder:2 },
  { id:"cup-cone", name:"Cup Cone", price:150, image:"/products/cup-cone.webp", eyebrow:"CRUNCH · SCOOP · JOY", blurb:"The best of cup comfort and cone crunch in one playful serve.", glow:"#ffb454", active:true, featured:true, sortOrder:3 },
  { id:"waffle-cone", name:"Waffle Cone", price:200, image:"/products/waffle-cone.webp", eyebrow:"BOLD · CRUNCHY · LOADED", blurb:"A generous scoop experience wrapped in a crisp waffle cone.", glow:"#f0bf54", active:true, featured:true, menuBadge:"popular", sortOrder:4 },
  { id:"waffle-boat", name:"Waffle Boat", price:250, image:"/products/waffle-boat.webp", eyebrow:"SHARE · SCOOP · INDULGE", blurb:"A dessert-style JIC serve built for texture, toppings and fun.", glow:"#c97b47", active:true, featured:true, sortOrder:5 },
  { id:"mini-special", name:"Mini Special", price:500, image:"/products/mini-special.webp", eyebrow:"LAYERED · PLAYFUL · SPECIAL", blurb:"A colourful layered treat for when one scoop simply is not enough.", glow:"#ff6c9f", active:true, featured:true, sortOrder:6 },
  { id:"special", name:"Special", price:500, image:"/products/special.webp", eyebrow:"SIGNATURE · GENEROUS · CELEBRATE", blurb:"A JIC signature built to turn an ordinary craving into an occasion.", glow:"#ffd36b", active:true, featured:true, menuBadge:"signature", sortOrder:7 },
];

export const defaultStoreSettings: StoreSettings[] = [
  {
    id: "current",
    status: "open",
    message: "We are ready to make your day sweeter.",
    hours: "Message us to confirm today's availability.",
    orderPhone: "+94776015041",
    orderEnabled: true,
    active: true,
    sortOrder: 1,
  },
];

export const defaultFlavours: Flavour[] = [
  { id:"strawberry", name:"Strawberry", image:"/flavours/strawberry.webp", accent:"#d8315b", description:"Ruby, bright and joyful.", active:true, sortOrder:1 },
  { id:"mango", name:"Mango", image:"/flavours/mango.webp", accent:"#f7a31b", description:"Tropical, warm and sunny.", active:true, sortOrder:2 },
  { id:"chocolate", name:"Chocolate", image:"/flavours/chocolate.webp", accent:"#5b2d1d", description:"Deep cocoa indulgence.", active:true, sortOrder:3 },
  { id:"vanilla", name:"Vanilla", image:"/flavours/vanilla.webp", accent:"#ead9a5", description:"Soft ivory with a golden finish.", active:true, sortOrder:4 },
  { id:"mix-fruit", name:"Mix Fruit", image:"", accent:"#168c64", description:"Fresh emerald energy.", active:true, sortOrder:5 },
];

export const defaultGallery: GalleryItem[] = [
  {id:"g1", image:"/products/waffle-cone.webp", title:"Waffle Cone", tag:"Crisp · Creamy · JIC", active:true, sortOrder:1},
  {id:"g2", image:"/flavours/strawberry.webp", title:"Strawberry", tag:"Ruby flavour world", active:true, sortOrder:2},
  {id:"g3", image:"/products/waffle-boat.webp", title:"Waffle Boat", tag:"A bowl made to disappear", active:true, sortOrder:3},
  {id:"g4", image:"/flavours/mango.webp", title:"Mango", tag:"Tropical, bright and bold", active:true, sortOrder:4},
  {id:"g5", image:"/products/special.webp", title:"Special", tag:"Made for the full craving", active:true, sortOrder:5},
  {id:"g6", image:"/flavours/chocolate.webp", title:"Chocolate", tag:"Deep cocoa indulgence", active:true, sortOrder:6},
  {id:"g7", image:"/products/ice-chock.webp", title:"Ice Chock", tag:"A JIC classic", active:true, sortOrder:7},
  {id:"g8", image:"/flavours/vanilla.webp", title:"Vanilla", tag:"Soft ivory, warm gold", active:true, sortOrder:8},
];
