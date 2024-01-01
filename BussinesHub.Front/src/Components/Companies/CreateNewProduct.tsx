import { useEffect, useState } from 'react';
import '../../Styles/Companies/CreateNewProduct.css';
import { Product, ProductClass } from '../../Models/Product';
import { Input } from '../../BasicComponents/Input/Input';
import { ApiProducts } from '../../Api/ProductsController';
import { setGeneralError } from '../../Helper/generalError';
import { Company } from '../../Models/Company';
import { Category } from '../../Models/Category';
import { AppState } from '../../Store/rootReducer';
import { useSelector } from 'react-redux';
import CategoryTree from './CategoryTree';
import { getAllTreeItems } from '../../Helper/HelperFunctions';

interface IProps {
	onNewProduct: (product: Product) => void;
	onEditProduct: (product: Product) => void;
	company: Company;
	productToEdit?: Product | null;
}

interface IStateProps {
	companyCategories: Category[];
}
const enum Tabs {
	Products,
	Categories,
}

export const CreateNewOrEditProduct: React.FC<IProps> = ({ onEditProduct, company, onNewProduct, productToEdit }) => {
	const { companyCategories } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
		return {
			companyCategories: state.shared.companyCategories,
		};
	});

	const [product, setProduct] = useState<Product>(productToEdit ?? new ProductClass());
	const [showCategories, setShowCategories] = useState<boolean>(false);
	const [selectedCategory, setSelecteCategory] = useState<Category | null>(null);

	useEffect(() => {
		if (productToEdit) setProduct(productToEdit);
		else setProduct(new ProductClass());
	}, [productToEdit]);

	useEffect(() => {
		if (selectedCategory) {
			ApiProducts.AddProductCategory(product.id, selectedCategory.id).then((res) => setProduct({ ...product, categoriesIds: res }));
			setSelecteCategory(null);
			setShowCategories(false);
		}
	}, [selectedCategory]);

	return (
		<>
			{!showCategories && (
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
					{productToEdit && (
						<>
							<p>
								Kategorije: <b onClick={() => setShowCategories(true)}>+</b>
							</p>

							<ul>
								{product.categoriesIds?.length > 0 &&
									getAllTreeItems(companyCategories)
										.filter((x) => product.categoriesIds.includes(x.id))
										.map((cat) => (
											<li>
												{cat.name}
												<b
													onClick={() =>
														ApiProducts.RemoveProductCategory(product.id, cat.id).then((res) =>
															setProduct({ ...product, categoriesIds: res }),
														)
													}
												>
													-
												</b>
											</li>
										))}
							</ul>
						</>
					)}
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
			)}
			{showCategories && (
				<div className="createNewProductCategoriesWrapper">
					<CategoryTree categories={companyCategories} setSelecteCategory={setSelecteCategory} />
				</div>
			)}
		</>
	);
};

export default CreateNewOrEditProduct;
