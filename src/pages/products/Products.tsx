import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Products = (): JSX.Element => {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default Products;
