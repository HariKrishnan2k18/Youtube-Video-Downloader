const genre = [
  "All Books",
  "Fiction",
  "Mystery",
  "Dystopian",
  "Memoir",
  "Fantasy",
  "Thriller",
  "Humor",
  "Drama",
  "Romance",
  "Post-Apocalyptic",
  "Young Adult"
];

const inputField = [
  { label: "Title", name: "title", type: "string" },
  { label: "Author", name: "author", type: "string" },
  { label: "Genre", name: "genre", type: "string" },
  { label: "ISBN", name: "isbn", type: "string" },
  { label: "Price", name: "price", type: "number" },
  { label: "Availability", name: "availability", type: "string" },
  { label: "Rating", name: "rating", type: "number" },
  { label: "Publication Date", name: "publication_date", type: "date" },
  { label: "Description", name: "description", type: "textbox" },
  { label: "Image Url", name: "cover_image_url", type: "string" }
];

export { genre, inputField };
