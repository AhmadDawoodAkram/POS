"use server";
const fetchBillSummary = async (orderPayload: any) => {
  const response = await fetch(
    "http://localhost:3000/app/api/square/calculate-total",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    }
  );

  console.log(response);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to calculate total");
  }

  return await response.json();
};

export default fetchBillSummary;
