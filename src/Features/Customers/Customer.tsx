/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store: any) => store.customer.fullName);
  // name must matches the reducer function name in store.ts
  // whenever store changes, the components that subscribes to the store will also re-render
  console.log(customer);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
