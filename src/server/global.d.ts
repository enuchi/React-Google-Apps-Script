export {}

declare global {
  function onOpen(): void
  function getSheetsData(): void
  function addSheet(): void
  function deleteSheet(): void
  function setActiveSheet(): void
  function openDialog(): void
  function openDialogBootstrap(): void
  function openDialogMUI(): void
  function openDialogTailwindCSS(): void
  function openAboutSidebar(): void
}