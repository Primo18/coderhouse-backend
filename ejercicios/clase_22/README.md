# Jwt desde cookie
## Desarrollar un sistema sencillo de express

Colocar una vista en public (No utilizar motores de plantillas), dicha vista contará con dos campos: correo y contraseña, deberá además mandar a llamar un servicio de login que devuelva el token por medio de una cookie como lo visto en el ejemplo

- No colocar el httpOnly. Intenta el proceso de login y setea la cookie en el navegador. Después, hacer un console.log simple en el archivo js con el comando document.cookie, corroborar que se muestre en la consola del navegador la cookie asociada a tu token. ¡Peligroso!

- Limpiar esta cookie y colocar el httpOnly en la configuración, repite el proceso del primer punto y corrobora si la cookie aparece en la consola.
