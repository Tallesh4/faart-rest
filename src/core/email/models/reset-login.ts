export default function resetPasswordEmailModel(url: string, code: string, name:string, to:string) {
	return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Login</title>
    </head>
    
    <body style="background-color: #3b271e;justify-content: center;align-items: center;display: flex;">
        <div style="margin-top: 60px;">
            <div style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;background-color: #ffffff;width: 60%;margin-left: 20%;margin-top: 20px;border-radius: 10px;">
                <div>
                    <div class="logo-email" style="padding-top: 20px;">
                    <img style="margin-left:25%" width="50%" src="https://firebasestorage.googleapis.com/v0/b/people-projects.appspot.com/o/faart%2Finitial_logo.png?alt=media&amp;token=77d0a02a-47c5-4ae9-9928-4fdb496fdb85" alt="">
                    </div>
                    <div>
                        <div class="code_verify" style="font-size: 24px;margin-top: 20px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;">
                            <span>Resetar Senha</span>
                        </div>
                        <div class="token" style="font-size: 48px;margin-top: 20px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;">
                            <span>${code}</span>
                        </div>
                        <div style="font-size: 12px;margin-top: 20px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;" class="subtitle">
                            <span>Aqui está o seu código para recuperar sua senha.</span>
                            <p>Ou clique no botão abaixo.</p>
                        </div>
                        <div style="font-size: 12px;margin-top: 20px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;">
                            <a href="${url}" target="_blank">
                                <button class="button-reset" style="width: 50%;height: 40px;border-radius: 10px;border: none;background-color: #3b271e;color: #fff;font-size: 16px;font-weight: bold;">
                                    Recuperar Conta
                                </button>
                            </a>
                        </div>
                        <div class="subtitleTime" style="font-size: 14px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;padding-bottom: 20px;margin-top: 10px;">
                            <span>expirará em 5 minutos.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="description_email" style="font-size: 12px;margin-top: 20px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;color: #fff;">
                    <span>Este e-mail foi destinado à ${name} (${to})</span>
                </div>
                <div class="copyright" style="font-size: 12px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;color: #fff;">
                    <span>Compass Technology © 2022</span>
                </div>
            </div>
        </div>
    </body>
    
    </html>`;
}