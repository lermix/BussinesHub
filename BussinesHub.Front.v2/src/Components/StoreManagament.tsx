import React, { ChangeEvent } from "react";
import Grid from "../BasicComponents/Grid/Grid";
import { GridColumn } from "../BasicComponents/Grid/GridColumn";

export const StoreManagament: React.FC = () => {
  return (
    <>
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
        <GridColumn text="b" cellRender={<tr>nesto</tr>} />
      </Grid>
    </>
  );
};

export default StoreManagament;
