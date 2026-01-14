export const PRODUCTS = [
    // --- BATCH 1 (Best Sellers) ---
    {
        id: "vintage-oak-frame",
        slug: "vintage-oak-frame",
        title: "Vintage Oak Frame",
        price: 12500,
        originalPrice: 15000,
        category: "Wood Frames",
        description: "A timeless piece handcrafted from sustainably sourced oak.",
        images: [
            "/product-pictures/photo-1568945721269-c998c4cbb043.avif",
            "/product-pictures/premium_photo-1667239474298-844804eca38f.avif",
            "/product-pictures/photo-1725917482794-d2860a4c0977.avif",
            "/product-pictures/get.jpg"
        ],
        longDescription: "Inspired by the late 19th-century French artisan workshops, this Vintage Oak Frame brings a touch of history to your walls. Each piece of oak is selected for its unique grain character, ensuring that no two frames are exactly alike. \\n\\nThe warm, honeyed tones of the wood are brought out through a careful hand-rubbed oil finishing process, protecting the frame while allowing the natural beauty of the timber to shine through. Perfect for showcasing black and white photography or vintage botanical prints.",
        dimensionsDetails: "Frame Width: 1.5 inches | Frame Depth: 1.25 inches. \nIncludes 2mm shatter-resistant UV-protective plexiglass and acid-free archival backing board to protect your art for decades.",
        materialStory: "Sourced from sustainable forests in Northern Europe, our Oak is kiln-dried to prevent warping. We work directly with small family-run mills that share our commitment to responsible forestry.",
        storyImage: "/product-pictures/photo-1568945721269-c998c4cbb043.avif",
        variants: [
            { id: "oak", name: "Natural Oak", color: "#C4A484", image: "/product-pictures/photo-1568945721269-c998c4cbb043.avif" },
            { id: "walnut", name: "Dark Walnut", color: "#5C4033", image: "/product-pictures/frame-walnut.jpg" }
        ],
        specs: { dimensions: "16x20 inches", material: "Solid Oak", shipping: "Ships in 3-5 days" },
        badges: ["Best Seller"]
    },
    {
        id: "walnut-gallery-frame",
        slug: "walnut-gallery-frame",
        title: "Walnut Gallery Frame",
        price: 9500,
        originalPrice: 12000,
        category: "Wood Frames",
        description: "Rich, dark walnut wood offering a sophisticated modern look.",
        images: [
            "/product-pictures/photo-1613658501648-58f72a09355f.avif",
            "/product-pictures/premium_photo-1667239026048-7b5dac9da7e5.avif",
            "/product-pictures/photo-1726329143742-b5e06b69a89e.avif",
            "/product-pictures/img-4.jpg"
        ],
        storyImage: "/product-pictures/photo-1613658501648-58f72a09355f.avif",
        variants: [
            { id: "walnut", name: "Dark Walnut", color: "#5C4033", image: "/product-pictures/photo-1613658501648-58f72a09355f.avif" },
            { id: "oak", name: "Natural Oak", color: "#C4A484", image: "/product-pictures/frame-oak.jpg" }
        ],
        specs: { dimensions: "12x16 inches", material: "American Walnut", shipping: "Ships in 2-4 days" },
        badges: []
    },
    {
        id: "the-minimalist",
        slug: "the-minimalist",
        title: "The Minimalist",
        price: 7800,
        originalPrice: 0,
        category: "Metal Frames",
        description: "Ultra-thin profile frame designed to let the art speak for itself.",
        images: [
            "/product-pictures/photo-1674382009124-fafdebe47267.avif",
            "/product-pictures/premium_photo-1667239357087-6a5cfc9c19e8.avif",
            "/product-pictures/photo-1728848447811-9ee31b85e022.avif",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1674382009124-fafdebe47267.avif",
        variants: [
            { id: "black", name: "Matte Black", color: "#1a1a1a", image: "/product-pictures/photo-1674382009124-fafdebe47267.avif" },
            { id: "brass", name: "Brass", color: "#b5a642", image: "/product-pictures/frame-brass.jpg" }
        ],
        specs: { dimensions: "18x24 inches", material: "Aluminum", shipping: "Ships next day" },
        badges: ["New"]
    },
    {
        id: "modern-white",
        slug: "modern-white",
        title: "Modern White",
        price: 8200,
        originalPrice: 0,
        category: "Painted Frames",
        description: "Crisp, clean, and airy. The Modern White frame brightens any space.",
        images: [
            "/product-pictures/photo-1694636435043-debf9ba4febb.avif",
            "/product-pictures/premium_photo-1682125273124-e0d7229d01f2.avif",
            "/product-pictures/photo-1728848447870-df8f93317cd2.avif",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1694636435043-debf9ba4febb.avif",
        variants: [
            { id: "white", name: "Pure White", color: "#ffffff", image: "/product-pictures/photo-1694636435043-debf9ba4febb.avif" },
            { id: "oak", name: "Natural Oak", color: "#C4A484", image: "/product-pictures/frame-oak.jpg" }
        ],
        specs: { dimensions: "20x20 inches", material: "Painted Wood", shipping: "Ships in 3-5 days" },
        badges: ["Limited"]
    },
    {
        id: "classic-gold-frame",
        slug: "classic-gold-frame",
        title: "Classic Gold Frame",
        price: 9800,
        originalPrice: 11500,
        category: "Metal Frames",
        description: "Elegant gold finish suitable for traditional and contemporary art alike.",
        images: [
            "/product-pictures/photo-1700605293481-0dbb483de8bc.avif",
            "/product-pictures/premium_photo-1711987680591-bcb0687c4cba.avif",
            "/product-pictures/photo-1729273789373-f17041e81224.avif",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1700605293481-0dbb483de8bc.avif",
        variants: [
            { id: "gold", name: "Brushed Gold", color: "#D4AF37", image: "/product-pictures/photo-1700605293481-0dbb483de8bc.avif" },
            { id: "silver", name: "Matte Silver", color: "#C0C0C0", image: "/product-pictures/get.jpg" }
        ],
        specs: { dimensions: "16x20 inches", material: "Aluminum", shipping: "Ships in 3-5 days" },
        badges: ["Classic"]
    },
    {
        id: "heritage-cherry-frame",
        slug: "heritage-cherry-frame",
        title: "Heritage Cherry Frame",
        price: 13200,
        originalPrice: 0,
        category: "Wood Frames",
        description: "Deep red cherry wood with a smooth satin finish.",
        images: [
            "/product-pictures/photo-1705610437737-0854df4c4408.avif",
            "/product-pictures/premium_photo-1726880582584-482bfd02d9fb.avif",
            "/product-pictures/photo-1729273791372-976c087cf09f.avif",
            "/product-pictures/img-4.jpg"
        ],
        storyImage: "/product-pictures/photo-1705610437737-0854df4c4408.avif",
        variants: [
            { id: "cherry", name: "Cherry Wood", color: "#651a1a", image: "/product-pictures/photo-1705610437737-0854df4c4408.avif" }
        ],
        specs: { dimensions: "18x24 inches", material: "Solid Wood", shipping: "Ships in 5-7 days" },
        badges: []
    },
    {
        id: "rustic-barnwood-frame",
        slug: "rustic-barnwood-frame",
        title: "Rustic Barnwood",
        price: 10500,
        originalPrice: 12500,
        category: "Wood Frames",
        description: "Reclaimed wood style with visible grain and texture.",
        images: [
            "/product-pictures/photo-1712219002737-d4e04d21c2c8.avif",
            "/product-pictures/premium_photo-1752521131899-ffc4b14543ba.avif",
            "/product-pictures/photo-1729273792109-b6665f9151a8.avif",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1712219002737-d4e04d21c2c8.avif",
        variants: [
            { id: "barnwood", name: "Reclaimed Wood", color: "#8b7355", image: "/product-pictures/photo-1712219002737-d4e04d21c2c8.avif" }
        ],
        specs: { dimensions: "16x20 inches", material: "Reclaimed Wood", shipping: "Ships in 3-5 days" },
        badges: ["Eco-Friendly"]
    },
    {
        id: "gallery-black-frame",
        slug: "gallery-black-frame",
        title: "Gallery Black",
        price: 8900,
        originalPrice: 0,
        category: "Wood Frames",
        description: "The standard for exhibitions. Simple, flat profile in matte black.",
        images: [
            "/product-pictures/photo-1713117222814-0e9bae0dcd22.avif",
            "/product-pictures/premium_photo-1752521132303-15829446682e.avif",
            "/product-pictures/photo-1729342036504-4d07d7d1a907.avif",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1713117222814-0e9bae0dcd22.avif",
        variants: [
            { id: "black", name: "Matte Black", color: "#1a1a1a", image: "/product-pictures/photo-1713117222814-0e9bae0dcd22.avif" },
            { id: "white", name: "Matte White", color: "#ffffff", image: "/product-pictures/img-4.jpg" }
        ],
        specs: { dimensions: "24x36 inches", material: "Painted Wood", shipping: "Ships next day" },
        badges: ["Pro Choice"]
    },
    // --- BATCH 2 (Curated Selection) ---
    {
        id: "classic-gold-frame-v2",
        slug: "classic-gold-frame-v2",
        title: "Empire Gold",
        price: 9800,
        originalPrice: 11500,
        category: "Metal Frames",
        description: "A thicker, more ornate gold frame for statement pieces.",
        images: [
            "/product-pictures/photo-1713117222882-7c85cde870db.avif",
            "/product-pictures/premium_photo-1752521132482-65f568816181.avif",
            "/product-pictures/photo-1729342036571-395d5caa6d86.avif",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1713117222882-7c85cde870db.avif",
        variants: [{ id: "gold", name: "Gold", color: "#D4AF37", image: "/product-pictures/photo-1713117222882-7c85cde870db.avif" }],
        specs: { dimensions: "16x20 inches", material: "Aluminum", shipping: "Ships in 3-5 days" },
        badges: []
    },
    {
        id: "heritage-cherry-frame-v2",
        slug: "heritage-cherry-frame-v2",
        title: "Royal Cherry",
        price: 13200,
        originalPrice: 0,
        category: "Wood Frames",
        description: "Premium cherry wood with high-gloss finish.",
        images: [
            "/product-pictures/photo-1713117222884-86ffed469b3e.avif",
            "/product-pictures/premium_photo-1757330256709-94907b8642d3.avif",
            "/product-pictures/photo-1729974354467-cc02e2f47a8b.avif",
            "/product-pictures/img-4.jpg"
        ],
        storyImage: "/product-pictures/photo-1713117222884-86ffed469b3e.avif",
        variants: [{ id: "cherry", name: "Cherry", color: "#651a1a", image: "/product-pictures/photo-1713117222884-86ffed469b3e.avif" }],
        specs: { dimensions: "18x24 inches", material: "Solid Wood", shipping: "Ships in 5-7 days" },
        badges: ["Premium"]
    },
    {
        id: "abstract-women-art",
        slug: "abstract-women-art",
        title: "Abstract Women",
        price: 18500,
        originalPrice: 22000,
        category: "Art Prints",
        description: "Empowering beauty of abstract women adorned with intricate traditional jewelry.",
        images: ["/product-pictures/abstract-women-main.jpg", "/product-pictures/abstract-women-hover.jpg", "/product-pictures/img-4.jpg", "/product-pictures/get (2).jpg"],
        storyImage: "/product-pictures/abstract-women-main.jpg",
        variants: [{ id: "print", name: "Art Print", color: "#f0f0f0", image: "/product-pictures/abstract-women-main.jpg" }],
        specs: { dimensions: "24x36 inches", material: "Giclee Print", shipping: "Ships in 3-5 days" },
        badges: ["Featured"]
    },
    {
        id: "andrew-atroshenko-art",
        slug: "andrew-atroshenko-art",
        title: "Passionate Art",
        price: 21000,
        originalPrice: 0,
        category: "Art Prints",
        description: "Andrew Atroshenko passionate art painting, perfect for adding emotion to your walls.",
        images: ["/product-pictures/andrew-atroshenko-main.jpg", "/product-pictures/andrew-atroshenko-hover.jpg", "/product-pictures/andrew-atroshenko-painting.webp", "/product-pictures/img-4.jpg"],
        storyImage: "/product-pictures/andrew-atroshenko-main.jpg",
        variants: [{ id: "original", name: "Original", color: "#1a1a1a", image: "/product-pictures/andrew-atroshenko-main.jpg" }],
        specs: { dimensions: "24x36 inches", material: "Canvas", shipping: "Ships next day" },
        badges: ["Bestseller"]
    },
    {
        id: "custom-trays",
        slug: "custom-trays",
        title: "Custom Printed Trays",
        price: 4500,
        originalPrice: 0,
        category: "Home Decor",
        description: "Beautifully customised printed trays for serving or display.",
        images: ["/product-pictures/custom-trays-main.jpg", "/product-pictures/custom-trays-hover.jpg", "/product-pictures/gallery-frames-main.jpg", "/product-pictures/get (2).jpg"],
        storyImage: "/product-pictures/custom-trays-main.jpg",
        variants: [{ id: "standard", name: "Standard", color: "#ffffff", image: "/product-pictures/custom-trays-main.jpg" }],
        specs: { dimensions: "12x18 inches", material: "Acrylic", shipping: "Ships in 3-5 days" },
        badges: ["New"]
    },
    {
        id: "vintage-oak-frame-v2",
        slug: "vintage-oak-frame-v2",
        title: "Antique Oak",
        price: 12500,
        originalPrice: 15000,
        category: "Wood Frames",
        description: "Distressed oak finish for a vintage appeal.",
        images: [
            "/product-pictures/photo-1713117222954-7e50825ead4d.avif",
            "/product-pictures/photo-1729974354594-1a314d13d10a.avif",
            "/product-pictures/premium_photo-1667239093166-0b47c83eefe3.avif",
            "/product-pictures/img-4.jpg"
        ],
        storyImage: "/product-pictures/photo-1713117222954-7e50825ead4d.avif",
        variants: [{ id: "oak", name: "Oak", color: "#C4A484", image: "/product-pictures/photo-1713117222954-7e50825ead4d.avif" }],
        specs: { dimensions: "16x20 inches", material: "Solid Oak", shipping: "Ships in 3-5 days" },
        badges: []
    },
    {
        id: "walnut-gallery-frame-v2",
        slug: "walnut-gallery-frame-v2",
        title: "Deep Walnut",
        price: 9500,
        originalPrice: 12000,
        category: "Wood Frames",
        description: "Extra deep profile walnut frame.",
        images: [
            "/product-pictures/photo-1713117222957-abe6e3bb574b.avif",
            "/product-pictures/photo-1732997345848-1084bb343b8b.avif",
            "/product-pictures/premium_photo-1667239319303-b4427031f29c.avif",
            "/product-pictures/img-4.jpg"
        ],
        storyImage: "/product-pictures/photo-1713117222957-abe6e3bb574b.avif",
        variants: [{ id: "walnut", name: "Walnut", color: "#5C4033", image: "/product-pictures/photo-1713117222957-abe6e3bb574b.avif" }],
        specs: { dimensions: "12x16 inches", material: "American Walnut", shipping: "Ships in 2-4 days" },
        badges: []
    },
    {
        id: "minimalist-round-mirror",
        slug: "minimalist-round-mirror",
        title: "Minimalist Round Mirror",
        price: 15500,
        originalPrice: 0,
        category: "Mirrors",
        description: "A sleek, frameless round mirror with polished edges.",
        images: [
            "/product-pictures/photo-1713117224202-7d24894cfa64.avif",
            "/product-pictures/photo-1732997345946-700efbeb42e9.avif",
            "/product-pictures/premium_photo-1667239370694-85efed63aa6c.avif",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1713117224202-7d24894cfa64.avif",
        variants: [{ id: "mirror", name: "Mirror", color: "#e0e0e0", image: "/product-pictures/photo-1713117224202-7d24894cfa64.avif" }],
        specs: { dimensions: "24x24 inches", material: "Glass", shipping: "Ships next day" },
        badges: ["New"]
    },

    // --- BATCH 3 (More to Explore) ---
    {
        id: "classic-silver-frame-v3",
        slug: "classic-silver-frame-v3",
        title: "Gallery Silver",
        price: 9800,
        originalPrice: 0,
        category: "Metal Frames",
        description: "Shimmering silver for photography.",
        images: [
            "/product-pictures/photo-1713117224532-8181cc81a409.avif",
            "/product-pictures/photo-1732997346044-c6bf9c49056e.avif",
            "/product-pictures/img-4.jpg",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1713117224532-8181cc81a409.avif",
        variants: [{ id: "silver", name: "Silver", color: "#C0C0C0", image: "/product-pictures/photo-1713117224532-8181cc81a409.avif" }],
        specs: { dimensions: "16x20 inches", material: "Aluminum", shipping: "Ships in 3-5 days" },
        badges: []
    },
    {
        id: "natural-wood-v3",
        slug: "natural-wood-v3",
        title: "Raw Pine",
        price: 6500,
        originalPrice: 0,
        category: "Wood Frames",
        description: "Unfinished pine for a Scandinavian look.",
        images: [
            "/product-pictures/photo-1714252562758-a30752d9d098.avif",
            "/product-pictures/photo-1745173038946-035af05c4338.avif",
            "/product-pictures/get.jpg",
            "/product-pictures/img-4.jpg"
        ],
        storyImage: "/product-pictures/photo-1714252562758-a30752d9d098.avif",
        variants: [{ id: "pine", name: "Pine", color: "#e6c382", image: "/product-pictures/photo-1714252562758-a30752d9d098.avif" }],
        specs: { dimensions: "18x24 inches", material: "Solid Wood", shipping: "Ships in 5-7 days" },
        badges: []
    },
    {
        id: "industrial-metal-v3",
        slug: "industrial-metal-v3",
        title: "Industrial Steel",
        price: 11000,
        originalPrice: 13000,
        category: "Metal Frames",
        description: "Brushed steel finish for loft apartments.",
        images: [
            "/product-pictures/photo-1717241365608-5565eef72d89.avif",
            "/product-pictures/photo-1745173039229-416e2e6462d4.avif",
            "/product-pictures/custom-trays-hover.jpg",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1717241365608-5565eef72d89.avif",
        variants: [{ id: "steel", name: "Steel", color: "#7e7e7e", image: "/product-pictures/photo-1717241365608-5565eef72d89.avif" }],
        specs: { dimensions: "16x20 inches", material: "Steel", shipping: "Ships in 3-5 days" },
        badges: ["Trending"]
    },
    {
        id: "charcoal-wood-v3",
        slug: "charcoal-wood-v3",
        title: "Charcoal Wood",
        price: 9200,
        originalPrice: 0,
        category: "Wood Frames",
        description: "Soft black stain that reveals wood grain.",
        images: [
            "/product-pictures/photo-1722803119365-caebe1f22daf.avif",
            "/product-pictures/photo-1751574979481-5cd79f421333.avif",
            "/product-pictures/get.jpg",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1722803119365-caebe1f22daf.avif",
        variants: [{ id: "charcoal", name: "Charcoal", color: "#36454F", image: "/product-pictures/photo-1722803119365-caebe1f22daf.avif" }],
        specs: { dimensions: "24x36 inches", material: "stained Wood", shipping: "Ships next day" },
        badges: []
    },
    {
        id: "glossy-red-v3",
        slug: "glossy-red-v3",
        title: "Pop Art Red",
        price: 8500,
        originalPrice: 0,
        category: "Painted Frames",
        description: "High gloss red for bold statements.",
        images: [
            "/product-pictures/photo-1725711028446-055093f4c658.avif",
            "/product-pictures/photo-1752306639259-2554bb3fa65f.avif",
            "/product-pictures/img-4.jpg",
            "/product-pictures/get (2).jpg"
        ],
        storyImage: "/product-pictures/photo-1725711028446-055093f4c658.avif",
        variants: [{ id: "red", name: "Red", color: "#ff0000", image: "/product-pictures/photo-1725711028446-055093f4c658.avif" }],
        specs: { dimensions: "20x20 inches", material: "Painted Wood", shipping: "Ships in 3-5 days" },
        badges: []
    },
    {
        id: "blue-velvet-v3",
        slug: "blue-velvet-v3",
        title: "Midnight Blue",
        price: 8500,
        originalPrice: 0,
        category: "Painted Frames",
        description: "Deep blue lacquer finish.",
        images: [
            "/product-pictures/photo-1726329143742-b5e06b69a89e.avif",
            "/product-pictures/photo-1752312718676-9f9a6eac0456.avif",
            "/product-pictures/custom-trays-hover.jpg",
            "/product-pictures/img-4.jpg"
        ],
        storyImage: "/product-pictures/photo-1726329143742-b5e06b69a89e.avif",
        variants: [{ id: "blue", name: "Blue", color: "#000080", image: "/product-pictures/photo-1726329143742-b5e06b69a89e.avif" }],
        specs: { dimensions: "16x20 inches", material: "Painted Wood", shipping: "Ships in 3-5 days" },
        badges: []
    },
    {
        id: "emerald-green-v3",
        slug: "emerald-green-v3",
        title: "Emerald Green",
        price: 8500,
        originalPrice: 0,
        category: "Painted Frames",
        description: "Rich jewel-tone green.",
        images: [
            "/product-pictures/photo-1726345876920-7edf97857c14.avif",
            "/product-pictures/photo-1758366278313-70468ec8cb2c.avif",
            "/product-pictures/get (2).jpg",
            "/product-pictures/get.jpg"
        ],
        storyImage: "/product-pictures/photo-1726345876920-7edf97857c14.avif",
        variants: [{ id: "green", name: "Green", color: "#50c878", image: "/product-pictures/photo-1726345876920-7edf97857c14.avif" }],
        specs: { dimensions: "12x16 inches", material: "Painted Wood", shipping: "Ships in 2-4 days" },
        badges: []
    },
    {
        id: "shadow-box-v3",
        slug: "shadow-box-v3",
        title: "Deep Shadow Box",
        price: 14000,
        originalPrice: 16000,
        category: "Wood Frames",
        description: "Extra deep box for objects and 3D art.",
        images: [
            "/product-pictures/photo-1726345876982-efe17dab64bd.avif",
            "/product-pictures/photo-1760475267474-108e1a73dff3.avif",
            "/product-pictures/get.jpg",
            "/product-pictures/img-4.jpg"
        ],
        storyImage: "/product-pictures/photo-1726345876982-efe17dab64bd.avif",
        variants: [{ id: "black", name: "Black", color: "#1a1a1a", image: "/product-pictures/photo-1726345876982-efe17dab64bd.avif" }],
        specs: { dimensions: "18x24 inches", material: "Solid Wood", shipping: "Ships next day" },
        badges: ["Specialty"]
    }
]
