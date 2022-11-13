import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "../../basicComponents/Grid/Grid";
import { GridColumn } from "../../basicComponents/Grid/GridColumn";
import { Company } from "../../models/Company";
import { AppState } from "../../store/rootReducer";
import CompanyCreator from "./CompanyCreator";

interface IStateProps {
  companies: Company[];
}

export const CompanyManagament: React.FC = () => {
  const { companies } = useSelector<AppState, IStateProps>(
    (state: AppState): IStateProps => {
      return {
        companies: state.user.companies,
      };
    }
  );

  const [showCompanyCreator, setShowCompanyCreator] = useState<boolean>(false);
  const [showUserCompanys, setShowUserCompanys] = useState<boolean>(false);

  return (
    <>
      {!showCompanyCreator && (
        <>
          <h3>My companies</h3>
          <button
            style={{ borderRadius: 10 }}
            onClick={() => setShowCompanyCreator(true)}
          >
            Create new
          </button>{" "}
        </>
      )}
      {showCompanyCreator && (
        <CompanyCreator showCreator={setShowCompanyCreator} />
      )}
      {!showCompanyCreator && (
        <Grid
          style={{ margin: 20 }}
          onRowClick={(e) => console.log(e)}
          data={companies}
        >
          <GridColumn width={200} text="name" property="name" />
          <GridColumn text="OIB" property="IdentificationNumber" />
          <GridColumn text="Adress" property="Adress" />
        </Grid>
      )}
    </>
  );
};

export default CompanyManagament;
