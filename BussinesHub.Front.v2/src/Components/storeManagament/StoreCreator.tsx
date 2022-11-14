import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import Grid from "../../basicComponents/Grid/Grid";
import { Input } from "../../basicComponents/Input/Input";
import { Company } from "../../models/Company";
import { Store, StoreClass } from "../../models/Store";
import { createStore } from "../../store/company/actions";
import { useAppDispatch } from "../../store/hooks";
import { AppState } from "../../store/rootReducer";
import MapConsumer from "../MapConsumer";

interface IProps {
  showCreator: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IStateProps {
  selectedCompany: Company | null;
}
const StoreCreator: React.FC<IProps> = ({ showCreator }) => {
  const dispatch = useAppDispatch();
  const { selectedCompany } = useSelector<AppState, IStateProps>(
    (state: AppState): IStateProps => {
      return {
        selectedCompany: state.company.selectedCompany,
      };
    }
  );

  const [store, setStore] = useState<Store>(new StoreClass());

  const CreateStore = () => {
    selectedCompany && dispatch(createStore(selectedCompany.id, store));
    showCreator(false);
  };

  return (
    <>
      <div style={{ width: 400, float: "left" }}>
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
          onChange={(value: string) =>
            setStore({ ...store, postalCode: value })
          }
        />
        <Input
          type="text"
          text="country"
          onChange={(value: string) => setStore({ ...store, country: value })}
        />
        <br />
        <br />
        <div style={{ width: 408 }}>
          <button style={{ float: "left" }} onClick={CreateStore}>
            Create
          </button>
          <button style={{ float: "right" }} onClick={() => showCreator(false)}>
            Cancel
          </button>
        </div>
      </div>
      <MapContainer
        center={[45.8, 15.9]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 700, width: 800, float: "right" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapConsumer />
      </MapContainer>
    </>
  );
};

export default StoreCreator;
