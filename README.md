# Marcello Gabana Holding

Mirror statico scaricato da `https://marcellogabanaholding.it/`.

## Struttura

- `marcellogabanaholding.it/index.html`: homepage scaricata.
- `marcellogabanaholding.it/chi-siamo/index.html`: pagina Chi siamo.
- `marcellogabanaholding.it/news/index.html`: archivio news/progetti.
- `marcellogabanaholding.it/contatti/index.html`: pagina Contatti.
- `marcellogabanaholding.it/bilancio-di-sostenibilita/index.html`: bilancio sostenibilita.
- `marcellogabanaholding.it/wp-content/uploads/`: immagini, PDF e media scaricati.
- `marcellogabanaholding.it/wp-content/themes/` e `wp-content/plugins/`: asset CSS/JS/font del tema WordPress originale.

## Avvio locale

```sh
cd marcellogabanaholding.it
python3 -m http.server 8080
```

Poi aprire `http://localhost:8080`.

## Note

Questa e una copia statica: HTML, CSS, JS, immagini e allegati sono stati salvati localmente e molti link sono stati convertiti. Funzioni dinamiche WordPress come form, `wp-admin`, `xmlrpc.php`, API e chiamate AJAX non sono una base affidabile per produzione e andranno rifatte nel nuovo sviluppo.
