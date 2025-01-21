export const formatCurrency = (number) => {
  return new Intl.NumberFormat('fr-CA', {
    style: 'decimal',
    minimumFractionDigits: 2,
    currency: 'CAD'
  }).format(number)
};


export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};