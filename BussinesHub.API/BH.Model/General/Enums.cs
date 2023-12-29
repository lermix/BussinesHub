using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Model.General
{
	public enum UserFuncEnum : byte
	{
		Default = 0,
		StoreOwner = 1,
		Worker = 2,
		

	}

	public enum PermissionEnum: byte
	{
		AddProduct = 0,
		RemoveProduct = 1,
		EditProduct = 2,
		AddStore = 4,
		RemoveStore = 8,
		EditStore = 16,
		AddUser = 32,
		RemoveUser = 64,
		EditUser = 128,
	}
}
