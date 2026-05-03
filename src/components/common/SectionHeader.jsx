export default function SectionHeader({
  title,
  lede,
  className = "",
  titleClassName = "",
  ledeClassName = "",
}) {
  const head = ["section__head", className].filter(Boolean).join(" ");
  const titleCn = ["section__title", titleClassName].filter(Boolean).join(" ");
  const ledeCn = ["section__lede", ledeClassName].filter(Boolean).join(" ");

  return (
    <div className={head}>
      <h2 className={titleCn}>{title}</h2>
      {lede ? <p className={ledeCn}>{lede}</p> : null}
    </div>
  );
}
