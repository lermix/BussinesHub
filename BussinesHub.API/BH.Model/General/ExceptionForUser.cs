using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BH.Model.General
{
	public class ExceptionForUser: Exception
	{
		public ExceptionForUser(string msg) : base( "[msg]"+ msg + "[/msg]") { } //constructor

		public override string StackTrace
		{
			get { return ""; }
		}
	}
}
