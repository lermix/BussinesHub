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
import EditProductAdditionalInfo from './EditProductAdditionalInfo';
import { info } from 'console';

interface IProps {
	onNewProduct: (product: Product) => void;
	onEditProduct: (product: Product) => void;
	onDeleteProduct: (productId: number) => void;
	company: Company;
	productToEdit?: Product | null;
}

interface IStateProps {
	companyCategories: Category[];
}

export const CreateNewOrEditProduct: React.FC<IProps> = ({ onDeleteProduct, onEditProduct, company, onNewProduct, productToEdit }) => {
	const { companyCategories } = useSelector<AppState, IStateProps>((state: AppState): IStateProps => {
		return {
			companyCategories: state.shared.companyCategories,
		};
	});

	const [product, setProduct] = useState<Product>(productToEdit ?? new ProductClass());
	const [showCategories, setShowCategories] = useState<boolean>(false);
	const [selectedCategory, setSelecteCategory] = useState<Category | null>(null);
	const [showAdditionalInfo, setShowAdditionalInfo] = useState<boolean>(false);

	useEffect(() => {
		if (productToEdit) {
			setProduct(productToEdit);
			setShowCategories(false);
		} else setProduct(new ProductClass());
	}, [productToEdit]);

	useEffect(() => {
		handleSelectedCategory();
	}, [selectedCategory]);

	const handleSelectedCategory = async () => {
		if (selectedCategory) {
			const list: Category[] = [];
			GetParentCategories(selectedCategory, list);
			list.push(selectedCategory);
			for (let i = 0; i < list.length; i++) {
				const element = list[i];
				if (i !== list.length - 1) await ApiProducts.AddProductCategory(product.id, element.id);

				if (i === list.length - 1)
					ApiProducts.AddProductCategory(product.id, element.id).then((res) => {
						console.log(res);
						onEditProduct({ ...product, categoriesIds: res });
						setProduct({ ...product, categoriesIds: res });
					});
			}

			setSelecteCategory(null);
			setShowCategories(false);
		}
	};

	const GetParentCategories = (category: Category, catList: Category[]) => {
		const parentCat = flatten(companyCategories, (x) => x.children ?? []).find((x) => x.id == category.parentId);
		if (parentCat) {
			catList.push(parentCat);
			GetParentCategories(parentCat, catList);
		}
	};

	let flatten = (children: Category[], extractChildren: (arg: Category) => Category[]): Category[] =>
		Array.prototype.concat.apply(
			children,
			children.map((x) => flatten(extractChildren(x) || [], extractChildren)),
		);

	return (
		<>
			{showAdditionalInfo && (
				<EditProductAdditionalInfo
					product={product}
					onClose={() => {
						setShowAdditionalInfo(false);
					}}
				/>
			)}
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
						<>
							<button className="defaultBtn" style={{ width: 250 }} onClick={() => setShowAdditionalInfo(true)}>
								Dodatne informacije
							</button>
							<div className="crateNewProductBtnContainer">
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
								<button
									className="defaultBtn"
									onClick={() =>
										ApiProducts.DeleteProduct(product.id)
											.then((res) => onDeleteProduct(res))
											.catch((ex) => setGeneralError(ex))
									}
								>
									Obriši
								</button>
							</div>
						</>
					)}
				</div>
			)}
			{showCategories && (
				<div className="createNewProductCategoriesWrapper">
					<CategoryTree setSelecteCategory={setSelecteCategory} allowDelete={false} categories={companyCategories} />
					<button className="defaultBtn" onClick={() => setShowCategories(false)}>
						Nazad
					</button>
				</div>
			)}
		</>
	);
};

export default CreateNewOrEditProduct;
