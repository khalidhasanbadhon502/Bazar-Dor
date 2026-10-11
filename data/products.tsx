export type Unit = "কেজি" | "লিটার" | "ডজন" | "পিস";

export interface Product {
  id: number;
  name: string;
  unit: Unit;
  icon: string;
  price: number;
  change: number; 
}

export const products: Product[] = [
  { id: 1, name: "স্বর্ণমাছি চাল", unit: "কেজি", icon: "🍚", price: 148, change: 2.1 },
  { id: 2, name: "মিনিকেট চাল", unit: "কেজি", icon: "🍚", price: 99, change: -2.9 },
  { id: 3, name: "নাজির চাল", unit: "কেজি", icon: "🍚", price: 74, change: 0 },
  { id: 4, name: "বাটাম সাইজ চাল", unit: "কেজি", icon: "🍚", price: 66, change: 3.4 },
  { id: 5, name: "মসুর ডাল", unit: "কেজি", icon: "🫘", price: 142, change: 2.9 },
  { id: 6, name: "মুগ ডাল", unit: "কেজি", icon: "🫘", price: 135, change: 0 },
  { id: 7, name: "ছোলা", unit: "কেজি", icon: "🫘", price: 120, change: -2.8 },
  { id: 8, name: "আমন ডাল (খোসাসিলা)", unit: "কেজি", icon: "🫘", price: 156, change: 2.6 },
  { id: 9, name: "সরিষার তেল", unit: "লিটার", icon: "🫙", price: 192, change: 2.1 },
  { id: 10, name: "পাম তেল", unit: "কেজি", icon: "🥫", price: 168, change: -2.3 },
  { id: 11, name: "ঘানি ভাঙা সরিষার তেল", unit: "লিটার", icon: "🫙", price: 215, change: 2.8 },
  { id: 12, name: "আলু", unit: "কেজি", icon: "🥔", price: 30, change: -6.2 },
  { id: 13, name: "পেঁয়াজ", unit: "কেজি", icon: "🧅", price: 54, change: 12.5 },
  { id: 14, name: "কাঁচামরিচ", unit: "কেজি", icon: "🌶️", price: 92, change: -12.8 },
  { id: 15, name: "বেগুন", unit: "কেজি", icon: "🍆", price: 44, change: 4.8 },
  { id: 16, name: "ঢেঁড়স", unit: "কেজি", icon: "🟢", price: 38, change: 0 },
  { id: 17, name: "রুই মাছ", unit: "কেজি", icon: "🐟", price: 46, change: 4.5 },
  { id: 18, name: "তেলাপিয়া", unit: "কেজি", icon: "🐟", price: 36, change: 0 },
  { id: 19, name: "ইলিশ মাছ", unit: "কেজি", icon: "🐠", price: 1850, change: 3.4 },
  { id: 20, name: "কাতলা মাছ", unit: "কেজি", icon: "🐠", price: 43, change: -4.8 },
  { id: 21, name: "চিংড়ি মাছ (খোলা)", unit: "কেজি", icon: "🍤", price: 330, change: 3.1 },
  { id: 22, name: "মুরগির মাংস", unit: "কেজি", icon: "🍗", price: 225, change: -1.3 },
  { id: 23, name: "গরুর মাংস", unit: "কেজি", icon: "🥩", price: 790, change: -1.2 },
  { id: 24, name: "খাসির মাংস", unit: "কেজি", icon: "🍖", price: 1290, change: -3.0 },
  { id: 25, name: "হাঁসের মাংস", unit: "কেজি", icon: "🦆", price: 285, change: -3.8 },
  { id: 26, name: "ডিম", unit: "ডজন", icon: "🥚", price: 158, change: 3.9 },
  { id: 27, name: "দুধ", unit: "লিটার", icon: "🥛", price: 102, change: 2.0 },
  { id: 28, name: "দই", unit: "লিটার", icon: "🥣", price: 92, change: 0 },
  { id: 29, name: "মাখন (১০০ গ্রাম)", unit: "পিস", icon: "🧈", price: 145, change: 3.6 },
  { id: 30, name: "আদা", unit: "কেজি", icon: "🫚", price: 85, change: 9.0 },
  { id: 31, name: "রসুন", unit: "কেজি", icon: "🧄", price: 125, change: -7.8 },
  { id: 32, name: "মরিচ গুঁড়া", unit: "কেজি", icon: "🌶️", price: 245, change: -2.0 },
  { id: 33, name: "ধনেপাতা গুঁড়া", unit: "কেজি", icon: "🌿", price: 265, change: 0 },
];