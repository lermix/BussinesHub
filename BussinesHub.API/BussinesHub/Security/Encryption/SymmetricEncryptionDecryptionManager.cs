using System.Security.Cryptography;
using System.Text;

namespace BussinesHub.Security
{
   public class SymmetricEncryptionDecryptionManager: ISymmetricEncryptionDecryptionManager
   {
	  private const string vector = "HR$2pIjHR$2pIj12";
	  private const string key = "123.ultSigurniKljuc?!323";

	  public string Encrypt(string data)
	  {
		 byte[] initializationVector = Encoding.ASCII.GetBytes( vector );
		 using ( Aes aes = Aes.Create() )
		 {
			aes.Key = Encoding.UTF8.GetBytes( key );
			aes.IV = initializationVector;
			var symmetricEncryptor = aes.CreateEncryptor( aes.Key, aes.IV );
			using ( var memoryStream = new MemoryStream() )
			{
			   using ( var cryptoStream = new CryptoStream( memoryStream, symmetricEncryptor, CryptoStreamMode.Write ) )
			   {
				  using ( var streamWriter = new StreamWriter( cryptoStream ) )
				  {
					 streamWriter.Write( data );
				  }
				  return Convert.ToBase64String( memoryStream.ToArray() );
			   }
			}
		 }
	  }
	  public string Decrypt(string cipherText)
	  {
		 byte[] initializationVector = Encoding.ASCII.GetBytes( vector );
		 byte[] buffer = Convert.FromBase64String( cipherText );
		 using ( Aes aes = Aes.Create() )
		 {
			aes.Key = Encoding.UTF8.GetBytes( key );
			aes.IV = initializationVector;
			var decryptor = aes.CreateDecryptor( aes.Key, aes.IV );
			using ( var memoryStream = new MemoryStream( buffer ) )
			{
			   using ( var cryptoStream = new CryptoStream( memoryStream, decryptor, CryptoStreamMode.Read ) )
			   {
				  using ( var streamReader = new StreamReader( cryptoStream ) )
				  {
					 return streamReader.ReadToEnd();
				  }
			   }
			}
		 }
	  }
   }
}
