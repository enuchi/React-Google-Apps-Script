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
        href="https://www.github.com/enuchi/React-Google-Apps-Script"
        target="_blank"
        rel="noopener noreferrer"
      >
        React + Google Apps Script
      </a>
      <div>-Elisha Nuchi</div>
    </div>
  );
};
