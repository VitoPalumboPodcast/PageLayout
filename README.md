# PageLayout

## Modello JSON per l'import automatico

1. Apri il menu Impostazioni dell'interfaccia e usa l'azione **Scarica modello JSON** (elemento `#tbDownloadTemplate`) per ottenere `modello-import.json`.
2. Compila i campi `placeholders`, `sectionTitles`, `image`, `mermaid`, `glossario` e `quiz` con i contenuti della tua lezione. Per il blocco `image` puoi indicare sia file locali sia SVG esterni (anche da URL HTTPS o data URI): l'anteprima verrà ridimensionata per mostrare l'intera immagine.
3. Importa il file completo tramite il pulsante **Importa** oppure incolla il JSON nel dialog dedicato.

Il modello riproduce la struttura attesa dalla funzione `ingestData`, quindi ogni campo verrà applicato automaticamente alla pagina.
