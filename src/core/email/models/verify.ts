export default function verifyEmailModel(to: string, code: string, name: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Code</title>
    </head>
    
    <body style="background-color: #3b271e;justify-content: center;align-items: center;display: flex;">
        <div style="margin-top: 60px;">
            <div style="height: 350px;box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;background-color: #ffffff;width: 60%;margin-left: 20%;margin-top: 20px;border-radius: 10px;">
                <div>
                    <div class="logo-email" style="padding-top: 20px;">
                    <img style="margin-left:25%" width="50%" src="https://firebasestorage.googleapis.com/v0/b/people-projects.appspot.com/o/faart%2Finitial_logo.png?alt=media&amp;token=77d0a02a-47c5-4ae9-9928-4fdb496fdb85" alt="">
                    </div>
                    <div>
                        <div class="code_verify" style="font-size: 24px;margin-top: 20px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;">
                            <span>Código de verificação</span>
                        </div>
                        <div class="token" style="font-size: 48px;margin-top: 20px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;">
                            <span>${code}</span>
                        </div>
                        <div class="subtitle" style=" font-size: 14px;margin-top: 20px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;">
                            <span>Aqui está o seu código de verificação de 6 dígitos.</span>
                        </div>
                        <div class="subtitleTime" style="font-size: 14px;font-family: Segoe UI;font-style: normal;font-weight: bold;text-align: center;">
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
    
    
    </body>`;
}