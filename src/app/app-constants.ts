export class AppConstants {

	//public static get baseServidor(): string{ return "http://localhost:8080/" }
  public static get baseServidor(): string{ return "https://chatbot-argo.herokuapp.com/" }
	public static get baseUrl(): string{ return this.baseServidor + "chatbot/question/"}
  public static get baseUrlAnswer(): string{ return this.baseServidor + "chatbot/answer/"}

}
