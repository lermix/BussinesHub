import { useState } from 'react';
import '../../Styles/Companies/CreateNewProduct.css';
import { useNavigate } from 'react-router-dom';
import CompanyProducts from './CompanyProducts';
import { Company } from '../../Models/Company';
import { Product, ProductClass } from '../../Models/Product';
import { Input } from '../../BasicComponents/Input/Input';

interface IProps {}

const enum Tabs {
	Products,
	Categories,
}

export const CreateNewProduct: React.FC<IProps> = () => {
	const navigate = useNavigate();

	const [product, setProduct] = useState<Product>(new ProductClass());

	return (
		<>
			<div className="CreateNewProductWrapper">
				<Input
					text="naziv:"
					className="CreateCompanyInput"
					type="text"
					width={'15vw'}
					height={30}
					value={product.name}
					onChange={(value: string) => setProduct({ ...product, name: value })}
				/>
				<Input
					text="opis:"
					className="CreateCompanyInput"
					type="text"
					width={'15vw'}
					height={30}
					value={product.description}
					onChange={(value: string) => setProduct({ ...product, description: value })}
				/>
				<Input
					text="cijena:"
					className="CreateCompanyInput"
					type="number"
					width={'15vw'}
					height={30}
					value={product.price}
					onChange={(value: number) => setProduct({ ...product, price: value })}
				/>
				<Input
					text="barkod:"
					className="CreateCompanyInput"
					type="text"
					width={'15vw'}
					height={30}
					value={product.code ?? ''}
					onChange={(value: string) => setProduct({ ...product, code: value })}
				/>
				<Input
					text="pdv:"
					className="CreateCompanyInput"
					type="number"
					width={'15vw'}
					height={30}
					value={product.vatPercantage}
					onChange={(value: number) => setProduct({ ...product, vatPercantage: value })}
				/>
				<Input
					text="popust"
					className="CreateCompanyInput"
					type="number"
					width={'15vw'}
					height={30}
					value={product?.discountPercanatage}
					onChange={(value: number) => setProduct({ ...product, discountPercanatage: value })}
				/>
				<Input type="checkbox" checked={product.shipping} onChange={(value: boolean) => setProduct({ ...product, shipping: value })} />
				<Input type="checkbox" checked={product.avaliable} onChange={(value: boolean) => setProduct({ ...product, avaliable: value })} />
			</div>
		</>
	);
};

export default CreateNewProduct;
