// Compile __main__.as instead
package  {
	import haxe.Log;
	public class Sample {
		static public function main() : void {
			(haxe.Log._trace)("Hello World",{ fileName : "Sample.hx", lineNumber : 3, className : "Sample", methodName : "main"});
		}
		
	}
}
