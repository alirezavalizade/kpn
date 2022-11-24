import { http } from "@/api/http";

export function loadPhones() {
  return http({
    url: "/shop/api/v1/product/handset-category/activation/",
  });
}
