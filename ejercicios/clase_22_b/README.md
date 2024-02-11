# Jwt desde cookie
## Desarrollar un sistema sencillo de express

Colocar una vista en public (No utilizar motores de plantillas), dicha vista contará con dos campos: correo y contraseña, deberá además mandar a llamar un servicio de login que devuelva el token por medio de una cookie como lo visto en el ejemplo

- No colocar el httpOnly. Intenta el proceso de login y setea la cookie en el navegador. Después, hacer un console.log simple en el archivo js con el comando document.cookie, corroborar que se muestre en la consola del navegador la cookie asociada a tu token. ¡Peligroso!

- Limpiar esta cookie y colocar el httpOnly en la configuración, repite el proceso del primer punto y corrobora si la cookie aparece en la consola.

## Configurar passport-jwt 
Con la estructura del inicio de la clase:

Desarrollar la estructura de las diapositivas previas para configurar la estrategia de passport-jwt
Mantener el endpoint de login previamente visto, no requerirá alteración.
Crear un endpoint en la ruta ‘/current’ con el método GET, el cual utilice la autenticación de passport-jwt (apagar la session, ya que no la utilizamos).

