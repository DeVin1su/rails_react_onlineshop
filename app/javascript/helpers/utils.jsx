export const formatNumber = number => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}

export const formatDateTime = dateTime => {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  }).format(dateTime);
}