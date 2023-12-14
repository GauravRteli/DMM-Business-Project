export const validateReceipt = (receiptData) => {
  if (receiptData.nameOfCustomer === "" || receiptData.cityOfCustomer === "")
    return false;

  if (Array.isArray(receiptData.items) && receiptData.items.length == 0)
    return false;

  if (
    receiptData.charges.GST === "" ||
    receiptData.charges.packageCharges === ""
  )
    return false;

  if (receiptData.paymentStatus.paid === "") return false;

  for (const item of receiptData.items) {
    if (item.item === null || item.price === "" || item.quantity === "")
      return false;
  }

  return true;
};

export const metalOptions = [
  { value: "brass", label: "Brass (पीतल)" },
  { value: "copper", label: "Copper (ताम्र)" },
  { value: "aluminum", label: "Aluminum (एल्यूमिनियम)" },
  { value: "steel", label: "Steel (इस्पात)" },
  { value: "silver", label: "Silver (चाँदी)" },
  { value: "gold", label: "Gold (सोना)" },
  { value: "nickel", label: "Nickel (निकेल)" },
  { value: "bronze", label: "Bronze (कांस्य)" },
  { value: "titanium", label: "Titanium (टाइटेनियम)" },
  { value: "platinum", label: "Platinum (प्लैटिनम)" },
  { value: "iron", label: "Iron (लोहा)" },
  { value: "lead", label: "Lead (सीसा)" },
  { value: "zinc", label: "Zinc (जिंक)" },
  { value: "pewter", label: "Pewter (प्यूटर)" },
];
