import '../../Styles/Companies/CreateCompanyStore.css';
import { Company } from '../../Models/Company';
import { Input } from '../../BasicComponents/Input/Input';
import { useState } from 'react';
import { Store, StoreClass } from '../../Models/Store';
import { ApiCompany } from '../../Api/CompanyController';

interface IProps {
	company: Company;
	onStoreCreated: (store: Store) => void;
}

export const CreateCompanyStore: React.FC<IProps> = ({ onStoreCreated, company }) => {
	const [store, setStore] = useState<Store>(new StoreClass());

	return (
		<>
			<div className="CreateCompanyStoreWrapper">
				<Input
					value={store.name}
					height={30}
					width={'20vW'}
					type="text"
					text="name"
					onChange={(value: string) => setStore({ ...store, name: value })}
				></Input>
				<Input
					value={store.adress}
					height={30}
					width={'20vW'}
					type="text"
					text="adress"
					onChange={(value: string) => setStore({ ...store, adress: value })}
				></Input>
				<Input
					value={store.city}
					height={30}
					width={'20vW'}
					type="text"
					text="city"
					onChange={(value: string) => setStore({ ...store, city: value })}
				></Input>
				<Input
					value={store.postalCode}
					height={30}
					width={'20vW'}
					type="text"
					text="postalCode"
					onChange={(value: string) => setStore({ ...store, postalCode: value })}
				></Input>
				<Input
					value={store.country}
					height={30}
					width={'20vW'}
					type="text"
					text="country"
					onChange={(value: string) => setStore({ ...store, country: value })}
				></Input>
				<Input
					value={store.mobileNumber}
					height={30}
					width={'20vW'}
					type="text"
					text="mobileNumber"
					onChange={(value: string) => setStore({ ...store, mobileNumber: value })}
				></Input>
				<button className="defaultBtn" onClick={() => ApiCompany.addCompanyStores(store, company.id).then((res) => onStoreCreated(res))}>
					Kreiraj
				</button>
			</div>
		</>
	);
};

export default CreateCompanyStore;
