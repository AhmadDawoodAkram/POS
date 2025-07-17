import { useMemo } from "react";

export function useBillCalculations(data: any) {
  const discount = useMemo(() => {
    if (!data) return 0;
    return Number((data.data.totalDiscountMoney.amount / 100).toFixed(2));
  }, [data]);

  const netTotal = useMemo(() => {
    if (!data) return 0;
    return Number((data.data.netAmountDueMoney.amount / 100).toFixed(2));
  }, [data]);

  const discountArr = useMemo(() => {
    if (!data) return [];
    return data.data.lineItems.map((arr: any) =>
      Number((arr.totalDiscountMoney.amount / 100).toFixed(2))
    );
  }, [data]);

  return { discount, netTotal, discountArr };
}
