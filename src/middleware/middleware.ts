import data from "../mock-data/MOCK_DATA_N.json";

// Define the type of a listing
export type Listing = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string | null;
  language: string | null;
  color: string | null;
};

// Create an array of Listing objects
export const listings: Listing[] = data.map((item) => ({
  id: item.id,
  first_name: item.first_name,
  last_name: item.last_name,
  email: item.email,
  color: item.color ?? null,
  language: item.language ?? null,
  country: item.country ?? null,
}));

// 1. An array of listings of a particular colour or language
export const listingsByColorOrLanguage = (value: string): Listing[] => {
  const searchVal = value.toLowerCase();
  return listings.filter(
    (listing: Listing) =>
      listing.color?.toLowerCase() === searchVal ||
      listing.language?.toLowerCase() === searchVal
  );
};

// 2. An array of listings of all countries represented in the database
export const listingsByCountry = (
  listingsArray: Listing[]
): Record<string, Listing[]> => {
  return listingsArray.reduce(
    (acc: Record<string, Listing[]>, listing: Listing) => {
      const country = listing.country ?? "Unknown Country";
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(listing);
      return acc;
    },
    {}
  );
};

// 3. Return an array of all listings which have a null value of a particular key like colour or language.
export const listingsWithNullValue = (
  field: "color" | "language" | "country",
  dataset: Listing[] = listings
): Listing[] => {
  return dataset.filter((listing: Listing) => listing[field] === null);
};
