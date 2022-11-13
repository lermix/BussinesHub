import React, { useState } from "react";
import Grid from "../../basicComponents/Grid/Grid";
import { Input } from "../../basicComponents/Input/Input";
import { Store, StoreClass } from "../../models/Store";

const StoreCreator: React.FC = () => {
  const [store, setStore] = useState<Store>(new StoreClass());

  return (
    <>
      <h2>Create Store</h2>
      <br />
      <Input
        type="text"
        text="name"
        onChange={(value: string) => setStore({ ...store, name: value })}
      />
      <Input
        type="text"
        text="adress"
        onChange={(value: string) => setStore({ ...store, adress: value })}
      />
      <Input
        type="text"
        text="city"
        onChange={(value: string) => setStore({ ...store, city: value })}
      />
      <Input
        type="text"
        text="postal Code"
        onChange={(value: string) => setStore({ ...store, postalCode: value })}
      />
      <Input
        type="text"
        text="country"
        onChange={(value: string) => setStore({ ...store, country: value })}
      />
    </>
  );
};

export default StoreCreator;
