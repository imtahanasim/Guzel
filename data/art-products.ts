const validImages = [
    "/product-pictures/abstract-women-main.jpg",
    "/product-pictures/andrew-atroshenko-main.jpg",
    "/product-pictures/custom-trays-main.jpg",
    "/product-pictures/custom-trays-hover.jpg",
    "/product-pictures/abstract-women-hover.jpg",
    "/product-pictures/andrew-atroshenko-painting.webp",
    "/product-pictures/andrew-atroshenko-painting-1.webp"
]

export const artProducts = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    url: validImages[i % validImages.length],
    title: `Artwork #${i + 1}`,
    artist: "Guzel Studio",
    year: 2024,
    description: "A journey through the imagination."
}))
