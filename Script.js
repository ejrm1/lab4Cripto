// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-06-07
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site/
// @match        file:///home/edu/Desktop/test.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tiiny.site
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha384-mgWScxWVKP8F7PBbpNp7i/aaSb17kN0LcifBpahAplF3Mn0GR4/u1oMpWIm2rD8yY
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const text = document.querySelector('p').firstChild.data;
    const regMayus = /([A-Z])/g
    const key = text.match(regMayus).join('');
    console.log("la llave es: " + key)

    const cryptoJs_Key= CryptoJS.enc.Utf8.parse(key)

    const encrypt_messages = document.querySelectorAll('div[class^=M]');
    console.log('Los mensajes cifrados son: ' + encrypt_messages.length);

    //loop para cada mensaje cifrado
    encrypt_messages.forEach(function(encrypt_messages) {
        const message_base64_word = CryptoJS.enc.Base64.parse(encrypt_messages.id);
        const message = CryptoJS.TripleDES.decrypt({
            ciphertext: message_base64_word
        }, cryptoJs_Key, {
            mode: CryptoJS.mode.ECB
        }).toString(CryptoJS.enc.Utf8);
        console.log(encrypt_messages.id + ' ' + message)

        var paragrpah = document.createElement('div');
        paragrpah.innerHTML = message
        document.body.appendChild(paragrpah);

    }) //Fin del loop

})();

