import mongoose from "mongoose";
import 'dotenv/config';
import {Product} from './models/index.js';

const U = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const seedData = [

  // ── YOSEMITE ──────────────────────────────────────────────
  {
    id: "yos-photo-elcap",
    slug: "yosemite-el-capitan-dawn",
    name: "El Capitan at Dawn",
    park: "yosemite",
    style: "photography",
    basePrice: 24.99,
    rating: 4.9,
    reviewCount: 318,
    tags: ["bestseller", "landscape", "sunrise"],
    inStock: true,
    featured: true,
    newArrival: false,
    description:
      "First light strikes the sheer granite face of El Capitan, turning the stone from gray to gold. Shot from Valley View at 6:02 AM in early April. Archival pigment inks on 100% cotton rag paper.",
    details: [
      "Printed on acid-free 300gsm cotton rag",
      "Archival pigment inks — 100+ year fade resistance",
      "Ships rolled in protective tube within 3–5 business days",
      "Certificate of print edition included",
    ],
    images: [
      { url: U("1472396961693-142e6e269027"), alt: "El Capitan granite wall at dawn, Yosemite" },
      { url: U("1553029230-2be4f5c23de8"), alt: "Valley floor view toward El Capitan" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24", "24x36"],
    finishes: ["matte", "luster"],
    stockByVariant: {
      "8x10-matte": 40, "8x10-luster": 30,
      "11x14-matte": 25, "11x14-luster": 20,
      "16x20-matte": 15, "16x20-luster": 12,
      "18x24-matte": 8,  "18x24-luster": 6,
      "24x36-matte": 4,  "24x36-luster": 3,
    },
  },

  {
    id: "yos-vintage-001",
    slug: "yosemite-wpa-half-dome",
    name: "Half Dome — Vintage WPA Style",
    park: "yosemite",
    style: "vintage",
    basePrice: 21.99,
    rating: 4.8,
    reviewCount: 204,
    tags: ["wpa", "retro", "iconic"],
    inStock: true,
    featured: true,
    newArrival: false,
    description:
      "A love letter to the bold, flat-color travel posters of the 1930s Works Progress Administration. Half Dome rendered in five ink colors with hand-lettered typography. Printed on cream-toned uncoated stock.",
    details: [
      "Printed on 270gsm uncoated cream stock",
      "5-color screen-print aesthetic via pigment ink",
      "Aged, warm tones evoke original WPA lithography",
      "Ships flat in rigid mailer up to 11×14; rolled above",
    ],
    images: [
      { url: U("1669362991682-942f0e6832cf"), alt: "WPA-style poster of Half Dome, Yosemite" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24"],
    finishes: ["matte"],
    stockByVariant: {
      "8x10-matte": 50, "11x14-matte": 35,
      "16x20-matte": 20, "18x24-matte": 10,
    },
  },

  {
    id: "yos-water-001",
    slug: "yosemite-valley-watercolor",
    name: "Yosemite Valley — Watercolor",
    park: "yosemite",
    style: "watercolor",
    basePrice: 19.99,
    rating: 4.7,
    reviewCount: 97,
    tags: ["art", "soft", "gift"],
    inStock: true,
    featured: false,
    newArrival: true,
    description:
      "The sweep of Yosemite Valley in loose, luminous watercolor washes. Bridalveil Fall threads silver through the misty cliffs. A softer, more intimate take on an iconic landscape.",
    details: [
      "Giclée print on 310gsm watercolor-texture paper",
      "Reproduced from original hand-painted artwork",
      "Soft deckled-edge border (not trimmed to bleed)",
    ],
    images: [
      { url: U("1560310948-c87704426162"), alt: "Watercolor painting of Yosemite Valley" },
    ],
    sizes: ["8x10", "11x14", "16x20"],
    finishes: ["matte"],
    stockByVariant: {
      "8x10-matte": 60, "11x14-matte": 40, "16x20-matte": 18,
    },
  },

  // ── YELLOWSTONE ───────────────────────────────────────────
  {
    id: "yell-photo-prismatic",
    slug: "yellowstone-grand-prismatic",
    name: "Grand Prismatic Spring",
    park: "yellowstone",
    style: "photography",
    basePrice: 27.99,
    rating: 4.9,
    reviewCount: 271,
    tags: ["bestseller", "aerial", "color"],
    inStock: true,
    featured: true,
    newArrival: false,
    description:
      "The Grand Prismatic Spring from above — a psychedelic halo of deep blue, turquoise, gold, and rust stretching 370 feet across. Shot on a clear September morning when the steam was low and the colors peak vivid.",
    details: [
      "Aerial perspective shot from permitted drone flight",
      "Printed on 300gsm lustre photo paper",
      "Stunning color accuracy — this photo demands glossy or luster finish",
    ],
    images: [
      { url: U("1667400880490-6e4d44c7bedf"), alt: "Aerial view of Grand Prismatic Spring, Yellowstone" },
      { url: U("1694475393439-b42fc36599a0"), alt: "Boardwalk near thermal pools, Yellowstone" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24", "24x36"],
    finishes: ["glossy", "luster"],
    stockByVariant: {
      "8x10-glossy": 45, "8x10-luster": 30,
      "11x14-glossy": 28, "11x14-luster": 22,
      "16x20-glossy": 14, "16x20-luster": 10,
      "18x24-glossy": 7,  "18x24-luster": 5,
      "24x36-glossy": 3,  "24x36-luster": 2,
    },
  },

  {
    id: "yell-vintage-001",
    slug: "yellowstone-old-faithful-vintage",
    name: "Old Faithful — Vintage Travel Poster",
    park: "yellowstone",
    style: "vintage",
    basePrice: 21.99,
    rating: 4.7,
    reviewCount: 156,
    tags: ["wpa", "retro", "iconic"],
    inStock: true,
    featured: false,
    newArrival: false,
    description:
      "Old Faithful erupts against a midnight-blue sky in this bold retro travel poster. Inspired by the Union Pacific Railroad promotional posters of the 1930s. A timeless piece for any adventure-lover's wall.",
    details: [
      "5-color vintage palette on cream uncoated stock",
      "Original hand-lettered typeface",
      "Ships flat in rigid mailer up to 11×14",
    ],
    images: [
      { url: U("1586968332704-0160550f3ec1"), alt: "Vintage-style poster of Old Faithful geyser" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24"],
    finishes: ["matte"],
    stockByVariant: {
      "8x10-matte": 55, "11x14-matte": 38,
      "16x20-matte": 16, "18x24-matte": 8,
    },
  },

  {
    id: "yell-mini-001",
    slug: "yellowstone-bison-minimalist",
    name: "Bison Silhouette — Minimalist",
    park: "yellowstone",
    style: "minimalist",
    basePrice: 17.99,
    rating: 4.6,
    reviewCount: 88,
    tags: ["wildlife", "modern", "gift"],
    inStock: true,
    featured: false,
    newArrival: true,
    description:
      "A solitary bison rendered in a single warm-ink silhouette against an expanse of cream. Quiet, powerful, modern. Pairs beautifully with natural wood frames.",
    details: [
      "Single-color print on 270gsm uncoated stock",
      "Minimalist design — works in any interior style",
      "Ships flat in rigid mailer up to 11×14",
    ],
    images: [
      { url: U("1596918638939-cf4d365b6e03"), alt: "Minimalist bison silhouette poster, Yellowstone" },
    ],
    sizes: ["8x10", "11x14", "16x20"],
    finishes: ["matte"],
    stockByVariant: {
      "8x10-matte": 70, "11x14-matte": 50, "16x20-matte": 22,
    },
  },

  // ── GRAND CANYON ──────────────────────────────────────────
  {
    id: "gc-photo-sunrise",
    slug: "grand-canyon-south-rim-sunrise",
    name: "South Rim Sunrise",
    park: "grand-canyon",
    style: "photography",
    basePrice: 26.99,
    rating: 4.8,
    reviewCount: 193,
    tags: ["sunrise", "landscape", "bestseller"],
    inStock: true,
    featured: true,
    newArrival: false,
    description:
      "The canyon awakens. Layer upon layer of ancient red and ochre stone materializes from the dark as the sun crests the horizon. Shot from Mather Point at the winter solstice when the shadows are longest.",
    details: [
      "Printed on 300gsm cotton rag",
      "Archival pigment inks",
      "Wide-format print capability up to 24×36",
    ],
    images: [
      { url: U("1596433853251-12aa68b860f0"), alt: "Grand Canyon South Rim at sunrise" },
      { url: U("1596433853251-12aa68b860f0"), alt: "Grand Canyon layered rock formations at dawn" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24", "24x36"],
    finishes: ["matte", "luster"],
    stockByVariant: {
      "8x10-matte": 38, "8x10-luster": 25,
      "11x14-matte": 22, "11x14-luster": 18,
      "16x20-matte": 12, "16x20-luster": 9,
      "18x24-matte": 6,  "18x24-luster": 4,
      "24x36-matte": 3,  "24x36-luster": 2,
    },
  },

  {
    id: "gc-vintage-001",
    slug: "grand-canyon-vintage-wpa",
    name: "Grand Canyon — WPA Vintage",
    park: "grand-canyon",
    style: "vintage",
    basePrice: 21.99,
    rating: 4.8,
    reviewCount: 247,
    tags: ["wpa", "bestseller", "retro"],
    inStock: true,
    featured: true,
    newArrival: false,
    description:
      "One of the best-selling prints in the collection. The canyon's stacked buttes in four bold flat colors — the aesthetic of the original National Park Service posters from the 1930s, faithfully reimagined.",
    details: [
      "Bold 4-color palette on cream uncoated stock",
      "Ships flat in rigid mailer up to 11×14; rolled above",
    ],
    images: [
      { url: U("1608233650297-209481243f0c"), alt: "WPA-style vintage poster, Grand Canyon" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24"],
    finishes: ["matte"],
    stockByVariant: {
      "8x10-matte": 65, "11x14-matte": 44,
      "16x20-matte": 21, "18x24-matte": 9,
    },
  },

  // ── ZION ──────────────────────────────────────────────────
  {
    id: "zion-photo-narrows",
    slug: "zion-the-narrows",
    name: "The Narrows",
    park: "zion",
    style: "photography",
    basePrice: 24.99,
    rating: 4.9,
    reviewCount: 312,
    tags: ["bestseller", "canyon", "water"],
    inStock: true,
    featured: true,
    newArrival: false,
    description:
      "Hikers wade through the Virgin River beneath soaring slot-canyon walls streaked red and buff. The Narrows in peak summer light — the canyon only 20 feet wide, the walls 1,000 feet tall.",
    details: [
      "Shot with wide-angle tilt-shift lens to correct vertical distortion",
      "Printed on 300gsm cotton rag",
    ],
    images: [
      { url: U("1605588861095-4aae655e9906"), alt: "Hikers in The Narrows slot canyon, Zion" },
      { url: U("1605588861095-4aae655e9906"), alt: "Virgin River winding through Zion's Narrows" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24", "24x36"],
    finishes: ["matte", "luster"],
    stockByVariant: {
      "8x10-matte": 42, "8x10-luster": 28,
      "11x14-matte": 24, "11x14-luster": 18,
      "16x20-matte": 13, "16x20-luster": 8,
      "18x24-matte": 5,  "18x24-luster": 3,
      "24x36-matte": 2,  "24x36-luster": 2,
    },
  },

  {
    id: "zion-mini-angels-landing",
    slug: "zion-angels-landing-minimalist",
    name: "Angels Landing — Minimalist",
    park: "zion",
    style: "minimalist",
    basePrice: 18.99,
    rating: 4.7,
    reviewCount: 134,
    tags: ["hiking", "minimalist", "modern"],
    inStock: true,
    featured: false,
    newArrival: false,
    description:
      "The iconic silhouette of Angels Landing — the sheer sandstone fin rising 1,488 feet above the canyon floor — reduced to its essential geometry. Clean, bold, unmistakable.",
    details: [
      "Two-color print on 270gsm uncoated stock",
      "Ships flat in rigid mailer up to 11×14",
    ],
    images: [
      { url: U("1596910826615-e84c94ea92b7"), alt: "Minimalist poster of Angels Landing, Zion" },
    ],
    sizes: ["8x10", "11x14", "16x20"],
    finishes: ["matte"],
    stockByVariant: {
      "8x10-matte": 55, "11x14-matte": 38, "16x20-matte": 14,
    },
  },

  // ── GLACIER ───────────────────────────────────────────────
  {
    id: "glac-photo-hidden-lake",
    slug: "glacier-hidden-lake-overlook",
    name: "Hidden Lake Overlook",
    park: "glacier",
    style: "photography",
    basePrice: 25.99,
    rating: 4.8,
    reviewCount: 118,
    tags: ["alpine", "lake", "landscape"],
    inStock: true,
    featured: false,
    newArrival: false,
    description:
      "Looking down from the Logan Pass boardwalk at Hidden Lake — a milky turquoise jewel cradled by peaks still capped with snow in late July. Mountain goats graze the foreground meadow.",
    details: [
      "Printed on 300gsm cotton rag with archival inks",
      "Cool blue and white tones — stunning in luster finish",
    ],
    images: [
      { url: U("1608233696863-e55dbdab87fc"), alt: "Hidden Lake from overlook trail, Glacier National Park" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24", "24x36"],
    finishes: ["matte", "luster"],
    stockByVariant: {
      "8x10-matte": 30, "8x10-luster": 22,
      "11x14-matte": 18, "11x14-luster": 14,
      "16x20-matte": 9,  "16x20-luster": 7,
      "18x24-matte": 4,  "18x24-luster": 3,
      "24x36-matte": 2,  "24x36-luster": 0, // sold out
    },
  },

  {
    id: "glac-vintage-001",
    slug: "glacier-vintage-going-to-the-sun",
    name: "Going-to-the-Sun Road — Vintage",
    park: "glacier",
    style: "vintage",
    basePrice: 22.99,
    rating: 4.7,
    reviewCount: 89,
    tags: ["wpa", "retro", "road"],
    inStock: true,
    featured: false,
    newArrival: true,
    description:
      "The legendary Going-to-the-Sun Road winds along the Garden Wall in this WPA-inspired poster, rendered in the deep greens and blues of a Glacier summer evening.",
    details: [
      "6-color vintage palette on cream uncoated stock",
      "New to the collection — limited initial run",
    ],
    images: [
      { url: U("1599883617830-751287e2a87e"), alt: "Vintage travel poster of Glacier National Park" },
    ],
    sizes: ["8x10", "11x14", "16x20"],
    finishes: ["matte"],
    stockByVariant: {
      "8x10-matte": 40, "11x14-matte": 28, "16x20-matte": 12,
    },
  },

  // ── ARCHES ────────────────────────────────────────────────
  {
    id: "arch-photo-delicate",
    slug: "arches-delicate-arch-milkyway",
    name: "Delicate Arch & the Milky Way",
    park: "arches",
    style: "photography",
    basePrice: 28.99,
    rating: 5.0,
    reviewCount: 441,
    tags: ["bestseller", "nightsky", "iconic", "astrophotography"],
    inStock: true,
    featured: true,
    newArrival: false,
    description:
      "The undisputed icon of the collection. Delicate Arch frames the Milky Way on a moonless August night. 30-second exposure at ISO 6400, shot from below the arch bowl. The arch glows faintly amber from a single handheld light source.",
    details: [
      "Award-winning astrophotography",
      "Printed on 300gsm cotton rag — wide format up to 24×36",
      "Best in luster or matte — avoid glossy for dark sky prints",
      "Signed edition available on request",
    ],
    images: [
      { url: U("1617051571090-85766fa13621"), alt: "Delicate Arch with Milky Way, Arches National Park" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24", "24x36"],
    finishes: ["matte", "luster"],
    stockByVariant: {
      "8x10-matte": 55, "8x10-luster": 40,
      "11x14-matte": 32, "11x14-luster": 25,
      "16x20-matte": 16, "16x20-luster": 12,
      "18x24-matte": 9,  "18x24-luster": 7,
      "24x36-matte": 4,  "24x36-luster": 3,
    },
  },

  {
    id: "arch-mini-001",
    slug: "arches-minimalist-collection",
    name: "Three Arches — Minimalist Triptych",
    park: "arches",
    style: "minimalist",
    basePrice: 29.99, // set of three
    rating: 4.8,
    reviewCount: 76,
    tags: ["triptych", "set", "modern", "gift"],
    inStock: true,
    featured: false,
    newArrival: true,
    description:
      "A set of three companion prints — Delicate Arch, Landscape Arch, and Double Arch — each rendered in a single-line continuous contour style. Designed to hang side by side as a triptych. Price is per set.",
    details: [
      "Sold as a set of 3 prints",
      "Each print: one-line contour illustration in warm terracotta ink",
      "Designed as a triptych — same size across all three",
    ],
    images: [
      { url: U("1720986314926-063d9dd2bf28"), alt: "Three arch silhouettes, minimalist triptych poster set" },
    ],
    sizes: ["8x10", "11x14"],
    finishes: ["matte"],
    stockByVariant: {
      "8x10-matte": 30, "11x14-matte": 18,
    },
  },

  // ── OLYMPIC ───────────────────────────────────────────────
  {
    id: "olym-photo-hoh",
    slug: "olympic-hoh-rainforest",
    name: "Hoh Rain Forest",
    park: "olympic",
    style: "photography",
    basePrice: 24.99,
    rating: 4.8,
    reviewCount: 103,
    tags: ["rainforest", "green", "moody"],
    inStock: true,
    featured: false,
    newArrival: false,
    description:
      "Ancient maple and Sitka spruce draped in electric-green moss, the forest floor carpeted with oxalis. Shot on an overcast January morning when the light goes perfectly flat and every shade of green saturates to its limit.",
    details: [
      "One of the most color-accurate prints in the collection",
      "Matte finish recommended — preserves the subtle green tonal range",
    ],
    images: [
      { url: U("1628425192226-1c55c960a68d"), alt: "Hoh Rain Forest, Olympic National Park" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24"],
    finishes: ["matte", "luster"],
    stockByVariant: {
      "8x10-matte": 35, "8x10-luster": 20,
      "11x14-matte": 20, "11x14-luster": 12,
      "16x20-matte": 10, "16x20-luster": 6,
      "18x24-matte": 4,  "18x24-luster": 2,
    },
  },

  // ── ACADIA ────────────────────────────────────────────────
  {
    id: "acad-photo-cadillac",
    slug: "acadia-cadillac-mountain-fall",
    name: "Cadillac Mountain — Fall Foliage",
    park: "acadia",
    style: "photography",
    basePrice: 24.99,
    rating: 4.7,
    reviewCount: 89,
    tags: ["fall", "foliage", "east-coast"],
    inStock: true,
    featured: false,
    newArrival: false,
    description:
      "Cadillac Mountain ablaze in the peak of Maine fall color — red, amber, gold, and the cold Atlantic beyond. The first place in the US to see the sunrise on a clear morning.",
    details: [
      "Shot during peak foliage — second week of October",
      "Warm amber tones sing in glossy or luster finish",
    ],
    images: [
      { url: U("1609989290336-6bda5a061fff"), alt: "Cadillac Mountain fall foliage, Acadia National Park" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24"],
    finishes: ["matte", "luster", "glossy"],
    stockByVariant: {
      "8x10-matte": 30, "8x10-luster": 22, "8x10-glossy": 18,
      "11x14-matte": 18, "11x14-luster": 14, "11x14-glossy": 10,
      "16x20-matte": 9,  "16x20-luster": 7,  "16x20-glossy": 5,
      "18x24-matte": 4,  "18x24-luster": 3,  "18x24-glossy": 2,
    },
  },

  // ── GRAND TETON ───────────────────────────────────────────
  {
    id: "gteton-photo-oxbow",
    slug: "grand-teton-oxbow-bend-reflection",
    name: "Oxbow Bend Reflection",
    park: "grand-teton",
    style: "photography",
    basePrice: 26.99,
    rating: 4.9,
    reviewCount: 228,
    tags: ["reflection", "bestseller", "dawn"],
    inStock: true,
    featured: true,
    newArrival: false,
    description:
      "The Teton Range reflected perfectly in the still water of Oxbow Bend at the first blush of dawn. A dead calm September morning when the Snake River is a mirror. The most requested print from the Teton collection.",
    details: [
      "Panoramic composition — especially stunning at 24×36",
      "Printed on 300gsm cotton rag with archival inks",
    ],
    images: [
      { url: U("1630262439086-74ebda438ece"), alt: "Grand Teton reflection at Oxbow Bend at dawn" },
      { url: U("1536431311719-398b6704d4b5"), alt: "Snake River with Teton range in background" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24", "24x36"],
    finishes: ["matte", "luster"],
    stockByVariant: {
      "8x10-matte": 44, "8x10-luster": 30,
      "11x14-matte": 26, "11x14-luster": 20,
      "16x20-matte": 14, "16x20-luster": 10,
      "18x24-matte": 7,  "18x24-luster": 5,
      "24x36-matte": 3,  "24x36-luster": 2,
    },
  },

  // ── GREAT SMOKY MOUNTAINS ─────────────────────────────────
  {
    id: "gsm-photo-fog",
    slug: "great-smoky-mountains-morning-fog",
    name: "Morning Fog Over the Smokies",
    park: "great-smoky",
    style: "photography",
    basePrice: 23.99,
    rating: 4.7,
    reviewCount: 77,
    tags: ["fog", "moody", "appalachian"],
    inStock: true,
    featured: false,
    newArrival: false,
    description:
      "Layer after layer of misty ridgelines recede into a pale October morning. The \"smoky\" in Great Smoky Mountains is this — the naturally occurring blue-white haze from the trees themselves. Quiet and meditative.",
    details: [
      "Subtle tonal range — matte finish recommended",
      "Ships rolled in protective tube within 3–5 business days",
    ],
    images: [
      { url: U("1608135372855-71a5d80ff2ec"), alt: "Morning fog over Great Smoky Mountains ridgelines" },
    ],
    sizes: ["8x10", "11x14", "16x20", "18x24"],
    finishes: ["matte"],
    stockByVariant: {
      "8x10-matte": 38, "11x14-matte": 24,
      "16x20-matte": 11, "18x24-matte": 5,
    },
  },
];

const seedDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany({});
        await Product.insertMany(seedData);
        console.log('Seeded successfully!');
        process.exit(0);
    } catch(error){
        console.error({message: error.message});
    }
}

seedDB();