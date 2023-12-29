namespace BussinesHub.Security
{
   public interface ISymmetricEncryptionDecryptionManager
   {
	  public string Encrypt(string data);
	  public string Decrypt(string cipherText);
   }
}
