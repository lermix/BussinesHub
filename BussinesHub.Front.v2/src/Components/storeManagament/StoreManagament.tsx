import React, { ChangeEvent, useState } from "react";
import Grid from "../../basicComponents/Grid/Grid";
import { GridColumn } from "../../basicComponents/Grid/GridColumn";
import { Company } from "../../models/Company";

export const StoreManagament: React.FC = () => {
  const [showStoreCreator, setShowStoreCreator] = useState<boolean>(false);
  const [showUserStores, setShowUserStores] = useState<boolean>(false);

  return (
    <>
      <h3>My stores</h3>
      <button style={{ borderRadius: 10 }}>Create new</button>
      <Grid
        style={{ margin: 20 }}
        onRowClick={(e) => console.log(e)}
        data={[
          { naziv: "a", boja: "red" },
          { naziv: "b", boja: "plava" },
        ]}
      >
        <GridColumn width={200} text="a" property="naziv" />
        <GridColumn text="b" property="boja" />
        <GridColumn text="b" cellRender={<td>nesto</td>} />
      </Grid>
    </>
  );
};

export default StoreManagament;
