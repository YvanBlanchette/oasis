// Format a number as currency
export const formatCurrency = (number) => {
  return new Intl.NumberFormat('fr-CA', {
    style: 'decimal',
    minimumFractionDigits: 2,
    currency: 'CAD'
  }).format(number)
};

// Format a date string
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat('fr-CA', options);
  return formatter.format(date);
}

// Capitalize the first letter of a string
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};