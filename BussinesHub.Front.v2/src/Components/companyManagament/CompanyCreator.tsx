import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { Input } from "../../basicComponents/Input/Input";
import { Company, CompanyClass } from "../../models/Company";
import { VerifiedUser } from "../../models/User";
import { useAppDispatch } from "../../store/hooks";
import { AppState } from "../../store/rootReducer";
import { createCompany } from "../../store/user/actions";
import MapConsumer from "../MapConsumer";

interface IProps {
  showCreator: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IStateProps {
  verifiedUser: VerifiedUser | null;
}

const CompanyCreator: React.FC<IProps> = ({ showCreator }) => {
  const dispatch = useAppDispatch();

  const { verifiedUser } = useSelector<AppState, IStateProps>(
    (state: AppState): IStateProps => {
      return {
        verifiedUser: state.user.verifiedUser,
      };
    }
  );

  const [company, setCompany] = useState<Company>(new CompanyClass());

  const CreateCompany = () => {
    verifiedUser?.username &&
      dispatch(createCompany(company, verifiedUser?.username));
    //showCreator(false);
  };
  return (
    <>
      <h2>Create Company</h2>

      <br />
      <div style={{ width: 400, float: "left" }}>
        <Input
          type="text"
          text="name"
          onChange={(value: string) => setCompany({ ...company, name: value })}
        />
        <Input
          type="text"
          text="IdentificationNumber"
          onChange={(value: string) =>
            setCompany({ ...company, identificationNumber: value })
          }
        />
        <Input
          type="text"
          text="Adress"
          onChange={(value: string) => setCompany({ ...company, city: value })}
        />
        <Input
          type="text"
          text="City"
          onChange={(value: string) =>
            setCompany({ ...company, postalCode: value })
          }
        />
        <Input
          type="text"
          text="Postal code"
          onChange={(value: string) =>
            setCompany({ ...company, country: value })
          }
        />
        <Input
          type="text"
          text="Country"
          onChange={(value: string) =>
            setCompany({ ...company, country: value })
          }
        />
        <br />
        <br />
        <div style={{ width: 408 }}>
          <button style={{ float: "left" }} onClick={CreateCompany}>
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

export default CompanyCreator;
