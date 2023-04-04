export class Utils {
	
	
	static randomString(length:number) {
	      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
	      var result = '';
	      for ( var i = 0; i < length; i++ ) {
	          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
	      }
	      return result;
    }

}
