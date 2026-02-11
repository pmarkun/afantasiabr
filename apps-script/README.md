## Apps Script (Google Sheets)

Este script grava respostas do formulario na planilha informada em `apps-script/Code.gs`.

### Como publicar
1. Abra a planilha e va em `Extensoes` -> `Apps Script`.
2. Apague qualquer codigo existente e cole o conteudo de `apps-script/Code.gs`.
3. Clique em `Implantar` -> `Nova implantacao`.
4. Selecione `Aplicativo da Web`.
5. Em `Quem tem acesso`, escolha `Qualquer pessoa`.
6. Autorize e copie a URL do Web App.
7. No `index.html`, substitua `COLE_AQUI_A_URL_DO_WEB_APP` pela URL copiada.

### Campos enviados
- result
- name
- age
- email
- profession
- experience
- submittedAt
