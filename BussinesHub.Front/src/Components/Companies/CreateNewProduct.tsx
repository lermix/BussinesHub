import { useEffect, useState } from 'react';
import '../../Styles/Companies/CreateNewProduct.css';
import { Product, ProductClass } from '../../Models/Product';
import { Input } from '../../BasicComponents/Input/Input';
import { ApiProducts } from '../../Api/ProductsController';
import { setGeneralError } from '../../Helper/generalError';
import { Company } from '../../Models/Company';

interface IProps {
	onNewProduct: (product: Product) => void;
	onEditProduct: (product: Product) => void;
	company: Company;
	productToEdit?: Product | null;
}

const enum Tabs {
	Products,
	Categories,
}

export const CreateNewOrEditProduct: React.FC<IProps> = ({ onEditProduct, company, onNewProduct, productToEdit }) => {
	const [product, setProduct] = useState<Product>(productToEdit ?? new ProductClass());

	useEffect(() => {
		if (productToEdit) setProduct(productToEdit);
		else setProduct(new ProductClass());
	}, [productToEdit]);

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
				{!productToEdit && (
					<button
						className="defaultBtn"
						onClick={() =>
							ApiProducts.CreateProduct(product, company.id)
								.then((res) => onNewProduct(res))
								.catch((ex) => setGeneralError(ex))
						}
					>
						Kreiraj
					</button>
				)}
				{productToEdit && (
					<button
						className="defaultBtn"
						onClick={() =>
							ApiProducts.UpdateProduct(product)
								.then((res) => onEditProduct(res))
								.catch((ex) => setGeneralError(ex))
						}
					>
						Uredi
					</button>
				)}
			</div>
		</>
	);
};

export default CreateNewOrEditProduct;
