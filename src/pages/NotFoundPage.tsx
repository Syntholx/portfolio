import { type Language, translations } from "../i118n/translations";

export function NotFoundPage(props: { language: Language }) {
  const texts = translations[props.language];
  return (
    <section>
      <h1>{texts.notFoundTitle}</h1>
      <p>
        {texts.notFoundDescription}
      </p>
      <a href="/">{texts.backHome}</a>
    </section>
  );
}
