# PageLayout

## Modello JSON per l'import automatico

1. Apri il menu Impostazioni dell'interfaccia e usa l'azione **Scarica modello JSON** (elemento `#tbDownloadTemplate`) per ottenere `modello-import.json`. Se vuoi un esempio completo con mappa SVG esterna, timeline e testi estesi, scegli **Scarica JSON di esempio** (`#tbDownloadExample`).
2. Compila i campi `placeholders`, `sectionTitles`, `image`, `mermaid`, `glossario` e `quiz` con i contenuti della tua lezione. Per il blocco `image` puoi indicare sia file locali sia SVG esterni (anche da URL HTTPS o data URI) e, se serve, inserire codice SVG inline tramite la proprietà `inlineSvg`.
3. Importa il file completo tramite il pulsante **Importa** oppure incolla il JSON nel dialog dedicato.

Il modello riproduce la struttura attesa dalla funzione `ingestData`, quindi ogni campo verrà applicato automaticamente alla pagina.

## Suggerimenti su encoding e HTML inline

Se il JSON contiene testo HTML (per esempio per grassetti o liste) assicurati che il file sia salvato in UTF-8 senza BOM. In caso
contrario gli accenti o altri caratteri speciali potrebbero apparire rovinati perché interpretati come ISO-8859-1, e i tag HTML
verrebbero caricati come semplice testo dal browser anziché essere renderizzati. Se noti questo problema, apri il file con un
editor che permetta di cambiare la codifica e risalvalo esplicitamente in UTF-8 prima di importarlo.
