import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "../../basicComponents/Grid/Grid";
import { GridColumn } from "../../basicComponents/Grid/GridColumn";
import { Input } from "../../basicComponents/Input/Input";
import { Company } from "../../models/Company";
import { Store } from "../../models/Store";
import { getCompanyStores } from "../../store/company/actions";
import { useAppDispatch } from "../../store/hooks";
import { AppState } from "../../store/rootReducer";
import { getStoreProducts, setSelectedStore } from "../../store/store/actions";
import StoreCreator from "./StoreCreator";

interface IStateProps {
  selectedStore: Store | null;
  selectedCompany: Company | null;
}

export const StoreManagament: React.FC = () => {
  const dispatch = useAppDispatch();

  const { selectedStore, selectedCompany } = useSelector<AppState, IStateProps>(
    (state: AppState): IStateProps => {
      return {
        selectedStore: state.store.selectedStore,
        selectedCompany: state.company.selectedCompany,
      };
    }
  );

  useEffect(() => {
    selectedCompany && dispatch(getCompanyStores(selectedCompany?.id));
  }, []);

  const [showStoreCreator, setShowStoreCreator] = useState<boolean>(false);
  const [data, setData] = useState<Store[]>(selectedCompany?.stores ?? []);

  return (
    <>
      {!showStoreCreator && (
        <>
          <h3>My Stores</h3>
          <button
            style={{ borderRadius: 10 }}
            onClick={() => setShowStoreCreator(true)}
          >
            Create new
          </button>{" "}
        </>
      )}
      {showStoreCreator && <StoreCreator showCreator={setShowStoreCreator} />}
      {!showStoreCreator && selectedCompany && (
        <>
          <p style={{ marginLeft: 20 }}>
            <b>Selected:</b>
            {selectedStore?.name}
          </p>
          <Input
            type="text"
            text="Search by name"
            autoComplete="off"
            width={200}
            height={20}
            style={{ marginLeft: 20 }}
            onChange={(value: string) =>
              setData(
                selectedCompany.stores.filter((e) => e.name.includes(value))
              )
            }
          />
          <Grid
            style={{ margin: 20 }}
            onRowClick={(e) => {
              dispatch(setSelectedStore(e));
              dispatch(getStoreProducts(e.id));
            }}
            data={data}
          >
            <GridColumn
              width={200}
              text="name"
              property="name"
              OnSort={() => setData(data.reverse())}
            />
            <GridColumn
              width={200}
              text="City"
              property="city"
              OnSort={() => setData(data.reverse())}
            />
            <GridColumn
              width={500}
              text="Adress"
              property="adress"
              OnSort={() => setData(data.reverse())}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default StoreManagament;
