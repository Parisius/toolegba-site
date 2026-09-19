export default function ContactMap() {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-[28px]">
      <iframe
        title="Toolègba, Cotonou, Bénin"
        src="https://www.google.com/maps?q=Cotonou,Benin&output=embed"
        className="h-72 w-full border-0 md:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
