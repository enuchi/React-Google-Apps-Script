import '../styles.css';
import { FunctionalComponent, h } from 'preact';
interface AboutPageProps {}

export const AboutPage: FunctionalComponent<AboutPageProps> = (
  props: AboutPageProps
) => {
  return (
    <div className="sheetNameText">
      <div>Github repo:</div>
      <a
        href="https://www.github.com/msembinelli/preact-ts-gas"
        target="_blank"
        rel="noopener noreferrer"
      >
        Preact + Typescript + Google Apps Script
      </a>
      <div>-Matthew Sembinelli</div>
    </div>
  );
};
