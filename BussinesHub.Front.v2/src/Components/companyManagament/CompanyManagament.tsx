import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "../../basicComponents/Grid/Grid";
import { GridColumn } from "../../basicComponents/Grid/GridColumn";
import { Input } from "../../basicComponents/Input/Input";
import { Company } from "../../models/Company";
import { VerifiedUser } from "../../models/User";
import {
  getCompanyStores,
  setSelectedCompany,
} from "../../store/company/actions";
import { useAppDispatch } from "../../store/hooks";
import { AppState } from "../../store/rootReducer";
import { deleteCompany, getUserCompanies } from "../../store/user/actions";
import CompanyCreator from "./CompanyCreator";
import { Window } from "../../basicComponents/Window/Window";

interface IStateProps {
  companies: Company[];
  verifiedUser: VerifiedUser | null;
  selectedCompany: Company | null;
}

export const CompanyManagament: React.FC = () => {
  const dispatch = useAppDispatch();
  const { companies, verifiedUser, selectedCompany } = useSelector<
    AppState,
    IStateProps
  >((state: AppState): IStateProps => {
    return {
      companies: state.user.companies,
      verifiedUser: state.user.verifiedUser,
      selectedCompany: state.company.selectedCompany,
    };
  });

  useEffect(() => {
    verifiedUser?.username &&
      dispatch(getUserCompanies(verifiedUser?.username));
  }, []);

  const [showCompanyCreator, setShowCompanyCreator] = useState<boolean>(false);
  const [CopmanyToEdit, setCopmanyToEdit] = useState<Company | null>(null);
  const [data, setData] = useState<Company[]>(companies);

  return (
    <>
      {!showCompanyCreator && (
        <>
          <h3 style={{ marginTop: 0 }}>My companies</h3>
          <button
            className="shw"
            style={{ borderRadius: 10 }}
            onClick={() => {
              setCopmanyToEdit(null);
              setTimeout(() => {
                setShowCompanyCreator(true);
              }, 200);
            }}
          >
            Create new
          </button>{" "}
          {selectedCompany && (
            <>
              <button
                className="shw"
                style={{ borderRadius: 10, marginLeft: 20 }}
                onClick={() => {
                  setCopmanyToEdit(selectedCompany);
                  setTimeout(() => {
                    setShowCompanyCreator(true);
                  }, 200);
                }}
              >
                Edit company {selectedCompany.name}
              </button>
              <button
                className="shw"
                style={{ borderRadius: 10, marginLeft: 20 }}
                onClick={() => dispatch(deleteCompany(selectedCompany.id))}
              >
                Delete company {selectedCompany.name}
              </button>
            </>
          )}
        </>
      )}
      {showCompanyCreator && (
        <CompanyCreator
          showCreator={setShowCompanyCreator}
          toEdit={CopmanyToEdit}
        />
      )}
      {!showCompanyCreator && (
        <>
          <p style={{ marginLeft: 20 }}>
            <b>Selected:</b>
            {selectedCompany?.name}
          </p>
          <Input
            type="text"
            text="Search by name"
            autoComplete="off"
            width={200}
            height={20}
            style={{ marginLeft: 20 }}
            onChange={(value: string) =>
              setData(companies.filter((e) => e.name.includes(value)))
            }
          />
          <Grid
            style={{ margin: 20 }}
            onRowClick={(e) => {
              dispatch(setSelectedCompany(e));
              dispatch(getCompanyStores(e.id));
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
              text="OIB"
              property="identificationNumber"
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

export default CompanyManagament;
